'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import styles from "./navigation.module.css"
 
const NavLinks = () => {
  const pathname = usePathname()
 
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div>
          <Link className={`link ${pathname === '/'}`} href="/">
            <span className={styles.logo}>DEMA</span>
          </Link>
        </div>
        <div className={styles.rightnav}>
        <li>
            <Link
              className={`link ${pathname === '/' ? 'active' : ''}`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`link ${pathname === '/register' ? 'active' : ''}`}
              href="/register"
            >
              Register Device
            </Link>
          </li>
          <li>
            <Link
              className={`link ${pathname === '/search' ? 'active' : ''}`}
              href="/search"
            >
              Advanced search
            </Link>
          </li>  
        </div>
      </nav>
    </header>
  )
}

export default NavLinks