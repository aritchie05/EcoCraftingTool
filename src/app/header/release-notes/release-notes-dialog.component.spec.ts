import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReleaseNotesDialogComponent} from './release-notes-dialog.component';
import {provideHttpClient} from '@angular/common/http';
import {provideDialogTestingDependencies} from '../../test-utils.spec';

describe('ReleaseNotesComponent', () => {
  let component: ReleaseNotesDialogComponent;
  let fixture: ComponentFixture<ReleaseNotesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseNotesDialogComponent],
      providers: [provideHttpClient(), provideDialogTestingDependencies()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReleaseNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
