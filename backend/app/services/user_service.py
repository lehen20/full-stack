from sqlalchemy.orm import Session
from sqlalchemy import or_
from passlib.context import CryptContext
from typing import Optional, List
from ..models.user import User
from ..schemas.user import UserCreate, UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserService:
    
    @staticmethod
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
    
    @staticmethod
    def get_user(db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()
    
    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        return db.query(User).offset(skip).limit(limit).all()
    
    @staticmethod
    def create_user(db: Session, user: UserCreate) -> User:
        # Check if user already exists
        existing_user = db.query(User).filter(
            or_(User.email == user.email, User.username == user.username)
        ).first()
        
        if existing_user:
            if existing_user.email == user.email:
                raise ValueError("Email already registered")
            if existing_user.username == user.username:
                raise ValueError("Username already taken")
        
        hashed_password = UserService.get_password_hash(user.password)
        db_user = User(
            email=user.email,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            hashed_password=hashed_password,
            is_active=user.is_active
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def update_user(db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]:
        db_user = db.query(User).filter(User.id == user_id).first()
        if not db_user:
            return None
        
        update_data = user_update.model_dump(exclude_unset=True)
        
        # Check for conflicts if email or username are being updated
        if "email" in update_data:
            existing_user = db.query(User).filter(
                User.email == update_data["email"], 
                User.id != user_id
            ).first()
            if existing_user:
                raise ValueError("Email already registered")
        
        if "username" in update_data:
            existing_user = db.query(User).filter(
                User.username == update_data["username"], 
                User.id != user_id
            ).first()
            if existing_user:
                raise ValueError("Username already taken")
        
        for field, value in update_data.items():
            setattr(db_user, field, value)
        
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def delete_user(db: Session, user_id: int) -> bool:
        db_user = db.query(User).filter(User.id == user_id).first()
        if not db_user:
            return False
        
        db.delete(db_user)
        db.commit()
        return True