export interface Case {
  id: string;
  victimName: string;
  location: string;
  status: "Active" | "Solved";
  assignedDate: string;
  reportDate: string;
  description: string;
  evidence?: string;
  progressPercentage?: number;
  urgency: "High" | "Medium" | "Low";
}

export const mockCases: Case[] = [
  {
    id: "CPL-2025-001",
    victimName: "Anonymous",
    location: "Mumbai, Maharashtra",
    status: "Active",
    assignedDate: "2025-01-15",
    reportDate: "2025-01-14",
    description: "Report of child labor in textile factory. Multiple children observed working long hours in hazardous conditions.",
    progressPercentage: 45,
    urgency: "High"
  },
  {
    id: "CPL-2025-002",
    victimName: "Rahul K.",
    location: "Delhi, NCR",
    status: "Active",
    assignedDate: "2025-01-18",
    reportDate: "2025-01-17",
    description: "Child working in restaurant kitchen, exposed to hot surfaces and sharp objects. Family in financial distress.",
    progressPercentage: 30,
    urgency: "High"
  },
  {
    id: "CPL-2025-003",
    victimName: "Anonymous",
    location: "Bangalore, Karnataka",
    status: "Solved",
    assignedDate: "2024-12-10",
    reportDate: "2024-12-09",
    description: "Children employed in electronics assembly unit. Case resolved - children placed in care facility and employer fined.",
    urgency: "Medium"
  },
  {
    id: "CPL-2025-004",
    victimName: "Priya S.",
    location: "Chennai, Tamil Nadu",
    status: "Active",
    assignedDate: "2025-01-20",
    reportDate: "2025-01-19",
    description: "Domestic child labor case. 12-year-old working as house help instead of attending school.",
    progressPercentage: 60,
    urgency: "Medium"
  },
  {
    id: "CPL-2025-005",
    victimName: "Anonymous",
    location: "Kolkata, West Bengal",
    status: "Active",
    assignedDate: "2025-01-22",
    reportDate: "2025-01-21",
    description: "Multiple children found working in fireworks manufacturing unit during festival season.",
    progressPercentage: 25,
    urgency: "High"
  },
  {
    id: "CPL-2024-098",
    victimName: "Amit P.",
    location: "Pune, Maharashtra",
    status: "Solved",
    assignedDate: "2024-11-05",
    reportDate: "2024-11-04",
    description: "Child labor in automobile repair shop. Successfully rehabilitated and enrolled in school.",
    urgency: "Low"
  },
  {
    id: "CPL-2024-099",
    victimName: "Anonymous",
    location: "Hyderabad, Telangana",
    status: "Solved",
    assignedDate: "2024-11-15",
    reportDate: "2024-11-14",
    description: "Children employed in construction site. Case closed after employer prosecution and child welfare intervention.",
    urgency: "Medium"
  },
  {
    id: "CPL-2025-006",
    victimName: "Sneha M.",
    location: "Jaipur, Rajasthan",
    status: "Active",
    assignedDate: "2025-01-25",
    reportDate: "2025-01-24",
    description: "Child working in carpet weaving unit. Investigation ongoing.",
    progressPercentage: 15,
    urgency: "Low"
  }
];
