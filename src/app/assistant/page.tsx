"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { fetchAssets, type AssetData } from "@/lib/api"
import { parseQuery, type ParsedQuery } from "@/lib/assistant-parser"
import { Bot, User, Send, ExternalLink, FileText, Video, File, Link2, Image, Sparkles } from "lucide-react"

const typeIcon: Record<string, React.ReactNode> = {
  PDF: <FileText className="h-4 w-4" />,
  Video: <Video className="h-4 w-4" />,
  Doc: <File className="h-4 w-4" />,
  Link: <Link2 className="h-4 w-4" />,
  Image: <Image className="h-4 w-4" />,
}

interface Message {
  role: "user" | "assistant"
  text: string
  assets?: AssetData[]
  explanation?: string
}

const examples = [
  "Show all API Marketplace assets",
  "Find Layer7 documents",
  "Show all banking client deliverables",
  "Show PoCs related to AI",
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    text: "Hi! I can search the asset library using natural language. Try one of these:",
    assets: [],
  }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function handleSubmit(query?: string) {
    const q = (query ?? input).trim()
    if (!q || loading) return
    setInput("")
    setLoading(true)

    const parsed = parseQuery(q)

    setMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      { role: "assistant", text: "Searching...", explanation: parsed.explanation },
    ])

    try {
      // Fetch with backend-supported filters, then apply client-side filters
      const fetched = await fetchAssets({
        classification: parsed.classification,
        kind: parsed.kind,
        search: parsed.search,
      })

      let results = fetched
      if (parsed.type) {
        results = results.filter((a) => a.type.toLowerCase() === parsed.type!.toLowerCase())
      }
      if (parsed.category) {
        results = results.filter((a) => a.category.toLowerCase() === parsed.category!.toLowerCase())
      }

      const count = results.length
      const text = count === 0
        ? "No assets matched your query. Try different keywords."
        : `Found ${count} asset${count !== 1 ? "s" : ""} matching your request.`

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text, assets: results, explanation: parsed.explanation },
      ])
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: "Failed to search. Ensure the API backend is running on port 8000.", assets: [] },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">AI Assistant</h1>
        </div>
        <p className="text-muted-foreground mt-1">Ask questions about your assets in natural language</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${msg.role === "user" ? "order-1" : "order-1"}`}>
              <div className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`shrink-0 rounded-full p-1.5 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div>
                  {msg.role === "assistant" && msg.explanation && (
                    <p className="text-xs text-muted-foreground mb-1 italic">{msg.explanation}</p>
                  )}
                  <div className={`rounded-lg px-3 py-2 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {msg.text}
                  </div>
                </div>
              </div>

              {msg.assets && msg.assets.length > 0 && (
                <div className="mt-2 space-y-2">
                  {msg.assets.map((asset) => (
                    <Card key={asset.id} className="overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-muted-foreground shrink-0">{typeIcon[asset.type]}</span>
                              <span className="font-medium text-sm truncate">{asset.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{asset.description}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {asset.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-[10px] px-1 py-0">{tag}</Badge>
                              ))}
                              <Badge variant="outline" className="text-[10px] px-1 py-0">{asset.category}</Badge>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <Badge variant="outline" className="text-[10px]">{asset.kind}</Badge>
                            {asset.teams_url && (
                              <a
                                href={asset.teams_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Teams
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => handleSubmit(ex)}
                className="text-xs bg-muted hover:bg-accent rounded-full px-3 py-1.5 transition-colors text-left"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 pt-4 border-t mt-4">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
          className="flex items-center gap-2"
        >
          <Input
            placeholder="Ask about your assets..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
