import { PeriodDateTime } from "../../PeriodDate"

export interface CollaboratorViewModel {
    collabId: string,
      userId: string,
      names : string,
      surnames : string,
      email : string,
      userPeriod : PeriodDateTime
      collaboratorPeriod : PeriodDateTime
}