from __future__ import annotations

import json
from contextlib import asynccontextmanager
from typing import Optional, List

from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db, init_db
from app.models import Asset
from app.schemas import AssetCreate, AssetUpdate, AssetResponse, DashboardStats
from app.seed import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await seed_database()
    yield


app = FastAPI(title="API Integration Practice DataHub API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def asset_to_dict(asset: Asset) -> dict:
    return {
        "id": asset.id,
        "title": asset.title,
        "description": asset.description,
        "tags": json.loads(asset.tags),
        "type": asset.type,
        "category": asset.category,
        "classification": asset.classification,
        "kind": asset.kind,
        "size": asset.size,
        "uploaded_by": asset.uploaded_by,
        "uploaded_at": asset.uploaded_at,
        "downloads": asset.downloads,
        "teams_url": asset.teams_url,
        "status": asset.status,
    }


# ── Asset Endpoints ──


@app.get("/api/assets", response_model=List[AssetResponse])
async def list_assets(
    classification: Optional[str] = Query(None),
    kind: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Asset)
    if classification:
        stmt = stmt.where(Asset.classification.ilike(classification))
    if kind:
        stmt = stmt.where(Asset.kind.ilike(kind.replace("-", " ")))
    result = await db.execute(stmt)
    assets = result.scalars().all()
    if search:
        q = search.lower()
        assets = [
            a for a in assets
            if q in a.title.lower()
            or q in a.description.lower()
            or q in a.category.lower()
            or any(q in t.lower() for t in json.loads(a.tags))
        ]
    return [asset_to_dict(a) for a in assets]


@app.get("/api/assets/{asset_id}", response_model=AssetResponse)
async def get_asset(asset_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Asset).where(Asset.id == asset_id))
    asset = result.scalar_one_or_none()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset_to_dict(asset)


@app.post("/api/assets", response_model=AssetResponse, status_code=201)
async def create_asset(data: AssetCreate, db: AsyncSession = Depends(get_db)):
    asset = Asset(
        title=data.title,
        description=data.description,
        tags=json.dumps(data.tags),
        type=data.type,
        category=data.category,
        classification=data.classification,
        kind=data.kind,
        size=data.size,
        uploaded_by=data.uploaded_by,
        uploaded_at=data.uploaded_at,
        downloads=data.downloads,
        teams_url=data.teams_url,
        status=data.status,
    )
    db.add(asset)
    await db.commit()
    await db.refresh(asset)
    return asset_to_dict(asset)


@app.put("/api/assets/{asset_id}", response_model=AssetResponse)
async def update_asset(
    asset_id: int, data: AssetUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Asset).where(Asset.id == asset_id))
    asset = result.scalar_one_or_none()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    update_data = data.model_dump(exclude_unset=True)
    if "tags" in update_data and update_data["tags"] is not None:
        update_data["tags"] = json.dumps(update_data["tags"])
    for key, value in update_data.items():
        setattr(asset, key, value)
    await db.commit()
    await db.refresh(asset)
    return asset_to_dict(asset)


@app.delete("/api/assets/{asset_id}", status_code=204)
async def delete_asset(asset_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Asset).where(Asset.id == asset_id))
    asset = result.scalar_one_or_none()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    await db.delete(asset)
    await db.commit()


# ── Dashboard Endpoints ──


@app.get("/api/dashboard", response_model=DashboardStats)
async def get_dashboard(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Asset))
    all_assets = result.scalars().all()

    internal = sum(1 for a in all_assets if a.classification == "Internal")
    external = sum(1 for a in all_assets if a.classification == "External")
    accelerators = sum(1 for a in all_assets if a.kind == "Accelerator")
    pocs = sum(1 for a in all_assets if a.kind == "PoC")
    flyers = sum(1 for a in all_assets if a.kind == "Flyer")
    events = sum(1 for a in all_assets if a.kind == "Event")
    repositories = sum(1 for a in all_assets if a.kind == "Repository")
    templates = sum(1 for a in all_assets if a.kind == "Template")
    workshops = sum(1 for a in all_assets if a.kind == "Workshop")

    return DashboardStats(
        total_assets=len(all_assets),
        internal_assets=internal,
        external_assets=external,
        accelerators=accelerators,
        pocs=pocs,
        flyers=flyers,
        events=events,
        repositories=repositories,
        templates=templates,
        workshops=workshops,
        monthly_activity=[
            {"month": "Jan", "assets": 120, "downloads": 890},
            {"month": "Feb", "assets": 145, "downloads": 1020},
            {"month": "Mar", "assets": 98, "downloads": 760},
            {"month": "Apr", "assets": 210, "downloads": 1540},
            {"month": "May", "assets": 178, "downloads": 1320},
            {"month": "Jun", "assets": 256, "downloads": 1890},
            {"month": "Jul", "assets": 198, "downloads": 1450},
            {"month": "Aug", "assets": 312, "downloads": 2210},
            {"month": "Sep", "assets": 275, "downloads": 1980},
            {"month": "Oct", "assets": 189, "downloads": 1340},
            {"month": "Nov", "assets": 234, "downloads": 1670},
            {"month": "Dec", "assets": 167, "downloads": 1210},
        ],
        recent_items=[
            {"id": 1, "title": "Payment API Integration Guide", "type": "Accelerator", "date": "2 hours ago", "status": "Published"},
            {"id": 2, "title": "Customer 360 PoC Results", "type": "PoC", "date": "5 hours ago", "status": "Review"},
            {"id": 3, "title": "API Security Best Practices", "type": "Flyer", "date": "1 day ago", "status": "Published"},
            {"id": 4, "title": "Q3 Integration Workshop", "type": "Event", "date": "2 days ago", "status": "Upcoming"},
            {"id": 5, "title": "Connector Repository v2.3", "type": "Repository", "date": "3 days ago", "status": "Active"},
            {"id": 6, "title": "Partner Onboarding Accelerator", "type": "Accelerator", "date": "4 days ago", "status": "Draft"},
        ],
        category_breakdown=[
            {"name": "Internal Assets", "value": internal, "color": "#3b82f6"},
            {"name": "External Assets", "value": external, "color": "#8b5cf6"},
        ],
    )


# ── Insights Endpoints ──


@app.get("/api/insights")
async def get_insights():
    return {
        "metrics": [
            {"label": "Total Views", "value": "24,567", "change": 12.5},
            {"label": "Avg Time Spent", "value": "14m 32s", "change": 8.3},
            {"label": "Completion Rate", "value": "72%", "change": -3.1},
            {"label": "Active Learners", "value": "1,893", "change": 18.7},
        ],
        "category_insights": [
            {"category": "Frontend", "assets": 342, "views": 8456, "completion": 78},
            {"category": "Backend", "assets": 289, "views": 7234, "completion": 71},
            {"category": "DevOps", "assets": 198, "views": 4567, "completion": 65},
            {"category": "Database", "assets": 156, "views": 3890, "completion": 69},
            {"category": "AI/ML", "assets": 112, "views": 2567, "completion": 82},
        ],
        "monthly_trend": [
            {"month": "Jan", "views": 1200, "uploads": 45},
            {"month": "Feb", "views": 1900, "uploads": 52},
            {"month": "Mar", "views": 1600, "uploads": 38},
            {"month": "Apr", "views": 2400, "uploads": 61},
            {"month": "May", "views": 2100, "uploads": 55},
            {"month": "Jun", "views": 2800, "uploads": 73},
        ],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
