import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { CollaboratorService } from './collaborator.service';
import { By } from '@angular/platform-browser';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;
  let mockCollaboratorService = jasmine.createSpyObj('CollaboratorService', ['getCollaborators', 'updateCollaborator']);
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

  it('should not show collaborator details on init because selectedCollaborator is undefined', () => {
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collaboratorDetails).toBeNull();
  });

  it('should show collaborator details when CollaboratorListComponent emit selectedCollaborator', () => {
    const childComponent = fixture.debugElement.query(By.directive(CollaboratorListComponent)).componentInstance;

    childComponent.selectedCollaborator.emit(collaborators[0]);

    fixture.detectChanges();

    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collaboratorDetails).not.toBeNull();
  });

  it('should call onChangeCollaborator when CollaboratorDetails emit changedCollaborator', () => {
    component.selectedCollaborator.set(collaborators[0]);
    fixture.detectChanges();
    
    const spy = spyOn(component, 'onChangeCollaborator');

    const childComponent = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent)).componentInstance;

    childComponent.changedCollaborator.emit(collaborators[0]);

    expect(spy).toHaveBeenCalledOnceWith(collaborators[0])
  });
});
