'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

import styles from "./navigation.module.css"
 
const NavLinks = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }
 
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div>
          <Link className={`link ${pathname === '/'}`} href="/">
            <span className={styles.logo}>DEMA</span>
          </Link>
        </div>
        <div className={styles.rightnav}>
        <div className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.line1Active : ''}`}></div>
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.line2Active : ''}`}></div>
          <div className={`${styles.burgerLine} ${isMenuOpen ? styles.line3Active : ''}`}></div>
       </div>
       <ul className={`${styles.rightnav} ${isMenuOpen ? styles.active : ''}`}>
          <li>
              <Link
                className={`link ${pathname === '/' ? 'active' : ''}`}
                href="/"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`link ${pathname === '/register' ? 'active' : ''}`}
                href="/register"
                onClick={handleLinkClick}
              >
                Register Device
              </Link>
            </li>
            <li>
              <Link
                className={`link ${pathname === '/search' ? 'active' : ''}`}
                href="/search"
                onClick={handleLinkClick}
              >
                Advanced search
              </Link>
            </li> 
          </ul> 
        </div>
      </nav>
    </header>
  )
}

export default NavLinks