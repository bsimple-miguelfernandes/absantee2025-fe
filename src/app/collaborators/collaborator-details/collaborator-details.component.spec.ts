import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CollaboratorDetails } from './collaborator-details';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let collaborator: CollaboratorDetails;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;

    collaborator =
    {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date(2019, 5, 10),
        _finalDate: new Date(2025, 11, 31)
      }
    };

    fixture.componentRef.setInput('collaborator', collaborator);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
