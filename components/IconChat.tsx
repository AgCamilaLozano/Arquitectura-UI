import { useRef, useEffect } from "react";
export function SkullIcon() {
    return (
        <svg viewBox="0 0 100 90" className="w-full h-full group">
            <g className="transition-all duration-300 border">
                {/* Fondo del cráneo */}
                {[
                    [35, 10], [40, 10], [45, 10], [50, 10], [55, 10], [60, 10],
                    [30, 15], [35, 15], [40, 15], [45, 15], [50, 15], [55, 15], [60, 15], [65, 15],
                    [25, 20], [30, 20], [35, 20], [40, 20], [45, 20], [50, 20], [55, 20], [60, 20], [65, 20], [70, 20],
                    [20, 25], [25, 25], [30, 25], [35, 25], [40, 25], [45, 25], [50, 25], [55, 25], [60, 25], [65, 25], [70, 25], [75, 25],
                    [20, 30], [25, 30], [30, 30], [35, 30], [40, 30], [45, 30], [50, 30], [55, 30], [60, 30], [65, 30], [70, 30], [75, 30],
                    [20, 35], [25, 35], [30, 35], [35, 35], [40, 35], [45, 35], [50, 35], [55, 35], [60, 35], [65, 35], [70, 35], [75, 35],
                    [20, 40], [25, 40], [30, 40], [45, 40], [50, 40], [65, 40], [70, 40], [75, 40],
                    [20, 45], [25, 45], [30, 45], [45, 45], [50, 45], [65, 45], [70, 45], [75, 45],
                    [20, 50], [25, 50], [30, 50], [35, 50], [40, 50], [45, 50], [50, 50], [55, 50], [60, 50], [65, 50], [70, 50], [75, 50],
                    [25, 55], [30, 55], [35, 55], [40, 55], [45, 55], [50, 55], [55, 55], [60, 55], [65, 55], [70, 55],
                    [30, 60], [35, 60], [40, 60], [45, 60], [50, 60], [55, 60], [60, 60], [65, 60],
                    [30, 65], [35, 65], [40, 65], [45, 65], [50, 65], [55, 65], [60, 65], [65, 65],
                    [35, 70], [45, 70], [55, 70], [60, 70],
                ].map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="5" height="6" fill="url()" stroke="#5E17A6" className="
            transition-all
          "/>
                ))}
                {/* Ojos (huecos) */}
                {[
                    [35, 40], [40, 40], [35, 45], [40, 45],
                    [55, 40], [60, 40], [55, 45], [60, 45],
                ].map(([x, y], i) => (
                    <rect key={`eye-${i}`} x={x} y={y} width="5" height="5" fill="#ffffffff" />
                ))}
            </g>
        </svg>
    )
}

export function SpaceInvaderSkull() {
    const pixels = [
        // Antenas
        [30, 10], [65, 10],
        [35, 15], [60, 15],
        // Cabeza fila 1
        [40, 20], [45, 20], [50, 20], [55, 20],
        // Cabeza fila 2
        [30, 25], [35, 25], [40, 25], [45, 25], [50, 25], [55, 25], [60, 25], [65, 25],
        // Cabeza fila 3 con ojos
        [25, 30], [30, 30], [35, 30], [40, 30], [45, 30], [50, 30], [55, 30], [60, 30], [65, 30], [70, 30],
        // Fila de ojos
        [25, 35], [30, 35], [40, 35], [45, 35], [50, 35], [55, 35], [65, 35], [70, 35],
        // Cuerpo fila 1
        [25, 40], [30, 40], [35, 40], [40, 40], [45, 40], [50, 40], [55, 40], [60, 40], [65, 40], [70, 40],
        // Cuerpo fila 2
        [30, 45], [35, 45], [40, 45], [45, 45], [50, 45], [55, 45], [60, 45], [65, 45],
        // Cuerpo fila 3
        [35, 50], [40, 50], [55, 50], [60, 50],
        // Patas
        [30, 55], [35, 55], [60, 55], [65, 55],
        [25, 60], [30, 60], [65, 60], [70, 60],
    ]

    return (
        <svg viewBox="0 0 100 100" className="w-full h-full group">
            <g className="transition-all duration-500 group-hover:drop-shadow-[0_0_4px_#a855f7] dark:group-hover:drop-shadow-none hover:scale-105">
                {pixels.map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="6" height="6" fill="#5E17A6" />
                ))}
            </g>
        </svg>
    )
}


