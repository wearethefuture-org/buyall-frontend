import { TestBed } from '@angular/core/testing';

import { CharacteristicsService } from './characteristics.service';

describe('CharacteristicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacteristicsService = TestBed.get(CharacteristicsService);
    expect(service).toBeTruthy();
  });
});
