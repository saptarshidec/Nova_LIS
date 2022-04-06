import json
from venv import create
from api.models import Book,User,Issuerecord,Reserverecord
from api.routes import *
import requests
from api import db
import os,time
from sqlalchemy import desc
if(os.path.exists('./api/site.db')):
    os.remove('./api/site.db')
if(not os.path.exists('./api/site.db')):
    db.create_all()

def create_basic_db():
    librarian={"name":"Librarian","roll":"libr-1","email":"librarian@nova-lis.com","phone":"9059325231","userName":"admin","password":"admin","designation":"N/A"}
    requests.post('http://127.0.0.1:5000/register',json=librarian)
    user1={"name":"Aryan Maji","roll":"20MF3IM20","email":"aryanm@gmail.com","phone":"9059321249","userName":"aryanm","password":"mnayra","designation":"UG Student"}
    requests.post('http://127.0.0.1:5000/register',json=user1)
    user2={"name":"Suman Ghosh","roll":"20ME10042","email":"sumang@gmail.com","phone":"9050221249","userName":"sumang","password":"gnamus","designation":"PG Student"}
    requests.post('http://127.0.0.1:5000/register',json=user2)
    user3={"name":"Rahul Jain","roll":"20EE30014","email":"rahulj@gmail.com","phone":"9059321282","userName":"rahulj","password":"jluhar","designation":"Research Scholar"}
    requests.post('http://127.0.0.1:5000/register',json=user3)
    user4={"name":"Ashish Das","roll":"20CH10019","email":"ashishd@gmail.com","phone":"9059321949","userName":"ashishd","password":"dhsihsa","designation":"Faculty"}
    requests.post('http://127.0.0.1:5000/register',json=user4)

    book1={"isbn":9780439023480,"author":"Suzanne Collins","published_date":"2008","title":"The Hunger Games (The Hunger Games, #1)","image_url":"https://images.gr-assets.com/books/1447303603m/2767052.jpg","small_image_url":"https://images.gr-assets.com/books/1447303603s/2767052.jpg","no_of_copies":3,"racknumber":9,"isDeleted":0}
    requests.post('http://127.0.0.1:5000/registerBook',json=book1)

    book2={"isbn":9780439554930,"author":"J.K. Rowling, Mary GrandPrÃ©","published_date":"1997","title":"Harry Potter and the Sorcerer's Stone (Harry Potter, #1)","image_url":"https://images.gr-assets.com/books/1474154022m/3.jpg","small_image_url":"https://images.gr-assets.com/books/1474154022s/3.jpg","no_of_copies":1,"racknumber":178,"isDeleted":0}
    requests.post('http://127.0.0.1:5000/registerBook',json=book2)

    book3={"isbn":9780316015840,"author":"Stephenie Meyer","published_date":"2005","title":"Twilight (Twilight, #1)","image_url":"https://images.gr-assets.com/books/1361039443m/41865.jpg","small_image_url":"https://images.gr-assets.com/books/1361039443s/41865.jpg","no_of_copies":1,"racknumber":66,"isDeleted":0}
    requests.post('http://127.0.0.1:5000/registerBook',json=book3)

    book4={"isbn":9780061120080,"author":"Harper Lee","published_date":"1960","title":"To Kill a Mockingbird","image_url":"https://images.gr-assets.com/books/1361975680m/2657.jpg","small_image_url":"https://images.gr-assets.com/books/1361975680s/2657.jpg","no_of_copies":4,"racknumber":148,"isDeleted":0}
    requests.post('http://127.0.0.1:5000/registerBook',json=book4)

create_basic_db()

def testregister():
    newuser={"name":"Rohan Joshi","roll":"20CS10012","email":"rohanj@gmail.com","phone":"9134021249","userName":"rohanj","password":"jnahor","designation":"UG Student"}
    res=requests.post('http://127.0.0.1:5000/register',json=newuser)

    expected_output={
        "accepted": True,
        "rollExists": False,
        "emailExists": False,
        "phoneExists": False,
        "usernameExists": False
    }
    assert res.json() == expected_output

