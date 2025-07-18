import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityCollaboratorsListComponent } from './speciality-collaborators-list.component';

describe('SpecialityCollaboratorsListComponent', () => {
  let component: SpecialityCollaboratorsListComponent;
  let fixture: ComponentFixture<SpecialityCollaboratorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialityCollaboratorsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityCollaboratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
