export type AlertSeverity = "critical" | "warning" | "info";
export type AlertState    = "active" | "acknowledged" | "resolved";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  state: AlertState;
  title: string;
  message: string;
  device: string;
  vehicleName: string;
  plateOrRef: string;
  type: string;
  coLevel: number;
  threshold: number;
  triggeredAt: string;
  resolvedAt?: string;
  acknowledgedBy?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  severity: AlertSeverity;
  appliesTo: string;
  enabled: boolean;
}

export const alerts: Alert[] = [
  {
    id: "ALT-001",
    severity: "critical",
    state: "active",
    title: "CO Critical — Kimironko Metal Workshop",
    message: "CO input reached 620 ppm, well above the 400 ppm safety threshold. Exhaust purification at maximum load.",
    device: "ESP32-004",
    vehicleName: "Kimironko Metal Workshop",
    plateOrRef: "IND-KMW-004",
    type: "Industry",
    coLevel: 620,
    threshold: 400,
    triggeredAt: "2026-04-21 05:51:20",
  },
  {
    id: "ALT-002",
    severity: "critical",
    state: "acknowledged",
    title: "CO Critical — Bajaj Boxer Motorcycle",
    message: "CO input reached 560 ppm on motorcycle RAD 112 C. Engine may need servicing.",
    device: "ESP32-002",
    vehicleName: "Bajaj Boxer Motorcycle",
    plateOrRef: "RAD 112 C",
    type: "Motorcycle",
    coLevel: 560,
    threshold: 400,
    triggeredAt: "2026-04-21 05:27:19",
    acknowledgedBy: "ISHIMWE KARANGWA Cyrille",
  },
  {
    id: "ALT-003",
    severity: "warning",
    state: "active",
    title: "CO Above Threshold — Bajaj Boxer Motorcycle",
    message: "CO input at 510 ppm on motorcycle RAD 112 C. Recommend engine check.",
    device: "ESP32-002",
    vehicleName: "Bajaj Boxer Motorcycle",
    plateOrRef: "RAD 112 C",
    type: "Motorcycle",
    coLevel: 510,
    threshold: 400,
    triggeredAt: "2026-04-21 05:57:08",
  },
  {
    id: "ALT-004",
    severity: "warning",
    state: "active",
    title: "CO Above Threshold — Toyota Corolla",
    message: "CO input at 455 ppm on vehicle RAC 784 B. Possible fuel mixture issue.",
    device: "ESP32-001",
    vehicleName: "Toyota Corolla",
    plateOrRef: "RAC 784 B",
    type: "Car",
    coLevel: 455,
    threshold: 400,
    triggeredAt: "2026-04-21 05:39:30",
  },
  {
    id: "ALT-005",
    severity: "warning",
    state: "acknowledged",
    title: "Low Purification Rate — Bajaj Boxer Motorcycle",
    message: "Purification efficiency dropped to 48% on RAD 112 C, below the 50% target.",
    device: "ESP32-002",
    vehicleName: "Bajaj Boxer Motorcycle",
    plateOrRef: "RAD 112 C",
    type: "Motorcycle",
    coLevel: 480,
    threshold: 50,
    triggeredAt: "2026-04-21 05:48:44",
    acknowledgedBy: "NIYONKURU Olivier",
  },
  {
    id: "ALT-006",
    severity: "info",
    state: "resolved",
    title: "Device Offline — Honda CB125 Motorcycle",
    message: "ESP32-003 on motorcycle RAE 330 A lost connection. Device may be out of Wi-Fi range.",
    device: "ESP32-003",
    vehicleName: "Honda CB125 Motorcycle",
    plateOrRef: "RAE 330 A",
    type: "Motorcycle",
    coLevel: 0,
    threshold: 0,
    triggeredAt: "2026-04-21 03:15:00",
    resolvedAt: "2026-04-21 04:00:00",
  },
  {
    id: "ALT-007",
    severity: "critical",
    state: "resolved",
    title: "CO Critical — Bajaj Boxer Motorcycle",
    message: "CO peaked at 530 ppm on RAD 112 C. Resolved after engine was turned off and cooled.",
    device: "ESP32-002",
    vehicleName: "Bajaj Boxer Motorcycle",
    plateOrRef: "RAD 112 C",
    type: "Motorcycle",
    coLevel: 530,
    threshold: 400,
    triggeredAt: "2026-04-20 18:04:33",
    resolvedAt: "2026-04-20 19:15:00",
    acknowledgedBy: "Jean-Paul Habimana",
  },
  {
    id: "ALT-008",
    severity: "info",
    state: "resolved",
    title: "High Industry Emission — Kimironko Metal Workshop",
    message: "Sustained CO levels above 400 ppm detected at workshop for over 30 minutes.",
    device: "ESP32-004",
    vehicleName: "Kimironko Metal Workshop",
    plateOrRef: "IND-KMW-004",
    type: "Industry",
    coLevel: 430,
    threshold: 400,
    triggeredAt: "2026-04-20 18:07:55",
    resolvedAt: "2026-04-20 18:45:00",
    acknowledgedBy: "ISHIMWE KARANGWA Cyrille",
  },
];

export const alertRules: AlertRule[] = [
  { id: "R1", name: "Critical CO Level",       condition: "CO Input ≥", threshold: 500, severity: "critical", appliesTo: "All vehicles & industries", enabled: true  },
  { id: "R2", name: "Warning CO Level",        condition: "CO Input ≥", threshold: 400, severity: "warning",  appliesTo: "All vehicles & industries", enabled: true  },
  { id: "R3", name: "Low Purification Rate",   condition: "Reduction <", threshold: 45, severity: "warning",  appliesTo: "All vehicles & industries", enabled: true  },
  { id: "R4", name: "Device Offline",          condition: "No data for", threshold: 5,  severity: "info",     appliesTo: "All devices",               enabled: true  },
  { id: "R5", name: "Industry Sustained High", condition: "CO Input ≥", threshold: 400, severity: "warning",  appliesTo: "Industries only",           enabled: true  },
  { id: "R6", name: "Sensor Range Exceeded",   condition: "CO Input ≥", threshold: 900, severity: "critical", appliesTo: "All vehicles & industries", enabled: false },
];
