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
