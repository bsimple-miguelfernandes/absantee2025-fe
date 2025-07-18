import { Injectable, signal } from "@angular/core";
import { Technology } from "./technology";

@Injectable({
    providedIn: 'root'
})
export class TechnologySignalService {
    private technologyAddedSignal = signal<Technology | undefined>(undefined);
    readonly technologyAdded = this.technologyAddedSignal.asReadonly();

    TechnologySaved(technology: Technology | undefined) {
        this.technologyAddedSignal.set(technology);
    }

    Clear() {
        this.technologyAddedSignal.set(undefined);
    }
}