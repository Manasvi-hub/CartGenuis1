import pandas as pd

# Load original data
# Adjust path if different on Vercel or locally
original_path = "C:/Users/Manoj/.gemini/antigravity/scratch/data.csv"
output_path = "api/cleaned_data.csv"

print(f"Loading data from {original_path}...")
df = pd.read_csv(original_path, encoding='unicode_escape')

print("Cleaning data...")
# Remove duplicates (important)
df = df.drop_duplicates(subset=['Description'])

# Fill missing text (safety)
df['Description'] = df['Description'].fillna('')

# Convert to lowercase
df['Description'] = df['Description'].str.lower()

# Keep only necessary columns for the recommendation engine
# Description is the primary one used in model.py
df = df[['Description', 'StockCode', 'UnitPrice', 'Country']]

print(f"Saving cleaned data to {output_path}...")
df.to_csv(output_path, index=False)
print("Done!")
