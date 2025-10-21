import {TestBed} from '@angular/core/testing';

import {ReleaseNotesService} from './release-notes.service';
import {provideHttpClient} from '@angular/common/http';
import {provideDialogTestingDependencies} from '../test-utils.spec';

describe('ReleaseNotesService', () => {
  let service: ReleaseNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideDialogTestingDependencies()]
    });
    service = TestBed.inject(ReleaseNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
