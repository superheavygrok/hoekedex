'use client';

import React from 'react';

interface PokedexDeviceProps {
  children: React.ReactNode;
  /** Optional overlay (e.g. tutorial) that will be rendered on top of the full visible screen area */
  tutorialOverlay?: React.ReactNode;
}

export default function PokedexDevice({ children, tutorialOverlay }: PokedexDeviceProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 md:p-12">
      {/* Premium Gen 1 HokeDex Shell - High-end execution */}
      <div 
        className="relative w-full max-w-[980px] bg-[#B71C1C] rounded-[22px] border-[18px] border-[#7F1212] overflow-hidden"
        style={{
          boxShadow: `
            0 40px 90px -15px rgba(0, 0, 0, 0.9),
            0 0 0 1px #5C0E0E,
            inset 0 12px 24px rgba(255,255,255,0.18),
            inset 0 -20px 30px rgba(0,0,0,0.65),
            inset 0 2px 4px rgba(255,255,255,0.1)
          `
        }}
      >
        {/* Upper lid - more accurate Gen 1 proportions with premium finish */}
        <div className="h-[72px] bg-gradient-to-b from-[#9F1616] to-[#B71C1C] flex items-center justify-between px-9 border-b-[8px] border-[#6B0F0F] relative">
          <div className="flex items-center gap-4">
            <div 
              className="font-black text-white text-5xl tracking-[-6px] leading-none font-mono select-none"
              style={{ 
                textShadow: '4px 4px 0 #000, -1px -1px 0 #000, 0 0 8px rgba(0,0,0,0.6)',
                fontFeatureSettings: '"tnum"'
              }}
            >
              HokeDex
            </div>
            <div className="text-[#E8D4B8] text-[10px] font-mono tracking-[4px] mt-2.5 opacity-80">GEN I</div>
          </div>

          {/* Premium status cluster */}
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#39FF14] shadow-[0_0_8px_#39FF14,0_0_16px_#39FF14] ring-1 ring-[#39FF14]/30" />
              <div className="w-3 h-3 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700,0_0_16px_#FFD700] ring-1 ring-[#FFD700]/30" />
            </div>
            <div className="text-[#E8D4B8] text-[9px] font-mono tracking-[2px] opacity-70">SYSTEM READY</div>
          </div>
        </div>

        {/* Main body with screen */}
        <div className="p-6 bg-[#B71C1C]">
          <div 
            className="bg-[#0A0A0A] border-[16px] border-[#1A1A1A] rounded-[4px] overflow-hidden relative"
            style={{
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.9), 0 0 0 8px #111'
            }}
          >
            {/* High-end screen content area */}
            <div className="min-h-[560px] max-h-[640px] overflow-y-auto bg-[#0F0F0F] p-6 text-sm custom-pokedex-scroll">
              {children}
            </div>

            {/* Subtle high-quality CRT + scanline effect */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.08]" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)
                `,
                backgroundSize: '4px 4px'
              }} 
            />

            {/* Tutorial / overlay layer — covers the full visible screen area inside the bezel */}
            {tutorialOverlay}
          </div>
        </div>

        {/* Lower control deck - refined hardware feel */}
        <div className="h-20 bg-gradient-to-b from-[#9F1616] to-[#B71C1C] border-t-[8px] border-[#6B0F0F] px-8 flex items-center justify-between">
          
          {/* Speaker array - more detailed */}
          <div className="pl-2">
            <div className="flex flex-col gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-1">
                  {Array.from({ length: 9 }).map((_, j) => (
                    <div key={j} className="w-[2px] h-[2px] bg-black/60 rounded-full" />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Premium Physical Buttons - satisfying hardware feel */}
          <div className="flex gap-3 pr-2">
            {[
              { label: 'CATCH', event: 'pokedex-new-catch' },
              { label: 'SCAN', event: 'pokedex-analyze' },
              { label: 'EVOLVE', event: 'pokedex-evolve' }
            ].map((btn, index) => (
              <button
                key={index}
                onClick={() => window.dispatchEvent(new CustomEvent(btn.event))}
                className="h-10 px-6 bg-[#161616] hover:bg-[#1f1f1f] active:bg-black text-[#E8D4B8] text-[10px] font-bold tracking-[2px] rounded border border-[#333] active:scale-[0.97] transition-all duration-75"
                style={{ 
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.7), 0 1px 1px rgba(0,0,0,0.4)',
                  fontFeatureSettings: '"tnum"'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subtle upper hinge detail */}
        <div className="absolute left-0 right-0 top-[72px] h-[1px] bg-black/30" />
      </div>
    </div>
  );
}
