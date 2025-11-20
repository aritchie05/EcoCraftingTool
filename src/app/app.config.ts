import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideMarkdown} from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(), provideMarkdown()]
};
