import { Component, inject, effect, signal } from '@angular/core';
import { TechnologyListComponent } from './technology-list/technology-list';
import { TechnologyDataService } from './technology-data.service';
import { TechnologyDTO } from './technology.DTO';
import { toTecnologyDTO } from './technology.mapper';
import { TechnologySignalService } from './technology-signal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-technology',
  imports: [TechnologyListComponent, CommonModule, RouterModule],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.css'
})
export class TechnologyComponent {
  private TechnologyDataService = inject(TechnologyDataService);
  private signalService = inject(TechnologySignalService);

  TechnologyAdded = this.signalService.technologyAdded;
  Technology = signal<TechnologyDTO[]>([]);

  constructor() {
    this.GetTechnology();

    effect(() => {
      if (this.TechnologyAdded()) {
        this.GetTechnology();
        this.signalService.Clear();
      }
    });
  }

  GetTechnology() {
    this.TechnologyDataService.getTechnologies().subscribe({
      next: (technology) => {
        const technologyDTO = technology.map(toTecnologyDTO);
        this.Technology.set(technologyDTO);
      },
      error: (err) => {
        alert('not getting Technology');
        console.error('not getting Technology', err);
      }
    });
  }
}