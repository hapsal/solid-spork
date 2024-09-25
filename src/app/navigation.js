'use client'
 
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
 
const NavLinks = () => {
  const pathname = usePathname()
 
  return (
    <nav>
      <h1>Device management</h1>
      <div>
        <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
          Home
        </Link>
        <Link
          className={`link ${pathname === '/register' ? 'active' : ''}`}
          href="/register"
        >
          Register Device
        </Link> 
      </div>
    </nav>
  )
}

export default NavLinks