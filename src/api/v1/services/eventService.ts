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
