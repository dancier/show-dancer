import { inject, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'withAuth',
  standalone: true,
})
export class WithAuthPipe implements PipeTransform {
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {}

  transform(url: string): Observable<SafeUrl> {
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(
        map((blob) =>
          this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
        )
      );
  }
}
