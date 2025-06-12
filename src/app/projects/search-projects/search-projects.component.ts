import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProjectViewModel } from '../models/project-view-model.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-projects',
  imports: [ReactiveFormsModule],
  templateUrl: './search-projects.component.html',
  styleUrl: './search-projects.component.css'
})
export class SearchProjectsComponent {
  @Input() projects: ProjectViewModel[] = [];
  @Output() filteredList = new EventEmitter<ProjectViewModel[]>();

  fb = inject(FormBuilder);

  searchForm = this.fb.group({
    name: [''],
    acronym: ['']
  });

  constructor() {
    this.searchForm.valueChanges.subscribe((values) => {

      const filtered = this.projects.filter(project => {
        const matchesName = !values.name || project.title.toLowerCase().includes(values.name.toLowerCase());
        const matchesAcronym = !values.acronym || project.acronym.toLowerCase().includes(values.acronym.toLowerCase());

        return matchesName && matchesAcronym;
      });

      this.filteredList.emit(filtered);
    });
  }
}
