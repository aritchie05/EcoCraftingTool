import {Injectable} from '@angular/core';
import {Locale} from './locale.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
  }

  getMessage(id: string, locale: Locale): string {
    return messages.find(message => message.id.localeCompare(id) === 0)
      .localizedMessages.find(message => message.lang.localeCompare(locale.langCode()) === 0).text;
  }
}

export interface Message {
  id: string;
  localizedMessages: LocalizedMessage[];
}

export interface LocalizedMessage {
  text: string;
  lang: string;
}

const messages: Message[] =
  [
    {
      'id': 'navTitle',
      'localizedMessages': [
        {
          'text': 'Crafting Calculator',
          'lang': 'en'
        },
        {
          'text': 'Calculatrice d\u0027artisanat',
          'lang': 'fr'
        },
        {
          'text': 'Calculadora de elaboración',
          'lang': 'es'
        },
        {
          'text': 'Handwerksrechner',
          'lang': 'de'
        },
        {
          'text': 'Kalkulator rzemieślniczy',
          'lang': 'pl'
        },
        {
          'text': 'Калькулятор крафта',
          'lang': 'ru'
        },
        {
          'text': 'Крафт калькулятор',
          'lang': 'uk'
        },
        {
          'text': '제작 계산기',
          'lang': 'ko'
        },
        {
          'text': '手工计算器',
          'lang': 'zh'
        },
        {
          'text': '電卓の作成',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'version',
      'localizedMessages': [
        {
          'text': 'Eco Version',
          'lang': 'en'
        },
        {
          'text': 'Version éco',
          'lang': 'fr'
        },
        {
          'text': 'Versión Eco',
          'lang': 'es'
        },
        {
          'text': 'Öko-Version',
          'lang': 'de'
        },
        {
          'text': 'Wersja Eco',
          'lang': 'pl'
        },
        {
          'text': 'Эко-версия',
          'lang': 'ru'
        },
        {
          'text': 'Еко-версія',
          'lang': 'uk'
        },
        {
          'text': '에코 버전',
          'lang': 'ko'
        },
        {
          'text': '生态版',
          'lang': 'zh'
        },
        {
          'text': 'エコバージョン',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'skillsHeader',
      'localizedMessages': [
        {
          'text': 'Skills',
          'lang': 'en'
        },
        {
          'text': 'Compétences',
          'lang': 'fr'
        },
        {
          'text': 'Habilidades',
          'lang': 'es'
        },
        {
          'text': 'Kompetenzen',
          'lang': 'de'
        },
        {
          'text': 'Umiejętności',
          'lang': 'pl'
        },
        {
          'text': 'Навыки и умения',
          'lang': 'ru'
        },
        {
          'text': 'Навички',
          'lang': 'uk'
        },
        {
          'text': '기술',
          'lang': 'ko'
        },
        {
          'text': '技能专长',
          'lang': 'zh'
        },
        {
          'text': 'スキル',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'skillSearchPlaceholder',
      'localizedMessages': [
        {
          'text': 'Choose a skill...',
          'lang': 'en'
        },
        {
          'text': 'Choisissez une compétence ...',
          'lang': 'fr'
        },
        {
          'text': 'Elige una habilidad ...',
          'lang': 'es'
        },
        {
          'text': 'Wähle eine Fähigkeit ...',
          'lang': 'de'
        },
        {
          'text': 'Wybierz umiejętność ...',
          'lang': 'pl'
        },
        {
          'text': 'Выберите навык ...',
          'lang': 'ru'
        },
        {
          'text': 'Виберіть навичку ...',
          'lang': 'uk'
        },
        {
          'text': '스킬을 선택하세요 ...',
          'lang': 'ko'
        },
        {
          'text': '选择一项技能...',
          'lang': 'zh'
        },
        {
          'text': 'スキルを選択してください...',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'ingredientsHeader',
      'localizedMessages': [
        {
          'text': 'Inputs',
          'lang': 'en'
        },
        {
          'text': 'Contributions',
          'lang': 'fr'
        },
        {
          'text': 'Entradas',
          'lang': 'es'
        },
        {
          'text': 'Eingänge',
          'lang': 'de'
        },
        {
          'text': 'Wejścia',
          'lang': 'pl'
        },
        {
          'text': 'Входы',
          'lang': 'ru'
        },
        {
          'text': 'Вхідні дані',
          'lang': 'uk'
        },
        {
          'text': '입력',
          'lang': 'ko'
        },
        {
          'text': '输入项',
          'lang': 'zh'
        },
        {
          'text': '入力',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'calorieCostLabel',
      'localizedMessages': [
        {
          'text': 'Price Per 1000 Calories',
          'lang': 'en'
        },
        {
          'text': 'Prix par 1000 calories',
          'lang': 'fr'
        },
        {
          'text': 'Precio por 1000 calorías',
          'lang': 'es'
        },
        {
          'text': 'Preis pro 1000 Kalorien',
          'lang': 'de'
        },
        {
          'text': 'Cena za 1000 kalorii',
          'lang': 'pl'
        },
        {
          'text': 'Цена за 1000 калорий',
          'lang': 'ru'
        },
        {
          'text': 'Ціна за 1000 калорій',
          'lang': 'uk'
        },
        {
          'text': '1000 칼로리 당 가격',
          'lang': 'ko'
        },
        {
          'text': '每千卡路里的价格',
          'lang': 'zh'
        },
        {
          'text': '1000カロリーあたりの価格',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'outputsHeader',
      'localizedMessages': [
        {
          'text': 'Outputs',
          'lang': 'en'
        },
        {
          'text': 'Les sorties',
          'lang': 'fr'
        },
        {
          'text': 'Salidas',
          'lang': 'es'
        },
        {
          'text': 'Ausgänge',
          'lang': 'de'
        },
        {
          'text': 'Wyjścia',
          'lang': 'pl'
        },
        {
          'text': 'Выходы',
          'lang': 'ru'
        },
        {
          'text': 'Виходи',
          'lang': 'uk'
        },
        {
          'text': '출력',
          'lang': 'ko'
        },
        {
          'text': '产出',
          'lang': 'zh'
        },
        {
          'text': '出力',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'recipeSearchPlaceholder',
      'localizedMessages': [
        {
          'text': 'Choose a recipe...',
          'lang': 'en'
        },
        {
          'text': 'Choisissez une recette ...',
          'lang': 'fr'
        },
        {
          'text': 'Elige una receta ...',
          'lang': 'es'
        },
        {
          'text': 'Wählen Sie ein Rezept ...',
          'lang': 'de'
        },
        {
          'text': 'Wybierz przepis ...',
          'lang': 'pl'
        },
        {
          'text': 'Выберите рецепт ...',
          'lang': 'ru'
        },
        {
          'text': 'Виберіть рецепт ...',
          'lang': 'uk'
        },
        {
          'text': '레시피 선택 ...',
          'lang': 'ko'
        },
        {
          'text': '选择一个食谱...',
          'lang': 'zh'
        },
        {
          'text': 'レシピを選択してください...',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'recipeSuffix',
      'localizedMessages': [
        {
          'text': 'Recipe',
          'lang': 'en'
        },
        {
          'text': 'Recette',
          'lang': 'fr'
        },
        {
          'text': 'Receta',
          'lang': 'es'
        },
        {
          'text': 'Rezept',
          'lang': 'de'
        },
        {
          'text': 'Przepis',
          'lang': 'pl'
        },
        {
          'text': 'Рецепт приготовления',
          'lang': 'ru'
        },
        {
          'text': 'Рецепт',
          'lang': 'uk'
        },
        {
          'text': '레시피',
          'lang': 'ko'
        },
        {
          'text': '食谱',
          'lang': 'zh'
        },
        {
          'text': 'レシピ',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'sourceCodeLink',
      'localizedMessages': [
        {
          'text': 'Source code',
          'lang': 'en'
        },
        {
          'text': 'Code source',
          'lang': 'fr'
        },
        {
          'text': 'Código fuente',
          'lang': 'es'
        },
        {
          'text': 'Quellcode',
          'lang': 'de'
        },
        {
          'text': 'Kod źródłowy',
          'lang': 'pl'
        },
        {
          'text': 'Исходный код',
          'lang': 'ru'
        },
        {
          'text': 'Вихідний код',
          'lang': 'uk'
        },
        {
          'text': '소스 코드',
          'lang': 'ko'
        },
        {
          'text': '源代码',
          'lang': 'zh'
        },
        {
          'text': 'ソースコード',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'feedbackLink',
      'localizedMessages': [
        {
          'text': 'Give feedback',
          'lang': 'en'
        },
        {
          'text': 'Donnez votre avis',
          'lang': 'fr'
        },
        {
          'text': 'Dar opinion',
          'lang': 'es'
        },
        {
          'text': 'Feedback geben',
          'lang': 'de'
        },
        {
          'text': 'Zostaw opinię',
          'lang': 'pl'
        },
        {
          'text': 'Дать обратную связь',
          'lang': 'ru'
        },
        {
          'text': 'Дайте відгук',
          'lang': 'uk'
        },
        {
          'text': '피드백 제공',
          'lang': 'ko'
        },
        {
          'text': '给予反馈',
          'lang': 'zh'
        },
        {
          'text': 'フィードバックを与えます',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'authorLink',
      'localizedMessages': [
        {
          'text': 'By 300',
          'lang': 'en'
        },
        {
          'text': 'Par 300',
          'lang': 'fr'
        },
        {
          'text': 'Por 300',
          'lang': 'es'
        },
        {
          'text': 'Um 300',
          'lang': 'de'
        },
        {
          'text': 'Do 300',
          'lang': 'pl'
        },
        {
          'text': 'К 300',
          'lang': 'ru'
        },
        {
          'text': 'До 300',
          'lang': 'uk'
        },
        {
          'text': '300까지',
          'lang': 'ko'
        },
        {
          'text': '乘300',
          'lang': 'zh'
        },
        {
          'text': '300年までに',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'creditLink',
      'localizedMessages': [
        {
          'text': 'Credit to k0ka',
          'lang': 'en'
        },
        {
          'text': 'Crédit à k0ka',
          'lang': 'fr'
        },
        {
          'text': 'Crédito a k0ka',
          'lang': 'es'
        },
        {
          'text': 'Gutschrift an k0ka',
          'lang': 'de'
        },
        {
          'text': 'Kredyt dla k0ka',
          'lang': 'pl'
        },
        {
          'text': 'Кредит для k0ka',
          'lang': 'ru'
        },
        {
          'text': 'Кредит k0ka',
          'lang': 'uk'
        },
        {
          'text': 'k0ka에 대한 크레딧',
          'lang': 'ko'
        },
        {
          'text': '归功于k0ka',
          'lang': 'zh'
        },
        {
          'text': 'k0kaへのクレジット',
          'lang': 'ja'
        }
      ]
    }
  ];
