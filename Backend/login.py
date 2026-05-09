from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import UserDB, get_db
from datetime import date
from utils import simpan_aktivitas
import bcrypt

router = APIRouter()

class LoginSchema(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login_user(user: LoginSchema, db: Session = Depends(get_db)):
    user_in_db = db.query(UserDB).filter(UserDB.email == user.email).first()

    if not user_in_db:
        raise HTTPException(status_code=401, detail="Email atau password salah!")

    password_cocok = bcrypt.checkpw(
        user.password.encode('utf-8'),
        user_in_db.password.encode('utf-8')
    )
    if not password_cocok:
        raise HTTPException(status_code=401, detail="Email atau password salah!")

    today = str(date.today())
    xp_bonus = 0

    if user_in_db.last_login != today:
        from datetime import datetime, timedelta
        yesterday = str(date.today() - timedelta(days=1))

        if user_in_db.last_login == yesterday:
            user_in_db.streak += 1      
        else:
            user_in_db.streak = 1       

        user_in_db.xp += 10             
        xp_bonus = 10
        user_in_db.last_login = today

        
        user_in_db.level = max(1, user_in_db.xp // 200 + 1)

        db.commit()
        db.refresh(user_in_db)

        simpan_aktivitas(
            db, user_in_db.email,
            "🔥", f"Login hari ke-{user_in_db.streak} berturut-turut",
            "+10 XP"
        )

    return {
        "status": "sukses",
        "pesan": f"Selamat datang kembali, {user_in_db.nama_depan}!",
        "xp_bonus": xp_bonus,
        "data": {
            "nama": f"{user_in_db.nama_depan} {user_in_db.nama_belakang}",
            "email": user_in_db.email,
            "kelas": user_in_db.tingkatan_kelas,
            "xp": user_in_db.xp,
            "level": user_in_db.level,
            "streak": user_in_db.streak,
            "progress_ipa": user_in_db.progress_ipa,
            "progress_b_indonesia": user_in_db.progress_b_indonesia,
            "progress_b_inggris": user_in_db.progress_b_inggris,
        }
    }