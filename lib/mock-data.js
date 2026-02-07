const initialDealerships = [
  {
    id: 'FD1',
    name: 'Ford Harahan',
    type: 'dealership',
    address: 'City Center, Harahan, LA',
    city: 'Harahan',
    state: 'LA',
    country: 'US',
    lat: 29.93750,
    lng: -90.20306,
    currentBatteryCount: 96,
    maxCapacity: 160,
    fillRate: 6,
  },
  {
    id: 'FD2',
    name: 'Ford Kenner',
    type: 'dealership',
    address: 'City Center, Kenner, LA',
    city: 'Kenner',
    state: 'LA',
    country: 'US',
    lat: 30.00972,
    lng: -90.25500,
    currentBatteryCount: 124,
    maxCapacity: 180,
    fillRate: 7,
  },
  {
    id: 'FD3',
    name: 'Ford Phoenix Downtown',
    type: 'dealership',
    address: 'City Center, Phoenix, AZ',
    city: 'Phoenix',
    state: 'AZ',
    country: 'US',
    lat: 33.44833,
    lng: -112.07389,
    currentBatteryCount: 138,
    maxCapacity: 220,
    fillRate: 9,
  },
  {
    id: 'FD4',
    name: 'Ford Mesa',
    type: 'dealership',
    address: 'City Center, Mesa, AZ',
    city: 'Mesa',
    state: 'AZ',
    country: 'US',
    lat: 33.42222,
    lng: -111.82278,
    currentBatteryCount: 82,
    maxCapacity: 150,
    fillRate: 5,
  },
  {
    id: 'FD5',
    name: 'Ford Franklin',
    type: 'dealership',
    address: 'City Center, Franklin, OH',
    city: 'Franklin',
    state: 'OH',
    country: 'US',
    lat: 39.55361,
    lng: -84.29528,
    currentBatteryCount: 72,
    maxCapacity: 140,
    fillRate: 4,
  },
  {
    id: 'FD6',
    name: 'Ford Dayton',
    type: 'dealership',
    address: 'City Center, Dayton, OH',
    city: 'Dayton',
    state: 'OH',
    country: 'US',
    lat: 39.75944,
    lng: -84.19167,
    currentBatteryCount: 164,
    maxCapacity: 240,
    fillRate: 10,
  },
  {
    id: 'FD7',
    name: 'Ford Alpharetta',
    type: 'dealership',
    address: 'City Center, Alpharetta, GA',
    city: 'Alpharetta',
    state: 'GA',
    country: 'US',
    lat: 34.07250,
    lng: -84.25833,
    currentBatteryCount: 118,
    maxCapacity: 200,
    fillRate: 7,
  },
  {
    id: 'FD8',
    name: 'Ford Atlanta',
    type: 'dealership',
    address: 'City Center, Atlanta, GA',
    city: 'Atlanta',
    state: 'GA',
    country: 'US',
    lat: 33.74889,
    lng: -84.39000,
    currentBatteryCount: 154,
    maxCapacity: 230,
    fillRate: 8,
  },
  {
    id: 'FD9',
    name: 'Ford Norcross',
    type: 'dealership',
    address: 'City Center, Norcross, GA',
    city: 'Norcross',
    state: 'GA',
    country: 'US',
    lat: 33.93778,
    lng: -84.20639,
    currentBatteryCount: 84,
    maxCapacity: 150,
    fillRate: 5,
  },
  {
    id: 'FD10',
    name: 'Ford Duluth',
    type: 'dealership',
    address: 'City Center, Duluth, GA',
    city: 'Duluth',
    state: 'GA',
    country: 'US',
    lat: 34.00528,
    lng: -84.14917,
    currentBatteryCount: 102,
    maxCapacity: 170,
    fillRate: 6,
  },
  {
    id: 'FD11',
    name: 'Ford Stone Mountain',
    type: 'dealership',
    address: 'City Center, Stone Mountain, GA',
    city: 'Stone Mountain',
    state: 'GA',
    country: 'US',
    lat: 33.80806,
    lng: -84.17028,
    currentBatteryCount: 91,
    maxCapacity: 160,
    fillRate: 6,
  },
  {
    id: 'FD12',
    name: 'Ford Decatur',
    type: 'dealership',
    address: 'City Center, Decatur, GA',
    city: 'Decatur',
    state: 'GA',
    country: 'US',
    lat: 33.77139,
    lng: -84.29778,
    currentBatteryCount: 126,
    maxCapacity: 190,
    fillRate: 7,
  },
  {
    id: 'FD13',
    name: 'Ford Redwood City',
    type: 'dealership',
    address: 'City Center, Redwood City, CA',
    city: 'Redwood City',
    state: 'CA',
    country: 'US',
    lat: 37.48278,
    lng: -122.23611,
    currentBatteryCount: 62,
    maxCapacity: 140,
    fillRate: 3,
  },
  {
    id: 'FD14',
    name: 'Ford San Jose',
    type: 'dealership',
    address: 'City Center, San Jose, CA',
    city: 'San Jose',
    state: 'CA',
    country: 'US',
    lat: 37.33611,
    lng: -121.89056,
    currentBatteryCount: 148,
    maxCapacity: 220,
    fillRate: 9,
  },
];

