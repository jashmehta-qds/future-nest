"use client"

import { motion } from "framer-motion"
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from "lucide-react"
import { useEffect, useState } from "react"

export type WeatherType = "sunny" | "cloudy" | "rainy" | "snowy" | "windy"

interface WeatherAnimationProps {
  type: WeatherType
  className?: string
}

export function WeatherAnimation({ type, className = "" }: WeatherAnimationProps) {
  const [particles, setParticles] = useState<number[]>([])

  useEffect(() => {
    // Create random particles for animations
    setParticles(Array.from({ length: type === "rainy" ? 10 : type === "snowy" ? 15 : 5 }, (_, i) => i))
  }, [type])

  if (type === "sunny") {
    return (
      <div className={`relative ${className}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="h-12 w-12 text-yellow-400" />
        </motion.div>
      </div>
    )
  }

  if (type === "cloudy") {
    return (
      <div className={`relative ${className}`}>
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: [0, 10, 0] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4"
        >
          <Cloud className="h-8 w-8 text-gray-400" />
        </motion.div>
        <motion.div
          initial={{ x: 10 }}
          animate={{ x: [0, -15, 0] }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/2 right-1/4"
        >
          <Cloud className="h-10 w-10 text-gray-300" />
        </motion.div>
      </div>
    )
  }

  if (type === "rainy") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: -5 }}
          animate={{ y: 0 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/3"
        >
          <CloudRain className="h-10 w-10 text-blue-400" />
        </motion.div>
        {particles.map((i) => (
          <motion.div
            key={i}
            initial={{
              y: -10,
              x: Math.random() * 100,
              opacity: 0,
            }}
            animate={{
              y: 100,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
            className="absolute top-0 w-1 h-4 bg-blue-400/80 rounded-full shadow-lg"
          />
        ))}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent"
          animate={{
            y: [0, 100],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    )
  }

  if (type === "snowy") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: -5 }}
          animate={{ y: 0 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/3"
        >
          <CloudSnow className="h-10 w-10 text-blue-200" />
        </motion.div>
        {particles.map((i) => (
          <motion.div
            key={i}
            initial={{
              y: -10,
              x: Math.random() * 100,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: 100,
              x: i % 2 === 0 ? "+=30" : "-=30",
              opacity: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
            className="absolute top-0 w-3 h-3 bg-white rounded-full shadow-lg"
          />
        ))}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
          animate={{
            y: [0, 100],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>
    )
  }

  if (type === "windy") {
    return (
      <div className={`relative ${className}`}>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Wind className="h-10 w-10 text-gray-500" />
        </motion.div>
        {particles.map((i) => (
          <motion.div
            key={i}
            initial={{
              x: 0,
              opacity: 0,
              y: 10 + i * 5,
            }}
            animate={{
              x: 100,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random(),
              ease: "easeOut",
            }}
            className="absolute left-0 h-0.5 w-4 bg-gray-400 rounded-full"
          />
        ))}
      </div>
    )
  }

  return null
}

export function getWeatherTypeFromCondition(condition: string): WeatherType {
  condition = condition.toLowerCase()
  if (condition.includes("rain") || condition.includes("shower")) return "rainy"
  if (condition.includes("snow") || condition.includes("sleet") || condition.includes("hail")) return "snowy"
  if (condition.includes("cloud")) return "cloudy"
  if (condition.includes("wind")) return "windy"
  return "sunny"
}

export function getBackgroundGradientForWeather(
  weatherType: WeatherType,
  timeOfDay: "morning" | "day" | "evening" | "night",
): string {
  // Base gradients on both weather and time of day
  switch (weatherType) {
    case "sunny":
      switch (timeOfDay) {
        case "morning":
          return "bg-gradient-to-br from-orange-300 via-yellow-200 to-blue-300"
        case "day":
          return "bg-gradient-to-br from-blue-400 via-blue-300 to-blue-100"
        case "evening":
          return "bg-gradient-to-br from-orange-500 via-pink-300 to-blue-400"
        case "night":
          return "bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900"
      }

    case "cloudy":
      switch (timeOfDay) {
        case "morning":
          return "bg-gradient-to-br from-gray-300 via-blue-200 to-gray-200"
        case "day":
          return "bg-gradient-to-br from-blue-300 via-gray-300 to-blue-200"
        case "evening":
          return "bg-gradient-to-br from-gray-400 via-purple-200 to-gray-300"
        case "night":
          return "bg-gradient-to-br from-gray-800 via-blue-900 to-gray-700"
      }

    case "rainy":
      switch (timeOfDay) {
        case "morning":
          return "bg-gradient-to-br from-blue-400 via-gray-300 to-blue-300"
        case "day":
          return "bg-gradient-to-br from-blue-500 via-gray-400 to-blue-400"
        case "evening":
          return "bg-gradient-to-br from-blue-600 via-gray-500 to-blue-400"
        case "night":
          return "bg-gradient-to-br from-blue-900 via-gray-800 to-blue-700"
      }

    case "snowy":
      switch (timeOfDay) {
        case "morning":
          return "bg-gradient-to-br from-blue-100 via-gray-100 to-blue-200"
        case "day":
          return "bg-gradient-to-br from-blue-200 via-gray-100 to-blue-100"
        case "evening":
          return "bg-gradient-to-br from-blue-300 via-purple-100 to-blue-200"
        case "night":
          return "bg-gradient-to-br from-blue-800 via-gray-700 to-blue-600"
      }

    case "windy":
      switch (timeOfDay) {
        case "morning":
          return "bg-gradient-to-br from-teal-200 via-gray-200 to-blue-200"
        case "day":
          return "bg-gradient-to-br from-teal-300 via-gray-200 to-blue-300"
        case "evening":
          return "bg-gradient-to-br from-teal-400 via-gray-300 to-blue-400"
        case "night":
          return "bg-gradient-to-br from-teal-800 via-gray-700 to-blue-800"
      }

    default:
      return "bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200"
  }
}

