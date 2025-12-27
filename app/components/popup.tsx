'use client'

import { ReactNode, useState, useRef, useEffect } from 'react'

type Position = {
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
}

type PopupProps = {
  children: ReactNode
  title?: ReactNode
  variant?: 'image' | 'text' | 'chest'
  initialPosition: Position
  width?: string
  initialZIndex?: number
  className?: string
}

let globalMaxZIndex = 100

export function Popup({
  children,
  title,
  variant = 'image',
  initialPosition,
  width = 'auto',
  initialZIndex = 10,
  className = '',
}: PopupProps) {
  const [position, setPosition] = useState<Position>(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [zIndex, setZIndex] = useState(initialZIndex)
  const popupRef = useRef<HTMLDivElement>(null)

  const bringToFront = () => {
    globalMaxZIndex += 1
    setZIndex(globalMaxZIndex)
  }

  // Convert viewport units to pixels
  const convertToPixels = (value: number | string | undefined, dimension: 'width' | 'height'): number => {
    if (value === undefined) return 0
    if (typeof value === 'number') return value
    
    const numValue = parseFloat(value)
    if (value.includes('vw')) {
      return (numValue / 100) * window.innerWidth
    } else if (value.includes('vh')) {
      return (numValue / 100) * window.innerHeight
    } else if (value.includes('%')) {
      const container = dimension === 'width' ? window.innerWidth : window.innerHeight
      return (numValue / 100) * container
    }
    return parseFloat(value) || 0
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    bringToFront()
    
    setIsDragging(true)
    
    const currentLeft = position.left !== undefined 
      ? convertToPixels(position.left, 'width')
      : (window.innerWidth - convertToPixels(position.right, 'width'))
    const currentTop = position.top !== undefined 
      ? convertToPixels(position.top, 'height')
      : (window.innerHeight - convertToPixels(position.bottom, 'height'))
    
    setDragStart({
      x: e.clientX - currentLeft,
      y: e.clientY - currentTop,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          left: e.clientX - dragStart.x,
          top: e.clientY - dragStart.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

  const positionStyles = {
    top: position.top !== undefined 
      ? (typeof position.top === 'number' ? `${position.top}px` : position.top)
      : undefined,
    bottom: position.bottom !== undefined 
      ? (typeof position.bottom === 'number' ? `${position.bottom}px` : position.bottom)
      : undefined,
    left: position.left !== undefined 
      ? (typeof position.left === 'number' ? `${position.left}px` : position.left)
      : undefined,
    right: position.right !== undefined 
      ? (typeof position.right === 'number' ? `${position.right}px` : position.right)
      : undefined,
    width: width,
    zIndex: zIndex,
  }

  return (
    <div
      ref={popupRef}
      className={`absolute cursor-move select-none ${className}`}
      style={positionStyles}
      onMouseDown={handleMouseDown}
    >
    {/* Tape */ }
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-neutral-200/60 shadow-sm rotate-2 z-[-1]" />

      {/* Polaroid Container */}
      {/* Chest if */}
      <div className="bg-white p-3 shadow-2xl"
        style={
          variant === 'chest'
            ? { 
            /* TODO: fix chest backgroundImage being too dark */
              backgroundImage: "url('/images/general/chest.jpg')",
            }
            : {}
        }>
        {/* Content Area */}
        <div className={
          variant === 'text'
            ? 'bg-white w-full flex items-center justify-center'
            : 'bg-neutral-100 w-full'
        }>
          {children}
        </div>
        
        {/* Caption Area */}
        {title && (
          <div className="pt-5 pb-2 px-2">
            <div className="text-sm md:text-base text-neutral-800 text-center font-['MaShanZheng'] max-h-0 flex items-center justify-center">
              {title}
            </div>
          </div>
        )}
     </div>
    </div>
  )
}
