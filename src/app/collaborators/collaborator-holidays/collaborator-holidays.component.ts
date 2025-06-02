import { Component, inject } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
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
  collaboratorDataService = inject(CollaboratorDataService);

  collaboratorHolidaysSelected = this.collaboratorSignalService.selectedCollaboratorHoliday;

  collaboratorHolidays!: HolidayPeriod[];

  form = new FormGroup({
    holidays: new FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<string> }>>([])
  });

  constructor() {
    this.collaboratorDataService
      .getCollaboratorHolidays(this.collaboratorHolidaysSelected()!.collabId)
      .subscribe((holidays) => {
        this.collaboratorHolidays = holidays

        const holidayControls = this.collaboratorHolidays.map(holiday =>
          new FormGroup({
            initDate: new FormControl(holiday.periodDate.initDate),
            finalDate: new FormControl(holiday.periodDate.finalDate),
            buttonText: new FormControl("Edit")
          }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<string> }>
        );

        this.form.setControl('holidays', new FormArray(holidayControls));
      });


  }

  get holidaysForm(): FormArray<FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<string> }>> {
    return this.form.get('holidays') as FormArray;
  }

  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  editHoliday(index: number) {
    if (!this.form.dirty) return;
    if (index >= this.collaboratorHolidays.length) {
      const holidayGroup = this.holidaysForm.at(index);
      this.collaboratorDataService.addHoliday(this.collaboratorHolidaysSelected()!.collabId,
        holidayGroup.value.initDate!,
        holidayGroup.value.finalDate!)
        .subscribe({
          next: h => {
            holidayGroup.get('buttonText')?.setValue("Edit"),
            console.log(h);
          },
          error: e => {
            console.log(e);
          }
        });
    }
    else {
      const holidayGroup = this.holidaysForm.at(index);

      const updatedHoliday: HolidayPeriod = {
        id: this.collaboratorHolidays[index].id,
        periodDate: {
          initDate: this.formatDate(holidayGroup.get('initDate')!.value),
          finalDate: this.formatDate(holidayGroup.get('finalDate')!.value)
        }
      }

      this.collaboratorDataService.editHoliday(this.collaboratorHolidaysSelected()!.collabId, updatedHoliday).subscribe(h => console.log(h));
      this.form.markAsPristine();
    }
  }

  createEmptyHoliday() {
    this.holidaysForm.push(
      new FormGroup({
        initDate: new FormControl(this.formatDate(new Date().toDateString())),
        finalDate: new FormControl(this.formatDate(new Date().toDateString())),
        buttonText: new FormControl("Save")
      }) as FormGroup<{ initDate: FormControl<string>, finalDate: FormControl<string>, buttonText: FormControl<string> }>
    );
  }
}
