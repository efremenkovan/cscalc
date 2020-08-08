import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderTab } from '../../../models/HeaderTab';
import { CalcState } from '../../../models/CalcStates';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() options: HeaderTab[] = [];
  @Input() activeOption: CalcState = CalcState.MatchMaking;

  @Output() selectTypeEvent = new EventEmitter<CalcState>();

  public selectType(type: CalcState): void {
    this.selectTypeEvent.emit(type);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
