import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { specialityDTO } from '../specialityDTO';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FiltersComponent } from "../../filter/filter.component";

@Component({
  selector: 'app-speciality-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FiltersComponent],
  templateUrl: './speciality-list.component.html',
  styleUrl: './speciality-list.component.css'
})
export class SpecialityListComponent {
  @Input() specialities: specialityDTO[] = [];

  specialityfilter: specialityDTO[] = [];
  specialityselected!: string;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectRoute(url: string, id: string) {
    this.router.navigate([url, id], { relativeTo: this.route });
    this.specialityselected = id;
  }

  ngOnChanges() {
    this.specialityfilter = this.specialities;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.specialityselected = params.get('specialityId') ?? '';
    });
  }

  applyFilters(filters: Record<string, string>) {
    const id = filters['id']?.toLowerCase() ?? '';
    const description = filters['description']?.toLowerCase() ?? '';
    const technologyId = filters['technologyId']?.toLowerCase() ?? '';
    const collabId = filters['collaboratorId']?.toLowerCase() ?? '';
    const initDateSpeciality = filters['initDate'] ? new Date(filters['initDate']) : null;
    const finalDateSpeciality = filters['finalDate'] ? new Date(filters['finalDate']) : null;

    this.specialityfilter = this.specialities.filter((s: specialityDTO) => {
      const specialiyInitDate = new Date(s.period.initDate);
      const specialityFinalDate = new Date(s.period.finalDate);

      return (
        (!id || s.id.toLowerCase().includes(id)) &&
        (!description || s.description.toLowerCase().includes(description)) &&
        (!technologyId || s.technologyId.toLowerCase().includes(technologyId)) &&
        (!collabId || s.collaboratorId.toLowerCase().includes(collabId)) &&
        (!initDateSpeciality || specialiyInitDate >= initDateSpeciality) &&
        (!finalDateSpeciality || specialityFinalDate <= finalDateSpeciality)
      );
    });
  }

  trackById(index: number, speciality: specialityDTO) {
    return speciality.id;
  }
}
