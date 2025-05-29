import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsBulletsComponent } from './collaborators-bullets.component';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { Collaborator } from '../collaborator';

describe('CollaboratorsBulletsComponent', () => {
  let component: CollaboratorsBulletsComponent;
  let fixture: ComponentFixture<CollaboratorsBulletsComponent>;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;

  beforeEach(async () => {
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['selectCollaborator']);
    
        await TestBed.configureTestingModule({
          imports: [CollaboratorsBulletsComponent],
          providers: [
            { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService },
          ]
        })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsBulletsComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('collaborators', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
