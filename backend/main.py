from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/images")
def get_epic_images(
    date: str = Query(..., description="Date in YYYY-MM-DD format"),
    collection: str = Query("natural", description="EPIC collection type: natural, enhanced, cloud, or aerosol")
):
    """
    Fetch EPIC images from NASA's v2.0 API (https://epic.gsfc.nasa.gov/api)
    """
    # Example: https://epic.gsfc.nasa.gov/api/natural/date/2019-05-30
    url = f"https://epic.gsfc.nasa.gov/api/{collection}/date/{date}"
    res = requests.get(url)

    if res.status_code != 200:
        return {"error": f"NASA EPIC API returned {res.status_code}", "url": url}

    data = res.json()
    if not data:
        return {"count": 0, "images": [], "url": url}

    # Build proper image URLs
    images = []
    year, month, day = date.split("-")

    for item in data:
        image_name = item["image"]
        caption = item.get("caption", "No caption available")
        image_url = f"https://epic.gsfc.nasa.gov/archive/{collection}/{year}/{month}/{day}/png/{image_name}.png"

        images.append({
            "caption": caption,
            "date": item.get("date"),
            "url": image_url,
            "coords": item.get("centroid_coordinates", {})
        })

    return {"count": len(images), "images": images, "source": url}
