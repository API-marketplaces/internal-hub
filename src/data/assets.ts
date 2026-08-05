export interface Asset {
  id: string
  title: string
  description: string
  tags: string[]
  type: "PDF" | "Video" | "Doc" | "Link" | "Image"
  category: string
  classification: "Internal" | "External"
  kind: "Accelerator" | "PoC" | "Repository" | "Client Deliverable" | "Marketing" | "Event" | "Flyer" | "Template" | "Workshop"
  size: string
  uploadedBy: string
  uploadedAt: string
  downloads: number
}

export const assets: Asset[] = [
  { id: "1", title: "Payment API Integration Guide", description: "Step-by-step guide for integrating with the Payment API gateway", tags: ["api", "payment", "integration", "guide"], type: "PDF", category: "Integration", classification: "Internal", kind: "Accelerator", size: "2.4 MB", uploadedBy: "Alice", uploadedAt: "2026-07-08", downloads: 145 },
  { id: "2", title: "Customer 360 PoC Report", description: "Proof of concept results for Customer 360 data unification", tags: ["poc", "customer360", "data", "integration"], type: "Doc", category: "CRM", classification: "Internal", kind: "PoC", size: "4.1 MB", uploadedBy: "Bob", uploadedAt: "2026-07-07", downloads: 89 },
  { id: "3", title: "Partner Portal Connectors", description: "Repository of connectors for partner portal integration", tags: ["connectors", "partner", "integration", "api"], type: "Link", category: "Integration", classification: "External", kind: "Repository", size: "—", uploadedBy: "Charlie", uploadedAt: "2026-07-06", downloads: 234 },
  { id: "4", title: "Healthcare API Demo", description: "Client deliverable showcasing healthcare API interoperability", tags: ["healthcare", "api", "demo", "deliverable"], type: "Video", category: "Healthcare", classification: "External", kind: "Client Deliverable", size: "156 MB", uploadedBy: "Diana", uploadedAt: "2026-07-05", downloads: 67 },
  { id: "5", title: "Integration Solutions Brochure", description: "Marketing brochure highlighting key integration solutions", tags: ["marketing", "brochure", "solutions", "integration"], type: "PDF", category: "Marketing", classification: "External", kind: "Marketing", size: "5.7 MB", uploadedBy: "Eve", uploadedAt: "2026-07-04", downloads: 312 },
  { id: "6", title: "Annual Partner Summit", description: "Event materials and recordings from the Annual Partner Summit", tags: ["event", "partner", "summit", "annual"], type: "Video", category: "Events", classification: "External", kind: "Event", size: "320 MB", uploadedBy: "Frank", uploadedAt: "2026-07-03", downloads: 178 },
  { id: "7", title: "API Adoption Flyer", description: "One-page flyer promoting API adoption best practices", tags: ["flyer", "api", "adoption", "best-practices"], type: "Image", category: "Marketing", classification: "Internal", kind: "Flyer", size: "0.8 MB", uploadedBy: "Grace", uploadedAt: "2026-07-02", downloads: 423 },
  { id: "8", title: "Integration Requirements Template", description: "Reusable template for documenting integration requirements", tags: ["template", "requirements", "documentation", "integration"], type: "Doc", category: "Process", classification: "Internal", kind: "Template", size: "1.2 MB", uploadedBy: "Alice", uploadedAt: "2026-07-01", downloads: 156 },
  { id: "9", title: "REST API Design Workshop", description: "Workshop materials for designing RESTful APIs", tags: ["workshop", "rest", "api-design", "training"], type: "PDF", category: "Training", classification: "Internal", kind: "Workshop", size: "8.3 MB", uploadedBy: "Bob", uploadedAt: "2026-06-30", downloads: 287 },
  { id: "10", title: "Cloud Migration Playbook", description: "Internal playbook for cloud migration integration patterns", tags: ["cloud", "migration", "playbook", "internal"], type: "PDF", category: "Cloud", classification: "Internal", kind: "Accelerator", size: "3.1 MB", uploadedBy: "Charlie", uploadedAt: "2026-06-29", downloads: 91 },
  { id: "11", title: "Data Sync PoC Framework", description: "Reusable framework for data synchronization proof of concepts", tags: ["poc", "data-sync", "framework", "reusable"], type: "Doc", category: "Integration", classification: "Internal", kind: "PoC", size: "2.8 MB", uploadedBy: "Diana", uploadedAt: "2026-06-28", downloads: 143 },
  { id: "12", title: "OpenAPI Spec Repository", description: "Central repository for OpenAPI specifications across projects", tags: ["openapi", "specification", "repository", "api"], type: "Link", category: "Integration", classification: "External", kind: "Repository", size: "—", uploadedBy: "Eve", uploadedAt: "2026-06-27", downloads: 267 },
  { id: "13", title: "Banking API Deliverable Pack", description: "Client deliverable pack for banking API integration project", tags: ["banking", "deliverable", "api", "client"], type: "PDF", category: "Finance", classification: "External", kind: "Client Deliverable", size: "12.5 MB", uploadedBy: "Frank", uploadedAt: "2026-06-26", downloads: 78 },
  { id: "14", title: "Integration Services Catalog", description: "Marketing catalog of integration services and offerings", tags: ["marketing", "catalog", "services", "integration"], type: "PDF", category: "Marketing", classification: "External", kind: "Marketing", size: "6.2 MB", uploadedBy: "Grace", uploadedAt: "2026-06-25", downloads: 198 },
  { id: "15", title: "Tech Talks Webinar Series", description: "Recorded webinars from the Tech Talks integration series", tags: ["event", "webinar", "tech-talks", "recording"], type: "Video", category: "Events", classification: "External", kind: "Event", size: "450 MB", uploadedBy: "Alice", uploadedAt: "2026-06-24", downloads: 56 },
  { id: "16", title: "Quick Start Flyer", description: "Quick start guide flyer for new integration platform users", tags: ["flyer", "quick-start", "guide", "new-users"], type: "Image", category: "Marketing", classification: "Internal", kind: "Flyer", size: "0.5 MB", uploadedBy: "Bob", uploadedAt: "2026-06-23", downloads: 345 },
  { id: "17", title: "API Contract Template", description: "Standard template for API contract documentation", tags: ["template", "api-contract", "documentation", "standard"], type: "Doc", category: "Process", classification: "Internal", kind: "Template", size: "0.9 MB", uploadedBy: "Charlie", uploadedAt: "2026-06-22", downloads: 112 },
  { id: "18", title: "GraphQL API Workshop", description: "Hands-on workshop for building GraphQL APIs", tags: ["workshop", "graphql", "api", "hands-on"], type: "Video", category: "Training", classification: "Internal", kind: "Workshop", size: "210 MB", uploadedBy: "Diana", uploadedAt: "2026-06-21", downloads: 234 },
]
