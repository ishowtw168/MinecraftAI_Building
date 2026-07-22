export type BuildStep = {
  title: string;
  description: string;
};

export type Material = {
  name: string;
  amount: string;
};

export type BuildingPlan = {
  name: string;
  story: string;
  size: string;
  palette: string;

  materials: Material[];

  steps: BuildStep[];
};