def testlogin():
    userlogin1={"userName":"rahulk","password":"jluhar"}
    res=requests.post('http://127.0.0.1:5000/login',json=userlogin1)
    expected_output={
        "isRegistered": False
    }
    assert res.json() == expected_output

    userlogin2={"userName":"rahulj","password":"kluhar"}
    res=requests.post('http://127.0.0.1:5000/login',json=userlogin2)
    expected_output={
        "isRegistered": True,          
        "isPasswordCorrect": False
    }
    assert res.json() == expected_output

    userlogin3={"userName":"rahulj","password":"jluhar"}
    res=requests.post('http://127.0.0.1:5000/login',json=userlogin3)
    expected_output={
        "isRegistered": True,     
        "isPasswordCorrect": True,
    }
    assert (res.json()["isRegistered"] == expected_output["isRegistered"]and res.json()["isPasswordCorrect"] == expected_output["isPasswordCorrect"])

def testissue():
    issue1={"bookid":2,"username":"rahulj"}
    res=requests.post('http://127.0.0.1:5000/issue',json=issue1)
    expected_output = {
        "isIssued": True
    }
    assert (res.json()["isIssued"] == expected_output["isIssued"])

    issue2={"bookid":2,"username":"aryanm"}
    res=requests.post('http://127.0.0.1:5000/issue',json=issue2)
    expected_output = {
        "isIssuedByAnother":False, 
        "canReserve":True
    }
    assert (res.json()["isIssuedByAnother"] == expected_output["isIssuedByAnother"] and res.json()["canReserve"] == expected_output["canReserve"])

def testreserve():
    reserve1={"bookid":2,"username":"aryanm"}
    res=requests.post('http://127.0.0.1:5000/reserve',json=reserve1)
    expected_output = {
        "reserved":True
    }
    assert res.json()==expected_output

    reserve2={"bookid":2,"username":"aryanm"}
    res=requests.post('http://127.0.0.1:5000/reserve',json=reserve2)
    expected_output = {
        "alreadyReserved":True
    }
    assert res.json()==expected_output

def testreminder():
    time.sleep(40)
    res=requests.get('http://127.0.0.1:5000/printReminder/1')
    expected_output = {
        "alreadySent":False
    }
    assert res.json() == expected_output


def testreturn():
    res=requests.get('http://127.0.0.1:5000/return/1')
    expected_output = {
        "returned":True,
        "isOverdue":False
    }
    assert res.json()==expected_output

def test_issuereserved():
    issue1={"bookid":2,"username":"aryanm"}
    res=requests.post('http://127.0.0.1:5000/issue',json=issue1)
    expected_output = {
        "isIssued": True
    }
    assert (res.json()["isIssued"] == expected_output["isIssued"])


def testbrowse():
    res=requests.post('http://127.0.0.1:5000/browse',json={"bookname":"il"})
    expected_output = {
        "foundBook": True
    }
    assert (res.json()["foundBook"] == expected_output["foundBook"])

    res=requests.post('http://127.0.0.1:5000/browse',json={"bookname":"xyz"})
    expected_output = {
        "foundBook": False
    }
    assert (res.json()["foundBook"] == expected_output["foundBook"])


def test_getUsers():
    res=requests.get('http://127.0.0.1:5000/getUsers')
    expected_output = {
        "usersFound": True
    }
    assert (res.json()["usersFound"] == expected_output["usersFound"])

def test_deleteUser():
    res=requests.delete('http://127.0.0.1:5000/deleteUser/sumang')
    expected_output = {
        "userDeleted": True
    }
    assert (res.json() == expected_output)

def test_deleteBook():
    res=requests.delete('http://127.0.0.1:5000/deleteBook/1')
    expected_output = {
        "bookDeleted": True
    }
    assert (res.json() == expected_output)

def test_expiredBooks():
    res=requests.get('http://127.0.0.1:5000/getExpiredBooks')
    expected_output = {
        "booksFound": False
    }
    assert (res.json() == expected_output)



