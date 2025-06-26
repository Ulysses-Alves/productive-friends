from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('index.html')

@app.route('/home', methods=['POST'])
def home():
    userStyle = request.form.get('userStyle')
    return render_template('index.html', userStyle=userStyle)