import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Technology } from '../technology';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-technology-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './technology-list.html',
  styleUrl: './technology-list.css'
})
export class TechnologyListComponent implements OnChanges {
  @Input() inputTechnology!: Technology[];
  technology: Technology[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputTechnology'] && this.inputTechnology) {
      this.technology = this.inputTechnology;
    }
  }
  trackById(index: number, item: Technology): string {
  return item.id;
}
}