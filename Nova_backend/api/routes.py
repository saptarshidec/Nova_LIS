from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from pyrsistent import v
from sqlalchemy import desc
from api import app,db
from api import json
from datetime import datetime,timedelta
from api.models import User, Book, Issuerecord, Reserverecord
import random

from flask_cors import CORS

import os

if(not 'site.db' in os.listdir('./api')):
    db.create_all()
    user = User(name="Librarian", roll="libr-1", email="librarian@nova-lis.com",phone=9059325231, username="admin",password="admin",designation="N/A",booksissued=0)
    db.session.add(user)
    db.session.commit()


@app.route('/register',methods=['GET','POST'])
def register():    
    name=request.json['name']
    roll=request.json['roll']
    email=request.json['email']
    phone=int(request.json['phone'].strip())
    username=request.json['userName']
    password=request.json['password']
    designation=request.json['designation']
    record = User(name,roll,email,phone,username,password,designation,booksissued=0)


    roll_exists = User.query.filter_by(roll=roll.strip()).first()
    email_exists = User.query.filter_by(email=email.strip()).first()
    phone_exists = User.query.filter_by(phone=phone).first()
    username_exists = User.query.filter_by(username=username.strip()).first()

    exists = roll_exists or email_exists or phone_exists or username_exists

    if exists:
        data = {
            "accepted": False,
            "rollExists": True if roll_exists else False,
            "emailExists": True if email_exists else False,
            "phoneExists": True if phone_exists else False,
            "usernameExists": True if username_exists else False,               
        }
        return jsonify(data)
    else:
        db.session.add(record)
        db.session.commit()
        data = {
            "accepted": True,
            "rollExists": False,
            "emailExists": False,
            "phoneExists": False,
            "usernameExists": False,    
        }
        return jsonify(data)

@app.route('/reserve',methods=["GET","POST"])
def reserveBook():
    bookid=request.json["bookid"]
    username=request.json["username"]
    id=db.session.query(Reserverecord).count()
    record=Reserverecord.query.filter_by(bookid=bookid,username=username).first()
    if(record):
        return jsonify({"alreadyReserved":True})
    reserveEntry=Reserverecord(id+1,bookid,username)
    db.session.add(reserveEntry)
    db.session.commit()
    return jsonify({"reserved":True})


@app.route('/login',methods=['GET','POST'])
def login():
    username = request.json["userName"]
    password = request.json["password"]
    user = User.query.filter_by(username=username.strip()).first()


    if user:
        if user.password == password:
            data = {
                "isRegistered": True,     
                "isPasswordCorrect": True,
                "name": user.name,
                "roll": user.roll,
                "designation": user.designation,
                "phone": user.phone,
                "email": user.email,
                "userName": user.username,
            }
        else:
            data = {
                "isRegistered": True,          
                "isPasswordCorrect": False
            }
        return jsonify(data)
    else:
        data = {
            "isRegistered": False
        }
        return jsonify(data)

@app.route('/profile/<string:username>',methods=['GET'])
def getIssuedBooks(username):
    booksissued=[]
    for record in Issuerecord.query.filter_by(issuedto=username):
        bookid=record.bookid
        book=Book.query.filter_by(bookid=bookid).first()
        if book:
            booksissued.append({
            "booknumber":book.booknumber,
            "bookid":book.bookid,
            "isbn":book.isbn,
            "author":book.author,
            "published_date":book.published_date,
            "title":book.title,
            "image_url":book.image_url,
            "small_image_url":book.small_image_url,
            "no_of_copies":book.no_of_copies,
            "racknumber":book.racknumber,
            "id":record.id,
            "issuedate":record.issuedate,
            "expectedreturn":record.expectedreturn,
            "isOverdue":record.isOverdue(),
            "overdueDuration":record.overdueDuration(),
            "returned":record.returned,
            "returndate":record.returndate,
            "isPrinted": record.isPrinted,
            "isDeleted":book.isDeleted,
        })

    booksreserved=[]
    now = datetime.now()
    for record in Reserverecord.query.filter_by(username=username):
        if(record.isavailable==1 and (int((now-datetime.strptime(record.returndate,'%Y-%m-%d %H:%M:%S.%f')).total_seconds())/60)*(7/5)>7):
            delrecord=record
            db.session.delete(delrecord)
            db.session.commit()
        else:
            book = Book.query.filter_by(bookid=record.bookid).first()
            booksreserved.append({
                "booknumber":book.booknumber,
                "bookid":book.bookid,
                "isbn":book.isbn,
                "author":book.author,
                "published_date":book.published_date,
                "title":book.title,
                "image_url":book.image_url,
                "small_image_url":book.small_image_url,
                "no_of_copies":book.no_of_copies,
                "racknumber":book.racknumber,
                "returndate":record.returndate,
                "username": username,
                "isAvailable": record.isavailable
            })
    return jsonify({"booksissued": booksissued, "booksreserved": booksreserved})


@app.route('/unreturnedBooks',methods=['GET','POST'])

