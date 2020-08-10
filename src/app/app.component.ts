import { Component } from '@angular/core';
import { CalcService } from './services/calc.service';
import { CalcMode } from './models/CalcModes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public modeChangeHandler(type: string): void {
    this.calcService.setMode(type as CalcMode);
  }

  public get mode(): CalcMode {
    return this.calcService.mode;
  }

  public get isOpen(): boolean {
    return this.calcService.isOpen;
  }

  constructor(private calcService: CalcService) {}
}
