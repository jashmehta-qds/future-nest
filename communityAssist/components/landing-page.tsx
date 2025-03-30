"use client"

import { Button } from "@/components/ui/button"
import { Autocomplete, useLoadScript } from "@react-google-maps/api"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface LandingPageProps {
  userLocation: string
  setUserLocation: (location: string) => void
  handlePinCodeSubmit: () => Promise<void>
  isLoading: boolean
}

export function LandingPage({ userLocation, setUserLocation, handlePinCodeSubmit, isLoading }: LandingPageProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  })

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if (place.formatted_address) {
        setUserLocation(place.formatted_address)
        const postalCode = place.address_components?.find(
          (component) => component.types.includes("postal_code")
        )?.long_name
        if (postalCode) {
          handlePinCodeSubmit()
        }
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userLocation.trim()) {
      handlePinCodeSubmit()
    }
  }

  if (!isLoaded) {
    return <div></div>
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Weather & Community Insights</h1>
        <p className="text-lg md:text-xl text-white/80 max-w-md mx-auto">
          Enter your location to get real-time weather updates and community information
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-md backdrop-blur-md bg-white/20 p-6 rounded-xl border border-white/20 shadow-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <MapPin className="h-5 w-5" />
            </div>
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter Location or Pin Code"
                className="pl-10 bg-white/50 border-white/30 focus-visible:ring-primary/50 w-full h-12 text-lg rounded-md"
              />
            </Autocomplete>
          </div>
          <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full mr-2"></div>
                <span>Loading...</span>
              </div>
            ) : (
              <span>Get Weather Insights</span>
            )}
          </Button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-12 text-center text-white/70 text-sm"
      >
        <p>Get accurate weather forecasts, property insights, and climate risk assessments</p>
      </motion.div>
    </div>
  )
}

