import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollaboratorProjectComponent } from './add-collaborator-project.component';

describe('AddCollaboratorProjectComponent', () => {
  let component: AddCollaboratorProjectComponent;
  let fixture: ComponentFixture<AddCollaboratorProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCollaboratorProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollaboratorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
