import { Component, input } from '@angular/core';
import { TrainingSubject } from './training-subject';

@Component({
  selector: 'app-training-subjects-list',
  imports: [],
  templateUrl: './training-subjects-list.component.html',
  styleUrl: './training-subjects-list.component.css'
})
export class TrainingSubjectsListComponent {
  trainingSubjects = input.required<TrainingSubject[]>();
}
