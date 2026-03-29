from flask import Flask, request, jsonify
from flask_cors import CORS
from model import recommend

app = Flask(__name__)
CORS(app)   # ✅ This line fixes connection issue

@app.route('/')
def home():
    return "API Running 🚀"

@app.route('/recommend', methods=['GET'])
def get_recommendations():
    product = request.args.get('product')

    if not product:
        return jsonify({"error": "No product provided"})

    result = recommend(product)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)