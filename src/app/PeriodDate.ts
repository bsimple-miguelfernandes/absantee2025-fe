import { FormControl } from "@angular/forms"

export interface PeriodDate {
    initDate: Date,
    finalDate: Date
}

export interface PeriodDateString {
    initDate: string,
    finalDate: string
}

export interface PeriodDateTime {
    _initDate: Date,
    _finalDate: Date
}

export type PeriodDateTimeForm = {
    _initDate: FormControl<string | null>,
    _finalDate: FormControl<string | null>
}

export type PeriodDateForm = {
    initDate: FormControl<string | null>,
    finalDate: FormControl<string | null>
}

export interface PeriodDateTimeString {
    _initDate: string,
    _finalDate: string
}