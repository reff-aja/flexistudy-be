# utils.py
from database import ActivityDB

def simpan_aktivitas(db, email, emoji, text, xp):
    aktivitas = ActivityDB(email=email, emoji=emoji, text=text, xp=xp)
    db.add(aktivitas)
    db.commit()