export function GreekGodSkull() {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
                {/* Gradiente para el casco */}
                <linearGradient id="helmetGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#DAA520" />
                    <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                {/* Gradiente para la piel de marmol */}
                <linearGradient id="marbleSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5f5f5" />
                    <stop offset="50%" stopColor="#e8e8e8" />
                    <stop offset="100%" stopColor="#dcdcdc" />
                </linearGradient>
                {/* Sombra */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Casco Corintio */}
            <g filter="url(#shadow)">
                {/* Cresta del casco */}
                <path
                    d="M 50 2 Q 55 5 55 12 L 55 28 Q 50 30 45 28 L 45 12 Q 45 5 50 2"
                    fill="url(#helmetGold)"
                    stroke="#8B6914"
                    strokeWidth="0.5"
                />
                {/* Plumas de la cresta */}
                <path d="M 45 5 Q 35 8 30 15 Q 40 12 45 12" fill="#C41E3A" />
                <path d="M 55 5 Q 65 8 70 15 Q 60 12 55 12" fill="#C41E3A" />
                <path d="M 50 2 Q 45 10 45 18" fill="none" stroke="#8B0000" strokeWidth="0.5" />
                <path d="M 50 2 Q 55 10 55 18" fill="none" stroke="#8B0000" strokeWidth="0.5" />

                {/* Cuerpo principal del casco */}
                <path
                    d="M 20 35 Q 15 25 25 15 Q 40 8 50 8 Q 60 8 75 15 Q 85 25 80 35 L 80 50 Q 75 55 70 52 L 70 45 Q 65 42 60 45 L 60 52 Q 55 55 50 55 Q 45 55 40 52 L 40 45 Q 35 42 30 45 L 30 52 Q 25 55 20 50 Z"
                    fill="url(#helmetGold)"
                    stroke="#8B6914"
                    strokeWidth="1"
                />

                {/* Protector nasal */}
                <path
                    d="M 47 30 L 47 52 Q 50 55 53 52 L 53 30"
                    fill="url(#helmetGold)"
                    stroke="#8B6914"
                    strokeWidth="0.5"
                />

                {/* Detalles decorativos del casco */}
                <path d="M 25 20 Q 35 18 50 18 Q 65 18 75 20" fill="none" stroke="#FFE55C" strokeWidth="1" />
                <circle cx="25" cy="30" r="2" fill="#FFE55C" />
                <circle cx="75" cy="30" r="2" fill="#FFE55C" />
            </g>

            {/* Cara visible (ojos y parte inferior) */}
            <g filter="url(#shadow)">
                {/* Ojos en las aberturas del casco */}
                <ellipse cx="35" cy="42" rx="5" ry="4" fill="#1a1a2e" />
                <ellipse cx="65" cy="42" rx="5" ry="4" fill="#1a1a2e" />
                {/* Pupilas */}
                <ellipse cx="36" cy="42" rx="2" ry="2" fill="#4a4a6a" />
                <ellipse cx="66" cy="42" rx="2" ry="2" fill="#4a4a6a" />
                {/* Brillo en los ojos */}
                <circle cx="34" cy="41" r="1" fill="#fff" opacity="0.6" />
                <circle cx="64" cy="41" r="1" fill="#fff" opacity="0.6" />
            </g>

            {/* Barba estilizada */}
            <g filter="url(#shadow)">
                {/* Forma principal de la barba */}
                <path
                    d="M 25 55 Q 22 60 25 70 Q 30 80 40 85 Q 50 92 60 85 Q 70 80 75 70 Q 78 60 75 55 Q 65 58 50 60 Q 35 58 25 55"
                    fill="url(#marbleSkin)"
                    stroke="#c0c0c0"
                    strokeWidth="0.5"
                />

                {/* Rizos de la barba */}
                <path d="M 30 62 Q 28 68 32 72" fill="none" stroke="#a0a0a0" strokeWidth="1" />
                <path d="M 35 65 Q 33 72 37 78" fill="none" stroke="#a0a0a0" strokeWidth="1" />
                <path d="M 42 68 Q 40 76 44 82" fill="none" stroke="#a0a0a0" strokeWidth="1" />
                <path d="M 50 70 Q 50 80 50 88" fill="none" stroke="#a0a0a0" strokeWidth="1" />
                <path d="M 58 68 Q 60 76 56 82" fill="none" stroke="#a0a0a0" strokeWidth="1" />
                <path d="M 65 65 Q 67 72 63 78" fill="none" stroke="#a0a0a0" strokeWidth="1" />
                <path d="M 70 62 Q 72 68 68 72" fill="none" stroke="#a0a0a0" strokeWidth="1" />

                {/* Bigote */}
                <path
                    d="M 40 56 Q 45 60 50 58 Q 55 60 60 56"
                    fill="none"
                    stroke="#b0b0b0"
                    strokeWidth="1.5"
                />
            </g>

            {/* Detalles adicionales del casco */}
            <path d="M 20 35 Q 18 40 20 45" fill="none" stroke="#B8860B" strokeWidth="1" />
            <path d="M 80 35 Q 82 40 80 45" fill="none" stroke="#B8860B" strokeWidth="1" />
        </svg>
    )
}

