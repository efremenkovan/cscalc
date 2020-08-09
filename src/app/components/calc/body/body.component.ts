import { Component } from '@angular/core';
import { OptionalService } from '../../../models/OptionalService';
import { SelectOption } from './select/select.component';
import { CalcService } from '../../../services/calc.service';
import { CalcState } from '../../../models/CalcStates';
import { Rank } from '../../../models/Rank';
import { FaceItRank } from '../../../models/FaceItRank';
import { FaceItWin } from '../../../models/FaceItWin';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  public get fromRank(): SelectOption {
    return this.calcService.fromRank as SelectOption;
  }

  public get toRank(): SelectOption {
    return this.calcService.toRank as SelectOption;
  }

  public get optionalServices(): OptionalService[] {
    return this.calcService.optionalServices;
  }

  public get fromRankOptions(): Rank[] | FaceItRank[] {
    return this.calcService.fromRankOptions;
  }

  public get toRankOptions(): Rank[] | FaceItRank[] | FaceItWin[] {
    return this.calcService.toRankOptions;
  }

  public get type(): CalcState {
    return this.calcService.type;
  }

  public get isSelectVisible(): boolean {
    return this.calcService.type !== CalcState.FaceItElo;
  }

  public fromRankChangeHandler(rank: Rank | FaceItRank | number): void {
    this.calcService.setFromRank(rank);
  }

  public toRankChangeHandler(rank: Rank | number): void {
    this.calcService.setToRank(rank);
  }

  public serviceSelectHandler(service: OptionalService): void {
    this.calcService.toggleService(service);
  }

  public get fromImage(): string {
    switch (this.calcService.type) {
      case CalcState.Wingman:
      case CalcState.MatchMaking:
        return (this.fromRank && this.fromRank[this.type + 'Image']) || this.defaultImage;
      case CalcState.FaceItGames:
        const fromRank = this.fromRank as FaceItRank;
        return (fromRank && fromRank.image) || this.defaultImage;
      case CalcState.FaceItElo:
        if (this.fromRank === null) return this.defaultImage;
        const fromRankOptions = this.fromRankOptions as FaceItRank[];
        // @ts-ignore
        const rank = fromRankOptions.find(r => r.from <= this.fromRank && r.to >= this.fromRank);
        return (rank && rank.image) || this.defaultImage;
      default:
        return this.defaultImage;
    }
  }

  public get toImage(): string {
    switch (this.calcService.type) {
      case CalcState.Wingman:
      case CalcState.MatchMaking:
        return (this.toRank && this.toRank[this.calcService.type + 'Image']) || this.defaultImage;
      case CalcState.FaceItGames:
        const toRank = this.toRank as FaceItWin;
        return (toRank && toRank.image) || 'assets/faceItWins/default.png';
      case CalcState.FaceItElo:
        if (this.toRank === null) return this.defaultImage;
        const toRankOptions = this.toRankOptions as FaceItRank[];

        // @ts-ignore
        const rank = toRankOptions.find(r => r.from <= this.toRank && r.to >= this.toRank);
        return (rank && rank.image) || this.defaultImage;
      default:
        return this.defaultImage;
    }
  }

  public get defaultImage(): string {
    switch (this.calcService.type) {
      case CalcState.FaceItGames:
      case CalcState.FaceItElo:
        return 'assets/faceIt/default.png';
      case CalcState.Wingman:
        return 'assets/wingman/default.webp';
      case CalcState.MatchMaking:
      default:
        return 'assets/ranks/default.webp';
    }
  }

  public setFromValue(event: KeyboardEvent): void {
    // @ts-ignore
    this.calcService.setFromRank(event.target.valueAsNumber);
  }

  public setToValue(event: KeyboardEvent): void {
    // @ts-ignore
    this.calcService.setToRank(event.target.valueAsNumber);
  }

  constructor(private calcService: CalcService) { }
}
