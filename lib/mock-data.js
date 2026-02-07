const initialDealerships = [
  { id: '1', name: 'AutoNation Ford Atlanta', type: 'dealership', address: '2400 Peachtree Rd NW, Atlanta, GA 30305', city: 'Atlanta', state: 'GA', country: 'US', lat: 33.8463, lng: -84.3621, currentBatteryCount: 142, maxCapacity: 200, fillRate: 8 },
  { id: '2', name: 'Hendrick Toyota Dallas', type: 'dealership', address: '6025 LBJ Fwy, Dallas, TX 75240', city: 'Dallas', state: 'TX', country: 'US', lat: 32.9337, lng: -96.7892, currentBatteryCount: 89, maxCapacity: 150, fillRate: 5 },
  { id: '3', name: 'Penske Chevrolet Indianapolis', type: 'dealership', address: '2901 W 86th St, Indianapolis, IN 46268', city: 'Indianapolis', state: 'IN', country: 'US', lat: 39.9085, lng: -86.2360, currentBatteryCount: 45, maxCapacity: 120, fillRate: 3 },
  { id: '4', name: 'Larry H. Miller Denver', type: 'dealership', address: '8101 W Colfax Ave, Lakewood, CO 80214', city: 'Lakewood', state: 'CO', country: 'US', lat: 39.7401, lng: -105.0712, currentBatteryCount: 178, maxCapacity: 250, fillRate: 12 },
  { id: '5', name: 'Sewell Lexus Fort Worth', type: 'dealership', address: '5000 Bryant Irvin Rd, Fort Worth, TX 76132', city: 'Fort Worth', state: 'TX', country: 'US', lat: 32.6687, lng: -97.4111, currentBatteryCount: 67, maxCapacity: 100, fillRate: 4 },
  { id: '6', name: 'Chapman BMW Phoenix', type: 'dealership', address: '1144 E Camelback Rd, Phoenix, AZ 85014', city: 'Phoenix', state: 'AZ', country: 'US', lat: 33.5094, lng: -112.0559, currentBatteryCount: 190, maxCapacity: 220, fillRate: 10 },
  { id: '7', name: 'Galpin Ford Los Angeles', type: 'dealership', address: '15505 Roscoe Blvd, North Hills, CA 91343', city: 'North Hills', state: 'CA', country: 'US', lat: 34.2290, lng: -118.4881, currentBatteryCount: 30, maxCapacity: 180, fillRate: 2 },
  { id: '8', name: 'Jim Ellis VW Atlanta', type: 'dealership', address: '5880 Peachtree Industrial Blvd, Chamblee, GA 30341', city: 'Chamblee', state: 'GA', country: 'US', lat: 33.8912, lng: -84.2998, currentBatteryCount: 110, maxCapacity: 140, fillRate: 7 },
];

const recyclingCenters = [
  { id: 'RC1', name: 'Cox Recycling Center Atlanta', type: 'recycling', address: '123 Recycling Way, Atlanta, GA', city: 'Atlanta', state: 'GA', country: 'US', lat: 33.7488, lng: -84.3877 },
  { id: 'RC2', name: 'Cox Recycling Center Dallas', type: 'recycling', address: '456 Green Blvd, Dallas, TX', city: 'Dallas', state: 'TX', country: 'US', lat: 32.7767, lng: -96.7970 },
];

let allLocations = [...initialDealerships, ...recyclingCenters];
let totalBatteriesRecycled = 0;
let subscribers = [];

const NOTIFICATION_THRESHOLD_PERCENTAGE = 0.8; // 80% capacity

function notifySubscribers() {
  subscribers.forEach(callback => callback());
}

export function subscribeToMockData(callback) {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter(sub => sub !== callback);
  };
}

export function getMockLocations() {
  return allLocations;
}

export function getTotalBatteriesRecycled() {
  return totalBatteriesRecycled;
}

export function simulatePickup(dealershipId) {
  const dealership = allLocations.find(loc => loc.id === dealershipId && loc.type === 'dealership');
  if (dealership) {
    totalBatteriesRecycled += dealership.currentBatteryCount;
    dealership.currentBatteryCount = 0; // Reset after pickup
    console.log(`Simulated pickup at ${dealership.name}. Batteries recycled: ${totalBatteriesRecycled}`);
    notifySubscribers();
  }
}

// Simulate battery fill rate and potential notifications
setInterval(() => {
  let changed = false;
  allLocations = allLocations.map(location => {
    if (location.type === 'dealership') {
      const newBatteryCount = location.currentBatteryCount + location.fillRate;
      if (newBatteryCount <= location.maxCapacity) {
        location.currentBatteryCount = newBatteryCount;
        changed = true;
      } else {
        location.currentBatteryCount = location.maxCapacity;
      }

      // Check for notification threshold
      if (location.currentBatteryCount >= location.maxCapacity * NOTIFICATION_THRESHOLD_PERCENTAGE && !location.needsPickupNotification) {
        location.needsPickupNotification = true;
        console.log(`NOTIFICATION: ${location.name} is at ${((location.currentBatteryCount / location.maxCapacity) * 100).toFixed(0)}% capacity!`);
        // In a real scenario, this would trigger a visible notification in the UI
        changed = true;
      } else if (location.currentBatteryCount < location.maxCapacity * NOTIFICATION_THRESHOLD_PERCENTAGE && location.needsPickupNotification) {
        location.needsPickupNotification = false; // Reset notification if capacity drops below threshold
        changed = true;
      }
    }
    return location;
  });

  if (changed) {
    notifySubscribers();
  }
}, 5000); // Update every 5 seconds

// Simulate a pickup for a full dealership every 30 seconds
setInterval(() => {
  const fullDealership = allLocations.find(loc => 
    loc.type === 'dealership' && 
    loc.currentBatteryCount >= loc.maxCapacity * NOTIFICATION_THRESHOLD_PERCENTAGE &&
    loc.needsPickupNotification // Ensure it's one that triggered a notification
  );
  if (fullDealership) {
    simulatePickup(fullDealership.id);
  }
}, 30000); // Attempt pickup every 30 seconds
