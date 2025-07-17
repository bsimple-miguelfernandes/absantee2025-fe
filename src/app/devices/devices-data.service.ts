import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Device } from "./devices";
import { DeviceCreateRequest } from "./devices-create/create-device";

@Injectable({
    providedIn: 'root'
})
export class DevicesDataService {
    private httpClient = inject(HttpClient);

    constructor() { }

    getDevices(): Observable<Device[]> {
        return this.httpClient.get<Device[]>(`http://localhost:5198/api/devices`);
    }

    getDeviceById(id: string): Observable<Device> {
        return this.httpClient.get<Device>(`http://localhost:5198/api/devices/${id}`);
    }

    createDevice(newDevice: DeviceCreateRequest): Observable<Device> {
        return this.httpClient.post<Device>(`http://localhost:5188/api/devices`, newDevice);
    }
}
