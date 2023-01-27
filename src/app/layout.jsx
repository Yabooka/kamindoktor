'use client'

import { useState, useEffect, useRef } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import './globals.css'

function jsonify(val) {
  return JSON.stringify(JSON.parse(val))
}
export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    if (!key) return
    const storedValue = localStorage.getItem(key) || initialValue

    localStorage.setItem(key, jsonify(state || storedValue))
  }, [state, initialValue])

  useEffect(() => {
    console.dir({
      storedValue: localStorage.getItem(key),
      state,
      initialValue,
    })
  }, [state])

  return [state, setState]
}

function browserIsDarkMode() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    'useDark',
    browserIsDarkMode()
  )
  const ref = useRef(undefined)

  useEffect(() => {
    ref.current = document.getElementsByTagName('html')[0]
  }, [])

  useEffect(() => {
    if (!ref.current) return

    ref.current.classList.replace(
      ...(!darkMode ? ['dark', 'light'] : ['light', 'dark'])
    )
  }, [darkMode])

  return (
    <html lang='en' className='dark'>
      <body className='bg-zinc-50 text-gray-900 dark:bg-gray-900 dark:text-zinc-50'>
        <div className='relative'>
          <header className='pointer-events-none relative z-50 flex flex-col'>
            <div className='order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]'></div>
            <div className='top-0 z-10 h-16 pt-6'>
              <div className='sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full'>
                <div className='mx-auto max-w-7xl lg:px-8'>
                  <div className='relative px-4 sm:px-8 lg:px-12'>
                    <div className='mx-auto max-w-2xl lg:max-w-5xl'>
                      <div className='flex'>
                        <div className='text-4xl flex-grow'>
                          <span className='dark:text-white font-medium'>
                            devmentor
                          </span>
                          <span className='text-blue-600 font-bold'>pro</span>
                          <span className='font-thin dark:text-white text-base mx-4 italic'>
                            a new web developer education experience!
                          </span>
                        </div>

                        <button
                          className='w-6 h-6 hover:cursor-pointer pointer-events-auto'
                          onClick={() => setDarkMode((prev) => !prev)}
                        >
                          {!darkMode ? <MoonIcon /> : <SunIcon />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div style={{ height: 'var(--content-offset)' }}></div>
          <main>
            <div className='sm:px-8 mt-9'>
              <div className='mx-auto max-w-7xl lg:px-8'>
                <div className='relative px-4 sm:px-8 lg:px-12'>{children}</div>
              </div>
            </div>
          </main>
          <footer></footer>
        </div>
      </body>
    </html>
  )
}
