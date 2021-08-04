import {Injectable} from '@angular/core';
import {localeData} from '../../assets/data/locale-data';
import {CookieService} from 'ngx-cookie-service';

export class Locale {
  name: string;
  code: string;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }

  langCode(): string {
    return this.code.substr(0, 2);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  selectedLocale: Locale;
  supportedLocales: Locale[];

  constructor(private cookieService: CookieService) {
    this.supportedLocales = [
      new Locale('English', 'en-US'),
      new Locale('Français', 'fr-FR'),
      new Locale('Español', 'es-ES'),
      new Locale('Deutsch', 'de-DE'),
      new Locale('Polski', 'pl-PL'),
      new Locale('Русский', 'ru-RU'),
      new Locale('Українська', 'uk-UA'),
      new Locale('한국어', 'ko-KR'),
      new Locale('汉语', 'zh-CN'),
      new Locale('日本語', 'ja-JP')
    ];
    if (this.cookieService.check('locale')) {
      let jsonLocale = JSON.parse(this.cookieService.get('locale'));
      this.selectedLocale = new Locale(jsonLocale.name, jsonLocale.code);
    } else {
      let userLang = this.getUsersLocale('en-US').substr(0, 2);
      this.selectedLocale = this.supportedLocales.find(locale => locale.code.match(userLang));
    }
  }

  getUsersLocale(defaultValue: string): string {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }

  localizeItemName(itemNameID: string, lang: string): string {
    return this.localizeString('items', itemNameID, lang);
  }

  localizeRecipeName(recipeNameID: string, lang: string): string {
    return this.localizeString('recipes', recipeNameID, lang);
  }

  localizeSkillName(skillNameID: string, lang: string): string {
    return this.localizeString('skills', skillNameID, lang);
  }

  localizeCraftingTableName(tableNameID: string, lang: string): string {
    return this.localizeString('tables', tableNameID, lang);
  }

  localizeUpgradeName(upgradeNameID: string, lang: string): string {
    return this.localizeString('upgrades', upgradeNameID, lang);
  }

  private localizeString(type: string, nameID: string, lang: string): string {
    let locData = localeData.find(l => l.type.localeCompare(type) === 0);
    let entry = locData.entries.find(entry => entry.id.localeCompare(nameID) === 0);
    if (entry === undefined) {
      return nameID;
    } else {
      switch (lang) {
        case 'en':
          return entry.en;
        case 'fr':
          return entry.fr;
        case 'es':
          return entry.es;
        case 'de':
          return entry.de;
        case 'pl':
          return entry.pl;
        case 'ru':
          return entry.ru;
        case 'uk':
          return entry.uk;
        case 'ko':
          return entry.ko;
        case 'zh':
          return entry.zh;
        case 'ja':
          return entry.ja;
        default:
          return entry.en;
      }
    }
  }
}
