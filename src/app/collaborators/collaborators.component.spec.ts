import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { CollaboratorService } from './collaborator.service';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;
  let mockCollaboratorService = jasmine.createSpyObj('CollaboratorService', ['getCollaborators']);
  let collaborators: CollaboratorDetails[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorsComponent],
      providers: [
        { provide: CollaboratorService, useValue: mockCollaboratorService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsComponent);
    component = fixture.componentInstance;

    collaborators = [
      {
        id: "1",
        names: "Alice",
        surnames: "Johnson",
        email: "alice.johnson@example.com",
        periodDateTime: {
          _initDate: new Date(2019, 5, 10),
          _finalDate: new Date(2025, 11, 31)
        }
      },
      {
        id: "2",
        names: "Bob",
        surnames: "Martinez",
        email: "bob.martinez@example.com",
        periodDateTime: {
          _initDate: new Date(2021, 1, 1),
          _finalDate: new Date(2024, 6, 30)
        }
      },
      {
        id: "3",
        names: "Clara",
        surnames: "Nguyen",
        email: "clara.nguyen@example.com",
        periodDateTime: {
          _initDate: new Date(2020, 3, 15),
          _finalDate: new Date(2030, 8, 1)
        }
      }
    ];
    mockCollaboratorService.getCollaborators.and.returnValue(collaborators);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the Collaborators Info in the table', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');

    const cells1 = rows[1].querySelectorAll('td');
    expect(cells1[0].textContent).toBe(collaborators[0].names);
    expect(cells1[1].textContent).toBe(collaborators[0].email);

    const cells2 = rows[2].querySelectorAll('td');
    expect(cells2[0].textContent).toBe(collaborators[1].names);
    expect(cells2[1].textContent).toBe(collaborators[1].email);

  });

  it('should not show collaborator details on init because selectedCollaborator is undefined', () => {
    const projectDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(projectDetails).toBeNull();
  });

  it('should show collaborator details when selectedCollaborator is not undefined', () => {
    component.selectedCollaborator.set(collaborators[0]);

    fixture.detectChanges();

    const projectDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(projectDetails).not.toBeNull();

  });

  it('should call onSelectCollaborator with selectedCollaborator when button is clicked', () => {
    const spy = spyOn(component, 'onSelectCollaborator');

    const selectedCollaborator = collaborators[0];

    component.selectedCollaborator.set(selectedCollaborator);

    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledOnceWith(selectedCollaborator)
  });

  it('onSelectCollaborator should change the selectedCollaborator', () => {
    const selectedCollaborator = collaborators[0];

    component.onSelectCollaborator(selectedCollaborator);

    expect(component.selectedCollaborator()).toBe(selectedCollaborator)
  });

  it('onChangeCollaborator should change the right collaborator', () => {
    const changedCollaborator = collaborators[0];
    changedCollaborator.names = "Changed";

    component.onChangeCollaborator(changedCollaborator);

    expect(component.collaborators()[0]).toBe(changedCollaborator)
  });
});
