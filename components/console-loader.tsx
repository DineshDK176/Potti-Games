"use client"

import { useEffect, useState } from "react"

export function ConsoleLoader() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)

  const bootSequence = [
    "Initializing Potti Game Store...",
    "Loading game database...",
    "Connecting to servers...",
    "Authenticating session...",
    "Fetching game catalog...",
    "Loading assets...",
    "Preparing your experience...",
    "Almost ready...",
  ]

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, bootSequence[currentLine]])
        setCurrentLine((prev) => prev + 1)
      }, 300 + Math.random() * 200)
      return () => clearTimeout(timer)
    }
  }, [currentLine, bootSequence.length])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212]">
      <div className="w-full max-w-2xl p-8">
        {/* Console Header */}
        <div className="mb-4 flex items-center gap-2 rounded-t-lg border border-[#333] bg-[#1a1a1a] px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27ca40]" />
          </div>
          <span className="ml-4 font-mono text-xs text-[#666]">potti-game-boot-sequence</span>
        </div>

        {/* Console Body */}
        <div className="rounded-b-lg border border-t-0 border-[#333] bg-[#0a0a0a] p-6 font-mono text-sm">
          {/* Logo ASCII Art */}
          <div className="mb-6 text-[#0074e4]">
            <pre className="text-xs leading-tight">
{`
  ██████╗  ██████╗ ████████╗████████╗██╗     ██████╗  █████╗ ███╗   ███╗███████╗
  ██╔══██╗██╔═══██╗╚══██╔══╝╚══██╔══╝██║    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝
  ██████╔╝██║   ██║   ██║      ██║   ██║    ██║  ███╗███████║██╔████╔██║█████╗  
  ██╔═══╝ ██║   ██║   ██║      ██║   ██║    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  
  ██║     ╚██████╔╝   ██║      ██║   ██║    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗
  ╚═╝      ╚═════╝    ╚═╝      ╚═╝   ╚═╝     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
`}
            </pre>
          </div>

          {/* Boot Lines */}
          <div className="space-y-1">
            {lines.map((line, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-[#27ca40]">[OK]</span>
                <span className="text-[#a0a0a0]">{line}</span>
              </div>
            ))}
            {currentLine < bootSequence.length && (
              <div className="flex items-center gap-2">
                <span className="animate-pulse text-[#ffbd2e]">[...]</span>
                <span className="text-[#666]">{bootSequence[currentLine]}</span>
                <span className="animate-pulse text-[#0074e4]">█</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-[#666]">
              <span>Loading...</span>
              <span>{Math.round((currentLine / bootSequence.length) * 100)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#2a2a2a]">
              <div
                className="h-full bg-[#0074e4] transition-all duration-300"
                style={{ width: `${(currentLine / bootSequence.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-6 flex items-center justify-between border-t border-[#333] pt-4 text-xs text-[#666]">
            <span>v2.0.26</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#27ca40]" />
                ONLINE
              </span>
              <span>REGION: AUTO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
