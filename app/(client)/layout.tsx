"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PhoneCall, 
  Database, 
  Users, 
  Settings, 
  Search,
  ChevronLeft,
  Menu,
  X,
  CreditCard,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarGroups = [
  {
    label: "MAIN",
    items: [
      { name: "Overview", href: "/overview", icon: LayoutDashboard },
      { name: "Call Logs", href: "/logs", icon: PhoneCall },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  },
  {
    label: "KNOWLEDGE",
    items: [
      { name: "Properties", href: "/rag", icon: Database },
      { name: "AI Config", href: "/config", icon: Sparkles },
    ]
  },
  {
    label: "TEAM",
    items: [
      { name: "Members", href: "/team", icon: Users },
    ]
  }
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => setIsMobileOpen(false), [pathname]);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white transition-all duration-300 lg:static",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* LOGO AREA */}
        <div className="flex h-16 items-center justify-between px-6 py-8">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-violet-600 flex items-center justify-center text-white shadow-lg">
              <span className="font-bold text-lg italic">D</span>
            </div>
            {!isCollapsed && <span className="font-bold text-slate-900 text-lg">Dialin</span>}
          </div>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden lg:block text-slate-400 hover:text-slate-600">
            <ChevronLeft className={cn("transition-transform", isCollapsed && "rotate-180")} size={18} />
          </button>
        </div>

        {/* SEARCH BAR (Only when expanded) */}
        {!isCollapsed && (
          <div className="px-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                placeholder="Search" 
                className="w-full rounded-xl bg-slate-50 border-none py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-violet-200 outline-none transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">/</span>
            </div>
          </div>
        )}

        {/* NAVIGATION GROUPS */}
        <div className="flex-1 overflow-y-auto px-3 space-y-8">
          {sidebarGroups.map((group) => (
            <div key={group.label}>
              {!isCollapsed && (
                <p className="px-3 text-[10px] font-bold tracking-widest text-slate-400 mb-2">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                        isActive 
                          ? "bg-gradient-to-r from-violet-50 to-blue-50 text-violet-700 shadow-sm border border-violet-100" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <item.icon size={20} className={cn(isActive ? "text-violet-600" : "text-slate-400")} />
                      {!isCollapsed && <span>{item.name}</span>}
                      {isActive && !isCollapsed && (
                         <div className="ml-auto size-1.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* USER PROFILE SECTION */}
        <div className="mt-auto border-t p-4">
          <div className={cn("flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors", isCollapsed && "justify-center")}>
             <img 
               src="https://avatar.iran.liara.run/public/30" 
               className="size-10 rounded-full border border-slate-100" 
               alt="User" 
             />
             {!isCollapsed && (
               <div className="flex-1 overflow-hidden">
                 <p className="text-sm font-semibold text-slate-900 truncate">Dianne Russell</p>
                 <p className="text-xs text-slate-500 truncate">russell@hey.com</p>
               </div>
             )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* MOBILE HEADER */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-violet-600 flex items-center justify-center text-white">
              <span className="font-bold italic">D</span>
            </div>
            <span className="font-bold text-slate-900">Dialin</span>
          </div>
          <button onClick={() => setIsMobileOpen(true)} className="text-slate-500">
            <Menu size={24} />
          </button>
        </header>

        {/* DESKTOP HEADER */}
        <header className="hidden h-16 items-center justify-between border-b bg-white px-10 lg:flex">
          <h1 className="text-lg font-semibold text-slate-800">
             {pathname.split('/').pop()?.toUpperCase() || "DASHBOARD"}
          </h1>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                <CreditCard size={16} />
                Billing
             </Button>
             <div className="size-9 rounded-full bg-slate-100 border flex items-center justify-center">
                <Users size={18} className="text-slate-500" />
             </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}