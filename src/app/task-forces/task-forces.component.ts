import { Component, effect, inject } from '@angular/core';
import { TaskForceViewModel } from './models/task-force.view-model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TaskForceDataService } from './services/task-force-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toTaskForceModelView } from './mappers/task-force.mapper';
import { TaskForceSignalService } from './services/task-force-signal.service';

@Component({
  selector: 'app-task-forces',
  imports: [DatePipe, RouterOutlet, ReactiveFormsModule],
  templateUrl: './task-forces.component.html',
  styleUrl: './task-forces.component.css'
})
export class TaskForcesComponent {
  taskForces: TaskForceViewModel[] = [];
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(TaskForceDataService);
  private taskForceSignalService = inject(TaskForceSignalService);
  private fb = inject(FormBuilder);

  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      filterType: ['description'], // default
      filterValue: [''],
      periodStart: [''],
      periodEnd: ['']
    });

    this.loadAll();
  }

  constructor() {
    effect(() => {
      const created = this.taskForceSignalService.taskForceCreated();
      if (created) {
        const exists = this.taskForces.find(t => t.id === created.id);
        if (!exists) {
          this.taskForces = [...this.taskForces, toTaskForceModelView(created)];
        }
      }
    });

    effect(() => {
      const updated = this.taskForceSignalService.taskForceUpdated();
      if (updated) {
        const index = this.taskForces.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          const updatedList = [...this.taskForces];
          updatedList[index] = toTaskForceModelView(updated);
          this.taskForces = updatedList;
        }
      }
    });
  }

  loadAll(): void {
    this.service.getAllTaskForces().subscribe(taskForces => this.taskForces = taskForces.map(toTaskForceModelView));
  }

  onSearch(): void {
    const { filterType, filterValue, periodStart, periodEnd } = this.searchForm.value;

    switch (filterType) {
      case 'description':
        this.service.getTaskForcesByDescription(filterValue).subscribe(data => this.taskForces = data.map(toTaskForceModelView));
        break;
      case 'project':
        this.service.getTaskForcesByProject(filterValue).subscribe(data => this.taskForces = data.map(toTaskForceModelView));
        break;
      case 'subject':
        this.service.getTaskForcesBySubjectId(filterValue).subscribe(data => this.taskForces = data.map(toTaskForceModelView));
        break;
      case 'period':
        if (periodStart && periodEnd) {
          this.service.getTaskForcesByPeriod(periodStart, periodEnd).subscribe(data => this.taskForces = data.map(toTaskForceModelView));
        }
        break;
      default:
        this.loadAll();
    }
  }

  onEdit(id: string): void {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  onViewCollaborators(id: string): void {
    this.router.navigate(['collaborators', id], { relativeTo: this.route });
  }

  onCreateTaskForce(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
