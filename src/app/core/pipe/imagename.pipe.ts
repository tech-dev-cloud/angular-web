import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagename'
})
export class ImagenamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value) {
      let arr = value.split(' ');
      let name = arr[0][0].toUpperCase();
      if (arr[1]) {
        name += arr[1][0].toUpperCase();
      }
      return name;
    }
    return 'AB';
  }

}
@Pipe({
  name: 'lecduration'
})
export class LectureDuration implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    let duration = '';
    let hours = Math.floor(value / 60);
    let min = value - (60 * hours);
    if (hours) {
      return `${hours}hr ${min}min`;
    }
    return `${min}min`;
  }
}
