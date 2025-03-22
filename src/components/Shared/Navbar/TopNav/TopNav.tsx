"use client"
import { Sparkles } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const TopNav = () => {
    const session = useSession()
    return (
        <div>
            <div className="flex justify-between items-center px-4 py-2 border-b">
                <h3 className="flex font-medium text-white py-1 px-4 rounded bg-black"> <span><Sparkles className="mr-2 text-yellow-400" /></span> Exclusive Sell</h3>

                {session.status === "authenticated" ? (
                    <>
                        <button onClick={() => signOut()} className="text-sm hover:text-black transition cursor-pointer text-blue-500">Logout</button>
                    </>
                ) : (
                    <Link href={'/login'}>
                        <button className="text-sm hover:text-black transition cursor-pointer text-blue-500">Login</button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default TopNav
