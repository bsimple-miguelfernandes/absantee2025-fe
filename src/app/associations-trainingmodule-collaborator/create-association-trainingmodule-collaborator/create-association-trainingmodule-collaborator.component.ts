import { Component, inject, input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';
import { AssociationTrainingModuleCollaboratorCreateRequest } from './models/add-association-trainingmodule-collaborator.model';
import { Collaborator } from '../../collaborators/collaborator';
import { AssociationTrainingmoduleCollaboratorService } from '../services/association-trainingmodule-collaborator.service';
import { Router } from '@angular/router';
import { AssociationTrainingmoduleCollaboratorSignalService } from '../services/association-trainingmodule-collaborator-signal.service';
import { TrainingModuleDataService } from '../../training-modules/training-modules-data.service';
import { TrainingModule } from '../../training-modules/training-module';

@Component({
  selector: 'app-create-association-trainingmodule-collaborator',
  imports: [ReactiveFormsModule],
  templateUrl: './create-association-trainingmodule-collaborator.component.html',
  styleUrl: './create-association-trainingmodule-collaborator.component.css'
})
export class CreateAssociationTrainingmoduleCollaboratorComponent {
  trainingModuleId = input<string | undefined>(undefined);
  collaboratorId = input<string | undefined>(undefined);

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private assocTMCService = inject(AssociationTrainingmoduleCollaboratorService);
  private assocTMCSignalService = inject(AssociationTrainingmoduleCollaboratorSignalService);
  private collaboratorService = inject(CollaboratorDataService);
  private trainingModuleService = inject(TrainingModuleDataService);

  form!: FormGroup;
  collaborators: Collaborator[] = [];
  trainingModules: TrainingModule[] = [];

  ngOnInit() {
    this.initForm();
    this.fetchDropdownData();
  }

  initForm() {
    this.form = new FormGroup({
      periodDate: new FormGroup({
        initDate: new FormControl<string>(this.formatDate(new Date()), Validators.required),
        finalDate: new FormControl<string>(this.formatDate(new Date()), Validators.required)
      })
    }, { validators: this.dateRangeValidator() });

    if (this.collaboratorId()) {
      this.form.addControl('trainingModuleId', this.fb.control('', Validators.required));
    } else if (this.trainingModuleId()) {
      this.form.addControl('collaboratorId', this.fb.control('', Validators.required));
    }
  }

  fetchDropdownData() {
    if (this.collaboratorId()) {
      this.trainingModuleService.getTrainingModules().subscribe({
        next: (tms) => this.trainingModules = tms,
        error: (err) => console.error('Error fetching training modules:', err)
      });
    } else if (this.trainingModuleId()) {
      this.collaboratorService.getCollabs().subscribe({
        next: (collabs) => this.collaborators = collabs,
        error: (err) => console.error('Error fetching collaborators:', err)
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    let newAssoc: AssociationTrainingModuleCollaboratorCreateRequest;

    if (this.collaboratorId()) {
      newAssoc = {
        collaboratorId: this.collaboratorId()!,
        trainingModuleId: formValue.trainingModuleId,
        periodDate: {
          initDate: formValue.periodDate.initDate,
          finalDate: formValue.periodDate.finalDate
        }
      };
    } else if (this.trainingModuleId()) {
      newAssoc = {
        collaboratorId: formValue.collaboratorId,
        trainingModuleId: this.trainingModuleId()!,
        periodDate: {
          initDate: formValue.periodDate.initDate,
          finalDate: formValue.periodDate.finalDate
        }
      }
    } else {
      alert("An error has occurred!");
      return;
    }

    const navigateBasePath = this.collaboratorId() ?
      `/collaborators/associations-trainingmodule/${this.collaboratorId()}` :
      `/training-modules/associations-collaborator/${this.trainingModuleId()}`;

    this.assocTMCService.createAssociationTMC(newAssoc).subscribe({
      next: (createdAssoc) => {
        this.form.reset();
        this.assocTMCSignalService.createAssociationTMC(createdAssoc);
        this.assocTMCSignalService.changeAssociationTMCCreationState(false);
        this.router.navigate([navigateBasePath]);
      },
      error: (error) => {
        alert('Error creating association!');
        console.error('Error creating association:', error);
      }
    });
  }

  onCancel() {
    const navigateBasePath = this.collaboratorId() ?
      `/collaborators/associations-trainingmodule/${this.collaboratorId()}` :
      `/training-modules/associations-collaborator/${this.trainingModuleId()}`;

    this.form.reset();
    this.assocTMCSignalService.changeAssociationTMCCreationState(false);
    this.router.navigate([navigateBasePath]);
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private dateRangeValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const init = group.get('initDate')?.value;
      const final = group.get('finalDate')?.value;

      if (!init || !final) return null;

      const initDate = new Date(init);
      const finalDate = new Date(final);

      return initDate < finalDate ? null : { dateRangeInvalid: true };
    };
  }
}
