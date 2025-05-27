// collaborator-create-request.ts

import { PeriodDateTime } from "../../PeriodDate";

export interface CollaboratorCreateRequest {
  names: string;
  surnames: string;
  email: string;
  deactivationDate: Date;
  periodDateTime: PeriodDateTime;
}
