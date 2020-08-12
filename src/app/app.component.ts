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
    // document.body.style.scrollBehavior = 'smooth';
    // const animationStart = new Date().getTime();
    // window.requestAnimationFrame(() => this.scrollToWrapper(animationStart));
    const calcWrapper = document.querySelector('app-calc');
    this.calcService.setMode(type as CalcMode);
    setTimeout(() => calcWrapper.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    }), 0);
  }

  private scrollToWrapper(start: number): void {
    const calcWrapper = document.querySelector('app-calc');
    calcWrapper.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
    console.log(calcWrapper.getBoundingClientRect());
    if (new Date().getTime() - start < 400) {
      window.requestAnimationFrame(() => this.scrollToWrapper(start));
    } else {
      document.body.style.scrollBehavior = '';
    }
  }

  public get mode(): CalcMode {
    return this.calcService.mode;
  }

  public get isOpen(): boolean {
    return this.calcService.isOpen;
  }

  constructor(private calcService: CalcService) {}
}
