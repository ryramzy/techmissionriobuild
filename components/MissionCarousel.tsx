"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface CarouselSlide {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

export function MissionCarousel() {
  const slides: CarouselSlide[] = [
    {
      id: 1,
      src: "/images/rio_sugarloaf_digital.jpg",
      alt: "Sugarloaf Mountain digital visual background",
      title: "Tech Valley of Rio",
      description: "Empowering underserved youth overlooking Rio's tech communities."
    },
    {
      id: 2,
      src: "/images/rio_cristo_mesh.jpg",
      alt: "Christ the Redeemer with glowing tech mesh",
      title: "Grid Over the City",
      description: "Providing software development opportunities across all Rio neighborhoods."
    },
    {
      id: 3,
      src: "/images/rio_students_tech.jpg",
      alt: "Rio technical classroom study groups",
      title: "Classroom Sourcing",
      description: "Equipping graduates with dynamic technical workshops and dedicated laptops."
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Fallback map in case images fail to load
  const [imgFallbacks, setImgFallbacks] = useState<Record<number, boolean>>({})

  useEffect(() => {
    // Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)
    
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener("change", listener)
    return () => mediaQuery.removeEventListener("change", listener)
  }, [])

  // Auto-play timer loop
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, slides.length])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  const handleImageError = (id: number) => {
    setImgFallbacks((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <div 
      className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-blue-500/20 group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Rio de Janeiro landscape gallery"
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex
          const useFallback = imgFallbacks[slide.id]

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                reducedMotion ? "transition-none" : ""
              } ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}`}
              aria-hidden={!isActive}
            >
              {/* Overlay shading to guarantee text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-20" />

              {/* Dynamic Image Loader / Fallback Gradients */}
              {useFallback ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 via-black to-green-900 flex items-center justify-center p-8 text-center">
                  <div className="space-y-2 max-w-sm">
                    <span className="text-4xl">🏝️</span>
                    <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                    <p className="text-gray-400 text-xs">{slide.description}</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className={`object-cover object-center w-full h-full ${
                    reducedMotion ? "" : "animate-kenburns"
                  }`}
                  onError={() => handleImageError(slide.id)}
                />
              )}

              {/* Slide Captions */}
              <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 z-30 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <span className="inline-block bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full">
                  Verified Landscape
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {slide.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Control Buttons (Only displayed on mouse hover) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 border border-gray-800 text-white rounded-full p-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 flex items-center justify-center w-10 h-10"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 border border-gray-800 text-white rounded-full p-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 flex items-center justify-center w-10 h-10"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-green-500 w-6" : "bg-white/40 w-2.5 hover:bg-white/60"
            }`}
            aria-label={`Navigate to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
