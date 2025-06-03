import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { Collaborator, CollaboratorDetailsForm } from '../collaborator';
import { PeriodDateTimeForm } from '../../PeriodDate';

@Component({
  selector: 'app-collaborator-details',
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent {
  collaboratorService = inject(CollaboratorSignalService);
  collaborator = this.collaboratorService.selectedCollaborator;
  form!: FormGroup;

  constructor() {
    console.log(this.collaborator()?.userPeriod);
    console.log(this.collaborator()?.userPeriod._initDate);
    effect(() => {
      const collaboratorObj = this.collaborator();
      if (!collaboratorObj) return;

      if (!this.form) {
        this.form = new FormGroup<CollaboratorDetailsForm>({
          names: new FormControl(collaboratorObj.names),
          surnames: new FormControl(collaboratorObj.surnames),
          email: new FormControl(collaboratorObj.email),
          userPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
            _initDate: new FormControl(this.formatDate(collaboratorObj.userPeriod._initDate)),
            _finalDate: new FormControl(this.formatDate(collaboratorObj.userPeriod._finalDate)),
          }), 
          collaboratorPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
            _initDate: new FormControl(this.formatDate(collaboratorObj.collaboratorPeriod._initDate)),
            _finalDate: new FormControl(this.formatDate(collaboratorObj.collaboratorPeriod._finalDate)),
          })
        });
      } else {
        this.form.patchValue({
          names: collaboratorObj.names,
          surnames: collaboratorObj.surnames,
          email: collaboratorObj.email,
          userPeriodDateTime: {
            _initDate: this.formatDate(collaboratorObj.userPeriod._initDate),
            _finalDate: this.formatDate(collaboratorObj.userPeriod._finalDate)
          },
          collaboratorPeriodDateTime : {
            _initDate: this.formatDate(collaboratorObj.collaboratorPeriod._initDate),
            _finalDate: this.formatDate(collaboratorObj.collaboratorPeriod._finalDate)
          }
        });
      }
    });
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit() {
    if(!this.form.dirty) return; 

    const formValue = this.form.value;

    const updatedCollaborator: Collaborator = {
      collabId: this.collaborator()!.collabId,
      userId : this.collaborator()!.userId,
      names: formValue.names,
      surnames: formValue.surnames,
      email: formValue.email,
      userPeriod : {
          _initDate: new Date(formValue.userPeriodDateTime._initDate),
          _finalDate: new Date(formValue.userPeriodDateTime._finalDate)
      },
      collaboratorPeriod: {
        _initDate: new Date(formValue.collaboratorPeriodDateTime._initDate),
        _finalDate: new Date(formValue.collaboratorPeriodDateTime._finalDate)
      }
    };

    this.collaboratorService.updateCollaborator(updatedCollaborator);
    this.form.markAsPristine();
  }
}