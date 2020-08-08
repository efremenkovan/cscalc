import { Injectable } from '@angular/core';

import { CalcError } from '../models/errors';
import { OptionalService } from '../models/OptionalService';
import { CalcState } from '../models/CalcStates';
import { Rank } from '../models/Rank';

import { ranks } from '../data/ranks';
import { optionalServices } from '../data/optionalServices';
import { HeaderTab } from '../models/HeaderTab';
import { headerTabs } from '../data/headerTabs';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  private _errorMessage: CalcError = CalcError.Default;
  private _fromRank: Rank | null = null;
  private _toRank: Rank | null = null;
  private _type: CalcState = CalcState.MatchMaking;
  private _optionalServices: OptionalService[] = optionalServices;
  private _headerTabs: HeaderTab[] = headerTabs;
  private _rankOptions: Rank[] = ranks;

  public get isValid(): boolean {
    return Boolean(this._fromRank && this._toRank && this._toRank.id > this._fromRank.id);
  }

  public get errorMessage(): CalcError {

    if(!this._fromRank || !this._toRank) return CalcError.Default;
    if (this._fromRank.id < this._toRank.id) return CalcError.Range;
    if(this.isValid) return CalcError.None;

    return CalcError.Unknown;
  }

  public get total(): number {
    if (!this.isValid) return 0;

    let total = 0;

    for (let i = this._fromRank.id; i <= this._toRank.id; i++) {
      total += this._rankOptions[i].value[this.type];
    }

    this._optionalServices.forEach(
      service => service.isChecked && (total += service.value(total))
    );

    return Math.round(total);
  }

  public get type(): CalcState {
    return this._type;
  }

  public get rankOptions(): Rank[] {
    return this._rankOptions;
  }

  public get fromRank(): Rank {
    return this._fromRank;
  }

  public get toRank(): Rank {
    return this._toRank;
  }

  public get headerTabs(): HeaderTab[] {
    return this._headerTabs;
  }

  public get optionalServices(): OptionalService[] {
    return this._optionalServices;
  }

  public setType(type: CalcState): void {
    this._type = type;
  }

  public setFromRank(rank: Rank): void {
    this._fromRank = rank;
  }

  public setToRank(rank: Rank): void {
    this._toRank = rank;
  }

  public toggleService(service: OptionalService): void {
    const serviceToChange = this._optionalServices.find(s => s.id === service.id);
    serviceToChange.isChecked = !serviceToChange.isChecked;
  }

  public submit(): void {
    // TODO: Add server request there.
  }

  constructor() { }
}
