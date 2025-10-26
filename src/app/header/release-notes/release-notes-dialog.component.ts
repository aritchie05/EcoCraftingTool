import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Release} from '../../model/release';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-release-notes',
  imports: [MatDialogModule],
  templateUrl: './release-notes-dialog.component.html',
  styleUrl: './release-notes-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReleaseNotesDialogComponent {
  dialogRef = inject(MatDialogRef<ReleaseNotesDialogComponent>);
  releases = inject<Signal<Release[]>>(MAT_DIALOG_DATA);

  constructor(private messageService: MessageService) {
  }

  close() {
    this.dialogRef.close();
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }
}
