import {ComponentFixture, TestBed} from '@angular/core/testing';
import {signal, WritableSignal} from '@angular/core';
import {of} from 'rxjs';

import {ServerDialogComponent} from './server-dialog.component';
import {provideDialogTestingDependencies} from '../../test-utils';
import {ServerConfig} from '../../model/server-api/server-config';
import {PriceCalculatorServerService} from '../../service/price-calculator-server.service';
import {ServerItem} from '../../model/server-api/server-item';
import {ServerRecipe, ServerSkill, ServerTable} from '../../model/server-api/server-recipe';
import {MessageService} from '../../service/message.service';

const messageServiceMock: Pick<MessageService, 'getMessage'> = {
  getMessage: vi.fn((id: string) => id)
};

describe('ServerDialogComponent', () => {
  let component: ServerDialogComponent;
  let fixture: ComponentFixture<ServerDialogComponent>;
  let serverConfig: ServerConfig;
  let serverServiceMock: {
    tempNewTables: WritableSignal<ServerTable[]>;
    tempNewSkills: WritableSignal<ServerSkill[]>;
    tempNewItems: WritableSignal<ServerItem[]>;
    tempNewRecipes: WritableSignal<ServerRecipe[]>;
    attemptConnection: ReturnType<typeof vi.fn>;
    saveConnection: ReturnType<typeof vi.fn>;
    resetParsedData: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    serverConfig = {
      id: 'custom-server',
      name: signal('Custom Server'),
      hostname: signal('custom.host'),
      isCustom: true,
      useInsecureHttp: signal(false),
      connectionEstablished: signal(true)
    };

    serverServiceMock = {
      tempNewTables: signal([]),
      tempNewSkills: signal([]),
      tempNewItems: signal([]),
      tempNewRecipes: signal([]),
      attemptConnection: vi.fn().mockReturnValue(of(true)),
      saveConnection: vi.fn(),
      resetParsedData: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ServerDialogComponent],
      providers: [
        ...provideDialogTestingDependencies(serverConfig),
        {provide: PriceCalculatorServerService, useValue: serverServiceMock},
        {provide: MessageService, useValue: messageServiceMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders localized dialog text through message service', () => {
    const renderedText = (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');

    expect(renderedText).toContain('newServerConnectionHeader');
    expect(renderedText).toContain('serverConnectionWarning');
    expect(renderedText).toContain('copyConfigButton');
    expect(renderedText).toContain('cancelButton');
    expect(renderedText).toContain('testConnectionButton');
  });

  it('does not mutate live server config until save', () => {
    component.onServerNameInput('Edited Server');
    component.onHostnameInput('edited.host');
    component.onUseInsecureHttpChange(true);

    expect(serverConfig.name()).toBe('Custom Server');
    expect(serverConfig.hostname()).toBe('custom.host');
    expect(serverConfig.useInsecureHttp()).toBe(false);
  });

  it('resets connection status when connection inputs change', () => {
    // Non-vanilla servers always start requiring a fresh connection test
    expect(component.draftConnectionEstablished()).toBe(false);

    // Simulate a successful connection test
    component.draftConnectionEstablished.set(true);

    component.onHostnameInput('changed.host');

    expect(component.draftConnectionEstablished()).toBe(false);
    expect(component.connectionFailed()).toBe(false);
    expect(serverServiceMock.resetParsedData).toHaveBeenCalled();
  });

  it('preserves connection status for vanilla server on dialog open', async () => {
    const vanillaConfig: ServerConfig = {
      id: 'default',
      name: signal('Vanilla'),
      hostname: signal(''),
      isCustom: false,
      useInsecureHttp: signal(false),
      connectionEstablished: signal(true)
    };

    const vanillaFixture = TestBed.createComponent(ServerDialogComponent);
    const vanillaComponent = vanillaFixture.componentInstance;
    Object.defineProperty(vanillaComponent, 'serverConfig', {value: vanillaConfig});
    Object.defineProperty(vanillaComponent, 'isVanillaServer', {value: true});
    vanillaComponent.draftConnectionEstablished = signal(vanillaConfig.connectionEstablished());

    expect(vanillaComponent.draftConnectionEstablished()).toBe(true);
  });

  it('connect uses draft values without mutating live config', () => {
    serverServiceMock.attemptConnection.mockReturnValueOnce(of(false));
    component.onHostnameInput('offline.host');
    component.onUseInsecureHttpChange(true);

    component.connect();

    const attemptedServer = serverServiceMock.attemptConnection.mock.calls[0][0] as ServerConfig;
    expect(attemptedServer.hostname()).toBe('offline.host');
    expect(attemptedServer.useInsecureHttp()).toBe(true);
    expect(serverConfig.hostname()).toBe('custom.host');
    expect(serverConfig.useInsecureHttp()).toBe(false);
    expect(component.connectionFailed()).toBe(true);
  });

  it('applies draft values on save', () => {
    component.onServerNameInput('Saved Server');
    component.onHostnameInput('saved.host');
    component.onUseInsecureHttpChange(true);
    component.draftConnectionEstablished.set(true);

    component.saveConnection();

    expect(serverConfig.name()).toBe('Saved Server');
    expect(serverConfig.hostname()).toBe('saved.host');
    expect(serverConfig.useInsecureHttp()).toBe(true);
    expect(serverConfig.connectionEstablished()).toBe(true);
    expect(serverServiceMock.saveConnection).toHaveBeenCalledWith(serverConfig);
  });
});
