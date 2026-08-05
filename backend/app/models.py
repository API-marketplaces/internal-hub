from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.database import Base


class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    tags = Column(Text, nullable=False)  # JSON array stored as string
    type = Column(String(50), nullable=False)
    category = Column(String(100), nullable=False)
    classification = Column(String(20), nullable=False)
    kind = Column(String(50), nullable=False)
    size = Column(String(20), nullable=False)
    uploaded_by = Column(String(100), nullable=False)
    uploaded_at = Column(String(20), nullable=False)
    downloads = Column(Integer, default=0)
    teams_url = Column(String(500), nullable=True)
    status = Column(String(50), default="Published")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
