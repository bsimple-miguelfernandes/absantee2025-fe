import { Component, inject, input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollaboratorSignalService } from '../services/collaborator-signal.service';
import { CollaboratorDetailsForm } from '../collaborator.model';
import { PeriodDateTimeForm } from '../../PeriodDate';
import { CollaboratorDataService } from '../services/collaborator-data.service';
import { CollaboratorViewModel } from './collaborator.viewmodel';
import { fromCollaboratorViewModel } from '../mappers/collaborator.mapper';
import { formatDate } from '../../utils/date';

@Component({
  selector: 'app-collaborator-details',
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent implements OnChanges {
  collabId = input.required<string>();
  collaborator = input.required<CollaboratorViewModel>();
  collaboratorService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);

  form!: FormGroup;

  ngOnChanges() {
    const collaboratorObj = this.collaborator();
    if (!collaboratorObj) return;

    if (!this.form) {
      this.form = new FormGroup<CollaboratorDetailsForm>({
        names: new FormControl(collaboratorObj.names),
        surnames: new FormControl(collaboratorObj.surnames),
        email: new FormControl(collaboratorObj.email),
        userPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
          _initDate: new FormControl(formatDate(collaboratorObj.userPeriod._initDate)),
          _finalDate: new FormControl(formatDate(collaboratorObj.userPeriod._finalDate)),
        }),
        collaboratorPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
          _initDate: new FormControl(formatDate(collaboratorObj.collaboratorPeriod._initDate)),
          _finalDate: new FormControl(formatDate(collaboratorObj.collaboratorPeriod._finalDate)),
        })
      });
    } else {
      this.form.patchValue({
        names: collaboratorObj.names,
        surnames: collaboratorObj.surnames,
        email: collaboratorObj.email,
        userPeriodDateTime: {
          _initDate: formatDate(collaboratorObj.userPeriod._initDate),
          _finalDate: formatDate(collaboratorObj.userPeriod._finalDate)
        },
        collaboratorPeriodDateTime: {
          _initDate: formatDate(collaboratorObj.collaboratorPeriod._initDate),
          _finalDate: formatDate(collaboratorObj.collaboratorPeriod._finalDate)
        }
      });
    }
  }

  onSubmit() {
    if (!this.form.dirty) return;

    const formValue = this.form.value;

    const updatedCollaboratorVM: CollaboratorViewModel = {
      collabId: this.collaborator()!.collabId,
      userId: this.collaborator()!.userId,
      names: formValue.names,
      surnames: formValue.surnames,
      email: formValue.email,
      userPeriod: {
        _initDate: new Date(formValue.userPeriodDateTime._initDate),
        _finalDate: new Date(formValue.userPeriodDateTime._finalDate)
      },
      collaboratorPeriod: {
        _initDate: new Date(formValue.collaboratorPeriodDateTime._initDate),
        _finalDate: new Date(formValue.collaboratorPeriodDateTime._finalDate)
      }
    };

    const updatedCollaborator = fromCollaboratorViewModel(updatedCollaboratorVM);

    this.collaboratorDataService.updateCollaborator(updatedCollaborator).subscribe({
      next: (updated) => {
        this.collaboratorService.updateCollaborator(updated);
        this.collaboratorService.cancelCreateCollaborator();
        this.form.markAsPristine();
      },
      error: (error) => {
        console.log("Error updating collaborator: ", error)
      }
    });
  }
}
