from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    nama_depan = Column(String)
    nama_belakang = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    tingkatan_kelas = Column(String)
    
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak = Column(Integer, default=0)
    last_login = Column(String, default="")        
    progress_ipa = Column(Float, default=0)
    progress_b_indonesia = Column(Float, default=0)
    progress_b_inggris = Column(Float, default=0)

class ActivityDB(Base):
    __tablename__ = "activities"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    emoji = Column(String)
    text = Column(String)
    xp = Column(String)
    created_at = Column(DateTime, default=datetime.now)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()