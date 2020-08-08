import { Component } from '@angular/core';
import { CalcService } from '../../services/calc.service';
import { HeaderTab } from '../../models/HeaderTab';
import { CalcState } from '../../models/CalcStates';
import { Rank } from '../../models/Rank';
import { OptionalService } from '../../models/OptionalService';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent {
  public get type(): CalcState {
    return this.calcService.type;
  }

  public get headerTabs(): HeaderTab[] {
    return this.calcService.headerTabs;
  }

  public selectType(type: CalcState): void {
    this.calcService.setType(type);
  }

  public get fromRank(): Rank {
    return this.calcService.fromRank;
  }

  public get toRank(): Rank {
    return this.calcService.toRank;
  }

  public get rankOptions(): Rank[] {
    return this.calcService.rankOptions;
  }

  public get optionalServices(): OptionalService[] {
    return this.calcService.optionalServices;
  }

  public get isValid(): boolean {
    return this.calcService.isValid;
  }

  public get footerMessage(): string {
    return this.isValid
      ? this.calcService.total.toString()
      : this.calcService.errorMessage;
  }

  public submitHandler(): void {
    this.calcService.submit();
  }

  public changeFromRank(rank: Rank): void {
    this.calcService.setFromRank(rank);
  }

  public changeToRank(rank: Rank): void {
    this.calcService.setToRank(rank);
  }

  public toggleService(service: OptionalService): void {
    this.calcService.toggleService(service);
  }

  constructor(
    private calcService: CalcService,
  ) {}

}
