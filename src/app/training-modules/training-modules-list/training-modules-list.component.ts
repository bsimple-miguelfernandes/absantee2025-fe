import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { TrainingModule } from '../training-module';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-training-modules-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './training-modules-list.component.html',
  styleUrl: './training-modules-list.component.css'
})
export class TrainingModulesListComponent {
  trainingModuleSignalService = inject(TrainingModuleSignalService);

  trainingModules = input.required<TrainingModule[]>();

}
