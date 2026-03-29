from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from model import recommend

app = Flask(__name__)
CORS(app)

# Helper to load products for the /products route
def load_products():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(current_dir, "cleaned_data.csv")
    if os.path.exists(csv_path):
        import pandas as pd
        df = pd.read_csv(csv_path)
        # Return first 20 products as a sample
        return df.head(20).to_dict(orient='records')
    return []

@app.route('/api/products', methods=['GET'])
def get_products():
    products = load_products()
    return jsonify(products)

@app.route('/api/recommend', methods=['GET'])
def get_recommendations_v1():
    product = request.args.get('product')
    if not product:
        return jsonify({"error": "No product provided"}), 400
    result = recommend(product)
    return jsonify(result)

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations_v2():
    # Frontend uses this route with productId
    product_id = request.args.get('productId')
    # Since our model uses names, we'll just return a few products for now
    # In a real app, we'd map ID -> Name
    products = load_products()
    return jsonify(products[:4])

@app.route('/api/activity', methods=['POST'])
def track_activity():
    data = request.json
    print(f"Tracking activity: {data}")
    return jsonify({"status": "success"})

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "version": "1.0.1"})

# Export for Vercel
app = app
