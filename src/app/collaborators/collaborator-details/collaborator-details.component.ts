import { Component, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDetailsForm } from '../collaborator';
import { PeriodDateTimeForm } from '../../PeriodDate';
import { CollaboratorDataService } from '../collaborator-data.service';
import { CollaboratorViewModel } from './collaborator.viewmodel';
import { fromCollaboratorViewModel } from '../mappers/collaborator.mapper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collaborator-details',
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent {
  collabId = input.required<string>();
  collaborator = input.required<CollaboratorViewModel>();
  collaboratorService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);

  form!: FormGroup;

  constructor(private route: ActivatedRoute) {}

  ngOnChanges() {
    const collab = this.route.snapshot.data['DetailsData'];

    if (!this.form) {
      this.form = new FormGroup<CollaboratorDetailsForm>({
        names: new FormControl(collab.names),
        surnames: new FormControl(collab.surnames),
        email: new FormControl(collab.email),
        userPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
          _initDate: new FormControl(this.formatDate(collab.userPeriod._initDate)),
          _finalDate: new FormControl(this.formatDate(collab.userPeriod._finalDate)),
        }),
        collaboratorPeriodDateTime: new FormGroup<PeriodDateTimeForm>({
          _initDate: new FormControl(this.formatDate(collab.collaboratorPeriod._initDate)),
          _finalDate: new FormControl(this.formatDate(collab.collaboratorPeriod._finalDate)),
        })
      });
    } else {
      this.form.patchValue({
        names: collab.names,
        surnames: collab.surnames,
        email: collab.email,
        userPeriodDateTime: {
          _initDate: this.formatDate(collab.userPeriod._initDate),
          _finalDate: this.formatDate(collab.userPeriod._finalDate)
        },
        collaboratorPeriodDateTime: {
          _initDate: this.formatDate(collab.collaboratorPeriod._initDate),
          _finalDate: this.formatDate(collab.collaboratorPeriod._finalDate)
        }
      });
    }
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
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
