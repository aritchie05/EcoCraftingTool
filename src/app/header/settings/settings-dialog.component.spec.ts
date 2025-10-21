import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SettingsDialogComponent} from './settings-dialog.component';
import {provideDialogTestingDependencies} from '../../test-utils.spec';

describe('SettingsComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDialogComponent],
      providers: provideDialogTestingDependencies()
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
