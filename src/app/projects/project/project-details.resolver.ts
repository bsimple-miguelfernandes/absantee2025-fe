import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsDataService } from '../projects-data.service';
import { Project } from './project';

@Injectable({ providedIn: 'root' })
export class ProjectDetailsResolver implements Resolve<Project> {
  constructor(private service: ProjectsDataService) {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<Project> {
    return this.service.getProjectById(route.paramMap.get('projectId')!);
  }
}
