import { TestBed } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { CalcError } from '../models/errors';
import { CalcState } from '../models/CalcStates';
import { ranks } from '../data/ranks';

describe('CalcService', () => {
  let service: CalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have falsy zero values', () => {
    expect(service.isValid).toBeFalse();
    expect(service.errorMessage).toEqual(CalcError.Default);
    expect(service.total).toEqual(0);
    expect(service.type).toEqual(CalcState.MatchMaking);
    expect(service.fromRank).toBeNull();
    expect(service.toRank).toBeNull();
  });

  it('should change type on setType', () => {
    service.setType(CalcState.Wingman);
    expect(service.type).toEqual(CalcState.Wingman);
  });

  it('should count mm prices correctly', () => {
    service.setFromRank(ranks[0]);
    service.setToRank(ranks[1]);

    expect(service.isValid).toBeTrue();

    expect(service.total).toEqual(170);

    service.setToRank(ranks[ranks.length - 1]);

    expect(service.total).toEqual(7940);
  });

  it('should count mm prices correctly', () => {
    service.setType(CalcState.Wingman);
    service.setFromRank(ranks[0]);
    service.setToRank(ranks[1]);

    expect(service.isValid).toBeTrue();

    expect(service.total).toEqual(125);

    service.setToRank(ranks[ranks.length - 1]);

    expect(service.total).toEqual(5950);
  });
});
