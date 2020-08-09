import { Component } from '@angular/core';
import { CalcService } from '../../../services/calc.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {
  public get isValid(): boolean {
    return this.calcService.isValid;
  }

  public get message(): string {
    return this.isValid
      ? this.calcService.total.toString()
      : this.calcService.errorMessage;
  }

  public submitHandler(): void{
    this.calcService.submit();
  }

  constructor(
    private calcService: CalcService,
  ) { }
}
