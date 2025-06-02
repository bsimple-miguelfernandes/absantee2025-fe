import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { By } from '@angular/platform-browser';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent,
        RouterModule.forRoot(routes)
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => httpMock.verify());

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should request projects after \'Projects\' button in the header is clicked', fakeAsync(() => {
    const projectButton = fixture.debugElement.queryAll(By.css('a'));
    projectButton[1].nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(projectButton[1].nativeElement.textContent).toBe("Projects");

    const req = httpMock.expectOne('http://localhost:5073/api/Project');
    expect(req.request.method).toBe('GET');
  }));

  it('should request collaborators after \'Collaborators\' button in the header is clicked', fakeAsync(() => {
    const projectButton = fixture.debugElement.queryAll(By.css('a'));
    projectButton[2].nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(projectButton[2].nativeElement.textContent).toBe("Collaborators");

    const req = httpMock.expectOne('http://localhost:5073/api/collaborators/details');
    expect(req.request.method).toBe('GET');
  }));
});
