'use client'
import { useState } from "react"
import Sidebar from "@/components/Layout/SideBar"
import { PanelRightOpen } from "lucide-react"
import { ThemeToggle } from "@/components/Layout/Tema/ThemeToggle"
import { Breadcrumbs } from "@/components/UI/Breadcrumbs"

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
            <header className="w-full h-[70px] border-b border-border-sidebar flex items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md hover:bg-accent-hover hover:text-accent transition cursor-pointer"
                    >
                        <PanelRightOpen className={`h-6 w-6 transition-transform ${isOpen ? '' : 'rotate-180'}`} />
                    </button>
                    <Breadcrumbs />
                </div>
                <ThemeToggle />
            </header>
            <main>
                {children}
            </main>
        </Sidebar>
    )
}