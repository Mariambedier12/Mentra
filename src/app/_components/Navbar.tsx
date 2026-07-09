'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../assets/logo2.png'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Navbar() {

  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)


  if (pathname.startsWith("/quiz") || pathname.startsWith("/study-session")) return null;

  const publicLinks = [
    { path: '/', element: 'Home' },
    { path: '/features', element: 'Features' },
    { path: '/about', element: 'About Us' },
  ]

  const privateLinks = [
    { path: '/upload', element: 'Home' },
    { path: '/todo', element: 'To Do' },
    { path: '/insights', element: 'Insights' },
    { path: '/profile', element: 'Profile' },
  ]

  return (
    <div>
      <nav className="bg-[#FAF9F7] fixed w-full z-30 top-0 start-0 border-b border-gray-100 shadow-xs">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-3 px-4 md:px-8">
          <Link href="/" className="flex items-center z-40">
            <Image src={logo} alt='logo' />
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-40 p-2 text-[#091A58] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Links Container */}
          <div className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center absolute md:static top-full left-0 w-full md:w-auto bg-[#FAF9F7] md:bg-transparent border-b md:border-none border-gray-200 shadow-md md:shadow-none py-6 md:py-0 z-30`}>
            <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-0 md:space-x-16 w-full md:w-auto">
              {status === "authenticated" ? (
                <>
                  {privateLinks.map(link => (
                    <li key={link.path} className="w-full text-center md:w-auto">
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`navbar-link block py-2 md:py-0 ${pathname === link.path ? "active" : ""}`}
                      >
                        {link.element}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {publicLinks.map(link => (
                    <li key={link.path} className="w-full text-center md:w-auto">
                      <Link
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`navbar-link block py-2 md:py-0 ${pathname === link.path ? "active" : ""}`}
                      >
                        {link.element}
                      </Link>
                    </li>
                  ))}
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-3 mt-4 md:mt-0 px-6 md:px-0">
                    <li>
                      <Link 
                        href="/auth/login" 
                        onClick={() => setIsOpen(false)}
                        className="login-btn cursor-pointer block text-center py-2 px-6"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/auth/register" 
                        onClick={() => setIsOpen(false)}
                        className="signup-btn cursor-pointer block text-center py-2 px-6"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}