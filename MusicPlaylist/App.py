
from flask import Flask, jsonify, render_template
import webbrowser
import threading
from flask_cors import CORS
from pathlib import Path
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("Music.html")  # just HTML now

@app.route("/get_songs")
def get_songs():
    my_dict = {}
    folder = "static/Playlist"  # relative to app.py
    files = os.listdir(folder)

    for i in range(len(files)):
        my_dict[i] = {
            "Name": Path(files[i]).stem,
            "SongID": "static/Playlist/" + files[i]
        }

    return jsonify(my_dict)  # return JSON

def open_browser():
    webbrowser.open("http://127.0.0.1:5000/")

if __name__ == "__main__":
    threading.Timer(1, open_browser).start()

    app.run(debug=True)
