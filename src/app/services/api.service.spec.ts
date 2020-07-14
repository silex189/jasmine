import { HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';


fdescribe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector = null;
    service = null;
    httpMock = null;
  });

  it('should be created', () => {
    // const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('Should execute GET', () => {
      // definimos cual es el resultado esperado
      const result = 'testing';

      // nos suscribimos a la respuesta del HttpTestingController
      service.get('/test').subscribe(response => {
        // cuando llegue la respuesta, comprobamos que sea igual al resultado
        expect(response).toBe(result);
      });

      // definimos que HttpTestingController está esperando una petición y el path en el que lo espera
      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      // comprobamos tipo de método del request
      expect(req.request.method).toBe('GET');

      // Aquí mandamos la petición al HttpTestingController
      req.flush(result);
    });

    it('Should execute GET with headers', () => {
      // definimos cual es el resultado esperado
      const result = 'testing';
      const headers = new HttpHeaders().set('platzi-headers', 'cristian-rules');

      // nos suscribimos a la respuesta del HttpTestingController
      service.get('/test', headers).subscribe(response => {
        // cuando llegue la respuesta, comprobamos que sea igual al resultado
        expect(response).toBe(result);
      });

      // definimos que HttpTestingController está esperando una petición y el path en el que lo espera
      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.headers.get('platzi-headers')).toBe('cristian-rules');
      // comprobamos tipo de método del request
      expect(req.request.method).toBe('GET');

      // Aquí mandamos la petición al HttpTestingController
      req.flush(result);
    });
  });

  describe('POST', () => {
    it('Should execute POST', () => {
      // definimos cual es el resultado esperado
      const result = 'testing';

      // nos suscribimos a la respuesta del HttpTestingController
      service.post('/test', {}).subscribe(response => {
        // cuando llegue la respuesta, comprobamos que sea igual al resultado
        expect(response).toBe(result);
      });

      // definimos que HttpTestingController está esperando una petición y el path en el que lo espera
      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      // comprobamos tipo de método del request
      expect(req.request.method).toBe('POST');

      // Aquí mandamos la petición al HttpTestingController
      req.flush(result);
    });
  });

  describe('PUT', () => {
    it('Should execute PUT', () => {
      const result = 'resultado';

      service.put('/test', {}, {}).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('PUT');

      req.flush(result);
    });

  });

  describe('DELETE', () => {
    it('Should execute DELETE', () => {

      service.delete('/test', {}).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(environment.apiEndpoint + '/test');
      expect(req.request.method).toBe('DELETE');
    });

  });
});
