import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTableComponent } from './projects-table.component';
import { Project } from '../models/project.model';
import { ProjectsSignalsService } from '../projects-signals.service';

describe('ProjectsTableComponent', () => {
  let component: ProjectsTableComponent;
  let fixture: ComponentFixture<ProjectsTableComponent>;
  let projects: Project[];
  let mockProjectsSignalService: jasmine.SpyObj<ProjectsSignalsService>;


  beforeEach(async () => {
    mockProjectsSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['selectProject', 'selectProjectCollaborators']);
    await TestBed.configureTestingModule({
      imports: [ProjectsTableComponent],
      providers: [
        { provide: ProjectsSignalsService, useValue: mockProjectsSignalService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsTableComponent);
    component = fixture.componentInstance;

    projects = [
      {
        id: '1',
        title: "Project1",
        acronym: "P1",
        periodDate: {
          initDate: new Date("2021-02-01"),
          finalDate: new Date("2024-07-30")
        }
      },
      {
        id: '2',
        title: "Project2",
        acronym: "P2",
        periodDate: {
          initDate: new Date("2022-03-01"),
          finalDate: new Date("2027-09-30")
        }
      }
    ];

    fixture.componentRef.setInput('projects', projects);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the Projects info in the table', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');

    const cells1 = rows[1].querySelectorAll('td');
    expect(cells1[0].textContent).toEqual(projects[0].title);
    expect(cells1[1].textContent).toEqual(projects[0].acronym);

    const cells2 = rows[2].querySelectorAll('td');
    expect(cells2[0].textContent).toEqual(projects[1].title);
    expect(cells2[1].textContent).toEqual(projects[1].acronym);
  });

  it('should call onSelectProject with the selected project when a button Project Details is clicked', () => {
    const button1: HTMLElement = fixture.nativeElement.querySelectorAll('[data-testid="details-btn"]')[1];
    button1.click();

    expect(mockProjectsSignalService.selectProject).toHaveBeenCalledOnceWith(projects[1]);
  });

  it('should call onSelectProjectCollaborators with the selected project when a button Project Collaborators is clicked', () => {
    const button1: HTMLElement = fixture.nativeElement.querySelectorAll('[data-testid="collabs-btn"]')[1];
    button1.click();

    expect(mockProjectsSignalService.selectProjectCollaborators).toHaveBeenCalledOnceWith(projects[1]);
  });

  it('should change the table content if new input arrived', () => {
    const newProjects: Project[] = [
      {
        id: '3',
        title: "Project3",
        acronym: "P3",
        periodDate: {
          initDate: new Date("2022-02-05"),
          finalDate: new Date("2026-09-01")
        }
      }
    ]
    fixture.componentRef.setInput('projects', newProjects);
    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');

    const cells1 = rows[1].querySelectorAll('td');
    expect(cells1[0].textContent).toEqual(newProjects[0].title);
    expect(cells1[1].textContent).toEqual(newProjects[0].acronym);
  });
});
