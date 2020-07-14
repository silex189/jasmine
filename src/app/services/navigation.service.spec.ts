import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('NavigationService', () => {
  // la variable global donde guardaremos el service
  let service: NavigationService;

  beforeEach(() => TestBed.configureTestingModule({
    // inyecta el servicio que va a probar mediante el provider
    providers: [NavigationService],
    imports: [RouterTestingModule]
  }));

  beforeEach(() => {
    // obtiene el servicio inyectado en cada prueba y lo guarda en la variable global
    service = TestBed.get(NavigationService);
  });

  it('should be created', () => {
    // const service: NavigationService = TestBed.get(NavigationService);
    expect(service).toBeTruthy();
  });

  it('Should navigate to pins', () => {
    const navigate = spyOn((<any>service).router, 'navigate');

    service.goToPins();

    expect(navigate).toHaveBeenCalledWith(['/app/pins']);
  });

  it('Should navigate to edit mode', () => {
    const navigate = spyOn((<any>service).router, 'navigate');

    service.goToEditMode();

    expect(navigate).toHaveBeenCalledWith(['/app/add']);
  });
});
