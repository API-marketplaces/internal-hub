const kindMap: Record<string, string> = {
  accelerators: "Accelerator",
  accelerator: "Accelerator",
  pocs: "PoC",
  poc: "PoC",
  "proof of concept": "PoC",
  "proofs of concept": "PoC",
  repositories: "Repository",
  repository: "Repository",
  repos: "Repository",
  repo: "Repository",
  "client deliverables": "Client Deliverable",
  "client deliverable": "Client Deliverable",
  deliverables: "Client Deliverable",
  deliverable: "Client Deliverable",
  marketing: "Marketing",
  events: "Event",
  event: "Event",
  flyers: "Flyer",
  flyer: "Flyer",
  templates: "Template",
  template: "Template",
  workshops: "Workshop",
  workshop: "Workshop",
}

const typeMap: Record<string, string> = {
  documents: "Doc",
  document: "Doc",
  docs: "Doc",
  doc: "Doc",
  pdfs: "PDF",
  pdf: "PDF",
  videos: "Video",
  video: "Video",
  links: "Link",
  link: "Link",
  images: "Image",
  image: "Image",
}

const classificationMap: Record<string, string> = {
  internal: "Internal",
  external: "External",
}

const categoryMap: Record<string, string> = {
  integration: "Integration",
  crm: "CRM",
  healthcare: "Healthcare",
  marketing: "Marketing",
  events: "Events",
  cloud: "Cloud",
  finance: "Finance",
  banking: "Finance",
  training: "Training",
  process: "Process",
}

export interface ParsedQuery {
  classification?: string
  kind?: string
  type?: string
  category?: string
  search?: string
  explanation: string
}

export function parseQuery(input: string): ParsedQuery {
  const raw = input.toLowerCase().trim().replace(/[?.!,]+/g, "")

  let classification: string | undefined
  let kind: string | undefined
  let type: string | undefined
  let category: string | undefined
  const searchTerms: string[] = []

  const words = raw.split(/\s+/)
  const used = new Set<number>()

  // Check for "related to <topic>" or "for <topic>" or "about <topic>"
  let topicAfter: string | undefined
  for (let i = 0; i < words.length - 1; i++) {
    if ((words[i] === "related" && words[i + 1] === "to") || words[i] === "about" || words[i] === "for") {
      const start = words[i] === "related" ? i + 2 : i + 1
      if (start < words.length) {
        topicAfter = words.slice(start).join(" ")
        for (let j = start; j < words.length; j++) used.add(j)
        if (words[i] === "related") { used.add(i); used.add(i + 1) }
        else used.add(i)
      }
      break
    }
  }

  // Check multi-word "client deliverables"
  for (let i = 0; i < words.length - 1; i++) {
    const pair = words[i] + " " + words[i + 1]
    if (kindMap[pair]) {
      kind = kindMap[pair]
      used.add(i); used.add(i + 1)
      break
    }
  }

  // Extract known terms
  for (let i = 0; i < words.length; i++) {
    if (used.has(i)) continue
    const w = words[i]

    if (!kind && kindMap[w]) {
      kind = kindMap[w]
      used.add(i)
    } else if (!type && typeMap[w]) {
      type = typeMap[w]
      used.add(i)
    } else if (!classification && classificationMap[w]) {
      classification = classificationMap[w]
      used.add(i)
    } else if (!category && categoryMap[w]) {
      category = categoryMap[w]
      used.add(i)
    } else if (!["show", "all", "find", "list", "me", "the", "a", "an", "any", "for", "to", "related", "that", "are", "with", "by", "in", "of", "and", "or", "assets", "items", "results", "things", "like", "from", "on", "at", "get", "give", "have", "has", "had", "was", "were", "is", "am", "be", "been", "do", "does", "did", "can", "could", "would", "should", "will", "may", "might", "need", "want", "looking", "search", "searching"].includes(w)) {
      searchTerms.push(w)
    }
  }

  if (topicAfter) searchTerms.push(topicAfter)

  const search = searchTerms.length > 0 ? searchTerms.join(" ") : undefined

  // Build explanation
  const parts: string[] = []
  if (classification) parts.push(`classification: ${classification}`)
  if (kind) parts.push(`kind: ${kind}`)
  if (type) parts.push(`type: ${type}`)
  if (category) parts.push(`category: ${category}`)
  if (search) parts.push(`search: "${search}"`)
  const explanation = parts.length > 0
    ? `Searching for ${parts.join(", ")}`
    : `Searching for "${input}"`

  return { classification, kind, type, category, search, explanation }
}
