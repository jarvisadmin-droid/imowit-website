'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plans', label: 'Plans' },
  { href: '/shop', label: 'Shop' },
  { href: '/technology', label: 'Technology' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white text-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo-new.png"
              alt="iMowiT"
              width={150}
              height={50}
              className="h-20 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-[#56C70B]',
                  pathname === link.href
                    ? 'text-[#56C70B]'
                    : 'text-[#333333]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/inquire"
            className="bg-[#56C70B] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#43a047] transition-colors text-sm flex-shrink-0"
          >
            Get a quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#333333]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block text-base font-medium transition-colors hover:text-[#56C70B]',
                  pathname === link.href
                    ? 'text-[#56C70B]'
                    : 'text-[#333333]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inquire"
              onClick={() => setIsOpen(false)}
              className="block bg-[#56C70B] text-white px-5 py-2 rounded-lg font-medium text-center"
            >
              Get a quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}