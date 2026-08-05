import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchDashboard } from "@/lib/api"

export const dynamic = "force-dynamic"
import {
  Database,
  Building2,
  Globe,
  Rocket,
  FlaskConical,
  FileText,
  Calendar,
  GitFork,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

export default async function DashboardPage() {
  const data = await fetchDashboard().catch(() => null)
  if (!data) return <div className="p-8 text-center text-muted-foreground">Failed to load dashboard data. Ensure the API backend is running on port 8000.</div>

  const statCards = [
    { label: "Total Assets", value: data.total_assets.toLocaleString(), icon: Database, color: "text-blue-600", change: "+12.5%", positive: true },
    { label: "Internal Assets", value: data.internal_assets.toLocaleString(), icon: Building2, color: "text-indigo-600", change: "+8.3%", positive: true },
    { label: "External Assets", value: data.external_assets.toLocaleString(), icon: Globe, color: "text-violet-600", change: "+15.2%", positive: true },
    { label: "Accelerators", value: data.accelerators.toString(), icon: Rocket, color: "text-emerald-600", change: "+4", positive: true },
    { label: "PoCs", value: data.pocs.toString(), icon: FlaskConical, color: "text-amber-600", change: "+3", positive: true },
    { label: "Flyers", value: data.flyers.toString(), icon: FileText, color: "text-rose-600", change: "+18", positive: true },
    { label: "Events", value: data.events.toString(), icon: Calendar, color: "text-cyan-600", change: "-2", positive: false },
    { label: "Repositories", value: data.repositories.toString(), icon: GitFork, color: "text-orange-600", change: "+5", positive: true },
  ]

  const maxDownloads = Math.max(...data.monthly_activity.map((m) => m.downloads))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">API Integration Practice overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`flex items-center gap-1 mt-1 text-xs ${stat.positive ? "text-emerald-600" : "text-red-600"}`}>
                {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{stat.change} this month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Downloads &amp; Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.monthly_activity.map((item) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-8">{item.month}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-600">Assets</span>
                      <span className="text-muted-foreground">{item.assets}</span>
                    </div>
                    <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${(item.assets / 350) * 100}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-violet-600">Downloads</span>
                      <span className="text-muted-foreground">{item.downloads}</span>
                    </div>
                    <div className="h-2 rounded-full bg-violet-100 overflow-hidden">
                      <div className="h-full rounded-full bg-violet-500" style={{ width: `${(item.downloads / maxDownloads) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${(data.internal_assets / data.total_assets) * 100}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">{data.total_assets.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Assets</div>
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">Internal ({data.internal_assets})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-violet-500" />
                <span className="text-sm text-muted-foreground">External ({data.external_assets})</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{item.title}</td>
                    <td className="py-3">
                      <Badge variant="outline">{item.type}</Badge>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={
                          item.status === "Published" || item.status === "Active"
                            ? "default"
                            : item.status === "Review" || item.status === "Upcoming"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
