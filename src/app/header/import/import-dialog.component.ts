import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CalculatorConfig} from '../../model/storage-model/calculator-config';
import WebStorageService from '../../service/storage.service';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-import',
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportDialogComponent {
  dialogRef = inject(MatDialogRef<ImportDialogComponent>);


  constructor(private storageService: WebStorageService,
              private messageService: MessageService) {
  }

  onImportConfig(value: string) {
    try {
      const calcConfig: CalculatorConfig = JSON.parse(value);
      this.storageService.saveCalcConfig(calcConfig);
      location.reload();
    } catch {
      window.alert('Incorrect format for import. Please use valid JSON exported from another configuration of eco calc.');
    }
  }

  close() {
    this.dialogRef.close();
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }
}