def unreturnedBooks():
    booksissued=[]
    for record in Issuerecord.query.filter_by(returned=0):
        bookid=record.bookid
        book=Book.query.filter_by(bookid=bookid).first()
        booksissued.append({
        "title":book.title,
        "image_url":book.image_url,
        "small_image_url":book.small_image_url,
        "id":record.id,
        "issuedate":record.issuedate,
        "expectedreturn":record.expectedreturn,
        "isOverdue":record.isOverdue(),
        "username": record.issuedto,
        "isPrinted": record.isPrinted,
        "isDeleted": book.isDeleted
    })

    return jsonify(booksissued)

@app.route('/printReminder/<int:issueid>',methods=['GET','POST'])
def printReminder(issueid):
    record=Issuerecord.query.filter_by(id=issueid).first()
    if record.isPrinted == 1:
        return jsonify({"alreadySent": True})
    else:
        record.isPrinted = 1
        db.session.commit()
        return jsonify({"alreadySent": False})


@app.route('/browse',methods=['GET','POST'])
def browse():
    bookname=request.json["bookname"]
    books=[]
    flag=0
    for book in Book.query.filter(Book.title.contains(bookname)):
        flag=1
        books.append({
            "bookid":book.bookid,
            "booknumber":book.booknumber,
            "title":book.title,
            "author":book.author,
            "isbn":book.isbn,
            "published_date":book.published_date,
            "image_url":book.image_url,
            "small_image_url":book.small_image_url,
            "no_of_copies":book.no_of_copies,
            "racknumber":book.racknumber,
            "isDeleted":book.isDeleted
        })
    if flag==0:
        data={
            "foundBook":False
        } 
        return jsonify(data)
    else:
        data={
            "foundBook":True,
            "books":books
        }
        return jsonify(data)

@app.route('/book/<int:number>')
def getBook(number):
    book = Book.query.filter_by(booknumber=int(number)).first()
    serialBook = {
        "bookid":book.bookid,
        "booknumber":book.booknumber,
        "title":book.title,
        "author":book.author,
        "isbn":book.isbn,
        "published_date":book.published_date,
        "image_url":book.image_url,
        "small_image_url":book.small_image_url,
        "no_of_copies":book.no_of_copies,
        "racknumber":book.racknumber
    }
    return jsonify(serialBook)

@app.route('/getUsers',methods=["GET"])
def getUsers():
    users=[]
    flag=0
    for user in User.query.all():
        flag=1
        users.append({
            "name":user.name,
            "username":user.username,
            "designation":user.designation
        })
    if(flag==1):
        data={
            "usersFound":True,
            "users":users
        } 
        return jsonify(data)
    else:
        data={
            "usersFound":False
        }
        return jsonify(data)

@app.route("/deleteUser/<string:username>", methods=["DELETE"])
def guide_delete(username):
    user=User.query.filter_by(username=username).first()
    db.session.delete(user)
    db.session.commit()
    return jsonify({"userDeleted":True})


@app.route('/issue',methods=['GET','POST'])
def issuebook():
    bookId=request.json["bookid"]
    username=request.json["username"]
    issueentry=[]
    record=Issuerecord.query.filter_by(bookid=bookId, issuedto=username, returned=0).first()
    if record:
        return jsonify({"alreadyissued": True})

    bookissue=Book.query.filter_by(bookid=bookId).first()
    userissue=User.query.filter_by(username=username.strip()).first()
    if(userissue.designation=="UG Student" and userissue.booksissued>=2):
        return jsonify({"issuelimit":True})
    elif(userissue.designation=="PG Student" and userissue.booksissued>=4):
        return jsonify({"issuelimit":True})
    elif(userissue.designation=="Research Scholar" and userissue.booksissued>=6):
        return jsonify({"issuelimit":True})
    elif(userissue.booksissued>=10):
        return jsonify({"issuelimit":True})
    issueDuration=0
    if(userissue.designation=="UG Student"):
        issueDuration=30
    elif(userissue.designation=="PG Student"):
        issueDuration=60
    elif(userissue.designation=="Research Scholar"):
        issueDuration=90
    else:
        issueDuration=180
    date=datetime.now()
    if (bookissue.no_of_copies>0):
    
        issueid=db.session.query(Issuerecord).count()
        bookissue.no_of_copies-=1
        db.session.commit()
        issueEntry=Issuerecord(issueid+1,bookissue.bookid,userissue.username,date,date+timedelta(days=issueDuration),0)
        db.session.add(issueEntry)
        db.session.commit()
        db.session.flush()
        data = {
            "isIssued": True,
            "id": issueEntry.id
        }
        userissue.booksissued+=1
        db.session.commit()
        return jsonify(data)
    else:
        flag=0
        for record in Reserverecord.query.filter_by(bookid=bookId):
            flag=1
            if(record.isavailable==1):
                if(int((date-datetime.strptime(record.returndate,'%Y-%m-%d %H:%M:%S.%f')).total_seconds()/60)*(7/5)>7):
                    delrecord=record
                    db.session.delete(delrecord)
                    db.session.commit()
                else:
                    break
        record=Reserverecord.query.filter_by(bookid=bookId,username=username).first()
        if(flag==1):
            record2=db.session.query(Reserverecord).filter(Reserverecord.username!=username).filter(Reserverecord.bookid==bookId).first()
        if((record and record.isavailable==1)or(flag==1 and record2 is None)):
            issueid=db.session.query(Issuerecord).count()
            db.session.commit()
            issueEntry=Issuerecord(issueid+1,bookissue.bookid,userissue.username,date,date+timedelta(days=issueDuration),0)
            db.session.add(issueEntry)
            db.session.commit()
            db.session.flush()
            data = {
                "isIssued": True,
                "id": issueEntry.id
            }
            userissue.booksissued+=1
            db.session.commit()
            if(record):
                db.session.delete(record)
                db.session.commit()
                for entry in Reserverecord.query.filter_by(bookid=bookId):
                    entry.isavailable=0
                    db.session.commit()
                    entry.returndate="NULL"
                    db.session.commit()
            return jsonify(data)
        elif(record):
            return jsonify({
                "isIssuedByAnother":False, 
                "canReserve":False
            })
        else:
            return jsonify({
                "isIssuedByAnother":False, 
                "canReserve":True
            })