export function CascoSkull() {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full group hover:drop-shadow-[0_0_0.5px_#a855f7] transition-all duration-600 hover:scale-105">
            <g filter="url(#shadow)">

                {/* Cuerpo principal - solo relleno (sin stroke para no duplicar líneas) */}
                <path
                    d="M 15 50 Q 10 35 20 22 Q 35 10 50 10 Q 65 10 80 22 Q 90 35 85 50 L 85 70 Q 80 78 72 75 L 72 60 Q 65 55 58 60 L 58 75 Q 54 80 50 80 Q 46 80 42 75 L 42 60 Q 35 55 28 60 L 28 75 Q 20 78 15 70 Z"
                    fill="url()"
                    stroke="none"
                />
                <path d="M 50 5 Q 30 10 20 25 Q 35 18 46 15 L 46 8 Q 48 6 50 5" fill="url()" stroke="#5E17A6" strokeWidth="1.5" />
                <path d="M 50 5 Q 70 10 80 25 Q 65 18 54 15 L 54 8 Q 52 6 50 5" fill="url()" stroke="#5E17A6" strokeWidth="1.5" />

                {/* Contorno lateral y base — la curva superior se omite con M (salto) */}
                <path
                    d="M 15 50 Q 10 35 20 22
                       M 80 22 Q 90 35 85 50
                       L 85 70 Q 80 78 72 75
                       L 72 60 Q 65 55 58 60
                       L 58 75 Q 54 80 50 80
                       Q 46 80 42 75 L 42 60
                       Q 35 55 28 60 L 28 75
                       Q 20 78 15 70 L 15 50"
                    fill="none"
                    stroke="#5E17A6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Protector nasal */}
                <path
                    d="M 46 35 L 46 75 Q 50 80 54 75 L 54 35"
                    fill="url()"
                    stroke="#5E17A6"
                    strokeWidth="1"
                />

                {/* Remaches decorativos */}
                <circle cx="22" cy="35" r="2.5" fill="#822bdaff" stroke="#5E17A6" strokeWidth="0.5" />
                <circle cx="78" cy="35" r="2.5" fill="#822bdaff" stroke="#5E17A6" strokeWidth="0.5" />
                <circle cx="18" cy="50" r="2" fill="#822bdaff" stroke="#5E17A6" strokeWidth="0.5" />
                <circle cx="82" cy="50" r="2" fill="#822bdaff" stroke="#5E17A6" strokeWidth="0.5" />

                {/* Líneas de detalle */}
                <path d="M 25 30 Q 25 45 28 60" fill="none" stroke="#5E17A6" strokeWidth="1" />
                <path d="M 75 30 Q 75 45 72 60" fill="none" stroke="#5E17A6" strokeWidth="1" />

                {/* Borde inferior del casco */}
                <path d="M 15 70 Q 25 72 28 75" fill="none" stroke="#5E17A6" strokeWidth="1" />
                <path d="M 85 70 Q 75 72 72 75" fill="none" stroke="#5E17A6" strokeWidth="1" />
            </g>
        </svg>
    )
}
export function CascoFondoSkull() {
    return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
                {/* Gradiente para el casco */}
                <linearGradient id="helmetGold" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#DAA520" />
                    <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <linearGradient id="helmetBronze" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CD7F32" />
                    <stop offset="50%" stopColor="#B87333" />
                    <stop offset="100%" stopColor="#8B4513" />
                </linearGradient>
                {/* Sombra */}
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.4" />
                </filter>
            </defs>

            {/* Casco Corintio */}
            <g filter="url(#shadow)">
                {/* Cresta base */}
                <path
                    d="M 46 8 L 46 35 Q 50 38 54 35 L 54 8 Q 50 5 46 8"
                    fill="url(#helmetBronze)"
                    stroke="#5C4033"
                    strokeWidth="0.5"
                />

                {/* Plumas de la cresta */}
                <path d="M 50 5 Q 30 10 20 25 Q 35 18 46 15 L 46 8 Q 48 6 50 5" fill="#8B0000" />
                <path d="M 50 5 Q 70 10 80 25 Q 65 18 54 15 L 54 8 Q 52 6 50 5" fill="#C41E3A" />

                {/* Cuerpo principal del casco */}
                <path
                    d="M 15 50 Q 10 35 20 22 Q 35 10 50 10 Q 65 10 80 22 Q 90 35 85 50 L 85 70 Q 80 78 72 75 L 72 60 Q 65 55 58 60 L 58 75 Q 54 80 50 80 Q 46 80 42 75 L 42 60 Q 35 55 28 60 L 28 75 Q 20 78 15 70 Z"
                    fill="url(#helmetGold)"
                    stroke="#8B6914"
                    strokeWidth="1.5"
                />

                {/* Protector nasal */}
                <path
                    d="M 46 35 L 46 75 Q 50 80 54 75 L 54 35"
                    fill="url(#helmetGold)"
                    stroke="#8B6914"
                    strokeWidth="1"
                />

                {/* Borde superior decorativo */}
                <path d="M 20 25 Q 35 20 50 20 Q 65 20 80 25" fill="none" stroke="#FFE55C" strokeWidth="2" />

                {/* Remaches decorativos */}
                <circle cx="22" cy="35" r="2.5" fill="#FFE55C" stroke="#8B6914" strokeWidth="0.5" />
                <circle cx="78" cy="35" r="2.5" fill="#FFE55C" stroke="#8B6914" strokeWidth="0.5" />
                <circle cx="18" cy="50" r="2" fill="#FFE55C" stroke="#8B6914" strokeWidth="0.5" />
                <circle cx="82" cy="50" r="2" fill="#FFE55C" stroke="#8B6914" strokeWidth="0.5" />

                {/* Lineas de detalle */}
                <path d="M 25 30 Q 25 45 28 60" fill="none" stroke="#B8860B" strokeWidth="1" />
                <path d="M 75 30 Q 75 45 72 60" fill="none" stroke="#B8860B" strokeWidth="1" />

                {/* Borde inferior del casco */}
                <path d="M 15 70 Q 25 72 28 75" fill="none" stroke="#8B6914" strokeWidth="1" />
                <path d="M 85 70 Q 75 72 72 75" fill="none" stroke="#8B6914" strokeWidth="1" />
            </g>
        </svg>
    )
}


