import { Component, inject, input } from '@angular/core';
import { TrainingSubject } from '../training-subject';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TrainingSubjectSignalsService } from '../training-subjects-signals.service';
import { FiltersComponent } from "../../filters/filters.component";

@Component({
  selector: 'app-training-subjects-list',
  imports: [RouterLink, FiltersComponent, RouterOutlet],
  templateUrl: './training-subjects-list.component.html',
  styleUrl: './training-subjects-list.component.css'
})
export class TrainingSubjectsListComponent {
  signalsService = inject(TrainingSubjectSignalsService);

  trainingSubjects = input.required<TrainingSubject[]>();

  filteredSubjects: TrainingSubject[] = [];

  router = inject(Router);
  route = inject(ActivatedRoute);

  selectedTrainingSubject!: string;

  selectRoute(url: string, id: string) {
    this.router.navigate([url, id], { relativeTo: this.route });
    this.selectedTrainingSubject = id;
  }

  ngOnChanges() {
    this.filteredSubjects = this.trainingSubjects();
  }

  addTrainingSubject() {
    this.signalsService.addTrainingSubject();
  }

  applyFilters(filters: Record<string, string>) {
    const title = filters['title']?.toLowerCase() ?? '';

    this.filteredSubjects = this.trainingSubjects().filter(subject =>
      (!title || subject.subject.toLowerCase().includes(title))
    )
  }
}
