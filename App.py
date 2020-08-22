from flask import Flask, render_template


root = Flask(__name__,static_url_path='/static')

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

if __name__ == '__main__':
    root.run(debug = True)