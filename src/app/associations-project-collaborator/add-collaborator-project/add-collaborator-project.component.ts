import { Component, inject, input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProjectsDataService } from '../../projects/projects-data.service';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';
import { AssociationProjectCollaboratorCreateRequest } from './add-association';
import { ProjectsSignalsService } from '../../projects/projects-signals.service';
import { CollaboratorSignalService } from '../../collaborators/collaborator-signal.service';
import { Output, EventEmitter } from '@angular/core';
import { Project } from '../../projects/models/project.model';
import { Collaborator } from '../../collaborators/collaborator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-collaborator-project',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-collaborator-project.component.html',
  styleUrl: './add-collaborator-project.component.css'
})
export class AddCollaboratorProjectComponent {
  collaboratorId = input<string | undefined>(undefined);
  projectId = input<string | undefined>(undefined);
  projects: Project[] = [];
  collaborators: Collaborator[] = [];


  @Output() cancel = new EventEmitter<void>();

  fb = inject(FormBuilder);

  projectDataService = inject(ProjectsDataService);
  collabDataService = inject(CollaboratorDataService);

  projectSignalService = inject(ProjectsSignalsService);
  collabSignalService = inject(CollaboratorSignalService);

  form!: FormGroup;

  ngOnInit() {
    this.initForm();

    if (this.collaboratorId()) {
      this.projectDataService.getProjects().subscribe(projects => this.projects = projects);
    } else if (this.projectId()) {
      this.collabDataService.getCollabs().subscribe(collabs => this.collaborators = collabs);
    }
  }


  initForm() {
    this.form = new FormGroup({
      periodDate: new FormGroup({
        initDate: new FormControl<string>(this.formatDate(new Date()), Validators.required),
        finalDate: new FormControl<string>(this.formatDate(new Date()), Validators.required)
      })
    }, { validators: this.dateRangeValidator() });

    if (this.collaboratorId()) {
      this.form.addControl('projectId', this.fb.control('', Validators.required));
    } else if (this.projectId()) {
      this.form.addControl('collaboratorId', this.fb.control('', Validators.required));
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  dateRangeValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const init = group.get('initDate')?.value;
      const final = group.get('finalDate')?.value;

      if (!init || !final) return null;

      const initDate = new Date(init);
      const finalDate = new Date(final);

      return initDate < finalDate ? null : { dateRangeInvalid: true };
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const newAssoc: AssociationProjectCollaboratorCreateRequest = {
      collaboratorId: this.collaboratorId() ?? formValue.collaboratorId,
      projectId: this.projectId() ?? formValue.projectId,
      periodDate: {
        initDate: formValue.periodDate.initDate,
        finalDate: formValue.periodDate.finalDate
      }
    };

    this.projectDataService.createAssociation(newAssoc).subscribe({
      next: (createdAssoc) => {
        this.projectSignalService.cancelCreateAssociation();
        this.projectSignalService.createAssociation(createdAssoc);
        this.form.reset();

        this.cancel.emit()
      },
      error: (error) => {
        alert('Error creating association!');
        console.log('Error creating association:', error);
      }
    });
  }


  onCancel() {
    if (this.collaboratorId()) {
      this.collabSignalService.cancelCreateAssociation();
    } else if (this.projectId()) {
      this.projectSignalService.cancelCreateAssociation();
    }
    this.form.reset();
    this.cancel.emit();
  }


  get collabId() {
    return this.form.get('collaboratorId') as FormControl;
  }

  get projId() {
    return this.form.get('projectId') as FormControl;
  }
}
