import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numero'
})
export class NumeroPipe implements PipeTransform {

  transform(num: any) {
    let x = 5;
    const arr = [];
    while ( x < num.length) {
      arr.push({num: num[x],
      aumento: x});
      x = x + 1;
    }
    return arr;
  }

}

