import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollaboratorProjectComponent } from './add-collaborator-project.component';

describe('AddCollaboratorProjectComponent', () => {
  let component: AddCollaboratorProjectComponent;
  let fixture: ComponentFixture<AddCollaboratorProjectComponent>;
  let allCollaboratorsIds : string[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCollaboratorProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollaboratorProjectComponent);
    component = fixture.componentInstance;

    allCollaboratorsIds = ['2','3','4'];
    fixture.componentRef.setInput("allCollaboratorsIds", allCollaboratorsIds);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
