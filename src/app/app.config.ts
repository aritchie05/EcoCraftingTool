import {ApplicationConfig} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import {provideMarkdown} from 'ngx-markdown';
import {provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig} from 'ngx-webstorage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideMarkdown(),
    provideNgxWebstorage(
      withNgxWebstorageConfig({prefix: '', separator: '', caseSensitive: true}),
      withLocalStorage()
    )
  ]
};
