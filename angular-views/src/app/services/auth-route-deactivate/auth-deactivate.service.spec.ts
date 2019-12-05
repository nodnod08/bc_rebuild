import { TestBed } from '@angular/core/testing';

import { AuthDeactivateService } from './auth-deactivate.service';

describe('AuthDeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthDeactivateService = TestBed.get(AuthDeactivateService);
    expect(service).toBeTruthy();
  });
});
