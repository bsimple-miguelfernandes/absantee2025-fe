import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersComponent } from './filters.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;

    component.fields = [
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description' }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersChanged when form value changes', () => {
    component.showFilters = true;
    fixture.detectChanges();

    const spy = spyOn(component.filtersChanged, 'emit');
    const titleControl = component.filterForm.get('title')!;
    titleControl.setValue('Title');

    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Title' }));
  });

  it('should toggle showFilters and reset form when toggleFilters is called', () => {
    component.showFilters = false;
    component.filterForm.get('title')?.setValue('xpto');
    component.toggleFilters();

    expect(component.showFilters).toBeTrue();
    expect(component.filterForm.get('title')?.value).toBeNull;
  });

  it('should show "Show Filters" or "Hide Filters" based on state', () => {
    component.showFilters = false;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('Show Filters');

    component.toggleFilters();
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toContain('Hide Filters');
  });
});
