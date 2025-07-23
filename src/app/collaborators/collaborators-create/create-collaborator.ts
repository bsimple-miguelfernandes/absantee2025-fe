import { PeriodDateTime } from "../../PeriodDate";

export interface CollaboratorCreateRequest {
  userId?: string; 
  names: string;
  surnames: string;
  email: string;
  finalDate: Date; 
  periodDateTime: PeriodDateTime;
}

