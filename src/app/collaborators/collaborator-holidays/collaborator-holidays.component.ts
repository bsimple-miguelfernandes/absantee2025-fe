import { Component, inject } from '@angular/core';
import { CollaboratorSignalService } from '../services/collaborator-signal.service';
import { CollaboratorDataService } from '../services/collaborator-data.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { HolidayPeriod, mapHolidayPeriodDtoToHolidayPeriod } from './holiday-period';
import { ActivatedRoute } from '@angular/router';
import { CollaboratorViewModel } from '../collaborator-details/collaborator.viewmodel';
import { dateRangeValidator } from '../../utils/validators';
import { formatDateString } from '../../utils/date';

export enum ButtonType {
  Edit,
  Save
}

@Component({
  selector: 'app-collaborator-holidays',
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-holidays.component.html',
  styleUrl: './collaborator-holidays.component.css'
})
export class CollaboratorHolidaysComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);
  route = inject(ActivatedRoute);

  collaboratorHolidaysSelected!: CollaboratorViewModel;
  collaboratorHolidays!: HolidayPeriod[];

  form = new FormGroup({
    holidays: new FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<ButtonType> }>>([])
  });

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.collaboratorHolidaysSelected = data['collaborator'];

      this.collaboratorDataService
        .getCollaboratorHolidays(this.collaboratorHolidaysSelected!.collabId)
        .subscribe((holidays) => {
          this.collaboratorHolidays = holidays.map(mapHolidayPeriodDtoToHolidayPeriod);

          const holidayControls = this.collaboratorHolidays.map(holiday =>
            new FormGroup({
              initDate: new FormControl(holiday.periodDate.initDate),
              finalDate: new FormControl(holiday.periodDate.finalDate),
              buttonText: new FormControl(ButtonType.Edit)
            },
              { validators: dateRangeValidator }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<ButtonType> }>
          );

          this.form.setControl('holidays', new FormArray(holidayControls));
        });
    })
  }

  editHoliday(index: number) {
    if (!this.form.dirty) {
      window.alert("No changes made to this holiday. ");
    }
    if (this.holidaysForm.length > 0) {
      const holidayGroup = this.holidaysForm.at(index);
      if (holidayGroup.valid) {
        if (holidayGroup.value.buttonText == ButtonType.Save) {
          this.collaboratorDataService.addHoliday(this.collaboratorHolidaysSelected!.collabId,
            holidayGroup.value.initDate!,
            holidayGroup.value.finalDate!)
            .subscribe({
              next: h => {
                holidayGroup.get('buttonText')?.setValue(ButtonType.Edit),
                  console.log(h);
                this.collaboratorHolidays.push(h);
              },
              error: e => {
                console.log(e);
              }
            });
        }
        else {
          const updatedHoliday: HolidayPeriod = {
            id: this.collaboratorHolidays[index].id,
            periodDate: {
              initDate: formatDateString(holidayGroup.get('initDate')!.value),
              finalDate: formatDateString(holidayGroup.get('finalDate')!.value)
            }
          }

          this.collaboratorDataService.editHoliday(this.collaboratorHolidaysSelected!.collabId, updatedHoliday).subscribe(h => console.log(h));
          this.form.markAsPristine();
        }
      } else {
        window.alert("Final Date must be after Innit Date");
      }
    }
  }

  createEmptyHoliday() {
    this.holidaysForm.push(
      new FormGroup({
        initDate: new FormControl(formatDateString(new Date().toDateString())),
        finalDate: new FormControl(formatDateString(new Date().toDateString())),
        buttonText: new FormControl(ButtonType.Save)
      }, { validators: dateRangeValidator }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<ButtonType> }>
    );
  }

  get holidaysForm(): FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<ButtonType> }>> {
    return this.form.get('holidays') as FormArray;
  }

  getButtonText(value: ButtonType): string {
    return ButtonType[value];
  }
}
