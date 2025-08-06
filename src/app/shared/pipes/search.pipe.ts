import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], text: string): any[] {
    if (!data) return [];

    if (!text || text.trim() === '') return data;

    return data.filter((item) => item.title.toLowerCase().includes(text.toLocaleLowerCase()));
  }

}
