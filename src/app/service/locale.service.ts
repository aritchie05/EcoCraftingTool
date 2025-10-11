import {effect, Inject, Injectable, signal, WritableSignal} from '@angular/core';
import {localeData, LocaleEntry} from '../../assets/data/locale/locale-data';
import {skills} from '../../assets/data/skills';
import {items} from '../../assets/data/items';
import {recipes} from '../../assets/data/recipes';
import {upgradeModules} from '../../assets/data/upgrade-modules';
import {tables} from '../../assets/data/crafting-tables';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

export class Locale {
  name: string;
  code: string;
  langCode: string;
  regionCode: string;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;

    this.langCode = this.code.substring(0, 2).toLowerCase();
    this.regionCode = this.code.substring(3, 5).toLowerCase();
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  readonly supportedLocales: Map<string, Locale>;
  readonly defaultLocale: Locale;

  selectedLocale: WritableSignal<Locale>;

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {
    this.defaultLocale = new Locale('English', 'en-US');
    this.supportedLocales = new Map([
      ['en', this.defaultLocale],
      ['fr', new Locale('Français', 'fr-FR')],
      ['es', new Locale('Español', 'es-ES')],
      ['de', new Locale('Deutsch', 'de-DE')],
      ['pt', new Locale('Português', 'pt-PT')],
      ['it', new Locale('Italiano', 'it-IT')],
      ['tr', new Locale('Türkçe', 'tr-TR')],
      ['pl', new Locale('Polski', 'pl-PL')],
      ['ru', new Locale('Русский', 'ru-RU')],
      ['uk', new Locale('Українська', 'uk-UA')],
      ['ko', new Locale('한국어', 'ko-KR')],
      ['zh', new Locale('汉语', 'zh-CN')],
      ['ja', new Locale('日本語', 'ja-JP')]
    ]);

    let storageLocale: Locale | undefined = this.getSelectedLocale();

    if (storageLocale === undefined) {
      let userLang = this.getUsersLocale('en-US').substring(0, 2);
      storageLocale = this.supportedLocales.get(userLang);
    }

    this.selectedLocale = signal(storageLocale !== undefined ? storageLocale : this.defaultLocale);

    effect(() => {
      skills.forEach(skill => {
        skill.name.update((oldName) => this.localizeSkillName(oldName, skill.nameID, this.selectedLocale().langCode));
      });

      items.forEach(item => {
        item.name.update((oldName) => this.localizeItemName(oldName, item.nameID, this.selectedLocale().langCode));
      });

      recipes.forEach(recipe => {
        recipe.name.update((oldName) => this.localizeRecipeName(oldName, recipe.nameID, this.selectedLocale().langCode));
      });

      upgradeModules.forEach(upgrade => {
        upgrade.name.update((oldName) => this.localizeUpgradeName(oldName, upgrade.nameID, this.selectedLocale().langCode));
      });

      tables.forEach(table => {
        table.name.update((oldName) => this.localizeCraftingTableName(oldName, table.nameID, this.selectedLocale().langCode));
      });
    });

    effect(() => {
      this.saveSelectedLocale(this.selectedLocale());
    });
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

  changeLocale(localeCode: string) {
    const newLocale = this.supportedLocales.get(localeCode.substring(0, 2));
    if (newLocale !== undefined) {
      this.selectedLocale.set(newLocale);
    }
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
    if (locData === undefined) {
      console.warn(`Could not find locale data for ${type}`);
      return enName;
    }
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

  getSelectedLocale(): Locale {
    const locale = this.storageService.get('locale');
    if (locale) {
      return new Locale(locale.name, locale.code);
    }
    return this.defaultLocale;
  }

  saveSelectedLocale(locale: Locale) {
    this.storageService.set('locale', {
      name: locale.name,
      code: locale.code
    })
  }
}
