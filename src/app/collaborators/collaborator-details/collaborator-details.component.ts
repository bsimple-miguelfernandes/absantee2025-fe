import { Component, computed, effect, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollaboratorSignalService } from '../collaborator-signal.service';

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
    effect(() => {
      const collaboratorObj = this.collaborator();
      if (!collaboratorObj) return;

      if (!this.form) {
        this.form = new FormGroup({
          names: new FormControl(collaboratorObj.names),
          surnames: new FormControl(collaboratorObj.surnames),
          email: new FormControl(collaboratorObj.email),
          periodDateTime: new FormGroup({
            initDate: new FormControl(this.formatDate(collaboratorObj.periodDateTime._initDate)),
            endDate: new FormControl(this.formatDate(collaboratorObj.periodDateTime._finalDate)),
          })
        });
      } else {
        this.form.patchValue({
          names: collaboratorObj.names,
          surnames: collaboratorObj.surnames,
          email: collaboratorObj.email,
          periodDateTime: {
            initDate: this.formatDate(collaboratorObj.periodDateTime._initDate),
            endDate: this.formatDate(collaboratorObj.periodDateTime._finalDate)
          }
        });
      }
    });
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit() {
    const formValue = this.form.value;

    const updatedCollaborator: CollaboratorDetails = {
      id: this.collaborator()!.id,
      names: formValue.names,
      surnames: formValue.surnames,
      email: formValue.email,
      periodDateTime: {
        _initDate: new Date(formValue.periodDateTime.initDate),
        _finalDate: new Date(formValue.periodDateTime.endDate)
      }
    };

    this.collaboratorService.updateCollaborator(updatedCollaborator);
  }
}