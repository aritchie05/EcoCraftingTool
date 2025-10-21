import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Provider} from '@angular/core';

export function provideMockMatDialogRef<T = any>(): Provider {
  return {
    provide: MatDialogRef,
    useValue: {
      close: jasmine.createSpy('close')
    }
  };
}

export function provideMockDialogData(data: any = null): Provider {
  return {
    provide: MAT_DIALOG_DATA,
    useValue: data
  };
}

export function provideDialogTestingDependencies(dialogData?: any): Provider[] {
  return [
    provideMockMatDialogRef(),
    provideMockDialogData(dialogData)
  ];
}
