import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div>
            <h3>This is navbar</h3>
            <h1><Link href={'/OrderBulk'}>Order</Link></h1>
        </div>
    )
}

export default Navbar
