import { Component, input, signal, computed } from '@angular/core';
import { Project } from '../project/project';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-projects-table',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  projects = input.required<Project[]>();

  showFilters = signal(false);

  searchForm = new FormGroup({
    title: new FormControl(''),
    acronym: new FormControl('')
  });

  filteredProjects = computed(() => {
    const { title, acronym } = this.searchForm.value;
    const allProjects = this.projects();

    return allProjects.filter(p =>
      (!title || p.title.toLowerCase().includes(title.toLowerCase())) &&
      (!acronym || p.acronym.toLowerCase().includes(acronym.toLowerCase()))
    );
  });

  toggleFilters() {
    this.showFilters.update(v => !v);
    if (!this.showFilters()) this.resetFilters();
  }

  resetFilters() {
    this.searchForm.reset();
  }
}
