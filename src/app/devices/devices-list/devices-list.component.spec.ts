import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevicesListComponent } from './devices-list.component';
import { Device } from '../devices';
import { RouterTestingModule } from '@angular/router/testing';

describe('DevicesListComponent', () => {
  let component: DevicesListComponent;
  let fixture: ComponentFixture<DevicesListComponent>;

  const mockDevices: Device[] = [
    {
      id: '0196b4ee-a7fc-750f-a698-6a5dfd27ce71',
      description: 'Laptop de Teste',
      brand: 'Dell',
      model: 'Latitude',
      serialNumber: 'SN123456'
    },
    {
      id: 'b2c7e5d1-8f3a-4c2e-9a1b-2e5d7f8c9b10',
      description: 'Tablet de Teste',
      brand: 'Samsung',
      model: 'Tab S6',
      serialNumber: 'SN654321'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesListComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('inputDevices', mockDevices);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the devices in the table', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tbody tr');

    expect(rows.length).toBe(2);

    const cells1 = rows[0].querySelectorAll('td');
    expect(cells1[0].textContent).toContain(mockDevices[0].description);
    expect(cells1[1].textContent).toContain(mockDevices[0].brand);
    expect(cells1[2].textContent).toContain(mockDevices[0].model);
    expect(cells1[3].textContent).toContain(mockDevices[0].serialNumber);

    const cells2 = rows[1].querySelectorAll('td');
    expect(cells2[0].textContent).toContain(mockDevices[1].description);
    expect(cells2[1].textContent).toContain(mockDevices[1].brand);
    expect(cells2[2].textContent).toContain(mockDevices[1].model);
    expect(cells2[3].textContent).toContain(mockDevices[1].serialNumber);
  });

  it('should render the correct number of rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('table tbody tr');
    expect(rows.length).toBe(mockDevices.length);
  });

  it('should render the correct headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('table thead th');
    expect(headers[0].textContent).toContain('Description');
    expect(headers[1].textContent).toContain('Brand');
    expect(headers[2].textContent).toContain('Model');
    expect(headers[3].textContent).toContain('Serial Number');
  });

  it('should update the table when new input arrives', () => {
    const newDevices: Device[] = [
      {
        id: '3',
        description: 'Smartphone',
        brand: 'Apple',
        model: 'iPhone 13',
        serialNumber: 'SN999999'
      }
    ];

    fixture.componentRef.setInput('inputDevices', newDevices);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('table tbody tr');
    expect(rows.length).toBe(1);

    const cells = rows[0].querySelectorAll('td');
    expect(cells[0].textContent).toContain('Smartphone');
    expect(cells[1].textContent).toContain('Apple');
    expect(cells[2].textContent).toContain('iPhone 13');
    expect(cells[3].textContent).toContain('SN999999');
  });

  it('should add a new device to the existing list', () => {
    const extendedDevices = [...mockDevices, {
      id: '3',
      description: 'Smartphone',
      brand: 'Apple',
      model: 'iPhone 13',
      serialNumber: 'SN999999'
    }];

    fixture.componentRef.setInput('inputDevices', extendedDevices);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('table tbody tr');
    expect(rows.length).toBe(3);

    const lastRowCells = rows[2].querySelectorAll('td');
    expect(lastRowCells[0].textContent).toContain('Smartphone');
  });

  it('should have a button to add a new device', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Add Device');
    expect(button.getAttribute('ng-reflect-router-link')).toContain('/devices,create');
  });
});
