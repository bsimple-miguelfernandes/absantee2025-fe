import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaborator-details',
  imports: [ReactiveFormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: './collaborator-details.component.css'
})
export class CollaboratorDetailsComponent implements OnInit, OnChanges {
  collaborator = input.required<CollaboratorDetails>();
  changedCollaborator = output<CollaboratorDetails>();
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      names: new FormControl(this.collaborator().names),
      surnames: new FormControl(this.collaborator().surnames),
      email: new FormControl(this.collaborator().email),
      periodDateTime: new FormGroup({
        initDate: new FormControl(this.formatDate(this.collaborator().periodDateTime._initDate)),
        endDate: new FormControl(this.formatDate(this.collaborator().periodDateTime._finalDate))
      })
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const collabChange = changes['collaborator'];
    if (collabChange && collabChange.previousValue &&
      collabChange.previousValue.id !== collabChange.currentValue?.id) {
      const collaborator : CollaboratorDetails = collabChange.currentValue;
      this.form.patchValue({
      names: collaborator.names,
      surnames: collaborator.surnames,
      email: collaborator.email,
      periodDateTime: {
        initDate: this.formatDate(collaborator.periodDateTime._initDate),
        endDate: this.formatDate(collaborator.periodDateTime._finalDate)
      }
    });
    }
  }

  private formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit() {
    const formValue = this.form.value;

    const updatedCollaborator: CollaboratorDetails = {
      id: this.collaborator().id,
      names: formValue.names,
      surnames: formValue.surnames,
      email: formValue.email,
      periodDateTime: {
        _initDate: new Date(formValue.periodDateTime.initDate),
        _finalDate: new Date(formValue.periodDateTime.endDate)
      }
    };

    this.changedCollaborator.emit(updatedCollaborator);
  }
}