"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, Video, File, Link2, Image, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { fetchAssets, type AssetData } from "@/lib/api"
import { cn } from "@/lib/utils"

const typeIcon: Record<string, React.ReactNode> = {
  PDF: <FileText className="h-3 w-3" />,
  Video: <Video className="h-3 w-3" />,
  Doc: <File className="h-3 w-3" />,
  Link: <Link2 className="h-3 w-3" />,
  Image: <Image className="h-3 w-3" />,
}

export function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [assets, setAssets] = useState<AssetData[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetchAssets().then(setAssets).catch(() => setAssets([]))
  }, [])

  const filtered = query.trim()
    ? assets.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.description.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  const handleSelect = (id: number) => {
    setQuery("")
    setOpen(false)
    router.push(`/assets#${id}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || !filtered.length) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault()
      handleSelect(filtered[selectedIndex].id)
    } else if (e.key === "Escape") {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        ref={inputRef}
        placeholder="Search assets by name, tags, description, category..."
        className="pl-9 pr-8 h-9 text-sm"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => query.trim() && setOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {query && (
        <button
          onClick={() => { setQuery(""); setOpen(false) }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {open && filtered.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-1 w-full bg-popover border rounded-lg shadow-lg z-50 overflow-hidden"
        >
          <div className="px-3 py-2 text-xs text-muted-foreground border-b">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {filtered.map((asset, i) => (
              <button
                key={asset.id}
                className={cn(
                  "flex items-start gap-3 w-full px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent",
                  i === selectedIndex && "bg-accent"
                )}
                onClick={() => handleSelect(asset.id)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">{typeIcon[asset.type]}</span>
                    <span className="font-medium truncate">{asset.title}</span>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-[10px] px-1.5 py-0">
                    {asset.category}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {open && query && filtered.length === 0 && (
        <div className="absolute top-full mt-1 w-full bg-popover border rounded-lg shadow-lg z-50 p-6 text-center text-sm text-muted-foreground">
          No assets found
        </div>
      )}
    </div>
  )
}
