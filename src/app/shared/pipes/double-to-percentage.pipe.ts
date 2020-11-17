import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doubleToPercentage'
})
export class DoubleToPercentagePipe implements PipeTransform {

  transform(value: number): string {
    return (value * 100) + '%';
  }

}
