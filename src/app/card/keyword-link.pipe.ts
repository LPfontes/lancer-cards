import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'keywordLink',
  standalone: true,
})
export class KeywordLinkPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    const regex = /\[([^\]]+)\]/g;
    const replacedValue = value.replace(regex, (match, keyword) => {
      return `<button class="keyword-link" data-keyword="${keyword}">${keyword}</button>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(replacedValue);
  }
}