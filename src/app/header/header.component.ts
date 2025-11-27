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
import WebStorageService from '../service/storage.service';
import {ImportDialogComponent} from './import/import-dialog.component';
import {ExportDialogComponent} from './export/export-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {Locale, LocaleService} from '../service/locale.service';
import {SettingsDialogComponent} from './settings/settings-dialog.component';
import {MessageService} from '../service/message.service';
import {CUSTOM_SERVERS, ServerConfig, serverGroups} from '../model/server-api/server-config';
import {PriceCalculatorServerService} from '../service/price-calculator-server.service';
import {ServerDialogComponent} from './server/server-dialog.component';
import {ServerDialogResult} from '../model/server-dialog/server-dialog-result';

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
  release = '6.0.0';
  retrievingReleaseNotes = false;

  // Server selection
  selectedServer: Signal<ServerConfig>;
  serverGroups = serverGroups;

  constructor(private releaseNotesService: ReleaseNotesService, imageService: ImageService,
              private storageService: WebStorageService, private localeService: LocaleService,
              private messageService: MessageService, private serverService: PriceCalculatorServerService) {
    this.releases = signal([]);
    this.calcConfig = signal(storageService.getCalcConfig());
    this.exportJson = computed(() => JSON.stringify(this.calcConfig()));
    this.selectedLocale = localeService.selectedLocale;
    this.supportedLocales = [...localeService.supportedLocales.values()]
    this.ecoLogoUrl = imageService.imageBaseUrl + 'eco-logo-new.webp';
    this.selectedServer = serverService.getSelectedServerSignal();
  }

  retrieveReleaseNotes() {
    if (!this.retrievingReleaseNotes && this.releases().length === 0) {
      this.retrievingReleaseNotes = true;
      this.releaseNotesService.getReleases().subscribe(releases => {
        this.releases.set(releases);
        this.retrievingReleaseNotes = false;
      });
    }
  }

  openReleaseNotes() {
    this.dialog.open(ReleaseNotesDialogComponent, {
      data: this.releases
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

  openNewServerDialog(server: ServerConfig) {
    let serverConfig = server;
    const addingNew = server?.id === 'add-new';
    const previousServer = this.selectedServer();
    let newServer: ServerConfig;

    if (server?.id === 'add-new') {
      const id = `Custom-Server-${CUSTOM_SERVERS.servers().length}`;
      newServer = {
        id: id,
        name: signal(id.replaceAll('-', ' ')),
        hostname: signal(''),
        isCustom: true,
        useInsecureHttp: signal(true),
        connectionEstablished: signal(false)
      };

      serverConfig = newServer;
    }

    const dialogRef = this.dialog.open(ServerDialogComponent, {
      data: serverConfig,
      minHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe((result: ServerDialogResult) => {
      this.serverService.resetParsedData();
      const completed = result === 'saved';

      if (completed) {
        if (addingNew) {
          //Insert new server, leaving add-new at the end
          CUSTOM_SERVERS.servers.update((servers) => [
            ...servers.slice(0, servers.length - 1),
            newServer,
            servers[servers.length - 1]
          ]);
        }
      }
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
    const server = this.serverService.getServerById(serverId);
    if (server) {
      this.openNewServerDialog(server);
    }
  }
}
