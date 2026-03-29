import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load cleaned data
df = pd.read_csv("cleaned_data.csv")

# Remove duplicates (important)
df = df.drop_duplicates(subset=['Description'])

# Fill missing text (safety)
df['Description'] = df['Description'].fillna('')

# Convert to lowercase
df['Description'] = df['Description'].str.lower()

# TF-IDF
tfidf = TfidfVectorizer(stop_words='english')
matrix = tfidf.fit_transform(df['Description'])

# Cosine similarity
similarity = cosine_similarity(matrix)

# Recommendation function
def recommend(product_name):
    product_name = product_name.lower()

    if product_name not in df['Description'].values:
        return ["Product not found"]

    index = df[df['Description'] == product_name].index[0]
    distances = list(enumerate(similarity[index]))

    sorted_distances = sorted(distances, key=lambda x: x[1], reverse=True)

    recommended = []
    for i in sorted_distances[1:6]:
        recommended.append(df.iloc[i[0]].Description)

    return recommended

from model import recommend

print(recommend("white hanging heart t-light holder"))