from datetime import datetime,timedelta
import random
from api import db

class User(db.Model):
    name = db.Column(db.String(50),nullable=False,unique=False)
    roll = db.Column(db.String(10), nullable=False, unique=True)
    designation = db.Column(db.String(15), nullable=False, unique=False)
    email=db.Column(db.String(100),unique=True,nullable=False)
    phone=db.Column(db.Integer,unique=True,nullable=False)
    username=db.Column(db.String(20),unique=True,primary_key=True)
    password=db.Column(db.String(30),nullable=False)
    booksissued=db.Column(db.Integer,nullable=False)


    def __init__(self,name, roll, email,phone, username,password,designation,booksissued):
        self.name = name
        self.roll = roll
        self.email = email
        self.phone = phone
        self.username = username
        self.password=password
        self.designation=designation
        self.booksissued=booksissued


class Book(db.Model):
    booknumber=db.Column(db.Integer)
    bookid=db.Column(db.Integer,primary_key=True)
    isbn=db.Column(db.Integer,nullable=False)
    author=db.Column(db.String(80),nullable=False)
    published_date=db.Column(db.String(),nullable=False)
    title=db.Column(db.String(100),nullable=False,unique=True)
    image_url=db.Column(db.String(),nullable=False)
    small_image_url=db.Column(db.String(),nullable=False)
    no_of_copies=db.Column(db.Integer,nullable=False)
    racknumber=db.Column(db.Integer,nullable=False)
    isDeleted=db.Column(db.Integer)


    def __init__(self,booknumber,bookid,isbn,author,published_date,title,image_url,small_image_url,no_of_copies,racknumber,isDeleted=0):
        self.booknumber=booknumber
        self.bookid=bookid
        self.isbn=isbn
        self.author=author
        self.published_date=published_date
        self.title=title
        self.image_url=image_url
        self.small_image_url=small_image_url
        self.no_of_copies=no_of_copies
        self.racknumber=racknumber
        self.isDeleted=isDeleted

class Issuerecord(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    bookid=db.Column(db.Integer,db.ForeignKey('book.bookid'),nullable=False)
    issuedto=db.Column(db.String(),db.ForeignKey('user.username'),nullable=False)
    issuedate=db.Column(db.String(),nullable=False)
    expectedreturn=db.Column(db.String(),nullable=False)
    returned=db.Column(db.Integer,default=0,nullable=False)
    returndate=db.Column(db.String())
    isPrinted=db.Column(db.Integer)


    def __init__(self,id,bookid,issuedto,issuedate,expectedreturn,returned,returndate="",isPrinted=0):
        self.id=id
        self.bookid=bookid
        self.issuedto=issuedto
        self.issuedate=issuedate
        self.expectedreturn=expectedreturn
        self.returned=returned
        self.returndate=returndate
        self.isPrinted=isPrinted

    def isOverdue(self):
        now = datetime.now()
        expectedreturn = datetime.strptime(self.expectedreturn, '%Y-%m-%d %H:%M:%S.%f')
        issuedate = datetime.strptime(self.issuedate, '%Y-%m-%d %H:%M:%S.%f')
        return ((expectedreturn-issuedate).days<int((now-issuedate).total_seconds()))
    
    def overdueDuration(self):
        if(self.isOverdue()):
            now = datetime.now()
            expectedreturn = datetime.strptime(self.expectedreturn, '%Y-%m-%d %H:%M:%S.%f')
            issuedate = datetime.strptime(self.issuedate, '%Y-%m-%d %H:%M:%S.%f')
            expectedreturn_in_seconds=(expectedreturn-issuedate).days
            return int(((now-(issuedate+timedelta(seconds=expectedreturn_in_seconds))).total_seconds()))
        else:
            return 0

    def penalty(self):
        overdueDuration=self.overdueDuration()
        penalty=0
        if(overdueDuration):
            for i in range(1,overdueDuration,7):
                penalty+=(50*(int(i/7)+1))
        return penalty

class Reserverecord(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    bookid=db.Column(db.Integer,nullable=False)
    username=db.Column(db.String(80),nullable=False)
    returndate=db.Column(db.String(),nullable=False,default="NULL")
    isavailable=db.Column(db.Integer,default=0)

    def __init__(self,id,bookid,username,returndate="NULL",isavailable=0):
        self.id=id
        self.bookid=bookid
        self.username=username
        self.returndate=returndate
        self.isavailable=isavailable
