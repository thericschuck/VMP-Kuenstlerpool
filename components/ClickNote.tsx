'use client'
import { useEffect } from 'react'

const NOTES = ['♩', '♪', '♫', '♬']

export default function ClickNote() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const note = document.createElement('span')
      note.textContent = NOTES[Math.floor(Math.random() * NOTES.length)]
      note.style.cssText = [
        'position:fixed',
        `left:${e.clientX}px`,
        `top:${e.clientY}px`,
        'font-size:17px',
        'color:rgba(139,105,20,0.6)',
        'pointer-events:none',
        'user-select:none',
        'z-index:9999',
        'animation:clickNoteFloat 650ms ease-out forwards',
        'font-family:serif',
      ].join(';')
      document.body.appendChild(note)
      note.addEventListener('animationend', () => note.remove())
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return null
}
