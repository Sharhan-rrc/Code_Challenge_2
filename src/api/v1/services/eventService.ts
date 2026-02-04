// Data Interfaces
interface Event {
  id: number;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
}

interface Attendee {
  id: number;
  name: string;
  email: string;
}

interface PopularityResponse {
  id: number;
  name: string;
  date: string;
  capacity: number;
  registrationCount: number;
  spotsRemaining: number;
  popularityScore: number;
  popularityTier: string;
}


// Hardcoded sample data
let events: Event[] = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-03-15T09:00:00.000Z",
    capacity: 200,
    registrationCount: 185,
  },
  {
    id: 2,
    name: "Startup Pitch Night 2025",
    date: "2025-02-20T18:00:00.000Z",
    capacity: 50,
    registrationCount: 12,
  },
  {
    id: 3,
    name: "Web Dev Workshop",
    date: "2025-02-10T10:00:00.000Z",
    capacity: 30,
    registrationCount: 30,
  },
];

let attendees: Attendee[] = [
  {
    id: 1,
    name: "Jordan Smith",
    email: "jordan.smith@email.com",
  },
  {
    id: 2,
    name: "Alex Chen",
    email: "alex.chen@email.com",
  },
];

let nextEventId = 4;

// Get all events
export const getAllEvents = (): Event[] => {
  return events;
};

// Get event by ID
export const getEventById = (id: number): Event | undefined => {
  return events.find((event) => event.id === id);
};

// Create new event
export const createEvent = (
  name: string,
  date: string,
  capacity: number
): Event => {
  const newEvent: Event = {
    id: nextEventId,
    name,
    date,
    capacity,
    registrationCount: 0,
  };

  events.push(newEvent);
  nextEventId++;

  return newEvent;
};

// Update event
export const updateEvent = (
  id: number,
  name: string,
  date: string,
  capacity: number
): Event | null => {
    const event = events.find((e) => e.id === id);

    if (!event) {
        return null;
    }

    event.name = name;
    event.date = date;
    event.capacity = capacity;

    return event;
};

// Delete event
export const deleteEvent = (id: number): boolean => {
    const index = events.findIndex((e) => e.id === id);

    if (index === -1) {
        return false;
    }

    events.splice(index, 1);
    return true;
};

// Calculate popularity score and tier
export const calculatePopularity = (id: number): PopularityResponse | null => {
  const event = events.find((e) => e.id === id);

  if (!event) {
    return null;
  }

// Calculate Popularity score
let popularityScore = 0;
if (event.capacity > 0) {
  popularityScore =
    (event.registrationCount / event.capacity) * 100;
}

// Round to 1 decimal place
popularityScore = Math.round(popularityScore * 10) / 10;

// Determine tear
let popularityTier = "New";
if (popularityScore >= 90) {
    popularityTier = "Hot";
} else if (popularityScore >= 70) {
    popularityTier = "Popular";
} else if (popularityScore >= 50) {
    popularityTier = "Moderate";
} else if (popularityScore >= 25) {
    popularityTier = "Building";
}

// Calculate spots remaining
const spotsRemaining = event.capacity - event.registrationCount;
    
    return {
        id: event.id,
        name: event.name,
        date: event.date,
        capacity: event.capacity,
        registrationCount: event.registrationCount,
        spotsRemaining,
        popularityScore,
        popularityTier,
    };
}

// Get all attendees
export const getAllAttendees = (): Attendee[] => {
    return attendees;
};