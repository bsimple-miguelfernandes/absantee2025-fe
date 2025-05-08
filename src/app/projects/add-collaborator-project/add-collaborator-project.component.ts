import { Component, input, output } from '@angular/core';
import { AddAssociationProjectCollaborator } from '../project/project';
import { PeriodDateString } from '../../PeriodDate';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-collaborator-project',
  imports: [FormsModule],
  templateUrl: './add-collaborator-project.component.html',
  styleUrl: './add-collaborator-project.component.css'
})
export class AddCollaboratorProjectComponent {
  allCollaboratorsIds = input.required<string[]>();
  submitForm = output<AddAssociationProjectCollaborator>();
  closeForm = output<void>();

  selectedCollaboratorId: string = '';
  startDate: string = '';
  endDate: string = '';

  closeModal(){
    this.closeForm.emit();
  }

  onSubmit() {
    const initDate = new Date(this.startDate).toISOString().split('T')[0];
    const finalDate = new Date(this.endDate).toISOString().split('T')[0];

    const periodDate: PeriodDateString = {
      initDate: initDate,
      finalDate: finalDate
    }

    const association: AddAssociationProjectCollaborator = {
      collaboratorId: this.selectedCollaboratorId,
      periodDate
    };

    this.submitForm.emit(association);
  }
}
