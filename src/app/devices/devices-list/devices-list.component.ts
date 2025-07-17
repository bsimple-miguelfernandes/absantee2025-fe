import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Device } from '../devices';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-devices-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './devices-list.component.html',
  styleUrl: './devices-list.component.css'
})
export class DevicesListComponent implements OnChanges {
  @Input() inputDevices!: Device[];
  devices: Device[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputDevices'] && this.inputDevices) {
      this.devices = this.inputDevices;
      console.log("📦 Devices recebidos:", this.devices); // AQUI!

    }
  }
}