export function SkullOutline() {
    return (
        <svg width="120" height="120" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
            {/* Contorno de la parte superior de la cabeza */}
            <g className="fill-primary">
                <rect x="4" y="1" width="4" height="1" /> {/* Techo */}
                <rect x="3" y="2" width="1" height="1" /> <rect x="8" y="2" width="1" height="1" /> {/* Esquinas sup */}
                <rect x="2" y="3" width="1" height="4" /> <rect x="9" y="3" width="1" height="4" /> {/* Laterales */}
                <rect x="3" y="7" width="1" height="1" /> <rect x="8" y="7" width="1" height="1" /> {/* Esquinas inf */}
            </g>

            {/* Contorno de la mandíbula */}
            <g className="fill-primary">
                <rect x="4" y="8" width="1" height="2" /> <rect x="7" y="8" width="1" height="2" /> {/* Lados mandíbula */}
                <rect x="5" y="10" width="2" height="1" /> {/* Base mandíbula */}
            </g>

            {/* Ojos pixelados (Contorno) con animación de parpadeo */}
            <g className="fill-accent">
                <rect x="4" y="4" width="1" height="1">
                    <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="7" y="4" width="1" height="1">
                    <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
                </rect>
            </g>

            {/* Cavidad nasal (Un solo píxel central) */}
            <rect x="5" y="6" width="2" height="1" className="fill-text-muted opacity-40" />

            {/* Dientes (Separados) */}
            <rect x="4" y="8" width="1" height="1.5" className="" />
            <rect x="5" y="8" width="0.5" height="1.5" className="fill-primary" />
            <rect x="5" y="8" width="0.5" height="1.5" className="fill-primary" />
            <rect x="6" y="8" width="0.8" height="1.5" className="fill-primary" />

        </svg>
    )
}

