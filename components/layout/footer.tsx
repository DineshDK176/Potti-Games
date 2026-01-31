import Link from "next/link"
import { Gamepad2 } from "lucide-react"

const footerLinks = {
  browse: [
    { label: "All Games", href: "/games" },
    { label: "Top Rated", href: "/games?ordering=-rating" },
    { label: "New Releases", href: "/games?ordering=-released" },
    { label: "Trending", href: "/games?ordering=-added" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Store EULA", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[#333] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0074e4]">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PlayVault</span>
            </Link>
            <p className="mt-4 text-sm text-[#666] leading-relaxed">
              Your ultimate destination for discovering and playing amazing games. 
              Powered by real game data from the RAWG database.
            </p>
          </div>

          {/* Browse Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666]">
              Browse
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.browse.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a0a0a0] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666]">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a0a0a0] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#666]">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a0a0a0] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#333] pt-8 md:flex-row">
          <p className="text-xs text-[#666]">
            2026 PlayVault Store. All rights reserved. Game data provided by RAWG.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-[#666] hover:text-white transition-colors">
              Facebook
            </Link>
            <Link href="#" className="text-xs text-[#666] hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-xs text-[#666] hover:text-white transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
