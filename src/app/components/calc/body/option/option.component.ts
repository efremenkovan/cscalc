import { Component, Output, EventEmitter, Input } from '@angular/core';

import { OptionalService } from '../../../../models/OptionalService';

@Component({
  selector: 'app-optional-service',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {
  @Input() service: OptionalService;

  @Output() serviceSelectEvent: EventEmitter<OptionalService> = new EventEmitter<OptionalService>();

  public optionSelectHandler(): void {
    this.serviceSelectEvent.emit(this.service);
  }

  constructor() { }
}
