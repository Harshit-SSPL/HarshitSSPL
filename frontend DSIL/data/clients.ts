export interface ClientCompany {
  id: string;
  name: string;
  logoUrl?: string;
  category?: string;
}

export const clientCompanies: ClientCompany[] = [
  { id: "dae", name: "DAE", category: "Government" },
  { id: "indian-oil", name: "INDIAN OIL", category: "PSU & Energy" },
  { id: "indian-railways", name: "INDIAN RAILWAYS", category: "Government & Transit" },
  { id: "grand-retreat", name: "GRAND RETREAT", category: "Real Estate & Hospitality" },
  { id: "bptp", name: "BPTP", category: "Infrastructure" },
  { id: "the-corenthum", name: "THE CORENTHUM", category: "Commercial & Corporate" },
  { id: "ace", name: "ACE", category: "Infrastructure" },
  { id: "galaxy-group", name: "GALAXY GROUP", category: "Real Estate" },
  { id: "asian-fidelis", name: "ASIAN FIDELIS", category: "Healthcare" },
  { id: "oro-group", name: "ORO GROUP", category: "Real Estate & Commercial" },
  { id: "habitat-enviro", name: "HABITAT ENVIRO", category: "Environmental & Infra" },
  { id: "m3m", name: "M3M", category: "Real Estate" },
  { id: "raheja", name: "RAHEJA", category: "Real Estate" },
  { id: "rof-aalayas", name: "ROF AALAYAS", category: "Residential & Infra" },
  { id: "tdi", name: "TDI", category: "Infrastructure" },
  { id: "rps-group", name: "RPS GROUP", category: "Real Estate" },
  { id: "mahagun", name: "MAHAGUN", category: "Infrastructure" },
  { id: "raj-darbar-reality", name: "RAJ DARBAR REALITY", category: "Real Estate" },
  { id: "gr-global-reality", name: "GR GLOBAL REALITY", category: "Real Estate & Infra" },
];

export default clientCompanies;
