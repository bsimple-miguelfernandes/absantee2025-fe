import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsFormComponent } from './assigments-form.component';

describe('AssigmentsFormComponent', () => {
  let component: AssignmentsFormComponent;
  let fixture: ComponentFixture<AssignmentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssignmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
