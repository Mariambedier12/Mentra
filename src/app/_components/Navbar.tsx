'use client'

import Link from 'next/link'
import React from 'react'
import logo from '../../assets/logo2.png'
import Image from 'next/image'

import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {

  const pathname = usePathname()
  const { data: session, status } = useSession()


  /*Authentication Flash*/
  /*if (status === "loading") return null;*/

  if (pathname.startsWith("/quiz")) return null;

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
      <nav className="bg-[#FAF9F7] fixed w-full z-20 top-0 start-0">

        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-3 px-1">

          <Link href="/" className="flex items-center">
            <Image src={logo} alt='logo' />
          </Link>

          <div className="hidden w-full md:block md:w-auto">

            <ul className="flex items-center space-x-16">

              {status === "authenticated" ? (
                <>


                  {privateLinks.map(link => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className={`navbar-link ${pathname === link.path ? "active" : ""}`}
                      >
                        {link.element}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {publicLinks.map(link => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className={`navbar-link ${pathname === link.path ? "active" : ""}`}
                      >
                        {link.element}
                      </Link>
                    </li>
                  ))}

                  <div className="flex items-center space-x-3">
                    <li>
                      <Link href="/auth/login" className="login-btn cursor-pointer">
                        Login
                      </Link>
                    </li>

                    <li>
                      <Link href="/auth/register" className="signup-btn cursor-pointer">
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