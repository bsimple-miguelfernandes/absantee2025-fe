import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TrainingModule } from '../training-module';

@Component({
  selector: 'app-training-modules-list',
  imports: [CommonModule],
  templateUrl: './training-modules-list.component.html',
  styleUrl: './training-modules-list.component.css'
})
export class TrainingModulesListComponent {
  trainingModules = input.required<TrainingModule[]>();
}
