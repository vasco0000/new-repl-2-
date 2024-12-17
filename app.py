from flask import Flask, render_template
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = "love_letter_secret_key"

@app.route('/')
def index():
    return render_template('index.html')
