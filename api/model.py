import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Standard Vercel file path resolution
current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, "cleaned_data.csv")

# Load cleaned data
if os.path.exists(csv_path):
    df = pd.read_csv(csv_path)
else:
    # Fallback to empty df if missing (should not happen in prod)
    df = pd.DataFrame(columns=['Description', 'StockCode', 'UnitPrice', 'Country'])

# Remove duplicates (important)
df = df.drop_duplicates(subset=['Description']) if not df.empty else df

# Fill missing text (safety)
if not df.empty:
    df['Description'] = df['Description'].fillna('')
    df['Description'] = df['Description'].str.lower()

# TF-IDF Setup
# Performance: Only run this once on start
if not df.empty and len(df) > 0:
    tfidf = TfidfVectorizer(stop_words='english')
    matrix = tfidf.fit_transform(df['Description'])
    # Cosine similarity matrix can be memory heavy for large datasets
    # But for unique products it should fit in Vercel's RAM
    similarity = cosine_similarity(matrix)
else:
    similarity = None

# Recommendation function
def recommend(product_name):
    if df.empty or similarity is None:
        return ["Recommender system initializing..."]

    product_name = product_name.lower()

    if product_name not in df['Description'].values:
        # Fallback to simple matching if exact match not found
        matches = df[df['Description'].str.contains(product_name, na=False)]
        if not matches.empty:
            index = matches.index[0]
        else:
            return ["Product not found"]
    else:
        index = df[df['Description'] == product_name].index[0]
    
    # Simple recommendation based on similarity scores
    try:
        distances = list(enumerate(similarity[index]))
        sorted_distances = sorted(distances, key=lambda x: x[1], reverse=True)
        
        recommended = []
        for i in sorted_distances[1:6]:
            recommended.append(df.iloc[i[0]].Description)
        return recommended
    except Exception as e:
        return [f"Recommendation error: {str(e)}"]
