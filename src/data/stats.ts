// Edit these numbers here. They are the only source for the homepage counter.
// Confirmed by Manoj: 120+ students, 40+ projects, 2.5+ years.
// TODO: replace the fourth figure if "stacks taught" is not the one you want to publish.

export type Stat = {
  id: string;
  value: number;
  decimals: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { id: "students", value: 120, decimals: 0, suffix: "+", label: "Students taught" },
  { id: "projects", value: 40, decimals: 0, suffix: "+", label: "Projects delivered" },
  { id: "years", value: 2.5, decimals: 1, suffix: "+", label: "Years of professional experience" },
  { id: "stacks", value: 2, decimals: 0, suffix: "", label: "Stacks taught, Laravel and MERN" },
];
