const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface AssetData {
  id: number
  title: string
  description: string
  tags: string[]
  type: string
  category: string
  classification: string
  kind: string
  size: string
  uploaded_by: string
  uploaded_at: string
  downloads: number
  teams_url: string | null
  status: string
}

export interface DashboardData {
  total_assets: number
  internal_assets: number
  external_assets: number
  accelerators: number
  pocs: number
  flyers: number
  events: number
  repositories: number
  templates: number
  workshops: number
  monthly_activity: { month: string; assets: number; downloads: number }[]
  recent_items: { id: number; title: string; type: string; date: string; status: string }[]
  category_breakdown: { name: string; value: number; color: string }[]
}

export interface InsightsData {
  metrics: { label: string; value: string; change: number }[]
  category_insights: { category: string; assets: number; views: number; completion: number }[]
  monthly_trend: { month: string; views: number; uploads: number }[]
}

const fetchOpts: RequestInit = { cache: "no-store" }

export async function fetchAssets(params?: {
  classification?: string
  kind?: string
  search?: string
}): Promise<AssetData[]> {
  const url = new URL(`${API_BASE}/api/assets`)
  if (params?.classification) url.searchParams.set("classification", params.classification)
  if (params?.kind) url.searchParams.set("kind", params.kind)
  if (params?.search) url.searchParams.set("search", params.search)
  const res = await fetch(url.toString(), fetchOpts)
  if (!res.ok) throw new Error("Failed to fetch assets")
  return res.json()
}

export async function fetchAsset(id: number): Promise<AssetData> {
  const res = await fetch(`${API_BASE}/api/assets/${id}`, fetchOpts)
  if (!res.ok) throw new Error("Failed to fetch asset")
  return res.json()
}

export async function fetchDashboard(): Promise<DashboardData> {
  const res = await fetch(`${API_BASE}/api/dashboard`, fetchOpts)
  if (!res.ok) throw new Error("Failed to fetch dashboard")
  return res.json()
}

export async function fetchInsights(): Promise<InsightsData> {
  const res = await fetch(`${API_BASE}/api/insights`, fetchOpts)
  if (!res.ok) throw new Error("Failed to fetch insights")
  return res.json()
}
