import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CollaboratorViewModel } from '../collaborator-details/collaborator.viewmodel';

@Component({
  selector: 'app-collaborator-list',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  @Input() inputCollabs!: CollaboratorViewModel[];
  @Output() openDetails = new EventEmitter<CollaboratorViewModel>();

  collaborators: CollaboratorViewModel[] = [];

  showFilters: boolean = false;

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges) {
    if(changes['inputCollabs'] && this.inputCollabs) {
      this.collaborators = this.inputCollabs;
    }
  }

  ngOnInit() { 
    this.searchForm.valueChanges.subscribe(values => {
      const { name, email } = values;
      this.collaborators = this.inputCollabs.filter(c =>
        (!name || c.names.toLowerCase().includes(name.toLowerCase()) 
          || c.surnames.toLowerCase().includes(name.toLowerCase())) &&
        (!email || c.email.toLowerCase().includes(email.toLowerCase()))
      );
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters
    if(!this.showFilters) {
      this.collaborators = this.inputCollabs;
    }
  }
}
