import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpublicacionempresa'
})
export class FilterpublicacionempresaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const post of value) {
      if (post.Det_pube.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(post);
      };
    };
    return resultPosts;
  }


}
