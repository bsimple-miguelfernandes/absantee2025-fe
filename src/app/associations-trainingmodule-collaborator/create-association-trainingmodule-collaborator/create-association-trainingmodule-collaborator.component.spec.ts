import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssociationTrainingmoduleCollaboratorComponent } from './create-association-trainingmodule-collaborator.component';

describe('CreateAssociationTrainingmoduleCollaboratorComponent', () => {
  let component: CreateAssociationTrainingmoduleCollaboratorComponent;
  let fixture: ComponentFixture<CreateAssociationTrainingmoduleCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssociationTrainingmoduleCollaboratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssociationTrainingmoduleCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
