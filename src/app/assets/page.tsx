"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { fetchAssets, type AssetData } from "@/lib/api"
import { Download, FileText, Video, File, Link2, Image, SearchIcon, X } from "lucide-react"
import Link from "next/link"

const typeIcon: Record<string, React.ReactNode> = {
  PDF: <FileText className="h-4 w-4" />,
  Video: <Video className="h-4 w-4" />,
  Doc: <File className="h-4 w-4" />,
  Link: <Link2 className="h-4 w-4" />,
  Image: <Image className="h-4 w-4" />,
}

function AssetsContent() {
  const [query, setQuery] = useState("")
  const [assets, setAssets] = useState<AssetData[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const activeClassification = searchParams.get("classification")
  const activeKind = searchParams.get("kind")

  useEffect(() => {
    setLoading(true)
    fetchAssets({
      classification: activeClassification ?? undefined,
      kind: activeKind ?? undefined,
    })
      .then(setAssets)
      .catch(() => setAssets([]))
      .finally(() => setLoading(false))
  }, [activeClassification, activeKind])

  const filtered = useMemo(() => {
    if (!query.trim()) return assets
    const q = query.toLowerCase()
    return assets.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [query, assets])

  const hasActiveFilters = activeClassification || activeKind

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground">Browse and manage your knowledge assets</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, tags, description, category..."
          className="pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeClassification && (
            <Badge variant="secondary" className="gap-1">
              {activeClassification}
              <Link href="/assets" className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </Link>
            </Badge>
          )}
          {activeKind && (
            <Badge variant="secondary" className="gap-1">
              {activeKind.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              <Link href="/assets" className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </Link>
            </Badge>
          )}
          <Link href="/assets" className="text-xs text-muted-foreground hover:text-foreground underline">
            Clear all
          </Link>
        </div>
      )}

      {loading && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">Loading assets...</CardContent>
        </Card>
      )}

      {!loading && filtered.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">No assets match the current filters</CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((asset) => (
          <Card key={asset.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center gap-1">
                  {typeIcon[asset.type]}
                  {asset.type}
                </Badge>
                <Badge>{asset.category}</Badge>
              </div>
              <CardTitle className="text-base mt-2">{asset.title}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{asset.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-2">
                {asset.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{asset.size}</span>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {asset.downloads}
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                By {asset.uploaded_by} · {asset.uploaded_at}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function AssetsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-muted-foreground">Loading assets...</div>}>
      <AssetsContent />
    </Suspense>
  )
}
