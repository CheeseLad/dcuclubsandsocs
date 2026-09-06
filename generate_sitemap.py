import json
import requests
from xml.etree.ElementTree import Element, SubElement, ElementTree, indent
from datetime import datetime, timezone

BASE_URL = "https://dcuclubsandsocs.jakefarrell.ie"
API_URL = "https://api.hellorubric.com/"

OUTPUT_FILE = "./public/sitemap.xml"


def get_societies():
    details_payload = {
        "firstCall": True,
        "sortType": "itemName",
        "desiredType": "societies",
        "state": "Leinster",
        "country": "IE",
        "universityid": 541,
        "limit": 1000,
        "offset": 0,
        "sortDirection": "asc",
        "searchQuery": "",
        "eventsPeriodFilter": "All",
        "domain": "dcustudentlife.hellorubric.com",
        "currentUrl": (
            "https://dcustudentlife.hellorubric.com/"
            "search?type=societies&country=IE&state=Leinster&universityid=541"
        ),
        "device": "web_portal",
        "version": 4,
        "timestamp": int(datetime.now().timestamp() * 1000),
    }

    form_data = {
        "endpoint": "getUnifiedSearch",
        "details": json.dumps(details_payload),
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0",
    }

    response = requests.post(
        API_URL,
        data=form_data,
        headers=headers,
        timeout=30,
    )

    response.raise_for_status()

    data = response.json()

    return data.get("results", [])


def generate_sitemap(societies):
    urlset = Element(
        "urlset",
        {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"},
    )

    lastmod = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    static_pages = [
        "/",
        "/societies",
    ]

    for path in static_pages:
        url = SubElement(urlset, "url")

        loc = SubElement(url, "loc")
        loc.text = BASE_URL + path

        modified = SubElement(url, "lastmod")
        modified.text = lastmod

        priority = SubElement(url, "priority")
        priority.text = "1.0" if path == "/" else "0.8"

    for society in societies:
        society_id = society.get("societyid")

        if not society_id:
            continue

        url = SubElement(urlset, "url")

        loc = SubElement(url, "loc")
        loc.text = f"{BASE_URL}/society/{society_id}"

        modified = SubElement(url, "lastmod")
        modified.text = lastmod

        priority = SubElement(url, "priority")
        priority.text = "0.6"

    indent(urlset, space="  ")

    tree = ElementTree(urlset)
    tree.write(
        OUTPUT_FILE,
        encoding="utf-8",
        xml_declaration=True,
    )


if __name__ == "__main__":
    print("Fetching societies...")

    societies = get_societies()

    print(f"Found {len(societies)} societies.")

    generate_sitemap(societies)

    print(f"Sitemap generated: {OUTPUT_FILE}")
    print(f"URLs generated: {len(societies) + 2}")
