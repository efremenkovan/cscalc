import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderTab } from '../../../models/HeaderTab';
import { CalcState } from '../../../models/CalcStates';
import { CalcService } from '../../../services/calc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public get options(): HeaderTab[] {
    return this.calcService.headerTabs;
  }

  public get activeOption(): CalcState {
    return this.calcService.type;
  }

  public selectType(type: CalcState): void {
    this.calcService.setType(type);
  }

  constructor(
    private calcService: CalcService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
