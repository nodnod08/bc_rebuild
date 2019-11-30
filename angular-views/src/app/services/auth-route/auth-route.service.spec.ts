import { TestBed } from '@angular/core/testing';

import { AuthRouteService } from './auth-route.service';

describe('AuthRouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthRouteService = TestBed.get(AuthRouteService);
    expect(service).toBeTruthy();
  });
});
