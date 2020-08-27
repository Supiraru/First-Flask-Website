from flask import Flask, render_template, request, redirect, url_for , session
from dictionary import dictionary
import mysql.connector
from smtplib import SMTP
from random import randint
from datetime import timedelta, datetime



root = Flask(__name__,static_url_path='/static')
root.secret_key = "Test"
root.permanent_session_lifetime = timedelta(hours=2)

#Database
root.config['DB_USER'] = 'Aan'
root.config['DB_PASSWORD'] = 'Abc123de45'
root.config['DB_NAME'] = 'testdata'
root.config['DB_HOST'] = 'localhost'

conn = cursor = x = VerifCode = None

def sessionCheck():
    if "Username" in session:
        return True
    else:
        return False

def RandCode():
    VerificationCode = randint(1000,10000)
    message = "Are you trying to login? This is your verification code for Aan Website : \n" + str(VerificationCode) + "\n BEWARE, DONT TELL ANYONE THIS VERIFICATION CODE"
    return VerificationCode, message

def sendMail(receiver, VerifMessage):
    server = SMTP("smtp.gmail.com", 587)
    server.ehlo()
    server.starttls()
    server.login("Supiraru11@gmail.com", "Programmer1234")
    server.sendmail("Supiraru11@gmail.com", receiver, VerifMessage)
    server.quit()

def openDb():
    global conn, cursor
    conn = mysql.connector.connect(
        user = root.config['DB_USER'],
        password = root.config['DB_PASSWORD'],
        database = root.config['DB_NAME'],
        host = root.config['DB_HOST']
    )
    cursor = conn.cursor()

def closeDb():
    global conn, cursor
    cursor.close()
    conn.close()


@root.route('/')
def home():
    return render_template('home.html', Sessioncheck = sessionCheck())

@root.route('/about')
def about():
    return render_template('about.html', Sessioncheck = sessionCheck())

@root.route('/project')
def project():
    return render_template('project.html', Sessioncheck = sessionCheck())

@root.route('/project/Snakes')
def Snakes():
    return render_template('snakes.html', Sessioncheck = sessionCheck())

@root.route('/project/TicTacToe')
def TicTacToe():
    return render_template('TicTacToe.html', Sessioncheck = sessionCheck())

@root.route('/project/Brick')
def Brick():
    return render_template('Brick.html', Sessioncheck = sessionCheck())

@root.route('/project/HexOctBinDec')
def HexOctBinDec():
    return render_template('HexOctBinDec.html', Sessioncheck = sessionCheck())

@root.route('/project/Testing', methods = ['GET', 'POST'])
def TestPage():
    if request.method == "POST":
        FrontName = request.form['FN']
        LastName = request.form['LN']
        Name = FrontName + " " + LastName
        return render_template('TestResult.html', Name=Name)
    return render_template('Test.html')

@root.route('/project/dictionary', methods = ['GET', 'POST'])
def dictFunc():
    if request.method == "POST":
        UserInput = request.form['UserInput']
        Meaning = dictionary(UserInput)
        return render_template('DictResult.html', UserInput=UserInput, Meaning=Meaning, Sessioncheck = sessionCheck())
    return render_template('Dictionary.html', Sessioncheck = sessionCheck())

@root.route('/login',  methods = ['GET', 'POST'])
def login():
    global x, VerifCode
    if request.method == "POST":
        UsernameInput = request.form['Username']
        openDb()
        cursor.execute("SELECT * FROM Account")
        for x in cursor:
            if x[1] == UsernameInput:
                VerifCode, message = RandCode()
                sendMail(x[3], message)
                return redirect(url_for('verification', Sessioncheck = sessionCheck()))
        return render_template('Login.html', info = "Wrong Username", Sessioncheck = sessionCheck())
    return render_template('Login.html', Sessioncheck = sessionCheck())

@root.route('/register',  methods = ['GET', 'POST'])
def register():
    if request.method == "POST":
        UsernameInput = request.form['Username']
        EmailInput = request.form['Email']
        NameInput = request.form['Name']
        openDb()
        cursor.execute("INSERT INTO Account (Username, Name, Email) VALUES (%s, %s, %s)", (UsernameInput, NameInput, EmailInput))
        conn.commit()
        closeDb()
        return redirect(url_for("home"))
    return render_template('register.html', Sessioncheck = sessionCheck())

@root.route('/verification', methods = ['GET', 'POST'])
def verification():
    if request.method == "POST":
        verifInput = request.form['Verification']
        if verifInput == str(VerifCode):
            session["Username"] = x[1]
            return render_template('SuccesfulLogin.html', Name = x[2],  Sessioncheck = sessionCheck())
        return render_template('Verification.html', info = "Wrong Verification code", Sessioncheck = sessionCheck())
    return render_template('Verification.html', Sessioncheck = sessionCheck())

@root.route('/logout')
def logout():
    if sessionCheck():
        session.pop("Username", None)
        return redirect(url_for("home", Sessioncheck = sessionCheck()))
    else:
        return redirect(url_for("login"))

@root.route('/article')
def article():
    database = []

    openDb()
    cursor.execute("SELECT AccId,Title FROM Article ")
    for i in cursor:
        database.append(i)
    return render_template('article.html', Sessioncheck = sessionCheck(), database = database)

@root.route('/article/create', methods = ['GET', 'POST'])
def MakeArticle():
    if sessionCheck():
        if request.method == "POST":
            Title = request.form['Title']
            Content = request.form['Content']
            if Title == "" or Content == "":
                msg = "Please fill all the required field"
                return render_template('MakeArticle.html', Sessioncheck = sessionCheck(), msg = msg)
            else :
                openDb()
                cursor.execute("INSERT INTO Article (Username, datetime, Title, Content) VALUES (%s, %s, %s, %s)", (session["Username"], datetime.now(), Title, Content))
                conn.commit()
                closeDb()
                return redirect(url_for("article"), msg = "Article Succesfully created and posted")
        return render_template('MakeArticle.html', Sessioncheck = sessionCheck())
    else:
        return redirect(url_for("login", Sessioncheck = sessionCheck()))

@root.route('/article/<string:id>')
def ArticleContent(id):
    openDb()
    cursor.execute("SELECT * FROM Article WHERE AccId = %s",[id])
    Article = cursor.fetchone()
    return render_template('ArticleTemplate.html', Sessioncheck = sessionCheck(),Article = Article)


if __name__ == '__main__':
    root.run(debug = True)