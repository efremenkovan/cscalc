import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CalcService } from '../../../../services/calc.service';
import { Rank } from '../../../../models/Rank';
import { FaceItRank } from '../../../../models/FaceItRank';

export interface SelectOption {
  name: string;
  value: any;
  id: number;
}


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() selectedOption: SelectOption | null = null;
  @Input() placeholder: string = 'Выберите звание';

  @ViewChild('selectRoot') selectRoot: ElementRef;

  @Output() optionChangeEvent: EventEmitter<SelectOption> = new EventEmitter<SelectOption>();

  public isOpen: boolean = false;

  public open(): void {
    this.isOpen = true;
    this.clickHandler = this.clickHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    document.addEventListener('click', this.clickHandler);
    document.addEventListener('keydown', this.keyDownHandler);
  }

  public close(): void {
    this.isOpen = false;
    document.removeEventListener('click', this.clickHandler);
    document.removeEventListener('keydown', this.keyDownHandler);
  }

  public selectOption(option: SelectOption): void {
    this.optionChangeEvent.emit(option);
    this.close();
  }

  private clickHandler(event): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.selectRoot.nativeElement.contains(event.target) ) {
      this.close();
    }
  }

  private keyDownHandler(event): void {
    if (event.which === 27
        || event.keyCode === 27
        || event.key === 'Escape'
    ) {
      this.close();
    }
  }

  constructor() {}
}
