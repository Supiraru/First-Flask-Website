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
    return render_template('Login.html')
    

if __name__ == '__main__':
    root.run(debug = True)