import { Component, effect, inject } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { PeriodDate } from '../../PeriodDate';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  collaboratorHolidays!: PeriodDate[];
  form = new FormGroup({
    holidays: new FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>>([])
  });

  constructor() {
    effect(() => {
      this.collaboratorHolidays = this.collaboratorDataService.getCollaboratorHolidays(
        this.collaboratorHolidaysSelected()!.collabId
      );

      const holidayControls = this.collaboratorHolidays.map(holiday =>
        new FormGroup({
          initDate: new FormControl(this.formatDate(holiday.initDate)),
          finalDate: new FormControl(this.formatDate(holiday.finalDate))
        }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>
      );

      this.form.setControl('holidays', new FormArray(holidayControls));
    });
  }

  get holidaysForm(): FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string> }>> {
    return this.form.get('holidays') as FormArray;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  editHoliday(index: number) {
    const holidayGroup = this.holidaysForm.at(index);

    const updatedHoliday: PeriodDate = {
      initDate: new Date(holidayGroup.get('initDate')!.value),
      finalDate: new Date(holidayGroup.get('finalDate')!.value)
    }

    this.collaboratorDataService.editHoliday(this.collaboratorHolidaysSelected()!.collabId, index, updatedHoliday);
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
