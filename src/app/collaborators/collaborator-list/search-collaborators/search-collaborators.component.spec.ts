import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollaboratorsComponent } from './search-collaborators.component';

describe('SearchCollaboratorsComponent', () => {
  let component: SearchCollaboratorsComponent;
  let fixture: ComponentFixture<SearchCollaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCollaboratorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
