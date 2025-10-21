import {ChangeDetectionStrategy, Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ReleaseNotesDialogComponent} from './release-notes/release-notes-dialog.component';
import {ImageService} from '../service/image.service';
import {Release} from '../model/release';
import {ReleaseNotesService} from '../service/release-notes.service';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {CalculatorConfig} from '../model/storage-model/calculator-config';
import {WebStorageService} from '../service/storage.service';
import {ImportDialogComponent} from './import/import-dialog.component';
import {ExportDialogComponent} from './export/export-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {Locale, LocaleService} from '../service/locale.service';
import {SettingsDialogComponent} from './settings/settings-dialog.component';
import {MessageService} from '../service/message.service';
import {PREDEFINED_SERVERS, ServerConfig} from '../model/server-config';
import {PriceCalculatorServerService} from '../service/price-calculator-server.service';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, MatButtonModule, MatMenuModule, MatSelectModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  releases: WritableSignal<Release[]>;
  calcConfig: WritableSignal<CalculatorConfig>;
  exportJson: Signal<string>;
  selectedLocale: Signal<Locale>;
  supportedLocales: Locale[];
  ecoLogoUrl: string;
  dialog = inject(MatDialog);

  // Server selection
  selectedServer: Signal<ServerConfig>;
  predefinedServers: ServerConfig[] = PREDEFINED_SERVERS;

  constructor(releaseNotesService: ReleaseNotesService, imageService: ImageService,
              private storageService: WebStorageService, private localeService: LocaleService,
              private messageService: MessageService, private serverService: PriceCalculatorServerService) {
    this.releases = releaseNotesService.releases;
    this.calcConfig = signal(storageService.getCalcConfig());
    this.exportJson = computed(() => JSON.stringify(this.calcConfig()));
    this.selectedLocale = localeService.selectedLocale;
    this.supportedLocales = [...localeService.supportedLocales.values()]
    this.ecoLogoUrl = imageService.imageBaseUrl + 'eco-logo-new.png';
    this.selectedServer = serverService.getSelectedServerSignal();
  }


  openReleaseNotes() {
    this.dialog.open(ReleaseNotesDialogComponent, {
      data: this.releases()
    });
  }

  openImportDialog() {
    this.dialog.open(ImportDialogComponent);
  }

  openExportDialog() {
    this.calcConfig.set(this.storageService.getCalcConfig());
    this.dialog.open(ExportDialogComponent, {
      data: this.exportJson,
      autoFocus: 'button'
    });
  }

  openSettingsDialog() {
    this.dialog.open(SettingsDialogComponent);
  }

  onLocaleChange(localeCode: string) {
    this.localeService.changeLocale(localeCode);
  }

  message(id: string): string {
    return this.messageService.getMessage(id);
  }

  onServerChange(serverId: string): void {
    const server = this.predefinedServers.find(s => s.id === serverId);
    if (server) {
      this.serverService.setSelectedServer(server);
    }
  }
}
