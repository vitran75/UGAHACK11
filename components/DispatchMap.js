'use client'

import { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function DispatchMap({ routes, selectedRouteId, onSelectRoute }) {
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

    if (!routes || !routes.length) return

    routes.forEach((route) => {
      const isSelected = route.id === selectedRouteId
      const opacity = selectedRouteId && !isSelected ? 0.25 : 1

      // Recycling center marker
      const centerIcon = L.divIcon({
        className: 'fleet-marker',
        html: `<div class="fleet-marker-center" style="border-color:${route.color}">&#9851;</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })

      L.marker([route.center.lat, route.center.lng], { icon: centerIcon, opacity })
        .addTo(map)
        .bindPopup(`<strong>${route.center.name}</strong><br/>Recycling Center`)

      // Build polyline coords: center -> stops -> center
      const coords = [[route.center.lat, route.center.lng]]
      route.stops.forEach((stop) => {
        coords.push([stop.dealer.lat, stop.dealer.lng])

        // Stop marker with number
        const stopIcon = L.divIcon({
          className: 'fleet-marker',
          html: `<div class="fleet-marker-stop" style="background:${route.color}">${stop.order}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        L.marker([stop.dealer.lat, stop.dealer.lng], { icon: stopIcon, opacity })
          .addTo(map)
          .bindPopup(
            `<strong>${stop.dealer.name}</strong><br/>${stop.dealer.currentBatteryCount} batteries<br/>${Math.round(stop.distance)} mi from prev`
          )
      })
      coords.push([route.center.lat, route.center.lng])

      const polyline = L.polyline(coords, {
        color: route.color,
        weight: isSelected ? 4 : 2,
        opacity,
        dashArray: isSelected ? null : '6,4',
      }).addTo(map)

      polyline.on('click', () => onSelectRoute?.(route.id))
    })

    // Fit bounds
    const allCoords = routes.flatMap((r) => [
      [r.center.lat, r.center.lng],
      ...r.stops.map((s) => [s.dealer.lat, s.dealer.lng]),
    ])
    if (allCoords.length) {
      map.fitBounds(allCoords, { padding: [30, 30] })
    }

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [routes, selectedRouteId, onSelectRoute])

  return <div ref={containerRef} className="dispatch-map-leaflet" />
}
