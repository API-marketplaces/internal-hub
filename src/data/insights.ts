export interface InsightMetric {
  label: string
  value: string
  change: number
}

export interface CategoryInsight {
  category: string
  assets: number
  views: number
  completion: number
}

export const insightMetrics: InsightMetric[] = [
  { label: "Total Views", value: "24,567", change: 12.5 },
  { label: "Avg Time Spent", value: "14m 32s", change: 8.3 },
  { label: "Completion Rate", value: "72%", change: -3.1 },
  { label: "Active Learners", value: "1,893", change: 18.7 },
]

export const categoryInsights: CategoryInsight[] = [
  { category: "Frontend", assets: 342, views: 8456, completion: 78 },
  { category: "Backend", assets: 289, views: 7234, completion: 71 },
  { category: "DevOps", assets: 198, views: 4567, completion: 65 },
  { category: "Database", assets: 156, views: 3890, completion: 69 },
  { category: "AI/ML", assets: 112, views: 2567, completion: 82 },
]

export const monthlyTrend = [
  { month: "Jan", views: 1200, uploads: 45 },
  { month: "Feb", views: 1900, uploads: 52 },
  { month: "Mar", views: 1600, uploads: 38 },
  { month: "Apr", views: 2400, uploads: 61 },
  { month: "May", views: 2100, uploads: 55 },
  { month: "Jun", views: 2800, uploads: 73 },
]