interface CircleeSpigesProps {
    size?: number
}

export function CircleeSpigas({ size = 80 }: CircleeSpigesProps) {

    return (
        <svg width={size} height={size} viewBox="0 0 400 350">
            <defs>
                {/* Gradiantes */}
                <linearGradient id="BodyGradiant" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c9a0dc" />
                    <stop offset="50%" stopColor="#9b6bb3" />
                    <stop offset="100%" stopColor="#7b5a91" />
                </linearGradient>
                <radialGradient id="centerWhite" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#e8e0f0" />
                </radialGradient>
                <linearGradient id="lensGradiant" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4a3a5c" />
                    <stop offset="50%" stopColor="#2d1f3d" />
                    <stop offset="100%" stopColor="#1a1025" />
                </linearGradient>
                <linearGradient id="BrazosGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a07db8" />
                    <stop offset="100%" stopColor="#7b5a91" />
                </linearGradient>
                {/* Hoja Base */}
                <path id="hoja" d="M0 0 Q-9 12 0 25 Q9 12 0 0Z" fill="#5E17A6" />
            </defs>
            {/* Sombra */}
            <ellipse cx="200" cy="320" rx="120" ry="20" fill="#4e4e4eff" opacity="0.5" />

            {/* BRAZO IZQUIERDO */}
            <path d="M70 200 Q40 220 35 260 Q30 280 45 290" stroke="url(#BrazosGradient)" strokeWidth={18} fill="none" strokeLinecap="round" />

            {/* BRAZO DERECHO */}
            <path className="brazo-derecho" d="M330 200 Q355 180 365 150 Q370 130 350 115" stroke="url(#BrazosGradient)" strokeWidth={18} fill="none" strokeLinecap="round" />

            {/* Cuerpo Principal */}
            <circle cx="200" cy="175" r="130" fill="url(#BodyGradiant)" />

            {/* Borde Purpura */}
            <circle cx="200" cy="175" r="130" fill="none" stroke="#5E17A6" strokeWidth={5} />

            {/* Área Blanca */}
            <circle cx="200" cy="175" r="100" fill="url(#centerWhite)" />

            {/* ESPIGA IZQUIERDA */}
            < path d="M160 85 C125 85 90 150 100 190" fill="none" stroke="#5E17A6" strokeWidth="6" strokeLinecap="round" />
            {/* Par 1 - arriba */}
            <use href="#hoja" transform="translate(155, 85) rotate(-150)" />
            <use href="#hoja" transform="translate(155, 85) rotate(-75)" />
            {/* Par 2 */}
            <use href="#hoja" transform="translate(127, 100) rotate(-170)" />
            <use href="#hoja" transform="translate(127, 100) rotate(-70)" />
            {/* Par 3 */}
            <use href="#hoja" transform="translate(110, 125) rotate(-190)" />
            <use href="#hoja" transform="translate(110, 125) rotate(-90)" />
            {/* Par 4 - abajo */}
            <use href="#hoja" transform="translate(97, 155) rotate(-190)" />
            <use href="#hoja" transform="translate(97, 155) rotate(-100)" />
            {/* Par 5 - abajo */}
            <use href="#hoja" transform="translate(97, 191) rotate(-210)" />
            <use href="#hoja" transform="translate(97, 191) rotate(-130)" />


            {/* ESPIGA DERECHA */}
            <path d="M240 85 C275 85 310 150 300 190" fill="none" stroke="#5E17A6" strokeWidth="6" strokeLinecap="round" />
            {/* Par 1 - arriba */}
            <use href="#hoja" transform="translate(245, 85) rotate(75)" />
            <use href="#hoja" transform="translate(245, 85) rotate(150)" />
            {/* Par 2 */}
            <use href="#hoja" transform="translate(272, 100) rotate(70)" />
            <use href="#hoja" transform="translate(272, 100) rotate(170)" />
            {/* Par 3 */}
            <use href="#hoja" transform="translate(290, 125) rotate(90)" />
            <use href="#hoja" transform="translate(290, 125) rotate(190)" />
            {/* Par 4 - abajo */}
            <use href="#hoja" transform="translate(302, 155) rotate(100)" />
            <use href="#hoja" transform="translate(302, 155) rotate(190)" />
            {/* Par 5 - abajo */}
            <use href="#hoja" transform="translate(302, 191) rotate(-220)" />
            <use href="#hoja" transform="translate(302, 191) rotate(-140)" />


            <g className="lente" style={{ transition: "transform 0.5s ease-out" }}>
                <circle cx="200" cy="175" r="70" fill="#7c4c9f" />
                <circle cx="200" cy="175" r="63" fill="#030100" />
                <circle cx="200" cy="175" r="58" fill="#3a1b5f" />
                <circle cx="200" cy="175" r="53" fill="#000200" />
                <circle cx="200" cy="175" r="45" fill="#270f41" />
                <circle cx="200" cy="175" r="35" fill="#050312" />
                <circle cx="200" cy="175" r="32" fill="#230e3c" />
                <circle cx="200" cy="175" r="29" fill="#6a3198" />
                <circle cx="200" cy="175" r="18" fill="#2d1049" />
                {/* Reflejo */}
                <ellipse cx="182" cy="162" rx="7" ry="7" fill="#ffffff" opacity="0.3" transform="rotate(-30 185 150)" />
                <ellipse cx="192" cy="196" rx="5" ry="5" fill="#ffffff" opacity="0.3" transform="rotate(-30 185 150)" />
            </g>


            {/* <rect x="150" y="250" width="100" height="32" rx="5" fill="#f5f0e1" stroke="#2d1049" strokeWidth="1.5" transform="" />
            <text x="200" y="271" fontFamily="Lato, sans-serif" fontSize="16" fontWeight="bold"
                fill="#5E17A6" textAnchor="middle">AGUSTIN</text> */}
        </svg>
    )
}
