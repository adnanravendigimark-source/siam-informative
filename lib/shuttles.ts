import { sql, getSiteContentRow, dbErrorMessage } from "./db";

export interface ShuttleStop {
  area: string;
  location: string;
  notes: string;
}

export interface BusRoute {
  number: string;
  origin: string;
  destination: string;
  frequency: string;
  notes: string;
}

export interface ParkingInfo {
  fee: string;
  capacity: string;
  disabledParking: string;
  operatingHours: string;
  evCharging: string;
}

export const DEFAULT_FREE_SHUTTLE_STOPS: ShuttleStop[] = [
  { area: "Los Cristianos", location: "CC Pasarela (Shopping Center)", notes: "Main pickup point in southern Los Cristianos, near the port & harbor." },
  { area: "Los Cristianos", location: "Hotel Sol Arona Tenerife", notes: "Bus stop located directly in front of the hotel entrance on Av. Juan Carlos I." },
  { area: "Playa de las Américas", location: "CC Presidente (Shopping Center)", notes: "Central pickup along the Golden Mile (Av. Las Américas)." },
  { area: "Playa de las Américas", location: "Hotel Best Tenerife", notes: "Bus stop adjacent to the hotel roundabout on C. Antonio Dominguez Alfonso." },
  { area: "Playa de las Américas", location: "CC Llanos de Troya", notes: "Convenient stop for guests staying near Troya Beach and Veronica's strip." },
  { area: "Costa Adeje", location: "CC El Duque (Shopping Plaza)", notes: "Serves luxury hotels in the northern El Duque beachfront zone." },
  { area: "Costa Adeje", location: "CC Fañabé Plaza", notes: "Pickup point in front of Fañabé commercial center on Av. de Bruselas." },
  { area: "Costa Adeje", location: "Hotel Ocean Park (San Eugenio)", notes: "Stops along the main avenue near Puerto Colón marina." },
];

export const DEFAULT_TITSA_BUS_ROUTES: BusRoute[] = [
  { number: "Line 111 / 711", origin: "Santa Cruz / Airport South (TFS)", destination: "Costa Adeje Bus Station", frequency: "Every 20–30 mins", notes: "Direct express route connecting the capital, Tenerife South Airport, and Costa Adeje." },
  { number: "Line 473 / 477", origin: "Los Gigantes / Callao Salvaje", destination: "Costa Adeje Bus Station", frequency: "Every 30 mins", notes: "Ideal for visitors staying in western coastal towns (Alcalá, Playa San Juan, Puerto de Santiago)." },
  { number: "Line 467", origin: "Costa del Silencio / Las Galletas", destination: "La Caleta (via Costa Adeje)", frequency: "Every 20 mins", notes: "Connects south-eastern resort towns directly through Los Cristianos and Las Américas." },
  { number: "Line 343", origin: "Puerto de la Cruz / Airport North (TFN)", destination: "Costa Adeje Bus Station", frequency: "4 times daily", notes: "Direct cross-island express connecting North Tenerife with Costa Adeje." },
];

export const DEFAULT_PARKING_INFO: ParkingInfo = {
  fee: "€5.00 flat daily rate",
  capacity: "Over 500 vehicle spaces plus dedicated coach bays",
  disabledParking: "Designated accessible bays located immediately opposite the main ticket turnstiles",
  operatingHours: "Opens at 9:15 AM and closes 30 minutes after park closure",
  evCharging: "Limited EV charging points available at neighboring Siam Mall",
};

export async function getShuttleStops(): Promise<ShuttleStop[]> {
  const row = await getSiteContentRow();
  const data = row?.shuttle_stops_json;
  return Array.isArray(data) && data.length ? data : DEFAULT_FREE_SHUTTLE_STOPS;
}

export async function getBusRoutes(): Promise<BusRoute[]> {
  const row = await getSiteContentRow();
  const data = row?.bus_routes_json;
  return Array.isArray(data) && data.length ? data : DEFAULT_TITSA_BUS_ROUTES;
}

export async function getParkingInfo(): Promise<ParkingInfo> {
  const row = await getSiteContentRow();
  const data = row?.parking_json;
  if (!data || typeof data !== "object") return DEFAULT_PARKING_INFO;
  return { ...DEFAULT_PARKING_INFO, ...data };
}

export async function saveShuttlesPage(data: { shuttleStops: ShuttleStop[]; busRoutes: BusRoute[]; parking: ParkingInfo }): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, shuttle_stops_json, bus_routes_json, parking_json, updated_at)
      VALUES (1, ${JSON.stringify(data.shuttleStops)}::jsonb, ${JSON.stringify(data.busRoutes)}::jsonb, ${JSON.stringify(data.parking)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET
        shuttle_stops_json = EXCLUDED.shuttle_stops_json,
        bus_routes_json = EXCLUDED.bus_routes_json,
        parking_json = EXCLUDED.parking_json,
        updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

// Back-compat plain constants (built-in defaults only, not admin edits).
export const FREE_SHUTTLE_STOPS = DEFAULT_FREE_SHUTTLE_STOPS;
export const TITSA_BUS_ROUTES = DEFAULT_TITSA_BUS_ROUTES;
export const PARKING_INFO = DEFAULT_PARKING_INFO;
