import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {
  @Input() isValid: boolean = false;
  @Input() message: string = '';

  @Output() submitEvent: EventEmitter<undefined> = new EventEmitter<undefined>();

  public submitHandler(): void{
    this.submitEvent.emit();
  }

  constructor() { }
}
