import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchInsights } from "@/lib/api"
import { TrendingUp, TrendingDown, Eye, Clock, CheckCircle, Users } from "lucide-react"

export const dynamic = "force-dynamic"

const metricIcons = [Eye, Clock, CheckCircle, Users]

export default async function InsightsPage() {
  const data = await fetchInsights().catch(() => null)
  if (!data) {
    return <div className="p-8 text-center text-muted-foreground">Failed to load insights data. Ensure the API backend is running on port 8000.</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
        <p className="text-muted-foreground">Analytics and trends across your knowledge base</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((metric, i) => {
          const Icon = metricIcons[i]
          return (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className={`flex items-center gap-1 mt-1 text-xs ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {metric.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(metric.change)}% from last month
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Month</th>
                    <th className="pb-3 font-medium">Views</th>
                    <th className="pb-3 font-medium">Uploads</th>
                  </tr>
                </thead>
                <tbody>
                  {data.monthly_trend.map((row) => (
                    <tr key={row.month} className="border-b last:border-0">
                      <td className="py-3 font-medium">{row.month}</td>
                      <td className="py-3">{row.views}</td>
                      <td className="py-3">{row.uploads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.category_insights.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{cat.category}</span>
                    <Badge variant="secondary">{cat.completion}%</Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{cat.assets} assets</span>
                    <span>{cat.views} views</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${cat.completion}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
