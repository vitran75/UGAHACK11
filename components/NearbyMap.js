'use client'

import { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { computeRiskLevel, getRiskColor } from '@/lib/fleet-utils'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function NearbyMap({
  dealerships,
  recyclingCenters = [],
  selectedId,
  onSelectDealership,
}) {
  const mapRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const map = L.map(containerRef.current).setView([39.8283, -98.5795], 4)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    // Dealership markers (colored circles by risk)
    dealerships.forEach((d) => {
      const risk = computeRiskLevel(d)
      const color = getRiskColor(risk)
      const isSelected = d.id === selectedId
      const pulseClass = isSelected ? ' fleet-marker-pulse' : ''

      const icon = L.divIcon({
        className: 'fleet-marker',
        html: `<div class="fleet-marker-dot${pulseClass}" style="background:${color};border-color:${color}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })

      const marker = L.marker([d.lat, d.lng], { icon }).addTo(map)
      marker.bindPopup(
        `<strong>${d.name}</strong><br/>${d.address}<br/>Batteries: ${d.currentBatteryCount} / ${d.maxCapacity}`
      )
      marker.on('click', () => onSelectDealership?.(d.id))
    })

    // Recycling center markers (blue squares)
    recyclingCenters.forEach((c) => {
      const icon = L.divIcon({
        className: 'fleet-marker',
        html: `<div class="fleet-marker-center">&#9851;</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const marker = L.marker([c.lat, c.lng], { icon }).addTo(map)
      marker.bindPopup(`<strong>${c.name}</strong><br/>Recycling Center`)
    })

    // Fit bounds
    const all = [...dealerships, ...recyclingCenters]
    if (all.length) {
      const bounds = all.map((d) => [d.lat, d.lng])
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 12 })
    }

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [dealerships, recyclingCenters, selectedId, onSelectDealership])

  return <div ref={containerRef} className="nearby-map-leaflet" />
}
