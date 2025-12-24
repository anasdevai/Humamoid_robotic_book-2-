import requests
from bs4 import BeautifulSoup

url = "https://humamoid-robotic-book-2-eyem-c8ket75kc.vercel.app/"
try:
    resp = requests.get(url)
    print(f"Status: {resp.status_code}")
    print(f"Headers: {resp.headers}")
    soup = BeautifulSoup(resp.content, "html.parser")
    print(f"Title: {soup.title.string if soup.title else 'No Title'}")
    print("Body preview:")
    print(soup.body.get_text()[:500] if soup.body else "No Body")
    
    links = soup.find_all('a')
    print(f"Total links: {len(links)}")
except Exception as e:
    print(f"Error: {e}")
