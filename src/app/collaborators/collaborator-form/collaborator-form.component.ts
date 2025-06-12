import { Component, inject,effect } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { CollaboratorCreateRequest } from '../collaborators-create/create-collaborator';
import { Collaborator } from '../collaborator';
@Component({
  selector: 'app-collaborator-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './collaborator-form.component.html',
  styleUrls: ['./collaborator-form.component.css'],
})
export class CollaboratorFormComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);

  isCreating = this.collaboratorSignalService.isCreatingCollaborator;
  isEditing = this.collaboratorSignalService.isEditingCollaborator;
  selectedCollaborator = this.collaboratorSignalService.selectedCollaborator;

  form = new FormGroup({
    names: new FormControl('', Validators.required),
    surnames: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    deactivationDate: new FormControl(this.formatDate(new Date()), Validators.required),
    collaboratorPeriod: new FormGroup({
      initDate: new FormControl(this.formatDate(new Date()), Validators.required),
      finalDate: new FormControl(this.formatDate(new Date()), Validators.required),
    }),
  });

  constructor() {
    // Sincroniza o form com o sinal de edição
    effect(() => {
      const collab = this.isEditing();
      if (collab) {
        const c = this.selectedCollaborator();
        if (c) {
          this.form.patchValue({
            names: c.names,
            surnames: c.surnames,
            email: c.email,
            deactivationDate: this.formatDate(new Date(c.userPeriod._finalDate)),
            collaboratorPeriod: {
              initDate: this.formatDate(new Date(c.collaboratorPeriod._initDate)),
              finalDate: this.formatDate(new Date(c.collaboratorPeriod._finalDate)),
            }
          });
        }
      } else {
        this.form.reset({
          deactivationDate: this.formatDate(new Date()),
          collaboratorPeriod: {
            initDate: this.formatDate(new Date()),
            finalDate: this.formatDate(new Date()),
          }
        });
      }
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  cancel() {
    this.collaboratorSignalService.cancelCreateCollaborator();
    this.collaboratorSignalService.cancelEditCollaborator();
    this.form.reset();
  }

  onSubmit() {
  if (this.form.invalid) return;

  const value = this.form.getRawValue();
  const deactivationDate = new Date(value.deactivationDate!);
  deactivationDate.setHours(23, 59, 59, 999);

  const request: CollaboratorCreateRequest = {
    names: value.names!,
    surnames: value.surnames!,
    email: value.email!,
    deactivationDate,
    periodDateTime: {
      _initDate: new Date(value.collaboratorPeriod!.initDate!),
      _finalDate: new Date(value.collaboratorPeriod!.finalDate!)
    }
  };

  if (this.isCreating()) {
    this.collaboratorDataService.createCollaborator(request).subscribe({
      next: (created) => {~
        this.collaboratorSignalService.addCollaborator(created);
        this.collaboratorSignalService.startCreateCollaborator();
        this.form.reset();
        this.collaboratorSignalService.cancelCreateCollaborator();
      },
      error: (err) => console.error(err)
    });
  } else if (this.isEditing()) {
    const editingCollaborator = this.selectedCollaborator();
    if (!editingCollaborator) return;

    const updatedCollaborator: Collaborator = {
      ...editingCollaborator,     
      names: request.names,
      surnames: request.surnames,
      email: request.email,
      collaboratorPeriod: {
        _initDate: request.periodDateTime._initDate,
        _finalDate: request.periodDateTime._finalDate,
      },
    };

    this.collaboratorDataService.updateCollaborator(updatedCollaborator).subscribe({
      next: (updated) => {
        this.collaboratorSignalService.updateCollaboratorInList(updated);
        this.collaboratorSignalService.updateCollaborator(updated);
        this.form.reset();
        this.collaboratorSignalService.cancelEditCollaborator();
      },
      error: (err) => console.error(err)
    });
  }
}

}
