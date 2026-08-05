export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 py-4 h-full ${className || ""}`}>
      <div className="px-4 pb-4 flex items-center gap-2 border-b shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary shrink-0"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
        <span className="font-bold text-lg">API DataHub</span>
      </div>
      <nav className="flex flex-col gap-1 px-2 shrink-0">
        <SidebarLink href="/" label="Dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></SidebarLink>
        <SidebarLink href="/assets" label="Assets"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></SidebarLink>
        <SidebarLink href="/search" label="Search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></SidebarLink>
        <SidebarLink href="/insights" label="Insights"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></SidebarLink>
        <SidebarLink href="/assistant" label="Assistant"><path d="M12 2a10 10 0 0 1 10 10c0 2.6-.9 5-2.5 6.8V21a1 1 0 0 1-1 1H11a10 10 0 0 1 0-20Z"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/></SidebarLink>
        <SidebarLink href="/settings" label="Settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></SidebarLink>
      </nav>
      <div className="mt-2 px-2"><div className="border-t" /></div>
      <h3 className="px-3 pt-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">Classification</h3>
      <nav className="flex flex-col gap-1 px-2 shrink-0">
        <SidebarLink href="/assets?classification=internal" label="Internal"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></SidebarLink>
        <SidebarLink href="/assets?classification=external" label="External"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></SidebarLink>
      </nav>
      <div className="mt-2 px-2"><div className="border-t" /></div>
      <div className="flex-1 overflow-y-auto min-h-0">
        <h3 className="px-3 pt-1 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</h3>
        <nav className="flex flex-col gap-1 px-2">
          <SidebarLink href="/assets?kind=accelerator" label="Accelerators"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></SidebarLink>
          <SidebarLink href="/assets?kind=poc" label="PoCs"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></SidebarLink>
          <SidebarLink href="/assets?kind=repository" label="Repositories"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></SidebarLink>
          <SidebarLink href="/assets?kind=client-deliverable" label="Client Deliverables"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></SidebarLink>
          <SidebarLink href="/assets?kind=marketing" label="Marketing"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></SidebarLink>
          <SidebarLink href="/assets?kind=event" label="Events"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></SidebarLink>
          <SidebarLink href="/assets?kind=flyer" label="Flyers"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></SidebarLink>
          <SidebarLink href="/assets?kind=template" label="Templates"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6"/><path d="M12 12v6"/></SidebarLink>
          <SidebarLink href="/assets?kind=workshop" label="Workshops"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></SidebarLink>
        </nav>
      </div>
    </div>
  )
}

function SidebarLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">{children}</svg>
      {label}
    </a>
  )
}
