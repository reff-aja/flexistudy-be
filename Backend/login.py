from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class DataUser(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login_user(user: DataUser):
    # Simulasi cek data (Nanti di sini tempat cek ke Database)
    print(f"Ada yang mencoba login: {user.email}")
    
    if user.email == "admin@email.com" and user.password == "123456":
        return {"status": "sukses", "pesan": "Selamat datang kembali!"}
    
    return {"status": "gagal", "pesan": "Email atau password salah!"}

# Jalankan dengan perintah: uvicorn main:app --reload