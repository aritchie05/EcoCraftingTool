import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'localeNumber',
  pure: true
})
export class LocaleNumberPipe implements PipeTransform {
  transform(value: number, localeCode: string, maxFractionDigits = 2, minFractionDigits = 0): string {
    return value.toLocaleString(localeCode, {
      maximumFractionDigits: maxFractionDigits,
      minimumFractionDigits: minFractionDigits,
    });
  }
}
