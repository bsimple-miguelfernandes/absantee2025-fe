import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsTrainingModuleCollaboratorComponent } from './associations-training-module-collaborator.component';

describe('AssociationsTrainingModuleCollaboratorComponent', () => {
  let component: AssociationsTrainingModuleCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsTrainingModuleCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationsTrainingModuleCollaboratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsTrainingModuleCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