@app.route('/return/<int:id>')
def returnBook(id):
    record=Issuerecord.query.filter_by(id=id).first()
    record.returned=1
    db.session.commit()
    bookid=record.bookid
    username=record.issuedto
    book=Book.query.filter_by(bookid=bookid).first()
    user=User.query.filter_by(username=username).first()
    user.booksissued-=1
    db.session.commit()
    date=datetime.now()
    record.returndate=date
    db.session.commit()
    
    flag=0
    for entry in Reserverecord.query.filter_by(bookid=bookid):
        flag=1
        entry.returndate=date
        db.session.commit()
        entry.isavailable=1
        db.session.commit()
    if(flag==0):
        book.no_of_copies+=1
        db.session.commit()


    penalty=record.penalty()
    if(penalty==0):
        return jsonify({"returned":True,"isOverdue":False})
    else:
        return jsonify({"isOverdue":True,"penalty":penalty})

@app.route('/registerBook', methods=['GET','POST'])
def registerBook():
    if Book.query.first() is None:
        bookid=1
        booknumber=1
    else:
        booknumber=(Book.query.order_by(Book.booknumber.desc()).first()).booknumber+1
        bookid=(Book.query.order_by(Book.bookid.desc()).first()).bookid+1
    isbn=request.json["isbn"]
    author=request.json["author"]
    published_date=request.json["published_date"]
    title=request.json["title"]
    image_url=request.json["image_url"]
    small_image_url=request.json["small_image_url"]
    no_of_copies=request.json["no_of_copies"]
    racknumber=random.randint(1,200)
    book=Book(booknumber,bookid,isbn,author,published_date,title,image_url,small_image_url,no_of_copies,racknumber)
    isbn_exists = Book.query.filter_by(isbn=isbn).first()
    bookid_exists = Book.query.filter_by(bookid=bookid).first()
    title_exists = Book.query.filter_by(title=title.strip()).first()

    exists = isbn_exists or bookid_exists or title_exists
    if exists:
        data = {
            "accepted": False,
            "isbnExists": True if isbn_exists else False,
            "bookidExists": True if bookid_exists else False,
            "titleExists": True if title_exists else False ,    
        }
        return jsonify(data)

    else:
        db.session.add(book)
        db.session.commit()
        data = {
            "accepted": True,
            "isbnExists": False,
            "bookidExists": False,
            "titleExists": False,  
        }
        return jsonify(data)

@app.route("/deleteBook/<int:bookid>", methods=["DELETE"])
def bookdelete(bookid):
    book=Book.query.filter_by(bookid=bookid).first()
    book.isDeleted=1
    db.session.commit()
    return jsonify({"bookDeleted":True})


@app.route('/getExpiredBooks',methods=["GET"])
def expiredBooks():
    books=[]
    flag=0
    date=datetime.now()
    records=db.session.query(Issuerecord.bookid).distinct().all()
    for record in records:
        bookid=record.bookid
        issue=Issuerecord.query.filter_by(bookid=bookid).order_by(desc(Issuerecord.issuedate)).first()
        book=Book.query.filter_by(bookid=bookid).first()
        if ((int((date-datetime.strptime(issue.issuedate,'%Y-%m-%d %H:%M:%S.%f')).total_seconds())>5*365) and book):
            flag=1
            books.append({
                "bookid":book.bookid,
                "booknumber":book.booknumber,
                "title":book.title,
                "author":book.author,
                "isbn":book.isbn,
                "published_date":book.published_date,
                "image_url":book.image_url,
                "small_image_url":book.small_image_url,
                "no_of_copies":book.no_of_copies,
                "racknumber":book.racknumber,
                "isDeleted":book.isDeleted
            })
    if(flag==1):
        data={
            "booksFound":True,
            "booksExpired":books
        }
        return jsonify(data)
    else:
        return jsonify({"booksFound":False})

