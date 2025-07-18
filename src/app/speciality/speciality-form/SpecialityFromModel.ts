export interface SpecialityFormModel {
  id?: string;
  description: string;
  collaboratorId: string;
  technologyId: string;
  initDate: string;  // ISO date string (yyyy-MM-dd)
  finalDate: string; // ISO date string (yyyy-MM-dd)
}
