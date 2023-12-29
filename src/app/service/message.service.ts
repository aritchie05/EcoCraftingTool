import {Injectable} from '@angular/core';
import {Locale} from './locale.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
  }

  getMessage(id: string, locale: Locale): string {
    let message = messages.find(message => message.id.localeCompare(id) === 0);
    let result: LocalizedMessage;
    if (message) {
      result = message.localizedMessages.find(message => message.lang.localeCompare(locale.langCode()) === 0);
    }
    return result !== undefined ? result.text : message.localizedMessages.find(message => message.lang === 'en').text;
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
          'text': 'Calculadora de artesanato',
          'lang': 'pt'
        },
        {
          'text': 'Calcolatrice di creazione',
          'lang': 'it'
        },
        {
          'text': 'Üretim Hesaplayıcısı',
          'lang': 'tr'
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
      'id': 'importHeader',
      'localizedMessages': [
        {
          'text': 'Import',
          'lang': 'en'
        },
        {
          'text': 'Importer',
          'lang': 'fr'
        },
        {
          'text': 'Importar',
          'lang': 'es'
        },
        {
          'text': 'Importieren',
          'lang': 'de'
        },
        {
          'text': 'Importar',
          'lang': 'pt'
        },
        {
          'text': 'Importare',
          'lang': 'it'
        },
        {
          'text': 'İçe aktarmak',
          'lang': 'tr'
        },
        {
          'text': 'Import',
          'lang': 'pl'
        },
        {
          'text': 'Импортировать',
          'lang': 'ru'
        },
        {
          'text': 'Імпорт',
          'lang': 'uk'
        },
        {
          'text': '수입',
          'lang': 'ko'
        },
        {
          'text': '进口',
          'lang': 'zh'
        },
        {
          'text': '輸入',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'importButton',
      'localizedMessages': [
        {
          'text': 'Import To Calculator',
          'lang': 'en'
        },
        {
          'text': 'Importer vers la calculatrice',
          'lang': 'fr'
        },
        {
          'text': 'Importar a calculadora',
          'lang': 'es'
        },
        {
          'text': 'In Rechner importieren',
          'lang': 'de'
        },
        {
          'text': 'Importar para calculadora',
          'lang': 'pt'
        },
        {
          'text': 'Importa nella calcolatrice',
          'lang': 'it'
        },
        {
          'text': 'Hesap Makinesine Aktar',
          'lang': 'tr'
        },
        {
          'text': 'Importuj do kalkulatora',
          'lang': 'pl'
        },
        {
          'text': 'Импортировать в калькулятор',
          'lang': 'ru'
        },
        {
          'text': 'Імпорт до калькулятора',
          'lang': 'uk'
        },
        {
          'text': '계산기로 가져오기',
          'lang': 'ko'
        },
        {
          'text': '导入到计算器',
          'lang': 'zh'
        },
        {
          'text': '電卓にインポート',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'exportHeader',
      'localizedMessages': [
        {
          'text': 'Export',
          'lang': 'en'
        },
        {
          'text': 'Exporter',
          'lang': 'fr'
        },
        {
          'text': 'Exportar',
          'lang': 'es'
        },
        {
          'text': 'Exportieren',
          'lang': 'de'
        },
        {
          'text': 'Exportar',
          'lang': 'pt'
        },
        {
          'text': 'Esportare',
          'lang': 'it'
        },
        {
          'text': 'İhracat',
          'lang': 'tr'
        },
        {
          'text': 'Eksport',
          'lang': 'pl'
        },
        {
          'text': 'Экспорт',
          'lang': 'ru'
        },
        {
          'text': 'Експорт',
          'lang': 'uk'
        },
        {
          'text': '내보내다',
          'lang': 'ko'
        },
        {
          'text': '出口',
          'lang': 'zh'
        },
        {
          'text': '輸出',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'copyClipboardButton',
      'localizedMessages': [
        {
          'text': 'Copy to Clipboard',
          'lang': 'en'
        },
        {
          'text': 'Copier dans le presse-papier',
          'lang': 'fr'
        },
        {
          'text': 'Copiar al portapapeles',
          'lang': 'es'
        },
        {
          'text': 'In die Zwischenablage kopieren',
          'lang': 'de'
        },
        {
          'text': 'Copiar para área de transferência',
          'lang': 'pt'
        },
        {
          'text': 'Copia negli appunti',
          'lang': 'it'
        },
        {
          'text': 'Panoya kopyala',
          'lang': 'tr'
        },
        {
          'text': 'Skopiuj do schowka',
          'lang': 'pl'
        },
        {
          'text': 'Скопировать в буфер обмена',
          'lang': 'ru'
        },
        {
          'text': 'Копіювати в буфер обміну',
          'lang': 'uk'
        },
        {
          'text': '클립 보드에 복사',
          'lang': 'ko'
        },
        {
          'text': '复制到剪贴板',
          'lang': 'zh'
        },
        {
          'text': 'クリップボードにコピー',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'resourceCostMultiplier',
      'localizedMessages': [
        {
          'text': 'Craft Resource Modifier',
          'lang': 'en'
        },
        {
          'text': 'Modificateur de ressource artisanale',
          'lang': 'fr'
        },
        {
          'text': 'Modificador de recursos de artesanía',
          'lang': 'es'
        },
        {
          'text': 'Ressourcenmodifikator herstellen',
          'lang': 'de'
        },
        {
          'text': 'Modificador de Recurso de Artesanato',
          'lang': 'pt'
        },
        {
          'text': 'Modificatore di risorse artigianali',
          'lang': 'it'
        },
        {
          'text': 'Zanaat Kaynağı Değiştirici',
          'lang': 'tr'
        },
        {
          'text': 'Modyfikator zasobów rzemieślniczych',
          'lang': 'pl'
        },
        {
          'text': 'Создание модификатора ресурсов',
          'lang': 'ru'
        },
        {
          'text': 'Модифікатор ресурсу Craft',
          'lang': 'uk'
        },
        {
          'text': '공예 자원 수정자',
          'lang': 'ko'
        },
        {
          'text': '工艺资源修改器',
          'lang': 'zh'
        },
        {
          'text': 'クラフトリソース修飾子',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'whiteTigerRecipes',
      'localizedMessages': [
        {
          'text': 'White Tiger Recipes',
          'lang': 'en'
        },
        {
          'text': 'Recettes du Tigre Blanc',
          'lang': 'fr'
        },
        {
          'text': 'Recetas de Tigre Blanco',
          'lang': 'es'
        },
        {
          'text': 'Weiße Tiger-Rezepte',
          'lang': 'de'
        },
        {
          'text': 'Receitas de Tigre Branco',
          'lang': 'pt'
        },
        {
          'text': 'Ricette della tigre bianca',
          'lang': 'it'
        },
        {
          'text': 'Beyaz Kaplan Tarifleri',
          'lang': 'tr'
        },
        {
          'text': 'Przepisy Białego Tygrysa',
          'lang': 'pl'
        },
        {
          'text': 'Рецепты белого тигра',
          'lang': 'ru'
        },
        {
          'text': 'Рецепти білого тигра',
          'lang': 'uk'
        },
        {
          'text': '화이트 타이거 레시피',
          'lang': 'ko'
        },
        {
          'text': '白虎食谱',
          'lang': 'zh'
        },
        {
          'text': 'ホワイトタイガー レシピ',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'endGameCraftOption',
      'localizedMessages': [
        {
          'text': 'Expensive End Game Recipes',
          'lang': 'en'
        },
        {
          'text': 'Recettes de fin de partie chères',
          'lang': 'fr'
        },
        {
          'text': 'Recetas costosas para el final del juego',
          'lang': 'es'
        },
        {
          'text': 'Teure Endspielrezepte',
          'lang': 'de'
        },
        {
          'text': 'Receitas caras de final de jogo',
          'lang': 'pt'
        },
        {
          'text': 'Ricette costose per la fine del gioco',
          'lang': 'it'
        },
        {
          'text': 'Pahalı Oyun Sonu Tarifleri',
          'lang': 'tr'
        },
        {
          'text': 'Drogie przepisy na koniec gry',
          'lang': 'pl'
        },
        {
          'text': 'Дорогие рецепты финальной игры',
          'lang': 'ru'
        },
        {
          'text': 'Дорогі рецепти закінчення гри',
          'lang': 'uk'
        },
        {
          'text': '비싼 엔드 게임 레시피',
          'lang': 'ko'
        },
        {
          'text': '昂贵的最终游戏食谱',
          'lang': 'zh'
        },
        {
          'text': '高価なエンドゲームレシピ',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'performanceMode',
      'localizedMessages': [
        {
          'text': 'Performance Mode',
          'lang': 'en'
        },
        {
          'text': 'Mode Performance',
          'lang': 'fr'
        },
        {
          'text': 'Modo de desempeño',
          'lang': 'es'
        },
        {
          'text': 'Leistungsmodus',
          'lang': 'de'
        },
        {
          'text': 'Modo de desempenho',
          'lang': 'pt'
        },
        {
          'text': 'Modalità performante',
          'lang': 'it'
        },
        {
          'text': 'Performans modu',
          'lang': 'tr'
        },
        {
          'text': 'Tryb wydajności',
          'lang': 'pl'
        },
        {
          'text': 'Режим производительности',
          'lang': 'ru'
        },
        {
          'text': 'Режим продуктивності',
          'lang': 'uk'
        },
        {
          'text': '성능 모드',
          'lang': 'ko'
        },
        {
          'text': '表演模式',
          'lang': 'zh'
        },
        {
          'text': 'パフォーマンスモード',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'performanceModeDescription',
      'localizedMessages': [
        {
          'text': 'When enabled, the app will not recalculate prices until the "Calculate" button is clicked.',
          'lang': 'en'
        },
        {
          'text': 'Lorsqu\'il est activé, l\'application ne recalculera pas les prix tant que le bouton "Calculer" n\'est cliqué.',
          'lang': 'fr'
        },
        {
          'text': 'Cuando está habilitado, la aplicación no recalculará los precios hasta que se haga clic en el botón "Calcular".',
          'lang': 'es'
        },
        {
          'text': 'Wenn die App aktiviert ist, berechnen die App die Preise erst neu, bis die Schaltfläche "Berechnen" klickt.',
          'lang': 'de'
        },
        {
          'text': 'Quando ativado, o aplicativo não recalcula os preços até que o botão "calcular" seja clicado.',
          'lang': 'pt'
        },
        {
          'text': 'Se abilitata, l\'app non ricalcolerà i prezzi fino a quando non viene cliccato il pulsante "Calcola".',
          'lang': 'it'
        },
        {
          'text': 'Etkinleştirildiğinde, "Hesapla" düğmesi tıklanana kadar uygulama fiyatları yeniden hesaplamaz.',
          'lang': 'tr'
        },
        {
          'text': 'Po włączeniu aplikacja nie przeliczy cen, dopóki przycisk „Oblicz” nie zostanie kliknięty.',
          'lang': 'pl'
        },
        {
          'text': 'Якщо ввімкнено, додаток не буде перерахувати ціни до натискання кнопки "Обчислення".',
          'lang': 'ru'
        },
        {
          'text': 'Якщо ввімкнено, додаток не буде перерахувати ціни до натискання кнопки "Обчислення".',
          'lang': 'uk'
        },
        {
          'text': '활성화되면 앱은 "계산"버튼을 클릭 할 때까지 가격을 다시 계산하지 않습니다.',
          'lang': 'ko'
        },
        {
          'text': '启用后，该应用不会重新计算价格，直到单击“计算”按钮。',
          'lang': 'zh'
        },
        {
          'text': '有効になった場合、「計算」ボタンがクリックされるまで、アプリは価格を再計算しません。',
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
          'text': 'Version Eco',
          'lang': 'fr'
        },
        {
          'text': 'Versión Eco',
          'lang': 'es'
        },
        {
          'text': 'Eco Version',
          'lang': 'de'
        },
        {
          'text': 'Versão Eco',
          'lang': 'pt'
        },
        {
          'text': 'Versione Eco',
          'lang': 'it'
        },
        {
          'text': 'Eco Versiyon',
          'lang': 'tr'
        },
        {
          'text': 'Wersja Eco',
          'lang': 'pl'
        },
        {
          'text': 'Eco версия',
          'lang': 'ru'
        },
        {
          'text': 'Eco версія',
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
          'text': 'Habilidades',
          'lang': 'pt'
        },
        {
          'text': 'Competenze',
          'lang': 'it'
        },
        {
          'text': 'Yetenekler',
          'lang': 'tr'
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
          'text': 'Escolha uma habilidade...',
          'lang': 'pt'
        },
        {
          'text': 'Scegli un\'abilità...',
          'lang': 'it'
        },
        {
          'text': 'Bir beceri seçin...',
          'lang': 'tr'
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
      'id': 'lavishWorkspace',
      'localizedMessages': [
        {
          'text': 'Lavish Workspace',
          'lang': 'en'
        },
        {
          'text': 'Espace de travail somptueux',
          'lang': 'fr'
        },
        {
          'text': 'Zona de trabajo lujoso',
          'lang': 'es'
        },
        {
          'text': 'Großzügiger Arbeitsbereich',
          'lang': 'de'
        },
        {
          'text': 'Área de Trabalho Exuberante',
          'lang': 'pt'
        },
        {
          'text': 'Sontuosa Area di Lavoro',
          'lang': 'it'
        },
        {
          'text': 'Geniş Çalışma Alanı',
          'lang': 'tr'
        },
        {
          'text': 'Luksusowy warsztat',
          'lang': 'pl'
        },
        {
          'text': 'Качественное рабочее место',
          'lang': 'ru'
        },
        {
          'text': 'Розкішне робоче місце',
          'lang': 'uk'
        },
        {
          'text': '화려한 작업실',
          'lang': 'ko'
        },
        {
          'text': '奢华的工作空间',
          'lang': 'zh'
        },
        {
          'text': '豪華な作業空間',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'tableSearchPlaceholder',
      'localizedMessages': [
        {
          'text': 'Choose a crafting table...',
          'lang': 'en'
        },
        {
          'text': 'Choisissez une table de bricolage...',
          'lang': 'fr'
        },
        {
          'text': 'Elige una mesa de trabajo...',
          'lang': 'es'
        },
        {
          'text': 'Wähle einen Basteltisch...',
          'lang': 'de'
        },
        {
          'text': 'Escolha uma mesa de trabalho...',
          'lang': 'pt'
        },
        {
          'text': 'Scegli un tavolo da lavoro...',
          'lang': 'it'
        },
        {
          'text': 'Bir üretim masası seçin...',
          'lang': 'tr'
        },
        {
          'text': 'Wybierz stół rzemieślniczy...',
          'lang': 'pl'
        },
        {
          'text': 'Выберите верстак...',
          'lang': 'ru'
        },
        {
          'text': 'Виберіть стіл для крафта...',
          'lang': 'uk'
        },
        {
          'text': '크래프팅 테이블을 선택하세요...',
          'lang': 'ko'
        },
        {
          'text': '选择工作台...',
          'lang': 'zh'
        },
        {
          'text': 'クラフトテーブルを選択してください...',
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
          'text': 'Entradas',
          'lang': 'pt'
        },
        {
          'text': 'Ingressi',
          'lang': 'it'
        },
        {
          'text': 'Girişler',
          'lang': 'tr'
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
          'text': 'Preço por 1000 calorias',
          'lang': 'pt'
        },
        {
          'text': 'Prezzo per 1000 calorie',
          'lang': 'it'
        },
        {
          'text': '1000 Kalori Başına Fiyat',
          'lang': 'tr'
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
      'id': 'profitPercentLabel',
      'localizedMessages': [
        {
          'text': 'Profit Percentage',
          'lang': 'en'
        },
        {
          'text': 'Pourcentage de profit',
          'lang': 'fr'
        },
        {
          'text': 'Porcentaje de beneficio',
          'lang': 'es'
        },
        {
          'text': 'Gewinnprozentsatz',
          'lang': 'de'
        },
        {
          'text': 'Porcentagem de Lucro',
          'lang': 'pt'
        },
        {
          'text': 'Percentuale di profitto',
          'lang': 'it'
        },
        {
          'text': 'Kâr Yüzdesi',
          'lang': 'tr'
        },
        {
          'text': 'Procent zysku',
          'lang': 'pl'
        },
        {
          'text': 'Процент прибыли',
          'lang': 'ru'
        },
        {
          'text': 'Відсоток прибутку',
          'lang': 'uk'
        },
        {
          'text': '이익 비율',
          'lang': 'ko'
        },
        {
          'text': '利润百分比',
          'lang': 'zh'
        },
        {
          'text': '利益率',
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
          'text': 'Saídas',
          'lang': 'pt'
        },
        {
          'text': 'Uscite',
          'lang': 'it'
        },
        {
          'text': 'Çıktılar',
          'lang': 'tr'
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
          'text': 'Escolha uma receita...',
          'lang': 'pt'
        },
        {
          'text': 'Scegli una ricetta...',
          'lang': 'it'
        },
        {
          'text': 'Bir tarif seçin...',
          'lang': 'tr'
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
      'id': 'calculatePrices',
      'localizedMessages': [
        {
          'text': 'Calculate Prices',
          'lang': 'en'
        },
        {
          'text': 'Calculer les prix',
          'lang': 'fr'
        },
        {
          'text': 'Calcular precios',
          'lang': 'es'
        },
        {
          'text': 'Preise berechnen',
          'lang': 'de'
        },
        {
          'text': 'Calcular preços',
          'lang': 'pt'
        },
        {
          'text': 'Calcola i prezzi',
          'lang': 'it'
        },
        {
          'text': 'Fiyatları hesapla',
          'lang': 'tr'
        },
        {
          'text': 'Oblicz ceny',
          'lang': 'pl'
        },
        {
          'text': 'Рассчитать цены',
          'lang': 'ru'
        },
        {
          'text': 'Обчисліть ціни',
          'lang': 'uk'
        },
        {
          'text': '가격을 계산하십시오',
          'lang': 'ko'
        },
        {
          'text': '计算价格',
          'lang': 'zh'
        },
        {
          'text': '価格を計算します',
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
          'text': 'Receita',
          'lang': 'pt'
        },
        {
          'text': 'Ricetta',
          'lang': 'it'
        },
        {
          'text': 'Yemek tarifi',
          'lang': 'tr'
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
          'text': 'Código fonte',
          'lang': 'pt'
        },
        {
          'text': 'Codice sorgente',
          'lang': 'it'
        },
        {
          'text': 'Kaynak kodu',
          'lang': 'tr'
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
          'text': 'Report an issue',
          'lang': 'en'
        },
        {
          'text': 'Signaler un problème',
          'lang': 'fr'
        },
        {
          'text': 'Reportar un problema',
          'lang': 'es'
        },
        {
          'text': 'Ein Problem melden',
          'lang': 'de'
        },
        {
          'text': 'Informar um problema',
          'lang': 'pt'
        },
        {
          'text': 'Segnala un problema',
          'lang': 'it'
        },
        {
          'text': 'Sorun bildir',
          'lang': 'tr'
        },
        {
          'text': 'Zgłoś problem',
          'lang': 'pl'
        },
        {
          'text': 'Сообщить о проблеме',
          'lang': 'ru'
        },
        {
          'text': 'Повідомити про проблему',
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
          'text': 'By Adam',
          'lang': 'en'
        },
        {
          'text': 'Par Adam',
          'lang': 'fr'
        },
        {
          'text': 'Por Adam',
          'lang': 'es'
        },
        {
          'text': 'Um Adam',
          'lang': 'de'
        },
        {
          'text': 'Por Adam',
          'lang': 'pt'
        },
        {
          'text': 'Di Adam',
          'lang': 'it'
        },
        {
          'text': 'Adam tarafından',
          'lang': 'tr'
        },
        {
          'text': 'Do Adam',
          'lang': 'pl'
        },
        {
          'text': 'К Adam',
          'lang': 'ru'
        },
        {
          'text': 'До Adam',
          'lang': 'uk'
        },
        {
          'text': 'Adam까지',
          'lang': 'ko'
        },
        {
          'text': '乘Adam',
          'lang': 'zh'
        },
        {
          'text': 'Adam年までに',
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
          'text': 'Crédito para k0ka',
          'lang': 'pt'
        },
        {
          'text': 'Ringraziamo k0ka',
          'lang': 'it'
        },
        {
          'text': 'k0ka\'ya kredi',
          'lang': 'tr'
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
    },
    {
      'id': 'Calories',
      'localizedMessages': [
        {
          'text': 'Calories',
          'lang': 'en'
        },
        {
          'text': 'Calories',
          'lang': 'fr'
        },
        {
          'text': 'Calorías',
          'lang': 'es'
        },
        {
          'text': 'Kalorien',
          'lang': 'de'
        },
        {
          'text': 'Calorias',
          'lang': 'pt'
        },
        {
          'text': 'Calorie',
          'lang': 'it'
        },
        {
          'text': 'Kalori',
          'lang': 'tr'
        },
        {
          'text': 'Kalorie',
          'lang': 'pl'
        },
        {
          'text': 'Калории',
          'lang': 'ru'
        },
        {
          'text': 'Калорії',
          'lang': 'uk'
        },
        {
          'text': '칼로리',
          'lang': 'ko'
        },
        {
          'text': '卡路里',
          'lang': 'zh'
        },
        {
          'text': 'カロリー',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'craftingTableLabel',
      'localizedMessages': [
        {
          'text': 'Crafting Table',
          'lang': 'en'
        },
        {
          'text': 'Table de Bricolage',
          'lang': 'fr'
        },
        {
          'text': 'Mesa de Trabajo',
          'lang': 'es'
        },
        {
          'text': 'Basteltisch',
          'lang': 'de'
        },
        {
          'text': 'Mesa de artesanato',
          'lang': 'pt'
        },
        {
          'text': 'Tavolo da lavoro',
          'lang': 'it'
        },
        {
          'text': 'Üretim Tablosu',
          'lang': 'tr'
        },
        {
          'text': 'Stół Rzemieślniczy',
          'lang': 'pl'
        },
        {
          'text': 'Верстак',
          'lang': 'ru'
        },
        {
          'text': 'Стіл для крафта',
          'lang': 'uk'
        },
        {
          'text': '공예 테이블',
          'lang': 'ko'
        },
        {
          'text': '工艺台',
          'lang': 'zh'
        },
        {
          'text': '作業台',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'skillLabel',
      'localizedMessages': [
        {
          'text': 'Skill',
          'lang': 'en'
        },
        {
          'text': 'Compétence',
          'lang': 'fr'
        },
        {
          'text': 'Habilidad',
          'lang': 'es'
        },
        {
          'text': 'Fähigkeit',
          'lang': 'de'
        },
        {
          'text': 'Habilidade',
          'lang': 'pt'
        },
        {
          'text': 'Abilità',
          'lang': 'it'
        },
        {
          'text': 'Yetenek',
          'lang': 'tr'
        },
        {
          'text': 'Umiejętność',
          'lang': 'pl'
        },
        {
          'text': 'Навык',
          'lang': 'ru'
        },
        {
          'text': 'Майстерність',
          'lang': 'uk'
        },
        {
          'text': '숙련',
          'lang': 'ko'
        },
        {
          'text': '技能',
          'lang': 'zh'
        },
        {
          'text': '技能',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'laborLabel',
      'localizedMessages': [
        {
          'text': 'Labor',
          'lang': 'en'
        },
        {
          'text': 'Travail',
          'lang': 'fr'
        },
        {
          'text': 'Mano de obra',
          'lang': 'es'
        },
        {
          'text': 'Arbeit',
          'lang': 'de'
        },
        {
          'text': 'Trabalho',
          'lang': 'pt'
        },
        {
          'text': 'Lavoro',
          'lang': 'it'
        },
        {
          'text': 'İş gücü',
          'lang': 'tr'
        },
        {
          'text': 'Praca',
          'lang': 'pl'
        },
        {
          'text': 'Труд',
          'lang': 'ru'
        },
        {
          'text': 'праці',
          'lang': 'uk'
        },
        {
          'text': '노동',
          'lang': 'ko'
        },
        {
          'text': '劳动',
          'lang': 'zh'
        },
        {
          'text': '労働',
          'lang': 'ja'
        }
      ]
    }
  ];
