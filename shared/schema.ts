export interface Player {
  id: string;
  name: string;
  number: number;
  preferredPosition: string;
  status: string;
  age?: number | null;
  notes?: string | null;
  photoUrl?: string | null;
  entryOrder?: number;
  rating?: number | null;
}

export interface Team {
  id: string;
  name: string;
  coach?: string;
  formation: string;
  captainId?: string | null;
  motmId?: string | null;
  logoUrl?: string | null;
}

export const formations: Record<string, string[]> = {
  "4-4-2": ["GK", "LB", "CB1", "CB2", "RB", "LM", "CM1", "CM2", "RM", "LF", "RF"],
  "4-3-3": ["GK", "LB", "CB1", "CB2", "RB", "CDM", "CM1", "CM2", "LW", "ST", "RW"],
  "3-5-2": ["GK", "CB1", "CB2", "CB3", "LWB", "CM1", "CM2", "CM3", "RWB", "ST1", "ST2"],
  "4-5-1": ["GK", "LB", "CB1", "CB2", "RB", "LM", "CM1", "CM2", "CM3", "RM", "ST"],
  "5-3-2": ["GK", "CB1", "CB2", "CB3", "LWB", "RWB", "CM1", "CM2", "CM3", "ST1", "ST2"],
  "4-2-1-3": ["GK", "LB", "CB1", "CB2", "RB", "CDM1", "CDM2", "CAM", "LW", "ST", "RW"],
};

export const positionNames: Record<string, string> = {
  GK: "POR",
  LB: "TS",
  CB: "DC",
  CB1: "DC",
  CB2: "DC",
  CB3: "DC",
  RB: "TD",
  LWB: "TS",
  RWB: "TD",
  LM: "CDS",
  CM: "COC",
  CM1: "COC",
  CM2: "COC",
  CM3: "COC",
  CDM: "CDS",
  CDM1: "CDS",
  CDM2: "CDS",
  CAM: "COC",
  RM: "CDS",
  LW: "AS",
  RW: "AD",
  LF: "ATT",
  RF: "ATT",
  ST: "ATT",
  ST1: "ATT",
  ST2: "ATT",
};
