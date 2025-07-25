import { Component, inject, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { TrainingModule } from '../training-module';
import { FiltersComponent } from '../../filters/filters.component';
import { TrainingModuleSignalService } from '../training-modules-signals.service';

@Component({
  selector: 'app-training-modules-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FiltersComponent],
  templateUrl: './training-modules-list.component.html',
  styleUrls: ['./training-modules-list.component.css']
})
export class TrainingModulesListComponent {
    signalsService = inject(TrainingModuleSignalService);
  
  trainingModules = input.required<TrainingModule[]>();
  filteredModules: TrainingModule[] = [];
  selectedTrainingModule!: string;

  router = inject(Router);
  route = inject(ActivatedRoute);
  selectRoute(url: string, id: string) {
    this.router.navigate([url, id], { relativeTo: this.route });
    this.selectedTrainingModule = id;
  }
  ngOnInit() {
    this.filteredModules = this.trainingModules(); 
    this.route.paramMap.subscribe(params => {
      this.selectedTrainingModule = params.get('trainingModuleId') ?? '';
    });
  }
  ngOnChanges() {
      this.filteredModules = this.trainingModules();
    }
  showDetails(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }

   addTrainingModule() {
    this.signalsService.addTrainingModule();
  }

  applyFilters(filters: Record<string, string>) {
  const periodFilter = filters['period']?.toLowerCase() ?? '';
  const initDateFilter = filters['initDate'] ? new Date(filters['initDate']) : null;
  const finalDateFilter = filters['finalDate'] ? new Date(filters['finalDate']) : null;

  this.filteredModules = this.trainingModules().filter(module => {
    const periodMatch = !periodFilter || module.periods.some(p => 
      true // Se não tens campo para filtrar texto, podes ignorar este filtro
    );

    const dateMatch = module.periods.some(p => {
      const moduleInitDate = new Date(p._initDate);
      const moduleFinalDate = new Date(p._finalDate);

      const initDateOk = !initDateFilter || moduleInitDate >= initDateFilter;
      const finalDateOk = !finalDateFilter || moduleFinalDate <= finalDateFilter;

      return initDateOk && finalDateOk;
    });

    return periodMatch && dateMatch;
  });
}
}
