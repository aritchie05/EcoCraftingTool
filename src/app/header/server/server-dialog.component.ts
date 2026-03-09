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
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import WebStorageService from '../../service/storage.service';
import {MessageService} from '../../service/message.service';

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
  private readonly clipboard = inject(Clipboard);
  private readonly snackBar = inject(MatSnackBar);
  private readonly storageService = inject(WebStorageService);
  private readonly serverService = inject(PriceCalculatorServerService);
  private readonly messageService = inject(MessageService);
  isVanillaServer: boolean;

  draftServerName: WritableSignal<string>;
  draftHostname: WritableSignal<string>;
  draftUseInsecureHttp: WritableSignal<boolean>;
  draftConnectionEstablished: WritableSignal<boolean>;

  connecting: WritableSignal<boolean> = signal(false);
  connectionFailed: WritableSignal<boolean> = signal(false);

  saving: WritableSignal<boolean> = signal(false);

  newTables: Signal<ServerTable[]>;
  newSkills: Signal<ServerSkill[]>;
  newItems: Signal<ServerItem[]>;
  newAndModifiedRecipes: Signal<ServerRecipe[]>;
  newRecipes: Signal<ServerRecipe[]>;
  modifiedRecipes: Signal<ServerRecipe[]>;

  constructor() {
    this.isVanillaServer = this.serverConfig.id === 'default';
    this.draftServerName = signal(this.serverConfig.name());
    this.draftHostname = signal(this.serverConfig.hostname());
    this.draftUseInsecureHttp = signal(this.serverConfig.useInsecureHttp());
    this.draftConnectionEstablished = signal(this.isVanillaServer && this.serverConfig.connectionEstablished());

    this.newTables = this.serverService.tempNewTables;
    this.newSkills = this.serverService.tempNewSkills;
    this.newItems = this.serverService.tempNewItems;
    this.newAndModifiedRecipes = this.serverService.tempNewRecipes;

    this.newRecipes = computed(() => this.newAndModifiedRecipes().filter(recipe => recipe.IsNew).sort((a, b) => a.Key.localeCompare(b.Key)));
    this.modifiedRecipes = computed(() => this.newAndModifiedRecipes().filter(recipe => !recipe.IsNew).sort((a, b) => a.Key.localeCompare(b.Key)));
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }

  close(result?: ServerDialogResult) {
    result ? this.dialogRef.close(result) : this.dialogRef.close();
  }

  copyConfig(): void {
    const config = this.storageService.getCalcConfig();
    this.clipboard.copy(JSON.stringify(config));
    this.snackBar.open('Copied to clipboard', 'OK', {duration: 2000});
  }

  onServerNameInput(name: string): void {
    this.draftServerName.set(name);
  }

  onHostnameInput(hostname: string): void {
    if (this.draftHostname() !== hostname) {
      this.draftHostname.set(hostname);
      this.resetConnectionStatus();
    }
  }

  onUseInsecureHttpChange(useInsecureHttp: boolean): void {
    if (this.draftUseInsecureHttp() !== useInsecureHttp) {
      this.draftUseInsecureHttp.set(useInsecureHttp);
      this.resetConnectionStatus();
    }
  }

  connect() {
    const hostname = this.draftHostname().trim();
    this.draftHostname.set(hostname);
    this.connecting.set(true);
    this.connectionFailed.set(false);
    this.serverService.attemptConnection(this.getDraftServerConfig())
      .subscribe({
        next: (success) => {
          this.connecting.set(false);
          if (success) {
            this.connectionFailed.set(false);
          } else {
            this.connectionFailed.set(true);
          }
        },
        error: () => {
          this.connecting.set(false);
          this.draftConnectionEstablished.set(false);
          this.connectionFailed.set(true);
        }
      });
  }

  saveConnection() {
    this.saving.set(true);
    this.serverConfig.name.set(this.draftServerName().trim());
    this.serverConfig.hostname.set(this.draftHostname().trim());
    this.serverConfig.useInsecureHttp.set(this.draftUseInsecureHttp());
    this.serverConfig.connectionEstablished.set(this.draftConnectionEstablished());
    this.serverService.saveConnection(this.serverConfig);
    this.saving.set(false);
    this.close('saved');
  }

  private getDraftServerConfig(): ServerConfig {
    return {
      id: this.serverConfig.id,
      name: this.draftServerName,
      hostname: this.draftHostname,
      isCustom: this.serverConfig.isCustom,
      useInsecureHttp: this.draftUseInsecureHttp,
      connectionEstablished: this.draftConnectionEstablished
    };
  }

  private resetConnectionStatus(): void {
    this.draftConnectionEstablished.set(false);
    this.connectionFailed.set(false);
    this.serverService.resetParsedData();
  }
}
