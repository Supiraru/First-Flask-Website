from flask import Flask, render_template, request
from dictionary import dictionary
import mysql.connector

root = Flask(__name__,static_url_path='/static')
root.config['DB_USER'] = 'Aan'
root.config['DB_PASSWORD'] = 'Abc123de45'
root.config['DB_NAME'] = 'testdata'
root.config['DB_HOST'] = 'localhost'

conn = cursor = None

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
    return render_template('home.html')

@root.route('/about')
def about():
    return render_template('about.html')

@root.route('/project')
def project():
    return render_template('project.html')

@root.route('/project/Snakes')
def Snakes():
    return render_template('snakes.html')

@root.route('/project/TicTacToe')
def TicTacToe():
    return render_template('TicTacToe.html')

@root.route('/project/Brick')
def Brick():
    return render_template('Brick.html')

@root.route('/project/HexOctBinDec')
def HexOctBinDec():
    return render_template('HexOctBinDec.html')

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
        return render_template('DictResult.html', UserInput=UserInput, Meaning=Meaning)
    return render_template('Dictionary.html')

@root.route('/login',  methods = ['GET', 'POST'])
def login():
    if request.method == "POST":
        UsernameInput = request.form['Username']
        openDb()
        cursor.execute("SELECT * FROM Account")
        for x in cursor:
            if x[1] == UsernameInput:
                Name = x[2]
                closeDb()
                return render_template('SuccesfulLogin.html', Name = Name)
        return render_template('Login.html', info = "Wrong Username")
    return render_template('Login.html')

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
        return render_template('home.html')
    return render_template('register.html')
    

if __name__ == '__main__':
    root.run(debug = True)