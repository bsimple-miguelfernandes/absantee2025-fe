import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CollaboratorSignalService } from "../collaborator-signal.service";
import { CollaboratorDataService } from "../collaborator-data.service";
import { CollaboratorCreateRequest } from "./create-collaborator";

@Component({
  selector: 'app-collaborator-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-create.component.html',
})
export class CollaboratorCreateComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);

  form = new FormGroup({
    names: new FormControl(''),
    surnames: new FormControl(''),
    email: new FormControl(''),
    deactivationDate: new FormControl(this.formatDate(new Date())),
    collaboratorPeriod: new FormGroup({
      initDate: new FormControl(this.formatDate(new Date())),
      finalDate: new FormControl(this.formatDate(new Date()))
    }),
  });

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    const formValue = this.form.value;

    if (!formValue.collaboratorPeriod) return;

    const newCollaborator: CollaboratorCreateRequest = {
      names: formValue.names ?? '',
      surnames: formValue.surnames ?? '',
      email: formValue.email ?? '',
      deactivationDate: new Date(formValue.deactivationDate!),
      periodDateTime: {
        _initDate: new Date(formValue.collaboratorPeriod.initDate!),
        _finalDate: new Date(formValue.collaboratorPeriod.finalDate!)
      }
    };

    this.collaboratorDataService.createCollaborator(newCollaborator).subscribe({
      next: (createdCollaborator) => {
        console.log('Created collaborator:', createdCollaborator);
        this.collaboratorSignalService.cancelCreateCollaborator?.();
        this.form.reset();
      },
      error: (error) => {
        console.error('Error creating collaborator:', error);
      }
    });
  }

  onCancel() {
    this.collaboratorSignalService.cancelCreateCollaborator?.();
    this.form.reset();
  }
}
