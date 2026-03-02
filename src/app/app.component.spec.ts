import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA, signal} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Locale, LocaleService} from './service/locale.service';
import {MessageService} from './service/message.service';

const localeServiceMock: Pick<LocaleService, 'selectedLocale'> = {
  selectedLocale: signal(new Locale('English', 'en-US'))
};

const messageServiceMock: Pick<MessageService, 'getMessage'> = {
  getMessage: () => 'Crafting Calculator'
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {provide: LocaleService, useValue: localeServiceMock},
        {provide: MessageService, useValue: messageServiceMock}
      ]
    }).overrideComponent(AppComponent, {
      set: {
        imports: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set page title and locale', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const titleService = TestBed.inject(Title);
    expect(titleService.getTitle()).toContain('Crafting Calculator');
    expect(document.head.lang).toBe('en-US');
  });
});
