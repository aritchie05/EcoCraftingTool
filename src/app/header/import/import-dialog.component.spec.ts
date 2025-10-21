import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportDialogComponent} from './import-dialog.component';
import {provideDialogTestingDependencies} from '../../test-utils.spec';

describe('ImportComponent', () => {
  let component: ImportDialogComponent;
  let fixture: ComponentFixture<ImportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportDialogComponent],
      providers: provideDialogTestingDependencies()
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
