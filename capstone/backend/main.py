from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# PENTING: Supaya React (port 5173/3000) bisa akses FastAPI (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Di produksi nanti, ganti "*" dengan URL React kamu
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kita tentukan data apa saja yang wajib dikirim dari React
class DataUser(BaseModel):
    email: str
    password: str

@app.post("/login")
async def login_user(user: DataUser):
    # Simulasi cek data (Nanti di sini tempat cek ke Database)
    print(f"Ada yang mencoba login: {user.email}")
    
    if user.email == "admin@email.com" and user.password == "123456":
        return {"status": "sukses", "pesan": "Selamat datang kembali!"}
    
    return {"status": "gagal", "pesan": "Email atau password salah!"}

# Jalankan dengan perintah: uvicorn main:app --reload