'use client'
import Link from 'next/link'
import React from 'react'
import logo from '../../assets/logo2.png'
import Image from 'next/image'

import { usePathname } from 'next/navigation'


export default function Navbar() {

  const pathname = usePathname()

  const links = [

    { path: '/', element: 'Home' },
    { path: '/features', element: 'Features' },
    { path: '/about', element: 'About Us' },

  ]

  return (
    <div>

      <nav className="bg-[#FAF9F7] fixed w-full z-20 top-0 start-0 ">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-3">


          <Link href="/" className="flex items-center ">
            <Image src={logo} alt='logo' />
          </Link>


          <div className=" hidden w-full md:block md:w-auto" id="navbar-default">

            <ul className="flex items-center space-x-16">

              {links.map(link => (

                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`navbar-link ${pathname === link.path ? "active" : ""}`}
                  >
                    {link.element}
                  </Link>
                </li>

              ))}

              <div className="flex space-x-3">

                <li>
                  <Link
                    href="/auth/login"
                    className="login-btn"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/auth/register"
                    className="signup-btn"
                  >
                    Sign Up
                  </Link>
                </li>

              </div>

            </ul>

          </div>

        </div>
      </nav>

    </div>
  )
}