from flask import Flask, request, jsonify
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)


app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)

default_message = "Hello, this is a Flask app running on Gunicorn inside Docker! this text change was deployed automatically!"

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": default_message})

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=8080)