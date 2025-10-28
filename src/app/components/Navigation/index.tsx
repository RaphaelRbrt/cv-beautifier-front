'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppDispatch, useAppSelector, clearToken } from '@/app/store'
import { client } from '@/lib'
import { LOGOUT } from '@/graphql'
import Logo from '../Logo'
import * as s from './styles.css'

export default function Navigation(): React.JSX.Element {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isAuthenticated = !!auth.token

  const handleLogout = async (): Promise<void> => {
    try {
      await client.mutate({ mutation: LOGOUT })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      dispatch(clearToken())
      router.push('/login')
    }
  }

  const navLinks = isAuthenticated
    ? [
        { href: '/profile', label: 'Profil' },
        { href: '/analyse', label: 'Analyse' },
      ]
    : []

  return (
    <header className={s.header}>
      <div className={s.logo} onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
        <Logo />
      </div>

      {!isMobile && (
        <div className={s.headerRight}>
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                onClick={() => router.push(link.href)}
                style={{
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: pathname === link.href ? 700 : 400,
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  opacity: pathname === link.href ? 1 : 0.8,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {isAuthenticated ? (
            <button
              className={s.connexionButton}
              onClick={() => {
                void handleLogout()
              }}
            >
              Déconnexion
            </button>
          ) : (
            <button
              className={s.connexionButton}
              onClick={() => router.push(pathname === '/login' ? '/register' : '/login')}
            >
              {pathname === '/login' ? 'Inscription' : 'Connexion'}
            </button>
          )}
        </div>
      )}

      {isMobile && (
        <>
          <button
            className={s.burgerMenu}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={s.burgerLine}
              style={{
                transform: isMobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                transition: 'transform 0.3s',
              }}
            ></span>
            <span
              className={s.burgerLine}
              style={{
                opacity: isMobileMenuOpen ? 0 : 1,
                transition: 'opacity 0.3s',
              }}
            ></span>
            <span
              className={s.burgerLine}
              style={{
                transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                transition: 'transform 0.3s',
              }}
            ></span>
          </button>

          {isMobileMenuOpen && (
            <>
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 998,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '280px',
                  maxWidth: '80vw',
                  backgroundColor: '#fff',
                  zIndex: 999,
                  padding: '24px',
                  boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    marginBottom: 16,
                    paddingBottom: 16,
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <Logo />
                </div>

                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    onClick={() => {
                      router.push(link.href)
                      setIsMobileMenuOpen(false)
                    }}
                    style={{
                      cursor: 'pointer',
                      fontSize: 16,
                      fontWeight: pathname === link.href ? 700 : 400,
                      color: pathname === link.href ? '#111' : '#666',
                      padding: '12px 16px',
                      borderRadius: 8,
                      backgroundColor: pathname === link.href ? '#f3f4f6' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {link.label}
                  </a>
                ))}

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: 16,
                    borderTop: '1px solid #e5e7eb',
                  }}
                >
                  {isAuthenticated ? (
                    <button
                      className={s.connexionButton}
                      onClick={() => {
                        void handleLogout()
                      }}
                      style={{ width: '100%' }}
                    >
                      Déconnexion
                    </button>
                  ) : (
                    <button
                      className={s.connexionButton}
                      onClick={() => {
                        router.push(pathname === '/login' ? '/register' : '/login')
                        setIsMobileMenuOpen(false)
                      }}
                      style={{ width: '100%' }}
                    >
                      {pathname === '/login' ? 'Inscription' : 'Connexion'}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </header>
  )
}
