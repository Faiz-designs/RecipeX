from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes.auth import router as auth_router
from routes.scan import router as scan_router

app = FastAPI(
    title="NutriVision AI — Food Management System",
    description="AI-powered smart kitchen assistant. Scan vegetables, get recipes, nutrition, allergy info, and smart substitutions.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(scan_router)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/")
def root():
    return {
        "app": "NutriVision AI",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}
