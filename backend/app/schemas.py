from __future__ import annotations

from pydantic import BaseModel
from typing import Optional, List


class AssetBase(BaseModel):
    title: str
    description: str
    tags: List[str]
    type: str
    category: str
    classification: str
    kind: str
    size: str
    uploaded_by: str
    uploaded_at: str
    downloads: int = 0
    teams_url: Optional[str] = None
    status: str = "Published"


class AssetCreate(AssetBase):
    pass


class AssetUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None
    type: Optional[str] = None
    category: Optional[str] = None
    classification: Optional[str] = None
    kind: Optional[str] = None
    size: Optional[str] = None
    uploaded_by: Optional[str] = None
    uploaded_at: Optional[str] = None
    downloads: Optional[int] = None
    teams_url: Optional[str] = None
    status: Optional[str] = None


class AssetResponse(AssetBase):
    id: int

    class Config:
        from_attributes = True


class DashboardStats(BaseModel):
    total_assets: int
    internal_assets: int
    external_assets: int
    accelerators: int
    pocs: int
    flyers: int
    events: int
    repositories: int
    templates: int
    workshops: int
    monthly_activity: List[dict]
    recent_items: List[dict]
    category_breakdown: List[dict]
