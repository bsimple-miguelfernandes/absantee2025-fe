import { Component, effect, inject } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { PeriodDate } from '../../PeriodDate';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HolidayPeriod } from './holiday-period';

@Component({
  selector: 'app-collaborator-holidays',
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-holidays.component.html',
  styleUrl: './collaborator-holidays.component.css'
})
export class CollaboratorHolidaysComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorHolidaysSelected = this.collaboratorSignalService.selectedCollaboratorHoliday;

  collaboratorDataService = inject(CollaboratorDataService);
  collaboratorHolidays!: HolidayPeriod[];
  form = new FormGroup({
    holidays: new FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>>([])
  });

  constructor() {
    this.collaboratorDataService
      .getCollaboratorHolidays(this.collaboratorHolidaysSelected()!.collabId)
      .subscribe((holidays) => {
        this.collaboratorHolidays = holidays
        const holidayControls = this.collaboratorHolidays.map(holiday =>
          new FormGroup({
            initDate: new FormControl(this.formatDate(holiday.periodDate.initDate)),
            finalDate: new FormControl(this.formatDate(holiday.periodDate.finalDate))
          }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>
        );

        this.form.setControl('holidays', new FormArray(holidayControls));
      });
  }

  get holidaysForm(): FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>> {
    return this.form.get('holidays') as FormArray;
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  editHoliday(index: number) {
    if(this.holidaysForm.length > this.collaboratorHolidays.length) {
      this.collaboratorDataService.addHoliday(this.collaboratorHolidaysSelected()!.collabId,
      this.holidaysForm.at(index).value.initDate!,
      this.holidaysForm.at(index).value.finalDate!);
    } else {
      const holidayGroup = this.holidaysForm.at(index);

      const updatedHoliday: HolidayPeriod = {
        id: this.collaboratorHolidays[index].id,
        periodDate: {
          initDate: new Date(holidayGroup.get('initDate')!.value),
          finalDate: new Date(holidayGroup.get('finalDate')!.value)
        }
      }

      this.collaboratorDataService.editHoliday(this.collaboratorHolidaysSelected()!.collabId, updatedHoliday);
    }
  }

  createEmptyHoliday() {
    this.holidaysForm.push(
      new FormGroup({
        initDate: new FormControl(this.formatDate(new Date())),
        finalDate: new FormControl(this.formatDate(new Date()))
      }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>
    );
  }
}
