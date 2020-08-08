import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rank } from '../../../models/Rank';
import { OptionalService } from '../../../models/OptionalService';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() fromRank: Rank | null = null;
  @Input() toRank: Rank | null = null;
  @Input() optionalServices: OptionalService[] = [];
  @Input() rankOptions: Rank[] = [];

  @Output() fromRankChangeEvent: EventEmitter<Rank> = new EventEmitter<Rank>();
  @Output() toRankChangeEvent: EventEmitter<Rank> = new EventEmitter<Rank>();
  @Output() serviceSelectEvent: EventEmitter<OptionalService> = new EventEmitter<OptionalService>();

  public fromRankChangeHandler(rank: Rank): void {
    this.fromRankChangeEvent.emit(rank);
  }

  public toRankChangeHandler(rank: Rank): void {
    this.toRankChangeEvent.emit(rank);
  }

  public serviceSelectHandler(service: OptionalService): void {
    this.serviceSelectEvent.emit(service);
  }

  constructor() { }
}
