import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-boost-button',
  templateUrl: './boost-button.component.html',
  styleUrls: ['./boost-button.component.scss']
})
export class BoostButtonComponent {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';

  @Output() selectModeEvent: EventEmitter<undefined> = new EventEmitter<undefined>();

  public clickHandler(): void {
    this.selectModeEvent.emit();
  }

  constructor() { }
}
