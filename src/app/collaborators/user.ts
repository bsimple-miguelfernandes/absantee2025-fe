import { FormControl, FormGroup } from "@angular/forms";
import { PeriodDateTime, PeriodDateTimeForm } from "../PeriodDate";

export interface User {
    id: string,
    names : string,
    surnames : string,
    email : string,
    Period : PeriodDateTime
}
