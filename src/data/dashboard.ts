export interface DashboardStats {
  totalAssets: number
  internalAssets: number
  externalAssets: number
  accelerators: number
  pocs: number
  flyers: number
  events: number
  repositories: number
  monthlyActivity: { month: string; assets: number; downloads: number }[]
  categoryBreakdown: { name: string; value: number; color: string }[]
  recentItems: { id: string; title: string; type: string; date: string; status: string }[]
}

export const dashboardData: DashboardStats = {
  totalAssets: 2847,
  internalAssets: 1024,
  externalAssets: 1823,
  accelerators: 48,
  pocs: 36,
  flyers: 124,
  events: 67,
  repositories: 89,
  monthlyActivity: [
    { month: "Jan", assets: 120, downloads: 890 },
    { month: "Feb", assets: 145, downloads: 1020 },
    { month: "Mar", assets: 98, downloads: 760 },
    { month: "Apr", assets: 210, downloads: 1540 },
    { month: "May", assets: 178, downloads: 1320 },
    { month: "Jun", assets: 256, downloads: 1890 },
    { month: "Jul", assets: 198, downloads: 1450 },
    { month: "Aug", assets: 312, downloads: 2210 },
    { month: "Sep", assets: 275, downloads: 1980 },
    { month: "Oct", assets: 189, downloads: 1340 },
    { month: "Nov", assets: 234, downloads: 1670 },
    { month: "Dec", assets: 167, downloads: 1210 },
  ],
  categoryBreakdown: [
    { name: "Internal Assets", value: 1024, color: "#3b82f6" },
    { name: "External Assets", value: 1823, color: "#8b5cf6" },
  ],
  recentItems: [
    { id: "1", title: "Payment API Integration Guide", type: "Accelerator", date: "2 hours ago", status: "Published" },
    { id: "2", title: "Customer 360 PoC Results", type: "PoC", date: "5 hours ago", status: "Review" },
    { id: "3", title: "API Security Best Practices", type: "Flyer", date: "1 day ago", status: "Published" },
    { id: "4", title: "Q3 Integration Workshop", type: "Event", date: "2 days ago", status: "Upcoming" },
    { id: "5", title: "Connector Repository v2.3", type: "Repository", date: "3 days ago", status: "Active" },
    { id: "6", title: "Partner Onboarding Accelerator", type: "Accelerator", date: "4 days ago", status: "Draft" },
  ],
}
