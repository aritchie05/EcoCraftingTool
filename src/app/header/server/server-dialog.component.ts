import {ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ServerConfig} from '../../model/server-api/server-config';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {PriceCalculatorServerService} from '../../service/price-calculator-server.service';
import {ServerItem} from '../../model/server-api/server-item';
import {ServerRecipe, ServerSkill, ServerTable} from '../../model/server-api/server-recipe';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ServerDialogResult} from '../../model/server-dialog/server-dialog-result';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-server-dialog',
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    FormsModule
  ],
  templateUrl: './server-dialog.component.html',
  styleUrl: './server-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerDialogComponent {
  dialogRef = inject(MatDialogRef<ServerDialogComponent>);
  serverConfig = inject<ServerConfig>(MAT_DIALOG_DATA);
  isVanillaServer: boolean;

  connecting: WritableSignal<boolean> = signal(false);
  connectionFailed: WritableSignal<boolean> = signal(false);

  saving: WritableSignal<boolean> = signal(false);

  newTables: Signal<ServerTable[]>;
  newSkills: Signal<ServerSkill[]>;
  newItems: Signal<ServerItem[]>;
  newAndModifiedRecipes: Signal<ServerRecipe[]>;
  newRecipes: Signal<ServerRecipe[]>;
  modifiedRecipes: Signal<ServerRecipe[]>;

  constructor(private serverService: PriceCalculatorServerService) {
    this.isVanillaServer = this.serverConfig.id === 'default';
    this.newTables = serverService.tempNewTables;
    this.newSkills = serverService.tempNewSkills;
    this.newItems = serverService.tempNewItems;
    this.newAndModifiedRecipes = serverService.tempNewRecipes;

    this.newRecipes = computed(() => this.newAndModifiedRecipes().filter(recipe => recipe.IsNew).sort((a, b) => a.Key.localeCompare(b.Key)));
    this.modifiedRecipes = computed(() => this.newAndModifiedRecipes().filter(recipe => !recipe.IsNew).sort((a, b) => a.Key.localeCompare(b.Key)));
  }

  close(result?: ServerDialogResult) {
    result ? this.dialogRef.close(result) : this.dialogRef.close();
  }

  connect(hostname: string) {
    this.connecting.set(true);
    this.serverConfig.hostname.set(hostname);
    this.serverService.attemptConnection(this.serverConfig)
      .subscribe({
        next: (success) => {
          this.connecting.set(false);
          if (success) {
            this.connectionFailed.set(false);
          } else {
            this.connectionFailed.set(true);
          }
        },
        error: (error) => {
          this.connecting.set(false);
          this.connectionFailed.set(true);
        }
      });
  }

  saveConnection(serverLabel: string) {
    this.saving.set(true);
    this.serverConfig.name.set(serverLabel);
    this.serverService.saveConnection(this.serverConfig);
    this.saving.set(false);
    this.close('saved');
  }
}
