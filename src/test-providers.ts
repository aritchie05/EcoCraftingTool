import {EnvironmentProviders, Provider} from '@angular/core';
import {provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig} from 'ngx-webstorage';

const providers: Array<Provider | EnvironmentProviders> = [
  provideNgxWebstorage(
    withNgxWebstorageConfig({prefix: '', separator: '', caseSensitive: true}),
    withLocalStorage()
  )
];

export default providers;
