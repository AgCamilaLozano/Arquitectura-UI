'use client'

import { Button, Textarea } from '@/src/primitives/textarea'
import { Card, CardHeader, CardBody } from "@/src/components/layout/Card";
import { Cpu, Mic, Send, X, Loader2, AudioLines, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../primitives/select/select';
import { CascoSkull, CircleeSpigas } from '@/src/Idt-Mascota/IconChat';

const models = [
    { id: "gpt-5.2", name: "GPT-5.2", icon: Cpu },
    { id: "gpt-5.4", name: "GPT-5.4", icon: Cpu },
];

const suggestions = ["Explícame...", "Busca...", "Encuentra..."];

// ── Tipos compartidos ─────────────────────────────────────────────────────────
interface FooterProps {
    message: string
    setMessage: (v: string) => void
    selectedModel: string
    setSelectedModel: (v: string) => void
    loading: boolean
    isRecording: boolean
    handleSend: () => void
    handleMic: () => void
}

interface BodyProps {
    message: string
    setMessage: (v: string) => void
}

// ── Cuerpo: mascota + chips ───────────────────────────────────────────────────
function ChatBody({ message, setMessage }: BodyProps) {
    return (
        <div className="flex-1 overflow-y-auto flex flex-col items-center gap-4 py-6 px-4">
            <div className="mascot-zoom w-28 h-24 flex items-center justify-center">
                <CircleeSpigas size={100} />
            </div>
            <CardHeader
                title="Hola Usuario"
                subtitle="¿En qué puedo ayudarte hoy?"
                className="flex flex-col text-center"
            />
            {message && (
                <div className="w-full rounded-md px-2 overflow-y-auto max-h-[300px] text-sm text-text-muted">
                    {message}
                </div>
            )}
        </div>
    )
}

// ── Footer: input + botones ───────────────────────────────────────────────────
function ChatFooter({
    message, setMessage,
    selectedModel, setSelectedModel,
    loading, isRecording,
    handleSend, handleMic,
}: FooterProps) {
    return (
        <div className="shrink-0 border-t border-accent p-3 flex flex-col gap-2 bg-surface dark:bg-background">
            {!message && (
                <div className="flex flex-wrap gap-2 w-full">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setMessage(s)}
                            className="text-xs px-3 py-1 rounded-full border bg-muted/30 hover:border-accent text-text-muted hover:scale-105 transition-transform"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}
            <div className="flex justify-end">
                <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value)}>
                    <SelectTrigger className="rounded-full py-0.5 w-auto">
                        <SelectValue placeholder="Modelo" />
                    </SelectTrigger>
                    <SelectContent align="end">
                        {models.map((modelo) => {
                            const Icon = modelo.icon
                            return (
                                <SelectItem key={modelo.id} value={modelo.id}>
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        {modelo.name}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe lo que quieras..."
                    rows={2}
                />
                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        onClick={handleMic}
                        className={`p-2 rounded-lg transition-all duration-200 relative
                            ${isRecording ? 'bg-accent text-white' : 'bg-accent-hover text-text-muted'}`}
                    >
                        {isRecording && (
                            <span className="absolute inset-0 rounded-lg bg-accent animate-ping opacity-40" />
                        )}
                        {isRecording
                            ? <AudioLines className="w-4 h-4 animate-pulse relative z-10" />
                            : <Mic className="w-4 h-4 relative z-10" />
                        }
                    </Button>
                    <Button
                        size="icon"
                        disabled={!message.trim() || loading}
                        onClick={handleSend}
                        className={`p-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed ${loading ? 'bg-accent-hover text-text-muted' : 'bg-accent text-white'
                            }`}
                    >
                        {loading
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Send className="w-4 h-4" />
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

// ── Botón de apertura ─────────────────────────────────────────────────────────
interface ButtonChatProps { onClick: () => void }

export function ButtonChat({ onClick }: ButtonChatProps) {
    return (
        <div onClick={onClick} className="cursor-pointer mascot-zoom">
            <CircleeSpigas />
        </div>
    );
}

// ── Caja de chat ──────────────────────────────────────────────────────────────
interface ChatBoxProps { onClose: () => void }

export function ChatBox({ onClose }: ChatBoxProps) {
    const [message, setMessage] = useState('');
    const [selectedModel, setSelectedModel] = useState(models[1].id);
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleSend = async () => {
        if (!message.trim()) return;
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setMessage('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleMic = () => setIsRecording(prev => !prev);

    const bodyProps = { message, setMessage }
    const footerProps = { message, setMessage, selectedModel, setSelectedModel, loading, isRecording, handleSend, handleMic }

    return (
        <>
            {/* ── Panel expandido lateral ── */}
            {expanded && (
                <div className="fixed inset-0 z-40 flex justify-end">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0"
                        onClick={() => setExpanded(false)}
                    />
                    {/* Panel */}
                    <div className="relative z-50 h-full w-[420px] bg-surface dark:bg-background border-l border-accent shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        {/* Header */}
                        <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-accent">
                            <span className="text-sm font-medium text-text-muted">Chat expandido</span>
                            <div className="flex items-center gap-2">
                                <Button size="icon" onClick={() => setExpanded(false)} className="p-1.5 rounded-lg hover:bg-muted">
                                    <Minimize2 className="w-4 h-4" />
                                </Button>
                                <Button size="icon" onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        {/* Body */}
                        <ChatBody {...bodyProps} />
                        {/* Footer */}
                        <ChatFooter {...footerProps} />
                    </div>
                </div>
            )}

            {/* ── Widget compacto ── */}
            {!expanded && (
                <div className="relative">
                    {/* Botones superiores */}
                    <div className="absolute -top-2 -right-2 flex items-center gap-1 z-10">
                        <Button
                            onClick={() => setExpanded(true)}
                            className="w-6 h-6 rounded-full border border-accent bg-surface dark:bg-background flex items-center justify-center p-0"
                        >
                            <Maximize2 className="w-3 h-3" />
                        </Button>
                        <Button
                            onClick={onClose}
                            className="w-6 h-6 rounded-full border border-accent bg-surface dark:bg-background flex items-center justify-center p-0"
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    </div>
                    {/* Card */}
                    <Card variant="default" className="shadow-lg shadow-accent border-accent w-sm p-1 flex flex-col">
                        <ChatBody {...bodyProps} />
                        <ChatFooter {...footerProps} />
                    </Card>
                </div>
            )}
        </>
    );
}

// ── Orquestador ───────────────────────────────────────────────────────────────
export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {!isOpen && <ButtonChat onClick={() => setIsOpen(true)} />}
            {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
        </div>
    );
}