# 🌍 NASA EPIC Image Explorer

A full-stack web app that fetches and displays real-time **Earth imagery** captured by NASA’s **EPIC (Earth Polychromatic Imaging Camera)** onboard the **DSCOVR spacecraft**, positioned at the Earth–Sun Lagrange Point.

![Preview](https://user-images.githubusercontent.com/00000000/preview.png) <!-- optional screenshot -->

---

##  Features

- Browse NASA’s **EPIC “Blue Marble” images** by selecting a date    
- View one image at a time with **carousel navigation**  

---

## Tech Stack

**Frontend**
- React  
- TailwindCSS  
- Axios  

**Backend**
- FastAPI  
- Python   

---

## ⚙️ Setup Instructions

### 1 Clone this repository
```
git clone https://github.com/YOUR-USERNAME/NASA-Image-Explorer.git
cd NASA-Image-Explorer
```

### 2 Backend setup
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
### 3 Frontend setup
```
cd frontend
npm install
npm run start
```



