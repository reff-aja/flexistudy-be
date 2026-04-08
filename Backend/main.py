from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from login import router as login_router

app = FastAPI()

# --- KONFIGURASI CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)

# --- MODEL DATA ---
class UserRegister(BaseModel):
    nama_depan: str
    nama_belakang: str
    email: EmailStr
    password: str

# Database simulasi (dalam RAM)
# Di dunia nyata, ini diganti dengan database seperti PostgreSQL atau MySQL
db_users = []

@app.post("/register")
async def register_user(user: UserRegister):
    # 1. Cek apakah email sudah terdaftar
    for existing_user in db_users:
        if existing_user["email"] == user.email:
            return {
                "status": "gagal",
                "pesan": "Email sudah digunakan!"
            }

    # 2. Simpan user baru (Simulasi)
    # Catatan: Di aplikasi nyata, JANGAN PERNAH simpan password dalam bentuk teks biasa.
    # Gunakan library seperti passlib untuk hashing.
    new_user = {
        "nama_depan": user.nama_depan,
        "nama_belakang": user.nama_belakang,
        "email": user.email,
        "password": user.password  # Harusnya di-hash
    }
    db_users.append(new_user)

    # 3. Kirim respon sukses sesuai ekspektasi frontend kamu
    return {
        "status": "sukses",
        "pesan": f"Halo {user.nama_depan}, pendaftaran berhasil!"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)