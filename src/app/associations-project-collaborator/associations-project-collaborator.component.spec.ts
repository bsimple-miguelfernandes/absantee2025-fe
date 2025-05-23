import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator.component';

describe('AssociationsProjectCollaboratorComponent', () => {
  let component: AssociationsProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsProjectCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
