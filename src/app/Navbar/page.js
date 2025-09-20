'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const page = () => {
  const pathname = usePathname();
    const isApiRoute = pathname.startsWith('/');

  return (
    <div>
        <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>

      {isApiRoute && (
       <div className="space-x-4">
        <Link href="/View" className="hover:underline">Display</Link>
        <Link href="/" className="hover:underline">Dashboard</Link>
      </div>
      )}
   
    </nav>
    </div>
  )
}

export default page
