import { computeDaysToFull, haversineDistance, findNearestCenter } from './fleet-utils'

const ROUTE_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

export function planRoutes(dealerships, recyclingCenters) {
  // Filter dealerships needing pickup within 7 days
  const urgent = dealerships.filter((d) => computeDaysToFull(d) <= 7)

  if (!urgent.length || !recyclingCenters.length) return []

  // Group by nearest recycling center
  const groups = {}
  urgent.forEach((dealer) => {
    const { center, distance } = findNearestCenter(dealer, recyclingCenters)
    if (!groups[center.id]) {
      groups[center.id] = { center, dealers: [] }
    }
    groups[center.id].dealers.push({ dealer, distToCenter: distance })
  })

  const routes = []
  let routeIndex = 0

  Object.values(groups).forEach((group) => {
    // Sort by urgency (lowest daysToFull first)
    group.dealers.sort((a, b) => computeDaysToFull(a.dealer) - computeDaysToFull(b.dealer))

    // Chunk into routes of up to 8 stops
    for (let i = 0; i < group.dealers.length; i += 8) {
      const chunk = group.dealers.slice(i, i + 8)

      // Greedy nearest-neighbor ordering starting from center
      const ordered = []
      const remaining = [...chunk]
      let currentLat = group.center.lat
      let currentLng = group.center.lng

      while (remaining.length > 0) {
        let nearestIdx = 0
        let nearestDist = haversineDistance(
          currentLat,
          currentLng,
          remaining[0].dealer.lat,
          remaining[0].dealer.lng
        )

        for (let j = 1; j < remaining.length; j++) {
          const dist = haversineDistance(
            currentLat,
            currentLng,
            remaining[j].dealer.lat,
            remaining[j].dealer.lng
          )
          if (dist < nearestDist) {
            nearestDist = dist
            nearestIdx = j
          }
        }

        const picked = remaining.splice(nearestIdx, 1)[0]
        ordered.push({
          dealer: picked.dealer,
          order: ordered.length + 1,
          distance: nearestDist,
        })
        currentLat = picked.dealer.lat
        currentLng = picked.dealer.lng
      }

      // Return distance (last stop back to center)
      const returnDist = haversineDistance(
        currentLat,
        currentLng,
        group.center.lat,
        group.center.lng
      )

      const totalMiles = ordered.reduce((sum, s) => sum + s.distance, 0) + returnDist
      const totalBatteries = ordered.reduce((sum, s) => sum + (s.dealer.currentBatteryCount || 0), 0)

      routes.push({
        id: `route-${routeIndex + 1}`,
        name: `Route ${routeIndex + 1}`,
        center: group.center,
        stops: ordered,
        totalMiles: Math.round(totalMiles),
        totalBatteries,
        color: ROUTE_COLORS[routeIndex % ROUTE_COLORS.length],
      })
      routeIndex++
    }
  })

  return routes
}
