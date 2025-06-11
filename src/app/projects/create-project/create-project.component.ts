import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProjectsSignalsService } from "../services/projects-signals.service";
import { ProjectsDataService } from "../services/projects-data.service";
import { ProjectCreateRequest } from "./create-project";
import { formatDate } from "../../utils/date";
import { dateRangeValidator } from "../../utils/validators";

@Component({
    selector: 'app-project-create',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-project.component.html',
})
export class ProjectCreateComponent {

    projectSignalService = inject(ProjectsSignalsService);
    projectDataService = inject(ProjectsDataService);

    form = new FormGroup({
        title: new FormControl<string>('', [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(1)
        ]),
        acronym: new FormControl<string>('', [
            Validators.required,
            Validators.pattern(/^[A-Z0-9]{1,10}$/)
        ]),
        periodDate: new FormGroup({
            initDate: new FormControl<string>(formatDate(new Date()), Validators.required),
            finalDate: new FormControl<string>(formatDate(new Date()), Validators.required),
        }, { validators: dateRangeValidator() }),
    });

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const formValue = this.form.getRawValue();

        const newProject: ProjectCreateRequest = {
            title: formValue.title ?? '',
            acronym: formValue.acronym ?? '',
            periodDate: {
                initDate: formValue.periodDate!.initDate!,
                finalDate: formValue.periodDate!.finalDate!
            }
        };

        /* this.projectDataService.createProject(newProject).subscribe({
            next: (createdProject) => {
                console.log('Created project:', createdProject);
                this.projectSignalService.cancelCreateProject();
                this.projectSignalService.createProject(createdProject);
                this.form.reset();
            },
            error: (error) => {
                console.error('Error creating project:', error);
            }
        }); */
    }

    onCancel() {
        this.projectSignalService.cancelCreateProject();
        this.form.reset();
    }

    get title() {
        return this.form.get('title') as FormControl;
    }

    get acronym() {
        return this.form.get('acronym') as FormControl;
    }
}
