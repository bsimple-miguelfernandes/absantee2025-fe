import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class FiltersComponent implements OnInit {
  @Input() fields: { name: string; label: string; type?: string }[] = [];
  @Output() filtersChanged = new EventEmitter<Record<string, string>>();

  filterForm!: FormGroup;

  showFilters: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const formGroupConfig: Record<string, any> = {};
    this.fields.forEach(field => {
      formGroupConfig[field.name] = [''];
    });

    this.filterForm = this.fb.group(formGroupConfig);

    this.filterForm.valueChanges.subscribe(value => {
      this.filtersChanged.emit(value);
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.filterForm.reset();
  }
}
