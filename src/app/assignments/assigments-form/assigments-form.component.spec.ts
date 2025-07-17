import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentsFormComponent } from './assigments-form.component';

describe('AssigmentsFormComponent', () => {
  let component: AssigmentsFormComponent;
  let fixture: ComponentFixture<AssigmentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigmentsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
