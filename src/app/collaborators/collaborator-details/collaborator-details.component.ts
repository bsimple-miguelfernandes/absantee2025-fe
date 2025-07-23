import { Component, Inject, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { Collaborator, CollaboratorDetailsForm } from '../collaborator';
import { PeriodDateTimeForm } from '../../PeriodDate';
import { CollaboratorDataService } from '../collaborator-data.service';
import { CollaboratorViewModel } from './collaborator.viewmodel';
import { fromCollaboratorViewModel } from '../mappers/collaborator.mapper';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborator-details',
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent {
  collaborator!: CollaboratorViewModel;
  collaboratorService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);

  form!: FormGroup;

  constructor(private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) private data: { collab: Collaborator },
  private dialogRef: MatDialogRef<CollaboratorDetailsComponent>) {}

  ngOnInit() {
    
      this.collaborator = this.data.collab;

      if (!this.form) {
        this.form = new FormGroup<CollaboratorDetailsForm>({
          names: new FormControl(this.collaborator.names),
          surnames: new FormControl(this.collaborator.surnames),
          email: new FormControl(this.collaborator.email),
          userPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
            _initDate: new FormControl(this.formatDate(this.collaborator.userPeriod._initDate)),
            _finalDate: new FormControl(this.formatDate(this.collaborator.userPeriod._finalDate)),
          }),
          collaboratorPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
            _initDate: new FormControl(this.formatDate(this.collaborator.collaboratorPeriod._initDate)),
            _finalDate: new FormControl(this.formatDate(this.collaborator.collaboratorPeriod._finalDate)),
          })
        });
      } else {
        this.form.patchValue({
          names: this.collaborator.names,
          surnames: this.collaborator.surnames,
          email: this.collaborator.email,
          userPeriodDateTime: {
            _initDate: this.formatDate(this.collaborator.userPeriod._initDate),
            _finalDate: this.formatDate(this.collaborator.userPeriod._finalDate)
          },
          collaboratorPeriodDateTime: {
            _initDate: this.formatDate(this.collaborator.collaboratorPeriod._initDate),
            _finalDate: this.formatDate(this.collaborator.collaboratorPeriod._finalDate)
          }
        });
      }
    //});
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit() {
    if (!this.form.dirty) return;

    const formValue = this.form.value;

    const updatedCollaboratorVM: CollaboratorViewModel = {
      collabId: this.collaborator.collabId,
      userId: this.collaborator.userId,
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

    this.collaboratorDataService.updateUser(updatedCollaborator).subscribe({
      error: (error) => {
        console.log("Error updating user: ", error)
      }
    });

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

  closeDialog() {
    this.dialogRef.close();
  }
}
