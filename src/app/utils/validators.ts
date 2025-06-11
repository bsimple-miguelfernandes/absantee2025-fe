import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateRangeValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const init = group.get('initDate')?.value;
        const final = group.get('finalDate')?.value;

        if (!init || !final) return null; // Don't validate if either date is missing

        const initDate = new Date(init);
        const finalDate = new Date(final);

        return initDate < finalDate ? null : { dateRangeInvalid: true };
    };
}