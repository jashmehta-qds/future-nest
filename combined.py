import pandas as pd
import geocoder
from tqdm import tqdm

API_KEY = 'Add_Geocode_API_key'

# 2️⃣ Function to fetch ZIP using Google Maps API
def get_zip_google(lat, lon):
    try:
        g = geocoder.google([lat, lon], method='reverse', key=API_KEY)
        return g.postal
    except:
        return None

# Load the wildfire dataset
df = pd.read_csv('datasets/FW_Veg_Rem_Combined.csv')

us_df = df[df['state'] == 'NY'].copy()

us_df.to_csv('NY_wildfire.csv', index=False)

# Load the crime dataset
df = pd.read_csv('datasets/homicide-data.csv', encoding='latin-1')
 
us_df = df[df['city'] == 'New York'].copy()

us_df.to_csv('ny_crime.csv', index=False)

# 3️⃣ Load extracted datasets
wildfire_df = pd.read_csv('datasets/NY_wildfire.csv')
crime_df = pd.read_csv('datasets/ny_crime.csv', encoding='latin1')


# 4️⃣ Clean and sample data to reduce API calls (optional for testing)
wildfire_df = wildfire_df.dropna(subset=['latitude', 'longitude'])
crime_df = crime_df.dropna(subset=['lat', 'lon'])

# 6️⃣ Add ZIP column
wildfire_df['ZIP'] = None
crime_df['ZIP'] = None

# 7️⃣ Apply reverse geocoding
tqdm.pandas()

print("⏳ Processing Wildfire Dataset...")
wildfire_df['ZIP'] = wildfire_df.progress_apply(
    lambda row: get_zip_google(row['latitude'], row['longitude']), axis=1
)

print("⏳ Processing Crime Dataset...")
crime_df['ZIP'] = crime_df.progress_apply(
    lambda row: get_zip_google(row['lat'], row['lon']), axis=1
)

# 8️⃣ Save enriched data
wildfire_df.to_csv('wildfire_with_zip.csv', index=False)
crime_df.to_csv('crime_with_zip.csv', index=False)


print("✅ ZIP codes added and saved to weather_with_zip.csv and wildfire_with_zip.csv")

# Load your CSV file to sort by ZIP code
df = pd.read_csv('new_data/crime_with_zip.csv') 
df1 = pd.read_csv('new_data/wildfire_with_zip.csv')

df['ZIP'] = pd.to_numeric(df['ZIP'], errors='coerce')
df_sorted = df.sort_values(by='ZIP')

df1['ZIP'] = pd.to_numeric(df['ZIP'], errors='coerce')
df_sorted1 = df.sort_values(by='ZIP')

df_sorted.to_csv('new_data/wildfire_sorted_by_zip.csv', index=False)
df_sorted1.to_csv('new_data/crime_sorted_by_zip.csv', index=False)
