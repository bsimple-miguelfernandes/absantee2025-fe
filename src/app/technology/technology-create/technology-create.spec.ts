import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyCreate } from './technology-create';

describe('TechnologyCreate', () => {
  let component: TechnologyCreate;
  let fixture: ComponentFixture<TechnologyCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