const recyclingCenters = [
  { id: 'RC1', name: 'Cox Recycling Center Atlanta', type: 'recycling', address: '123 Recycling Way, Atlanta, GA', city: 'Atlanta', state: 'GA', country: 'US', lat: 33.7488, lng: -84.3877 },
  { id: 'RC2', name: 'Cox Recycling Center Dallas', type: 'recycling', address: '456 Green Blvd, Dallas, TX', city: 'Dallas', state: 'TX', country: 'US', lat: 32.7767, lng: -96.7970 },
];

const zeroWasteLocations = [
  { id: 'ZW1', name: 'Cox Communications (Edwards Ave. location)', type: 'zero-waste', address: 'Harahan, LA (Edwards Ave.)', city: 'Harahan', state: 'LA', country: 'US', lat: 29.93750, lng: -90.20306 },
  { id: 'ZW2', name: 'Cox Communications (West Watkins Dr. location)', type: 'zero-waste', address: 'Phoenix, AZ (West Watkins Dr.)', city: 'Phoenix', state: 'AZ', country: 'US', lat: 33.44833, lng: -112.07389 },
  { id: 'ZW3', name: 'Cox Media Group Print Technology Center', type: 'zero-waste', address: 'Franklin, OH', city: 'Franklin', state: 'OH', country: 'US', lat: 39.55361, lng: -84.29528 },
  { id: 'ZW4', name: 'Atlanta Journal-Constitution N. Fulton Distribution Center', type: 'zero-waste', address: 'Alpharetta, GA', city: 'Alpharetta', state: 'GA', country: 'US', lat: 34.07250, lng: -84.25833 },
  { id: 'ZW5', name: 'Atlanta Journal-Constitution Printing Facility', type: 'zero-waste', address: 'Norcross, GA', city: 'Norcross', state: 'GA', country: 'US', lat: 33.93778, lng: -84.20639 },
  { id: 'ZW6', name: 'Atlanta Journal-Constitution Stone Mountain Distribution Center', type: 'zero-waste', address: 'Stone Mountain, GA', city: 'Stone Mountain', state: 'GA', country: 'US', lat: 33.80806, lng: -84.17028 },
  { id: 'ZW7', name: 'Xtime Headquarters', type: 'zero-waste', address: 'Redwood City, CA', city: 'Redwood City', state: 'CA', country: 'US', lat: 37.48278, lng: -122.23611 },
];

let allLocations = [...initialDealerships, ...recyclingCenters, ...zeroWasteLocations];
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
