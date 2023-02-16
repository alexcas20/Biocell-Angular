import { TestBed } from '@angular/core/testing';

import { ServicioModalesService } from './servicio-modales.service';

describe('ServicioModalesService', () => {
  let service: ServicioModalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioModalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
