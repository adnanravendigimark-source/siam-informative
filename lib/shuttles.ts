export interface ShuttleStop {
  area: string;
  location: string;
  notes: string;
}

export const FREE_SHUTTLE_STOPS: ShuttleStop[] = [
  // Los Cristianos
  {
    area: "Los Cristianos",
    location: "CC Pasarela (Shopping Center)",
    notes: "Main pickup point in southern Los Cristianos, near the port & harbor.",
  },
  {
    area: "Los Cristianos",
    location: "Hotel Sol Arona Tenerife",
    notes: "Bus stop located directly in front of the hotel entrance on Av. Juan Carlos I.",
  },
  // Playa de las Américas
  {
    area: "Playa de las Américas",
    location: "CC Presidente (Shopping Center)",
    notes: "Central pickup along the Golden Mile (Av. Las Américas).",
  },
  {
    area: "Playa de las Américas",
    location: "Hotel Best Tenerife",
    notes: "Bus stop adjacent to the hotel roundabout on C. Antonio Dominguez Alfonso.",
  },
  {
    area: "Playa de las Américas",
    location: "CC Llanos de Troya",
    notes: "Convenient stop for guests staying near Troya Beach and Veronica's strip.",
  },
  // Costa Adeje
  {
    area: "Costa Adeje",
    location: "CC El Duque (Shopping Plaza)",
    notes: "Serves luxury hotels in the northern El Duque beachfront zone.",
  },
  {
    area: "Costa Adeje",
    location: "CC Fañabé Plaza",
    notes: "Pickup point in front of Fañabé commercial center on Av. de Bruselas.",
  },
  {
    area: "Costa Adeje",
    location: "Hotel Ocean Park (San Eugenio)",
    notes: "Stops along the main avenue near Puerto Colón marina.",
  },
];

export interface BusRoute {
  number: string;
  origin: string;
  destination: string;
  frequency: string;
  notes: string;
}

export const TITSA_BUS_ROUTES: BusRoute[] = [
  {
    number: "Line 111 / 711",
    origin: "Santa Cruz / Airport South (TFS)",
    destination: "Costa Adeje Bus Station",
    frequency: "Every 20–30 mins",
    notes: "Direct express route connecting the capital, Tenerife South Airport, and Costa Adeje.",
  },
  {
    number: "Line 473 / 477",
    origin: "Los Gigantes / Callao Salvaje",
    destination: "Costa Adeje Bus Station",
    frequency: "Every 30 mins",
    notes: "Ideal for visitors staying in western coastal towns (Alcalá, Playa San Juan, Puerto de Santiago).",
  },
  {
    number: "Line 467",
    origin: "Costa del Silencio / Las Galletas",
    destination: "La Caleta (via Costa Adeje)",
    frequency: "Every 20 mins",
    notes: "Connects south-eastern resort towns directly through Los Cristianos and Las Américas.",
  },
  {
    number: "Line 343",
    origin: "Puerto de la Cruz / Airport North (TFN)",
    destination: "Costa Adeje Bus Station",
    frequency: "4 times daily",
    notes: "Direct cross-island express connecting North Tenerife with Costa Adeje.",
  },
];

export const PARKING_INFO = {
  fee: "€5.00 flat daily rate",
  capacity: "Over 500 vehicle spaces plus dedicated coach bays",
  disabledParking: "Designated accessible bays located immediately opposite the main ticket turnstiles",
  operatingHours: "Opens at 9:15 AM and closes 30 minutes after park closure",
  evCharging: "Limited EV charging points available at neighboring Siam Mall",
};
