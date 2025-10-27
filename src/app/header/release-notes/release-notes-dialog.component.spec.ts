import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReleaseNotesDialogComponent} from './release-notes-dialog.component';
import {provideHttpClient} from '@angular/common/http';
import {provideDialogTestingDependencies} from '../../test-utils.spec';
import {Release} from '../../model/release';
import {signal, Signal} from '@angular/core';

describe('ReleaseNotesComponent', () => {
  let component: ReleaseNotesDialogComponent;
  let fixture: ComponentFixture<ReleaseNotesDialogComponent>;

  beforeEach(async () => {
    const releasesMock: Signal<Release[]> = signal([
      {
        name: 'Release 5.0.3',
        tag_name: 'v5.0.3',
        published_at: '2025-10-22T00:00:00Z',
        html_url: 'https://api.github.com/repos/aritchie05/EcoCraftingTool/releases/256207308',
        body: 'Mock release notes'
      }
    ]);

    await TestBed.configureTestingModule({
      imports: [ReleaseNotesDialogComponent],
      providers: [provideHttpClient(), provideDialogTestingDependencies(releasesMock)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReleaseNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have release notes', () => {
    expect(component.releases().length).toBe(1);
    expect(component.releases()[0].name).toBe('Release 5.0.3');
    expect(component.releases()[0].body).toBe('Mock release notes');
  });
});
