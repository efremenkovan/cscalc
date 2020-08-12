import { Injectable } from '@angular/core';

import { CalcError } from '../models/errors';
import { OptionalService } from '../models/OptionalService';
import { CalcState } from '../models/CalcStates';
import { Rank } from '../models/Rank';

import { faceItEloRanges, faceItRanks, ranks } from '../data/ranks';
import { optionalServices } from '../data/optionalServices';
import { HeaderTab } from '../models/HeaderTab';
import { headerTabs } from '../data/headerTabs';
import { CalcMode } from '../models/CalcModes';
import { FaceItEloRange, FaceItRank } from '../models/FaceItRank';
import { faceItWins } from '../data/wins';
import { FaceItWin } from '../models/FaceItWin';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  private _fromRank: Rank | FaceItRank | number | null  = null;
  private _toRank: Rank | FaceItWin | number | null = null;
  private _mode: CalcMode = CalcMode.Native;
  private _type: CalcState = CalcState.MatchMaking;
  private _optionalServices: OptionalService[] = optionalServices;
  private _headerTabs: {
    native: HeaderTab[],
    faceIt: HeaderTab[],
  } = headerTabs;
  private _isOpen: boolean = false;

  private readonly _rankOptions: Rank[] = ranks;
  private readonly _faceItRankOptions: FaceItRank[] = faceItRanks;
  private readonly _faceItEloRanges: FaceItEloRange[] = faceItEloRanges;
  private readonly _faceItWins: FaceItWin[] = faceItWins;
  private readonly MAX_ELO: number = 4100;

  public get isValid(): boolean {
    switch (this._mode) {
      case CalcMode.FaceIt:
        if (this._type === CalcState.FaceItElo) {
          this._fromRank = this._fromRank as number;
          this._toRank = this._toRank as number;
          return Boolean(
            this._fromRank !== null
            && this._toRank !== null
            && this._fromRank <= this._toRank - 150
          );
        } else if (this._type === CalcState.FaceItGames) {
          this._fromRank = this._fromRank as FaceItRank;
          this._toRank = this._toRank as number;
          return Boolean(
            this._fromRank
            && this._toRank
            && this._fromRank !== this._faceItRankOptions[this._faceItRankOptions.length - 1]) ;
        }
        return true;
      case CalcMode.Native:
      default:
        this._fromRank = this._fromRank as Rank;
        this._toRank = this._toRank as Rank;
        return Boolean(this._fromRank && this._toRank && this._toRank.id > this._fromRank.id);
    }
  }

  public get errorMessage(): CalcError {
    // General errors.
    if (!this._fromRank || !this._toRank) {
      if (this._type === CalcState.FaceItElo) {
        return CalcError.FaceItEloDefault;
      } else {
        return CalcError.Default;
      }
    }

    // Native errors.
    if (this._mode === CalcMode.Native
        && (this._fromRank as Rank).id <= (this._toRank as Rank).id
    ) return CalcError.Range;

    // Face it errors.
    if (this._type === CalcState.FaceItElo
      && this._fromRank >= this._toRank) return CalcError.FaceItEloRange;

    if (this._type === CalcState.FaceItElo
        && this._fromRank >= (this._toRank as number) - 150
    ) return CalcError.FaceItMinElo;

    if (this._fromRank === this._faceItRankOptions[this._faceItRankOptions.length - 1]) {
      return CalcError.FaceItMaxLevel;
    }

    if (this.isValid) return CalcError.None;

    return CalcError.Unknown;
  }

  public get total(): number {
    if (!this.isValid) return 0;

    let total = 0;

    if (this._mode === CalcMode.Native) {
      this._fromRank = this._fromRank as Rank;
      this._toRank = this._toRank as Rank;
      for (let i = this._fromRank.id; i <= this._toRank.id; i++) {
        total += this._rankOptions[i].value[this.type];
      }
    } else if (this._mode === CalcMode.FaceIt) {
      if (this._type === CalcState.FaceItGames) {
        this._fromRank = this._fromRank as FaceItRank;
        this._toRank = this._toRank as FaceItWin;

        total = this._fromRank.value * this._toRank.value;
      } else if (this._type === CalcState.FaceItElo) {
        this._fromRank = this._fromRank as number;
        this._toRank = this._toRank as number;
        for (const range of this._faceItEloRanges) {
          // Range is too low on ELO.
          if (range.to < this._fromRank) continue;
          // Range is too high on ELO.
          if (range.from > this._toRank) break;

          // Fully in this range
          if (this._fromRank >= range.from && this._toRank <= range.to) {
            total += (this._toRank - this._fromRank) * range.value;
            break;
          }

          // Starts in this range and goes further
          if (this._fromRank >= range.from && this._toRank > range.to) {
            total += (range.to - this._fromRank) * range.value;
            continue;
          }

          // Comes from another range and ends there
          if (this._fromRank < range.from && this._toRank <= range.to) {
            total += (this._toRank - range.from) * range.value;
            break;
          }

          // Comes from another and goes further
          if (this._fromRank < range.from &&  this._toRank > range.to) {
            total += (range.to - range.from) * range.value;
            continue;
          }
        }
      }
    }

    this._optionalServices.forEach(
      service => {
        if (service.value[this._mode] && service.isChecked) {
           total += service.value[this._mode](total);
        }
      }
    );

    return Math.round(total);
  }

  public get type(): CalcState {
    return this._type;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public get fromRankOptions(): Rank[] | FaceItRank[] {
    switch (this._type) {
      case CalcState.FaceItGames:
      case CalcState.FaceItElo:
        return this._faceItRankOptions;
      case CalcState.MatchMaking:
      case CalcState.Wingman:
      default:
        return this._rankOptions;
    }
  }

  public get toRankOptions(): Rank[] | FaceItRank[] | FaceItWin[] {
    switch (this._type) {
      case CalcState.FaceItElo:
        return this._faceItRankOptions;
      case CalcState.FaceItGames:
        return this._faceItWins;
      case CalcState.MatchMaking:
      case CalcState.Wingman:
      default:
        return this._rankOptions;
    }
  }

  public get fromRank(): Rank | FaceItRank | number {
    return this._fromRank;
  }

  public get toRank(): Rank | FaceItWin | number{
    return this._toRank;
  }

  public get headerTabs(): HeaderTab[] {
    return this._headerTabs[this._mode];
  }

  public get optionalServices(): OptionalService[] {
    return this._optionalServices.filter(service => service.value[this._mode] !== null);
  }

  public setType(type: CalcState): void {
    this._type = type;
    switch (type) {
      case CalcState.FaceItGames:
        this._fromRank = this._faceItRankOptions[0];
        this._toRank = this.toRankOptions[0] as FaceItWin;
        break;
      case CalcState.FaceItElo:
        this._fromRank = null;
        this._toRank = null;
        break;
    }
  }

  public setFromRank(rank: Rank | FaceItRank | number): void {
    if (this._type === CalcState.FaceItElo && rank > this.MAX_ELO) {
      this._fromRank = this.MAX_ELO;
      return;
    }
    this._fromRank = rank;
  }

  public setToRank(rank: Rank | number): void {
    if (this._type === CalcState.FaceItElo && rank > this.MAX_ELO) {
      this._toRank = this.MAX_ELO;
      return;
    }
    this._toRank = rank;
  }

  public toggleService(service: OptionalService): void {
    const serviceToChange = this._optionalServices.find(s => s.id === service.id);
    serviceToChange.isChecked = !serviceToChange.isChecked;
  }

  public get mode(): CalcMode {
    return this._mode;
  }

  public setMode(mode: CalcMode): void {
    this._mode = mode;
    if (this._mode === CalcMode.Native) this._type = CalcState.MatchMaking;
    if (this._mode === CalcMode.FaceIt) this._type = CalcState.FaceItElo;
    if (!this._isOpen) this._isOpen = true;
  }

  public submit(): void {
    // TODO: Add server request there.
  }

  constructor() { }
}
