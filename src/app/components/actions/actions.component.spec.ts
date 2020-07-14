import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class MatBottomSheetRefStub {
  dismiss() { }
}

class PinsServiceStub {
  resolveActionObserver(action) { }
}

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetRefStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute openLink', () => {

    // se crea el evento
    const event = new MouseEvent('click');

    // se crean los espias de las funciones que queremos comprobar que fueron llamadas
    const eventSpy = spyOn(event, 'preventDefault').and.callFake(() => { });
    const bottomSheetRefSpy = spyOn((<any>component).bottomSheetRef, 'dismiss');
    const pinsServiceSpy = spyOn((<any>component).pinsService, 'resolveActionObserver');

    // la funcion que estamos probando, la espiamos sin modificar su comportamiento
    const openLink = spyOn(component, 'openLink').and.callThrough();


    // ejecutamos la funcion
    component.openLink(event, 'send');

    // comprobamos los resultados
    expect(openLink).toHaveBeenCalledWith(event, 'send');
    expect(eventSpy).toHaveBeenCalled();
    expect(bottomSheetRefSpy).toHaveBeenCalled();
    expect(pinsServiceSpy).toHaveBeenCalledWith('send');
  });
});
