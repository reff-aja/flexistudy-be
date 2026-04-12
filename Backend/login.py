from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3

router = APIRouter()

class DataUser(BaseModel):
    email: str
    password: str

def get_db():
    conn = sqlite3.connect("app.db")
    conn.row_factory = sqlite3.Row
    return conn

@router.post("/login")
async def login_user(user: DataUser):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    user_found = cursor.fetchone()
    conn.close()

    if not user_found or user_found["password"] != user.password:
        raise HTTPException(status_code=401, detail="Email atau password salah!")

    return {
        "status": "sukses",
        "pesan": f"Selamat datang {user_found['nama_depan']}!",
        "data": {
            "email": user_found["email"],
            "nama_depan": user_found["nama_depan"],
            "nama_belakang": user_found["nama_belakang"],
            "kelas": user_found["kelas"],
        }
    }