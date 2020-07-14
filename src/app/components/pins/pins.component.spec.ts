import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsComponent } from './pins.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { MatSnackBar } from '@angular/material';
import { PinsService } from './pins.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { PINS } from 'src/app/services/mocks/pins';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RepositoryServiceStub {
  observer = new Subject();

  getPins() {
    return this.observer;
  }

  resolvePins() {
    // una forma de devolver una copia de un JSON
    // para no modificar el original
    this.observer.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {
    // devuelve un Observable con un true
    return of(true);
  }
}

class MatSnackBarStub {
  open() {}
}

class PinsServiceStub {
  observer = new Subject();
  $actionObserver = this.observer.asObservable();

  public resolve(action) {
    return this.observer.next(action);
  }
}

fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinsComponent ],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When new page is open', () => {
    const open = spyOn(window, 'open');

    component.openUrl('https://platzi.com');

    expect(open).toHaveBeenCalledWith('https://platzi.com', '_blank');
  });

  it('When update progress', () => {
    component.pins = PINS;
    const pin = PINS[0];
    const updatePin = spyOn((<any>component).repository, 'updatePin').and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, 'open');
    // se obtiene la instancia del servicio guardada en el Componente que se esta probando
    const pinService = TestBed.get(PinsService);
    const repository = TestBed.get(RepositoryService);

    // se ejecuta el metodo del servicio para que tenga listo el Observable que devuelve
    repository.updatePin(pin._id, pin);
    pinService.resolve('save');

    expect(updatePin).toHaveBeenCalledWith(pin._id, pin);
    expect(open).toHaveBeenCalledWith('Progress updated!', 'OK', {
      duration: 2000
    });
  });
});
