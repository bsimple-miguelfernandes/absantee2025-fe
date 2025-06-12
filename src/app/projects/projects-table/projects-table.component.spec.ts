import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsTableComponent } from './projects-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ProjectViewModel } from '../models/project-view-model.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: ''
})
class DummyComponent {}

describe('ProjectsTableComponent', () => {
  let component: ProjectsTableComponent;
  let fixture: ComponentFixture<ProjectsTableComponent>;
  let router: Router;

  const mockProjects: ProjectViewModel[] = [
    {
      id: '1',
      title: 'Romeu',
      acronym: 'R1',
      periodDate: { initDate: new Date(), finalDate: new Date() }
    },
    {
      id: '2',
      title: 'Roma',
      acronym: 'B2',
      periodDate: { initDate: new Date(), finalDate: new Date() }
    }
  ];

  beforeEach(async () => {
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => null
      }
    },
    firstChild: null
  };

  await TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([])],
    providers: [
      { provide: ActivatedRoute, useValue: mockActivatedRoute }
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(ProjectsTableComponent);
  component = fixture.componentInstance;
  router = component['router'];
  fixture.componentRef.setInput('projects', mockProjects);
  fixture.detectChanges();
});

  it('should render project rows with title and acronym', () => {
  // HTML

  // Arrange
  const rows: HTMLTableRowElement[] = Array.from(fixture.nativeElement.querySelectorAll('table tr'));
  const dataRows = rows.filter(r => r.querySelectorAll('td').length > 0);

  // Assert
  expect(dataRows.length).toBe(2);

  const row1Cells = dataRows[0].querySelectorAll('td');
  const row2Cells = dataRows[1].querySelectorAll('td');

  expect(row1Cells[0].textContent).toContain('Romeu');
  expect(row1Cells[1].textContent).toContain('R1');
  expect(row2Cells[0].textContent).toContain('Roma');
  expect(row2Cells[1].textContent).toContain('B2');
});
  it('should call selectRoute("details", id) when Details button is clicked', () => {
    // HTML + TypeScript

    // Arrange
    spyOn(component, 'selectRoute');
    const detailsButtons = fixture.debugElement.queryAll(By.css('[data-testid="details-btn"]'));

    // Act
    detailsButtons[0].nativeElement.click();

    // Assert
    expect(component.selectRoute).toHaveBeenCalledWith('details', '1');
  });

  it('should call selectRoute("associations", id) when Collaborators button is clicked', () => {
    // HTML + TypeScript

    // Arrange
    spyOn(component, 'selectRoute');
    const collabButtons = fixture.debugElement.queryAll(By.css('[data-testid="collabs-btn"]'));

    // Act
    collabButtons[1].nativeElement.click();

    // Assert
    expect(component.selectRoute).toHaveBeenCalledWith('associations', '2');
  });

  it('should show <router-outlet> row only for selected project', () => {
  // HTML + TypeScript

  // Arrange
  spyOn(component, 'currentSelectedProject').and.returnValue('2');

  // Act
  fixture.detectChanges();

  const rows: HTMLTableRowElement[] = Array.from(fixture.nativeElement.querySelectorAll('tr'));
  const outletRows = rows.filter(row => row.querySelector('router-outlet'));

  // Assert
  expect(outletRows.length).toBe(1);
});


  it('should not show <router-outlet> row if project is not selected', () => {
    // HTML + TypeScript

    // Arrange
    spyOn(component, 'currentSelectedProject').and.returnValue(null);

    // Act
    fixture.detectChanges();

    // Assert
    const outletRows = fixture.nativeElement.querySelectorAll('router-outlet');
    expect(outletRows.length).toBe(0);
  });

  it('should navigate to /projects if selected project is already active', () => {
    // TypeScript

    // Arrange
    spyOn(component, 'currentSelectedProject').and.returnValue('1');
    Object.defineProperty(router, 'url', {
      get: () => '/details/1'
    });
    const navigateSpy = spyOn(router, 'navigate');

    // Act
    component.selectRoute('details', '1');

    // Assert
    expect(navigateSpy).toHaveBeenCalledWith(['/projects']);
  });

  it('should navigate to the project detail route if another project is selected', () => {
    // TypeScript

    // Arrange
    spyOn(component, 'currentSelectedProject').and.returnValue('1');
    Object.defineProperty(router, 'url', {
      get: () => '/details/1'
    });
    const navigateSpy = spyOn(router, 'navigate');

    // Act
    component.selectRoute('details', '2');

    // Assert
    expect(navigateSpy).toHaveBeenCalledWith(['details', '2'], {
      relativeTo: component['route']
    });
  });

  it('should return projectId from nested child routes', () => {
    // TypeScript

    // Arrange
    const mockChild = {
      snapshot: { paramMap: { get: () => '42' } },
      firstChild: null
    };
    const mockRoute: any = {
      firstChild: {
        firstChild: mockChild
      }
    };
    component['route'] = mockRoute;

    // Act
    const result = component.currentSelectedProject();

    // Assert
    expect(result).toBe('42');
  });

  it('should update DOM when input projects changes', () => {
    // HTML

    // Arrange
    const newProjects: ProjectViewModel[] = [
      {
        id: '9',
        title: 'Gamma',
        acronym: 'G9',
        periodDate: { initDate: new Date(), finalDate: new Date() }
      }
    ];

    // Act
    fixture.componentRef.setInput('projects', newProjects);
    fixture.detectChanges();

    // Assert
    const rows = fixture.nativeElement.querySelectorAll('table tr');
    const cells = rows[1].querySelectorAll('td');
    expect(cells[0].textContent).toContain('Gamma');
    expect(cells[1].textContent).toContain('G9');
  });
});
