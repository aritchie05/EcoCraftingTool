import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ServerConfig} from '../../model/server-api/server-config';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-server-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './server-dialog.component.html',
  styleUrl: './server-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerDialogComponent {
  dialogRef = inject(MatDialogRef<ServerDialogComponent>);
  serverConfig = inject<ServerConfig>(MAT_DIALOG_DATA);

  close() {
    this.dialogRef.close();
  }
}
