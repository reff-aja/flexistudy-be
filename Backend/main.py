from fastapi import FastAPI, Depends, Header
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware  # Import sekali saja
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from utils import simpan_aktivitas
import bcrypt

from database import engine, Base, UserDB, ActivityDB, get_db
from login import router as login_router

# Inisialisasi Tabel
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hubungkan route login
app.include_router(login_router)

# Setup Hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRegister(BaseModel):
    nama_depan: str
    nama_belakang: str
    email: EmailStr
    password: str
    tingkatan_kelas: str

class ProgressUpdate(BaseModel):
    email: str
    subject: str   # "ipa" | "b_indonesia" | "b_inggris"
    nilai: float   # 0-100


@app.post("/register")
async def register_user(user: UserRegister, db: Session = Depends(get_db)):
    # Cek email double
    existing_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    if existing_user:
        return {"status": "gagal", "pesan": "Email sudah terdaftar!"}
    
    # Hash password
    hashed_pass = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    new_user = UserDB(
        nama_depan=user.nama_depan,
        nama_belakang=user.nama_belakang,
        email=user.email,
        password=hashed_pass,
        tingkatan_kelas=user.tingkatan_kelas  
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"status": "sukses", "pesan": f"Halo {user.nama_depan}, pendaftaran berhasil!"}

@app.post("/progress")
async def update_progress(data: ProgressUpdate, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.email == data.email).first()
    if not user:
        return {"status": "gagal", "pesan": "User tidak ditemukan"}

    # Update progress subject yang sesuai
    if data.subject == "ipa":
        user.progress_ipa = data.nilai
    elif data.subject == "b_indonesia":
        user.progress_b_indonesia = data.nilai
    elif data.subject == "b_inggris":
        user.progress_b_inggris = data.nilai

    # +15 XP setiap buka materi (kalau belum dapat hari ini)
    user.xp += 15
    user.level = max(1, user.xp // 200 + 1)

    db.commit()
    db.refresh(user)

    subject_nama = {"ipa": "IPA", "b_indonesia": "Bahasa Indonesia", "b_inggris": "Bahasa Inggris"}
    nama = subject_nama.get(data.subject, data.subject)

    simpan_aktivitas(
        db, data.email,
        "📖", f"Membuka materi {nama}",
        "+15 XP"
    )

    return {
        "status": "sukses",
        "xp": user.xp,
        "level": user.level,
        "progress_ipa": user.progress_ipa,
        "progress_b_indonesia": user.progress_b_indonesia,
        "progress_b_inggris": user.progress_b_inggris,
    }

@app.get("/user/{email}")
async def get_user(email: str, db: Session = Depends(get_db)):
    user = db.query(UserDB).filter(UserDB.email == email).first()
    if not user:
        return {"status": "gagal"}
    return {
        "status": "sukses",
        "data": {
            "nama": f"{user.nama_depan} {user.nama_belakang}",
            "email": user.email,
            "kelas": user.tingkatan_kelas,
            "xp": user.xp,
            "level": user.level,
            "streak": user.streak,
            "progress_ipa": user.progress_ipa,
            "progress_b_indonesia": user.progress_b_indonesia,
            "progress_b_inggris": user.progress_b_inggris,
        }
    }

@app.get("/aktivitas/{email}")
async def get_aktivitas(email: str, db: Session = Depends(get_db)):
    aktivitas = db.query(ActivityDB)\
        .filter(ActivityDB.email == email)\
        .order_by(ActivityDB.created_at.desc())\
        .limit(10)\
        .all()
    return {
        "status": "sukses",
        "data": [
            {
                "emoji": a.emoji,
                "text": a.text,
                "xp": a.xp,
                "time": a.created_at.strftime("%d %b %Y %H:%M")
            } for a in aktivitas
        ]
    }

@app.get("/")
async def root():
    return {"status": "backend aktif"}

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(app, host="0.0.0.0", port=port)