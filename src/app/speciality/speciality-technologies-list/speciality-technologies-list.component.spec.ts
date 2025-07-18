import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityTechnologiesListComponent } from './speciality-technologies-list.component';

describe('SpecialityTechnologiesListComponent', () => {
  let component: SpecialityTechnologiesListComponent;
  let fixture: ComponentFixture<SpecialityTechnologiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialityTechnologiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityTechnologiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
