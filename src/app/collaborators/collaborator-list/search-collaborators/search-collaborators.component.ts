import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollaboratorDataService } from '../../collaborator-data.service';
import { Collaborator } from '../../collaborator.model';

@Component({
  selector: 'app-search-collaborators',
  imports: [ReactiveFormsModule],
  templateUrl: './search-collaborators.component.html',
  styleUrl: './search-collaborators.component.css'
})
export class SearchCollaboratorsComponent {
  form = new FormGroup({ name: new FormControl<string>(''), surname: new FormControl('') });
  collaboratorService = inject(CollaboratorDataService);
  filteredList = output<string[]>();

  onSubmit() {
    const name = this.form.get('name')?.value?.trim() ?? '';
    const surname = this.form.get('surname')?.value?.trim() ?? '';

    if (!name && !surname) {
      alert("Please fill any of the fields!")
      return;
    }

    if (name || surname) {
      this.collaboratorService.filterByNames(name, surname).subscribe((ids) => {
        this.filteredList.emit(ids);
      });
    }

  }

}
