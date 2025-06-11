import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProjectViewModel } from '../models/project-view-model.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

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
    this.searchForm.valueChanges
      .pipe(debounceTime(200), startWith(this.searchForm.value))
      .subscribe(() => this.filterProjects());
  }

  private filterProjects() {
    const { name, acronym } = this.searchForm.value;

    const filtered = this.projects.filter(project => {
      const matchesName = !name || project.title.toLowerCase().includes(name.toLowerCase());
      const matchesAcronym = !acronym || project.acronym.toLowerCase().includes(acronym.toLowerCase());

      return matchesName && matchesAcronym;
    });

    this.filteredList.emit(filtered);
  }
}
