import sqlite3
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from login import router as login_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    conn = sqlite3.connect("app.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama_depan TEXT,
        nama_belakang TEXT,
        email TEXT UNIQUE,
        password TEXT,
        kelas TEXT
    )
    """)
    conn.commit()
    conn.close()

init_db()

class UserRegister(BaseModel):
    nama_depan: str
    nama_belakang: str
    email: EmailStr
    password: str
    kelas: str = "Pelajar"

@app.post("/register")
async def register_user(user: UserRegister):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    if cursor.fetchone():
        conn.close()
        return {"status": "gagal", "pesan": "Email sudah digunakan!"}

    cursor.execute("""
        INSERT INTO users (nama_depan, nama_belakang, email, password, kelas)
        VALUES (?, ?, ?, ?, ?)
    """, (user.nama_depan, user.nama_belakang, user.email, user.password, user.kelas))

    conn.commit()
    conn.close()

    return {
        "status": "sukses",
        "pesan": f"Halo {user.nama_depan}, pendaftaran berhasil!"
    }

app.include_router(login_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)