import {Inject, Injectable} from '@angular/core';
import {localeData, LocaleEntry} from '../../assets/data/locale/locale-data';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

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

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.supportedLocales = [
      new Locale('English', 'en-US'),
      new Locale('Français', 'fr-FR'),
      new Locale('Español', 'es-ES'),
      new Locale('Deutsch', 'de-DE'),
      new Locale('Português', 'pt-PT'),
      new Locale('Italiano', 'it-IT'),
      new Locale('Türkçe', 'tr-TR'),
      new Locale('Polski', 'pl-PL'),
      new Locale('Русский', 'ru-RU'),
      new Locale('Українська', 'uk-UA'),
      new Locale('한국어', 'ko-KR'),
      new Locale('汉语', 'zh-CN'),
      new Locale('日本語', 'ja-JP')
    ];

    let locale = this.storageService.get('locale');
    if (locale != null) {
      this.selectedLocale = new Locale(locale.name, locale.code);
    } else {
      let userLang = this.getUsersLocale('en-US').substr(0, 2);
      this.selectedLocale = this.supportedLocales.find(locale => locale.code.match(userLang));
    }

    if (this.selectedLocale === undefined) {
      this.selectedLocale = this.supportedLocales.find(locale => locale.code.match('en-US'));
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

  localizeItemName(itemName: string, itemNameID: string, lang: string): string {
    return this.localizeString('items', itemName, itemNameID, lang);
  }

  localizeRecipeName(recipeName: string, recipeNameID: string, lang: string): string {
    return this.localizeString('recipes', recipeName, recipeNameID, lang);
  }

  localizeSkillName(skillName: string, skillNameID: string, lang: string): string {
    return this.localizeString('skills', skillName, skillNameID, lang);
  }

  localizeCraftingTableName(tableName: string, tableNameID: string, lang: string): string {
    return this.localizeString('tables', tableName, tableNameID, lang);
  }

  localizeUpgradeName(upgradeName: string, upgradeNameID: string, lang: string): string {
    return this.localizeString('upgrades', upgradeName, upgradeNameID, lang);
  }

  private localizeString(type: string, enName: string, nameID: string, lang: string): string {
    let locData = localeData.find(l => l.type.localeCompare(type) === 0);
    let entry = locData.entries.find(entry => entry.id.localeCompare(nameID) === 0);
    if (entry === undefined) {
      console.warn(`Could not find locale entry for ${nameID} in ${type}`);
      return enName;
    } else {
      switch (lang) {
        case 'en':
          return entry.en;
        case 'fr':
          return this.getOrNull(entry, entry.fr);
        case 'es':
          return this.getOrNull(entry, entry.es);
        case 'de':
          return this.getOrNull(entry, entry.de);
        case 'pt':
          return this.getOrNull(entry, entry.pt);
        case 'it':
          return this.getOrNull(entry, entry.it);
        case 'tr':
          return this.getOrNull(entry, entry.tr);
        case 'pl':
          return this.getOrNull(entry, entry.pl);
        case 'ru':
          return this.getOrNull(entry, entry.ru);
        case 'uk':
          return this.getOrNull(entry, entry.uk);
        case 'ko':
          return this.getOrNull(entry, entry.ko);
        case 'zh':
          return this.getOrNull(entry, entry.zh);
        case 'ja':
          return this.getOrNull(entry, entry.ja);
        default:
          return this.getOrNull(entry, entry.en);
      }
    }
  }

  private getOrNull(entry: LocaleEntry, value: string): string {
    return value !== undefined ? value : entry.en;
  }
}
