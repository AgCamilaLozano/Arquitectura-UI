'use client'
import { useState } from "react"
import Sidebar from "@/components/Layout/SideBar"
import { PanelRightOpen } from "lucide-react"
import { ThemeToggle } from "@/components/Layout/Tema/ThemeToggle"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <header className="w-full h-[70px] border-b border-border-sidebar flex items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2">

                    <Breadcrumbs />
                </div>
                <ThemeToggle />
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}