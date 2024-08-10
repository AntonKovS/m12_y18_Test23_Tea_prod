import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideDescription'
})
export class HideDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    return value.length <= 50 ? value : `${value.slice(0, 50)}...`;
  }

}
