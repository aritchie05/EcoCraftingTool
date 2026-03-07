import {inject, Injectable} from '@angular/core';
import {LocaleService} from './locale.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly localeService = inject(LocaleService);

  getMessage(id: string): string {
    const locale = this.localeService.selectedLocale();
    let message = messages.find(message => message.id.localeCompare(id) === 0);
    let result: LocalizedMessage | undefined;
    if (message) {
      result = message.localizedMessages.find(message => message.lang.localeCompare(locale.langCode) === 0);
      return result !== undefined ? result.text : message.localizedMessages.find(message => message.lang === 'en')!.text;
    }

    return `INVALID MESSAGE CONFIGURED FOR ID: ${id}`;
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
      'id': 'serverLabel',
      'localizedMessages': [
        {
          'text': 'Server',
          'lang': 'en'
        },
        {
          'text': 'Serveur',
          'lang': 'fr'
        },
        {
          'text': 'Servidor',
          'lang': 'es'
        },
        {
          'text': 'Server',
          'lang': 'de'
        },
        {
          'text': 'Servidor',
          'lang': 'pt'
        },
        {
          'text': 'Server',
          'lang': 'it'
        },
        {
          'text': 'Sunucu',
          'lang': 'tr'
        },
        {
          'text': 'Serwer',
          'lang': 'pl'
        },
        {
          'text': 'Сервер',
          'lang': 'ru'
        },
        {
          'text': 'Сервер',
          'lang': 'uk'
        },
        {
          'text': '서버',
          'lang': 'ko'
        },
        {
          'text': '服务器',
          'lang': 'zh'
        },
        {
          'text': 'サーバー',
          'lang': 'ja'
        }
      ]
    },
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
      'id': 'releaseNotesHeader',
      'localizedMessages': [
        {
          'text': 'Release History',
          'lang': 'en'
        },
        {
          'text': 'Historique des versions',
          'lang': 'fr'
        },
        {
          'text': 'Historial de versiones',
          'lang': 'es'
        },
        {
          'text': 'Veröffentlichungsverlauf',
          'lang': 'de'
        },
        {
          'text': 'Histórico de lançamentos',
          'lang': 'pt'
        },
        {
          'text': 'Cronologia delle versioni',
          'lang': 'it'
        },
        {
          'text': 'Yayın Geçmişi',
          'lang': 'tr'
        },
        {
          'text': 'Historia wydań',
          'lang': 'pl'
        },
        {
          'text': 'История релизов',
          'lang': 'ru'
        },
        {
          'text': 'Історія випусків',
          'lang': 'uk'
        },
        {
          'text': '출시 내역',
          'lang': 'ko'
        },
        {
          'text': '发布历史',
          'lang': 'zh'
        },
        {
          'text': 'リリース履歴',
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
    },
    {
      'id': 'defaultProfitLabel',
      'localizedMessages': [
        {
          'text': 'Default Profit Percentage',
          'lang': 'en'
        },
        {
          'text': 'Pourcentage de profit par défaut',
          'lang': 'fr'
        },
        {
          'text': 'Porcentaje de beneficio predeterminado',
          'lang': 'es'
        },
        {
          'text': 'Standard-Gewinnprozentsatz',
          'lang': 'de'
        },
        {
          'text': 'Percentagem de lucro padrão',
          'lang': 'pt'
        },
        {
          'text': 'Percentuale di profitto predefinita',
          'lang': 'it'
        },
        {
          'text': 'Varsayılan Kar Yüzdesi',
          'lang': 'tr'
        },
        {
          'text': 'Domyślny procent zysku',
          'lang': 'pl'
        },
        {
          'text': 'Процент прибыли по умолчанию',
          'lang': 'ru'
        },
        {
          'text': 'Відсоток прибутку за замовчуванням',
          'lang': 'uk'
        },
        {
          'text': '기본 이익 비율',
          'lang': 'ko'
        },
        {
          'text': '默认利润百分比',
          'lang': 'zh'
        },
        {
          'text': 'デフォルトの利益率',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'byproductsHeader',
      'localizedMessages': [
        {
          'text': 'Nebenprodukte',
          'lang': 'de'
        },
        {
          'text': 'Побочные продукты',
          'lang': 'ru'
        },
        {
          'text': 'Subprodutos',
          'lang': 'pt'
        },
        {
          'text': '부산물',
          'lang': 'ko'
        },
        {
          'text': 'Byproducts',
          'lang': 'en'
        },
        {
          'text': 'Sottoprodotti',
          'lang': 'it'
        },
        {
          'text': 'Sous-produits',
          'lang': 'fr'
        },
        {
          'text': '副产品',
          'lang': 'zh-CN'
        },
        {
          'text': 'Subproductos',
          'lang': 'es'
        },
        {
          'text': 'Побічні продукти',
          'lang': 'uk'
        },
        {
          'text': '副産物',
          'lang': 'ja'
        },
        {
          'text': 'Produkty uboczne',
          'lang': 'pl'
        },
        {
          'text': 'Yan ürünler',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'baseCostLabel',
      'localizedMessages': [
        {
          'text': 'Kosten',
          'lang': 'de'
        },
        {
          'text': 'Расходы',
          'lang': 'ru'
        },
        {
          'text': 'Custo',
          'lang': 'pt'
        },
        {
          'text': '비용',
          'lang': 'ko'
        },
        {
          'text': 'Cost',
          'lang': 'en'
        },
        {
          'text': 'Costo',
          'lang': 'it'
        },
        {
          'text': 'Coût',
          'lang': 'fr'
        },
        {
          'text': '成本',
          'lang': 'zh-CN'
        },
        {
          'text': 'Costo',
          'lang': 'es'
        },
        {
          'text': 'Вартість',
          'lang': 'uk'
        },
        {
          'text': '料金',
          'lang': 'ja'
        },
        {
          'text': 'Koszt',
          'lang': 'pl'
        },
        {
          'text': 'Maliyet',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'profitLabel',
      'localizedMessages': [
        {
          'text': 'Profitieren',
          'lang': 'de'
        },
        {
          'text': 'Выгода',
          'lang': 'ru'
        },
        {
          'text': 'Lucro',
          'lang': 'pt'
        },
        {
          'text': '이익',
          'lang': 'ko'
        },
        {
          'text': 'Profit',
          'lang': 'en'
        },
        {
          'text': 'Profit',
          'lang': 'it'
        },
        {
          'text': 'Profit',
          'lang': 'fr'
        },
        {
          'text': '利润',
          'lang': 'zh-CN'
        },
        {
          'text': 'Ganancia',
          'lang': 'es'
        },
        {
          'text': 'Прибуток',
          'lang': 'uk'
        },
        {
          'text': '利益',
          'lang': 'ja'
        },
        {
          'text': 'Zysk',
          'lang': 'pl'
        },
        {
          'text': 'Kâr',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'salePriceLabel',
      'localizedMessages': [
        {
          'text': 'Verkaufen',
          'lang': 'de'
        },
        {
          'text': 'Продавать',
          'lang': 'ru'
        },
        {
          'text': 'Vender',
          'lang': 'pt'
        },
        {
          'text': '팔다',
          'lang': 'ko'
        },
        {
          'text': 'Sell',
          'lang': 'en'
        },
        {
          'text': 'Vendere',
          'lang': 'it'
        },
        {
          'text': 'Vendre',
          'lang': 'fr'
        },
        {
          'text': '卖',
          'lang': 'zh-CN'
        },
        {
          'text': 'Vender',
          'lang': 'es'
        },
        {
          'text': 'Продати',
          'lang': 'uk'
        },
        {
          'text': '売る',
          'lang': 'ja'
        },
        {
          'text': 'Sprzedać',
          'lang': 'pl'
        },
        {
          'text': 'Satmak',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'primaryLabel',
      'localizedMessages': [
        {
          'text': '(Primär)',
          'lang': 'de'
        },
        {
          'text': '(Начальный)',
          'lang': 'ru'
        },
        {
          'text': '(Primário)',
          'lang': 'pt'
        },
        {
          'text': '(주요한)',
          'lang': 'ko'
        },
        {
          'text': '(Primary)',
          'lang': 'en'
        },
        {
          'text': '(Primario)',
          'lang': 'it'
        },
        {
          'text': '(Primaire)',
          'lang': 'fr'
        },
        {
          'text': '（基本的）',
          'lang': 'zh-CN'
        },
        {
          'text': '(Primario)',
          'lang': 'es'
        },
        {
          'text': '(Основний)',
          'lang': 'uk'
        },
        {
          'text': '（主要な）',
          'lang': 'ja'
        },
        {
          'text': '(Podstawowy)',
          'lang': 'pl'
        },
        {
          'text': '(Öncelik)',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'nameLabel',
      'localizedMessages': [
        {
          'text': 'Name',
          'lang': 'de'
        },
        {
          'text': 'Имя',
          'lang': 'ru'
        },
        {
          'text': 'Nome',
          'lang': 'pt'
        },
        {
          'text': '이름',
          'lang': 'ko'
        },
        {
          'text': 'Name',
          'lang': 'en'
        },
        {
          'text': 'Nome',
          'lang': 'it'
        },
        {
          'text': 'Nom',
          'lang': 'fr'
        },
        {
          'text': '姓名',
          'lang': 'zh-CN'
        },
        {
          'text': 'Nombre',
          'lang': 'es'
        },
        {
          'text': 'Ім\'я',
          'lang': 'uk'
        },
        {
          'text': '名前',
          'lang': 'ja'
        },
        {
          'text': 'Nazwa',
          'lang': 'pl'
        },
        {
          'text': 'İsim',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'adjustedLabel',
      'localizedMessages': [
        {
          'text': 'Angepasst',
          'lang': 'de'
        },
        {
          'text': 'Скорректированный',
          'lang': 'ru'
        },
        {
          'text': 'Ajustado',
          'lang': 'pt'
        },
        {
          'text': '조정됨',
          'lang': 'ko'
        },
        {
          'text': 'Adjusted',
          'lang': 'en'
        },
        {
          'text': 'Regolato',
          'lang': 'it'
        },
        {
          'text': 'Ajusté',
          'lang': 'fr'
        },
        {
          'text': '调整后',
          'lang': 'zh-CN'
        },
        {
          'text': 'Equilibrado',
          'lang': 'es'
        },
        {
          'text': 'Скориговано',
          'lang': 'uk'
        },
        {
          'text': '調整済み',
          'lang': 'ja'
        },
        {
          'text': 'Dostosowany',
          'lang': 'pl'
        },
        {
          'text': 'Ayarlanmış',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'baseLabel',
      'localizedMessages': [
        {
          'text': 'Base',
          'lang': 'de'
        },
        {
          'text': 'База',
          'lang': 'ru'
        },
        {
          'text': 'Base',
          'lang': 'pt'
        },
        {
          'text': '베이스',
          'lang': 'ko'
        },
        {
          'text': 'Base',
          'lang': 'en'
        },
        {
          'text': 'Base',
          'lang': 'it'
        },
        {
          'text': 'Base',
          'lang': 'fr'
        },
        {
          'text': '根据',
          'lang': 'zh-CN'
        },
        {
          'text': 'Base',
          'lang': 'es'
        },
        {
          'text': 'База',
          'lang': 'uk'
        },
        {
          'text': 'ベース',
          'lang': 'ja'
        },
        {
          'text': 'Opierać',
          'lang': 'pl'
        },
        {
          'text': 'Temel',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'farmingTrackerLink',
      'localizedMessages': [
        {
          'text': 'Öko-Landwirtschafts-Tracker',
          'lang': 'de'
        },
        {
          'text': 'Экологический трекер для фермерства',
          'lang': 'ru'
        },
        {
          'text': 'Rastreador de Agricultura Ecológica',
          'lang': 'pt'
        },
        {
          'text': '생태 농업 추적기',
          'lang': 'ko'
        },
        {
          'text': 'Eco Farming Tracker',
          'lang': 'en'
        },
        {
          'text': 'Eco Farming Tracker',
          'lang': 'it'
        },
        {
          'text': 'Suivi de l\'agriculture Eco',
          'lang': 'fr'
        },
        {
          'text': '生态农业追踪器',
          'lang': 'zh-CN'
        },
        {
          'text': 'Rastreador de agricultura ecológica',
          'lang': 'es'
        },
        {
          'text': 'Трекер еко-фермерства',
          'lang': 'uk'
        },
        {
          'text': 'エコファーミングトラッカー',
          'lang': 'ja'
        },
        {
          'text': 'Śledzenie rolnictwa ekologicznego',
          'lang': 'pl'
        },
        {
          'text': 'Eko Tarım Takipçisi',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'defaultProfitTooltip',
      'localizedMessages': [
        {
          'text': 'Standardmäßiger Gewinnprozentsatz, der auf jedes Rezept angewendet wird. Kann für einzelne Rezepte überschrieben werden. Prozentsätze sind für Rezeptproduktionsketten nicht kumulativ, sie werden erst im letzten Schritt angewendet.',
          'lang': 'de'
        },
        {
          'text': 'Процент прибыли по умолчанию применяется к каждому рецепту. Может быть переопределен для отдельных рецептов. Проценты не суммируются в цепочках производства рецептов, они применяются только на последнем этапе.',
          'lang': 'ru'
        },
        {
          'text': 'Porcentagem de lucro padrão aplicada a cada receita. Pode ser substituída para receitas individuais. As porcentagens não se acumulam para as cadeias de produção de receitas, sendo aplicadas apenas na etapa final.',
          'lang': 'pt'
        },
        {
          'text': '각 레시피에 기본 수익률이 적용됩니다. 개별 레시피에 덮어쓸 수 있습니다. 레시피 생산 체인에서는 수익률이 누적되지 않으며, 최종 단계에만 적용됩니다.',
          'lang': 'ko'
        },
        {
          'text': 'Default profit percentage applied to each recipe. Can be overwritten for individual recipes. Percentages do not stack for recipe production chains, they are only applied at the final step.',
          'lang': 'en'
        },
        {
          'text': 'Percentuale di profitto predefinita applicata a ciascuna ricetta. Può essere sovrascritta per singole ricette. Le percentuali non si sommano alle catene di produzione delle ricette, ma vengono applicate solo nella fase finale.',
          'lang': 'it'
        },
        {
          'text': 'Le pourcentage de profit par défaut est appliqué à chaque recette. Il peut être modifié individuellement. Les pourcentages ne se cumulent pas pour les chaînes de production de recettes ; ils ne sont appliqués qu\'à l\'étape finale.',
          'lang': 'fr'
        },
        {
          'text': '适用于每个配方的默认利润百分比。可针对单个配方进行覆盖。百分比在配方生产链中不叠加，仅在最后一步应用。',
          'lang': 'zh-CN'
        },
        {
          'text': 'Porcentaje de beneficio predeterminado aplicado a cada receta. Se puede sobrescribir para recetas individuales. Los porcentajes no se acumulan en las cadenas de producción de recetas; solo se aplican en el paso final.',
          'lang': 'es'
        },
        {
          'text': 'Відсоток прибутку за замовчуванням застосовується до кожного рецепту. Можна перезаписати для окремих рецептів. Відсотки не сумуються для виробничих ланцюжків рецептів, вони застосовуються лише на останньому кроці.',
          'lang': 'uk'
        },
        {
          'text': '各レシピに適用されるデフォルトの利益率。個々のレシピごとに上書きできます。利益率はレシピ生産チェーン全体では重複せず、最終ステップでのみ適用されます。',
          'lang': 'ja'
        },
        {
          'text': 'Domyślny procent zysku stosowany do każdej receptury. Można go nadpisać dla poszczególnych receptur. Procenty nie kumulują się w łańcuchach produkcyjnych receptur, są stosowane dopiero na ostatnim etapie.',
          'lang': 'pl'
        },
        {
          'text': 'Her tarife varsayılan kâr yüzdesi uygulanır. Tek tek tarifler için üzerine yazılabilir. Yüzdeler, tarif üretim zincirleri için bir araya getirilmez, yalnızca son adımda uygulanır.',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'byproductsTooltip',
      'localizedMessages': [
        {
          'text': 'Ausgaben ausgewählter Rezepte, die keine direkten Eingaben oder primären Ausgaben anderer ausgewählter Rezepte sind. Der Wert sollte auf den Verkaufspreis des Artikels eingestellt werden. Er wird verwendet, um die Ausgabekosten für die entsprechenden Rezepte genauer zu berechnen. Sie können negative Werte für Nebenprodukte verwenden, für die Sie Gebühren erheben möchten, z. B. Rückstände.',
          'lang': 'de'
        },
        {
          'text': 'Выходы выбранных рецептов, которые не являются прямыми входами или основными выходами других выбранных рецептов. Значение должно быть установлено равным продажной цене товара. Оно будет использовано для более точного расчета себестоимости продукта для соответствующих рецептов. Вы можете использовать отрицательные значения для побочных продуктов, за которые вы хотите взимать плату, например, для хвостов.',
          'lang': 'ru'
        },
        {
          'text': 'Saídas de receitas selecionadas que não são entradas diretas ou saídas primárias de outras receitas selecionadas. O valor deve ser definido como o preço de venda do item. Ele será usado para calcular um custo de saída mais preciso para as receitas correspondentes. Você pode usar valores negativos para subprodutos pelos quais deseja cobrar, como Rejeitos.',
          'lang': 'pt'
        },
        {
          'text': '선택한 레시피의 출력값으로, 다른 선택한 레시피의 직접 입력값이나 기본 출력값이 아닙니다. 값은 해당 품목의 판매 가격으로 설정해야 합니다. 이 값은 해당 레시피의 더 정확한 출력 비용을 계산하는 데 사용됩니다. 테일링과 같이 비용을 청구하려는 부산물에는 음수 값을 사용할 수 있습니다.',
          'lang': 'ko'
        },
        {
          'text': 'Outputs of selected recipes that are not direct inputs or primary outputs of other selected recipes. The value should be set to the sale price of the item. It will be used to compute a more accurate output cost for the corresponding recipes. You can use negative values for byproducts you want to charge for, like Tailings.',
          'lang': 'en'
        },
        {
          'text': 'Output delle ricette selezionate che non sono input diretti o output primari di altre ricette selezionate. Il valore deve essere impostato sul prezzo di vendita dell\'articolo. Verrà utilizzato per calcolare un costo di output più accurato per le ricette corrispondenti. È possibile utilizzare valori negativi per i sottoprodotti che si desidera fatturare, come gli scarti di lavorazione.',
          'lang': 'it'
        },
        {
          'text': 'Sorties des recettes sélectionnées qui ne sont ni des intrants directs ni des sorties principales d\'autres recettes sélectionnées. La valeur doit correspondre au prix de vente de l\'article. Elle permettra de calculer un coût de sortie plus précis pour les recettes correspondantes. Vous pouvez utiliser des valeurs négatives pour les sous-produits que vous souhaitez facturer, comme les résidus.',
          'lang': 'fr'
        },
        {
          'text': '所选配方的输出，并非其他所选配方的直接输入或主要输出。该值应设置为该物品的售价。它将用于计算相应配方更准确的输出成本。对于您想要收费的副产品，例如尾矿，可以使用负值。',
          'lang': 'zh-CN'
        },
        {
          'text': 'Salidas de recetas seleccionadas que no son insumos directos ni salidas principales de otras recetas seleccionadas. El valor debe establecerse al precio de venta del artículo. Se utilizará para calcular un costo de salida más preciso para las recetas correspondientes. Puede usar valores negativos para los subproductos que desee facturar, como los relaves.',
          'lang': 'es'
        },
        {
          'text': 'Вихідні дані вибраних рецептів, які не є прямими вхідними даними або первинними виходами інших вибраних рецептів. Значення має бути встановлене на рівні ціни продажу товару. Воно буде використано для розрахунку точнішої собівартості продукції для відповідних рецептів. Ви можете використовувати від\'ємні значення для побічних продуктів, за які ви хочете нарахувати плату, таких як хвости.',
          'lang': 'uk'
        },
        {
          'text': '選択したレシピの出力のうち、他の選択したレシピの直接入力または主要出力ではないもの。値はアイテムの販売価格に設定する必要があります。この値は、対応するレシピの出力コストをより正確に計算するために使用されます。尾鉱など、課金したい副産物には負の値を使用できます。',
          'lang': 'ja'
        },
        {
          'text': 'Produkty z wybranych receptur, które nie są bezpośrednimi nakładami ani produktami podstawowymi z innych wybranych receptur. Wartość powinna być ustawiona na cenę sprzedaży towaru. Zostanie ona wykorzystana do obliczenia dokładniejszego kosztu produkcji dla odpowiednich receptur. Możesz użyć wartości ujemnych dla produktów ubocznych, za które chcesz naliczyć opłatę, takich jak odpady poflotacyjne.',
          'lang': 'pl'
        },
        {
          'text': 'Seçili tariflerin çıktıları, diğer seçili tariflerin doğrudan girdileri veya birincil çıktıları değildir. Değer, ürünün satış fiyatına ayarlanmalıdır. İlgili tarifler için daha doğru bir çıktı maliyeti hesaplamak için kullanılacaktır. Atık gibi ücretlendirmek istediğiniz yan ürünler için negatif değerler kullanabilirsiniz.',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'adjustedTooltip',
      'localizedMessages': [
        {
          'text': 'Berechnete Mengen für das Rezept unter Berücksichtigung der Fertigkeitsstufe, des Upgrade-Moduls und anderer Faktoren.',
          'lang': 'de'
        },
        {
          'text': 'Расчет количества для рецепта с учетом уровня мастерства, модуля улучшения и других факторов.',
          'lang': 'ru'
        },
        {
          'text': 'Quantidades calculadas para a receita, levando em conta o nível de habilidade, módulo de atualização e outros fatores.',
          'lang': 'pt'
        },
        {
          'text': '기술 수준, 업그레이드 모듈 및 기타 요소를 고려하여 레시피에 대한 계산된 금액입니다.',
          'lang': 'ko'
        },
        {
          'text': 'Computed amounts for the recipe, taking into account the skill level, upgrade module, and other factors.',
          'lang': 'en'
        },
        {
          'text': 'Importi calcolati per la ricetta, tenendo conto del livello di abilità, del modulo di aggiornamento e di altri fattori.',
          'lang': 'it'
        },
        {
          'text': 'Montants calculés pour la recette, en tenant compte du niveau de compétence, du module de mise à niveau et d\'autres facteurs.',
          'lang': 'fr'
        },
        {
          'text': '计算配方的数量，同时考虑技能水平、升级模块和其他因素。',
          'lang': 'zh-CN'
        },
        {
          'text': 'Cantidades calculadas para la receta, teniendo en cuenta el nivel de habilidad, el módulo de mejora y otros factores.',
          'lang': 'es'
        },
        {
          'text': 'Розраховані кількості для рецепту з урахуванням рівня майстерності, модуля покращення та інших факторів.',
          'lang': 'uk'
        },
        {
          'text': 'スキルレベル、アップグレードモジュール、その他の要素を考慮して、レシピの量を計算しました。',
          'lang': 'ja'
        },
        {
          'text': 'Obliczone wartości dla przepisu uwzględniają poziom umiejętności, moduł ulepszeń i inne czynniki.',
          'lang': 'pl'
        },
        {
          'text': 'Tarif için beceri seviyesi, yükseltme modülü ve diğer faktörler göz önünde bulundurularak hesaplanan miktarlar.',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'baseTooltip',
      'localizedMessages': [
        {
          'text': 'Grundmengen für das Rezept, ohne jegliche Modifikatoren.',
          'lang': 'de'
        },
        {
          'text': 'Базовые количества для рецепта, без каких-либо модификаторов.',
          'lang': 'ru'
        },
        {
          'text': 'Quantidades base para a receita, sem nenhum modificador.',
          'lang': 'pt'
        },
        {
          'text': '수정 사항 없이 레시피에 적용된 기본 양입니다.',
          'lang': 'ko'
        },
        {
          'text': 'Base amounts for the recipe, without any modifiers.',
          'lang': 'en'
        },
        {
          'text': 'Quantità base per la ricetta, senza modificatori.',
          'lang': 'it'
        },
        {
          'text': 'Montants de base pour la recette, sans aucun modificateur.',
          'lang': 'fr'
        },
        {
          'text': '配方的基本量，不含任何修饰剂。',
          'lang': 'zh-CN'
        },
        {
          'text': 'Cantidades base para la receta, sin ningún modificador.',
          'lang': 'es'
        },
        {
          'text': 'Базові кількості для рецепту, без будь-яких модифікацій.',
          'lang': 'uk'
        },
        {
          'text': 'レシピの基本量（変更なし）。',
          'lang': 'ja'
        },
        {
          'text': 'Ilości bazowe przepisu, bez żadnych modyfikatorów.',
          'lang': 'pl'
        },
        {
          'text': 'Tarifin taban miktarları, hiçbir değiştirici olmadan.',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'settingsHeader',
      'localizedMessages': [
        {
          'text': 'Einstellungen',
          'lang': 'de'
        },
        {
          'text': 'Настройки',
          'lang': 'ru'
        },
        {
          'text': 'Configurações',
          'lang': 'pt'
        },
        {
          'text': '설정',
          'lang': 'ko'
        },
        {
          'text': 'Settings',
          'lang': 'en'
        },
        {
          'text': 'Impostazioni',
          'lang': 'it'
        },
        {
          'text': 'Paramètres',
          'lang': 'fr'
        },
        {
          'text': '设置',
          'lang': 'zh-CN'
        },
        {
          'text': 'Ajustes',
          'lang': 'es'
        },
        {
          'text': 'Налаштування',
          'lang': 'uk'
        },
        {
          'text': '設定',
          'lang': 'ja'
        },
        {
          'text': 'Ustawienia',
          'lang': 'pl'
        },
        {
          'text': 'Ayarlar',
          'lang': 'tr'
        }
      ]
    },
    {
      'id': 'restoreDefaultConfigHeader',
      'localizedMessages': [
        {
          'text': 'Restore Default Config',
          'lang': 'en'
        },
        {
          'text': 'Restaurer la configuration par défaut',
          'lang': 'fr'
        },
        {
          'text': 'Restaurar configuración predeterminada',
          'lang': 'es'
        },
        {
          'text': 'Standardkonfiguration wiederherstellen',
          'lang': 'de'
        },
        {
          'text': 'Restaurar configuração predefinida',
          'lang': 'pt'
        },
        {
          'text': 'Ripristina configurazione predefinita',
          'lang': 'it'
        },
        {
          'text': 'Varsayılan Yapılandırmayı Geri Yükle',
          'lang': 'tr'
        },
        {
          'text': 'Przywróć domyślną konfigurację',
          'lang': 'pl'
        },
        {
          'text': 'Восстановить настройки по умолчанию',
          'lang': 'ru'
        },
        {
          'text': 'Відновити стандартну конфігурацію',
          'lang': 'uk'
        },
        {
          'text': '기본 구성 복원',
          'lang': 'ko'
        },
        {
          'text': '恢复默认配置',
          'lang': 'zh'
        },
        {
          'text': 'デフォルト設定を復元',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'newServerConnectionHeader',
      'localizedMessages': [
        {
          'text': 'New Server Connection',
          'lang': 'en'
        },
        {
          'text': 'Nouvelle connexion au serveur',
          'lang': 'fr'
        },
        {
          'text': 'Nueva conexión al servidor',
          'lang': 'es'
        },
        {
          'text': 'Neue Serververbindung',
          'lang': 'de'
        },
        {
          'text': 'Nova ligação ao servidor',
          'lang': 'pt'
        },
        {
          'text': 'Nuova connessione al server',
          'lang': 'it'
        },
        {
          'text': 'Yeni Sunucu Bağlantısı',
          'lang': 'tr'
        },
        {
          'text': 'Nowe połączenie z serwerem',
          'lang': 'pl'
        },
        {
          'text': 'Новое соединение с сервером',
          'lang': 'ru'
        },
        {
          'text': 'Нове з’єднання з сервером',
          'lang': 'uk'
        },
        {
          'text': '새 서버 연결',
          'lang': 'ko'
        },
        {
          'text': '新服务器连接',
          'lang': 'zh'
        },
        {
          'text': '新しいサーバー接続',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'serverImportTooltip',
      'localizedMessages': [
        {
          'text': 'Attempt to import custom items and recipes from an Eco server. This requires UCat\'s Price Calculator to be running on the server. Enter the host or IP and port for the server\'s web console.',
          'lang': 'en'
        },
        {
          'text': 'Tenter d\'importer des objets et des recettes personnalisés depuis un serveur Eco. Cela nécessite que le calculateur de prix d\'UCat soit en cours d\'exécution sur le serveur. Saisissez l\'hôte ou l\'adresse IP et le port de la console Web du serveur.',
          'lang': 'fr'
        },
        {
          'text': 'Intenta importar elementos personalizados y recetas desde un servidor Eco. Esto requiere que la calculadora de precios de UCat se esté ejecutando en el servidor. Introduzca el host o la IP y el puerto de la consola web del servidor.',
          'lang': 'es'
        },
        {
          'text': 'Versuch, benutzerdefinierte Gegenstände und Rezepte von einem Eco-Server zu importieren. Dazu muss der UCat-Preisrechner auf dem Server ausgeführt werden. Geben Sie den Host oder die IP und den Port für die Webkonsole des Servers ein.',
          'lang': 'de'
        },
        {
          'text': 'Tentar importar itens e receitas personalizados de um servidor Eco. Isto requer que a Calculadora de Preços do UCat esteja a ser executada no servidor. Introduza o anfitrião ou o IP e a porta para a consola web do servidor.',
          'lang': 'pt'
        },
        {
          'text': 'Tentativo di importare oggetti e ricette personalizzati da un server Eco. Ciò richiede che il calcolatore di prezzi di UCat sia in esecuzione sul server. Inserisci l\'host o l\'IP e la porta per la console web del server.',
          'lang': 'it'
        },
        {
          'text': 'Özel öğeleri ve tarifleri bir Eco sunucusundan içe aktarmayı deneyin. Bu, UCat\'ın Fiyat Hesaplayıcısının sunucuda çalışıyor olmasını gerektirir. Sunucunun web konsolu için ana bilgisayar veya IP ve bağlantı noktasını girin.',
          'lang': 'tr'
        },
        {
          'text': 'Spróbuj zaimportować niestandardowe przedmioty i przepisy z serwera Eco. Wymaga to, aby kalkulator cen UCat działał na serwerze. Wpisz host lub adres IP i port konsoli internetowej serwera.',
          'lang': 'pl'
        },
        {
          'text': 'Попытка импорта пользовательских предметов и рецептов с сервера Eco. Для этого на сервере должен быть запущен калькулятор цен UCat. Введите хост или IP и порт для веб-консоли сервера.',
          'lang': 'ru'
        },
        {
          'text': 'Спроба імпортувати користувацькі предмети та рецепти з сервера Eco. Для цього на сервері має працювати калькулятор цін UCat. Введіть хост або IP-адресу та порт для вебконсолі сервера.',
          'lang': 'uk'
        },
        {
          'text': 'Eco 서버에서 사용자 지정 아이템과 레시피를 가져오려고 시도합니다. 이를 위해서는 UCat의 가격 계산기가 서버에서 실행 중이어야 합니다. 서버 웹 콘솔의 호스트 또는 IP와 포트를 입력하세요.',
          'lang': 'ko'
        },
        {
          'text': '尝试从Eco服务器导入自定义项目和配方。这需要 UCat 的价格计算器在服务器上运行。输入服务器 Web 控制台的主机或 IP 和端口。',
          'lang': 'zh'
        },
        {
          'text': 'Ecoサーバーからカスタムアイテムとレシピをインポートします。これには、サーバー上でUCatの価格計算機が実行されている必要があります。サーバーのWebコンソールのホストまたはIPとポートを入力します。',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'serverConnectionWarning',
      'localizedMessages': [
        {
          'text': 'Modifying server connections may result in a broken calculator config. Back up your current config before proceeding.',
          'lang': 'en'
        },
        {
          'text': 'La modification des connexions au serveur peut entraîner une configuration de calculateur défectueuse. Sauvegardez votre configuration actuelle avant de continuer.',
          'lang': 'fr'
        },
        {
          'text': 'Modificar las conexiones del servidor puede resultar en una configuración de calculadora rota. Haz una copia de seguridad de tu configuración actual antes de continuar.',
          'lang': 'es'
        },
        {
          'text': 'Das Ändern von Serververbindungen kann zu einer fehlerhaften Rechnerkonfiguration führen. Sichern Sie Ihre aktuelle Konfiguration, bevor Sie fortfahren.',
          'lang': 'de'
        },
        {
          'text': 'Modificar as ligações do servidor pode resultar numa configuração de calculadora quebrada. Faça backup da sua configuração atual antes de prosseguir.',
          'lang': 'pt'
        },
        {
          'text': 'La modifica delle connessioni al server può causare una configurazione del calcolatore non valida. Esegui il backup della configurazione corrente prima di procedere.',
          'lang': 'it'
        },
        {
          'text': 'Sunucu bağlantılarını değiştirmek, hesaplayıcı yapılandırmasının bozulmasına neden olabilir. Devam etmeden önce mevcut yapılandırmanızı yedekleyin.',
          'lang': 'tr'
        },
        {
          'text': 'Modyfikowanie połączeń z serwerem może spowodować uszkodzenie konfiguracji kalkulatora. Zanim przejdziesz dalej, wykonaj kopię zapasową swojej obecnej konfiguracji.',
          'lang': 'pl'
        },
        {
          'text': 'Изменение подключений к серверу может привести к нарушению конфигурации калькулятора. Создайте резервную копию текущей конфигурации, прежде чем продолжить.',
          'lang': 'ru'
        },
        {
          'text': 'Зміна з’єднань із сервером може призвести до неправильної конфігурації калькулятора. Створіть резервну копію поточної конфігурації, перш ніж продовжити.',
          'lang': 'uk'
        },
        {
          'text': '서버 연결을 수정하면 계산기 구성이 손상될 수 있습니다. 계속하기 전에 현재 구성을 백업하세요.',
          'lang': 'ko'
        },
        {
          'text': '修改服务器连接可能会导致计算器配置损坏。在继续之前，请备份当前配置。',
          'lang': 'zh'
        },
        {
          'text': 'サーバー接続を変更すると、計算機の設定が破損する可能性があります。続行する前に、現在の構成をバックアップしてください。',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'copyConfigButton',
      'localizedMessages': [
        {
          'text': 'Copy Config',
          'lang': 'en'
        },
        {
          'text': 'Copier la configuration',
          'lang': 'fr'
        },
        {
          'text': 'Copiar configuración',
          'lang': 'es'
        },
        {
          'text': 'Konfiguration kopieren',
          'lang': 'de'
        },
        {
          'text': 'Copiar Configuração',
          'lang': 'pt'
        },
        {
          'text': 'Copia Config',
          'lang': 'it'
        },
        {
          'text': 'Yapılandırmayı Kopyala',
          'lang': 'tr'
        },
        {
          'text': 'Kopiuj konfigurację',
          'lang': 'pl'
        },
        {
          'text': 'Копировать конфигурацию',
          'lang': 'ru'
        },
        {
          'text': 'Копіювати конфігурацію',
          'lang': 'uk'
        },
        {
          'text': '구성 복사',
          'lang': 'ko'
        },
        {
          'text': '复制配置',
          'lang': 'zh'
        },
        {
          'text': '設定をコピー',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'serverNameLabel',
      'localizedMessages': [
        {
          'text': 'Server Label',
          'lang': 'en'
        },
        {
          'text': 'Étiquette du serveur',
          'lang': 'fr'
        },
        {
          'text': 'Etiqueta del servidor',
          'lang': 'es'
        },
        {
          'text': 'Server-Label',
          'lang': 'de'
        },
        {
          'text': 'Etiqueta do servidor',
          'lang': 'pt'
        },
        {
          'text': 'Etichetta server',
          'lang': 'it'
        },
        {
          'text': 'Sunucu Etiketi',
          'lang': 'tr'
        },
        {
          'text': 'Etykieta serwera',
          'lang': 'pl'
        },
        {
          'text': 'Метка сервера',
          'lang': 'ru'
        },
        {
          'text': 'Мітка сервера',
          'lang': 'uk'
        },
        {
          'text': '서버 레이블',
          'lang': 'ko'
        },
        {
          'text': '服务器标签',
          'lang': 'zh'
        },
        {
          'text': 'サーバーラベル',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'serverHostLabel',
      'localizedMessages': [
        {
          'text': 'Server Host / IP',
          'lang': 'en'
        },
        {
          'text': 'Serveur hôte/IP',
          'lang': 'fr'
        },
        {
          'text': 'Host/IP del servidor',
          'lang': 'es'
        },
        {
          'text': 'Server-Host/IP',
          'lang': 'de'
        },
        {
          'text': 'Anfitrião/IP do servidor',
          'lang': 'pt'
        },
        {
          'text': 'Host server / IP',
          'lang': 'it'
        },
        {
          'text': 'Sunucu Ana Bilgisayarı / IP',
          'lang': 'tr'
        },
        {
          'text': 'Host serwera / IP',
          'lang': 'pl'
        },
        {
          'text': 'Хост сервера / IP',
          'lang': 'ru'
        },
        {
          'text': 'Хост сервера / IP',
          'lang': 'uk'
        },
        {
          'text': '서버 호스트 / IP',
          'lang': 'ko'
        },
        {
          'text': '服务器主机/IP',
          'lang': 'zh'
        },
        {
          'text': 'サーバーホスト/IP',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'serverConnectionError',
      'localizedMessages': [
        {
          'text': 'Error connecting to the server. Make sure you have entered a public Eco server running UCat\'s Price Calculator. Try switching HTTP/s?',
          'lang': 'en'
        },
        {
          'text': 'Erreur de connexion au serveur. Assurez-vous d\'avoir saisi un serveur Eco public exécutant le calculateur de prix UCat. Essayer de basculer HTTP/s ?',
          'lang': 'fr'
        },
        {
          'text': 'Error al conectar con el servidor. Asegúrate de haber introducido un servidor Eco público que ejecute la calculadora de precios de UCat. ¿Probar con HTTP/s?',
          'lang': 'es'
        },
        {
          'text': 'Fehler beim Verbinden mit dem Server. Stellen Sie sicher, dass Sie einen öffentlichen Eco-Server eingegeben haben, auf dem der UCat-Preisrechner ausgeführt wird. HTTP/s wechseln?',
          'lang': 'de'
        },
        {
          'text': 'Erro ao ligar ao servidor. Certifique-se de que introduziu um servidor Eco público que esteja a executar a Calculadora de Preços do UCat. Tentar alternar HTTP/s?',
          'lang': 'pt'
        },
        {
          'text': 'Errore di connessione al server. Assicurati di aver inserito un server Eco pubblico che esegue il calcolatore di prezzi di UCat. Provare a cambiare HTTP/s?',
          'lang': 'it'
        },
        {
          'text': 'Sunucuya bağlanma hatası. UCat\'ın Fiyat Hesaplayıcısı\'nı çalıştıran herkese açık bir Eco sunucusu girdiğinizden emin olun. HTTP/s\'ye geçmeyi deneyelim mi?',
          'lang': 'tr'
        },
        {
          'text': 'Błąd połączenia z serwerem. Upewnij się, że wpisałeś publiczny serwer Eco z uruchomionym kalkulatorem cen UCat. Przełączyć na HTTP/s?',
          'lang': 'pl'
        },
        {
          'text': 'Ошибка подключения к серверу. Убедитесь, что вы ввели общедоступный сервер Eco, на котором работает калькулятор цен UCat. Попробовать переключить HTTP/s?',
          'lang': 'ru'
        },
        {
          'text': 'Помилка підключення до сервера. Переконайтеся, що ви ввели загальнодоступний сервер Eco, на якому працює калькулятор цін UCat. Спробувати перемкнути HTTP/s?',
          'lang': 'uk'
        },
        {
          'text': '서버 연결 오류. UCat의 가격 계산기를 실행하는 공개 Eco 서버를 입력했는지 확인하세요. HTTP/s로 전환해 보시겠습니까?',
          'lang': 'ko'
        },
        {
          'text': '连接服务器时出错。请确保您输入了运行 UCat 价格计算器的公共 Eco 服务器。尝试切换HTTP/s？',
          'lang': 'zh'
        },
        {
          'text': 'サーバー接続エラー。UCatの価格計算機を実行している公開Ecoサーバーに入力したことを確認してください。HTTP/sに切り替えてみますか？',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'useInsecureHttpLabel',
      'localizedMessages': [
        {
          'text': 'Use Insecure HTTP',
          'lang': 'en'
        },
        {
          'text': 'Utiliser HTTP non sécurisé',
          'lang': 'fr'
        },
        {
          'text': 'Usar HTTP inseguro',
          'lang': 'es'
        },
        {
          'text': 'Unsicheres HTTP verwenden',
          'lang': 'de'
        },
        {
          'text': 'Usar HTTP inseguro',
          'lang': 'pt'
        },
        {
          'text': 'Usa HTTP non sicuro',
          'lang': 'it'
        },
        {
          'text': 'Güvenli Olmayan HTTP Kullan',
          'lang': 'tr'
        },
        {
          'text': 'Użyj niezabezpieczonego HTTP',
          'lang': 'pl'
        },
        {
          'text': 'Использовать небезопасный HTTP',
          'lang': 'ru'
        },
        {
          'text': 'Використовувати незахищений HTTP',
          'lang': 'uk'
        },
        {
          'text': '안전하지 않은 HTTP 사용',
          'lang': 'ko'
        },
        {
          'text': '使用不安全的HTTP',
          'lang': 'zh'
        },
        {
          'text': '安全でないHTTPを使用',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'newSkillsHeader',
      'localizedMessages': [
        {
          'text': 'New Skills',
          'lang': 'en'
        },
        {
          'text': 'Nouvelles compétences',
          'lang': 'fr'
        },
        {
          'text': 'Nuevas habilidades',
          'lang': 'es'
        },
        {
          'text': 'Neue Fähigkeiten',
          'lang': 'de'
        },
        {
          'text': 'Novas competências',
          'lang': 'pt'
        },
        {
          'text': 'Nuove abilità',
          'lang': 'it'
        },
        {
          'text': 'Yeni Beceriler',
          'lang': 'tr'
        },
        {
          'text': 'Nowe umiejętności',
          'lang': 'pl'
        },
        {
          'text': 'Новые навыки',
          'lang': 'ru'
        },
        {
          'text': 'Нові навички',
          'lang': 'uk'
        },
        {
          'text': '새로운 스킬',
          'lang': 'ko'
        },
        {
          'text': '新技能',
          'lang': 'zh'
        },
        {
          'text': '新しいスキル',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'newCraftingTablesHeader',
      'localizedMessages': [
        {
          'text': 'New Crafting Tables',
          'lang': 'en'
        },
        {
          'text': 'Nouvelles tables d\'artisanat',
          'lang': 'fr'
        },
        {
          'text': 'Nuevas mesas de elaboración',
          'lang': 'es'
        },
        {
          'text': 'Neue Werkbänke',
          'lang': 'de'
        },
        {
          'text': 'Novas mesas de criação',
          'lang': 'pt'
        },
        {
          'text': 'Nuovi banchi di lavoro',
          'lang': 'it'
        },
        {
          'text': 'Yeni Zanaat Masaları',
          'lang': 'tr'
        },
        {
          'text': 'Nowe stoły rzemieślnicze',
          'lang': 'pl'
        },
        {
          'text': 'Новые столы для крафта',
          'lang': 'ru'
        },
        {
          'text': 'Нові верстаки',
          'lang': 'uk'
        },
        {
          'text': '새로운 제작 테이블',
          'lang': 'ko'
        },
        {
          'text': '新合成台',
          'lang': 'zh'
        },
        {
          'text': '新しいクラフトテーブル',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'newItemsHeader',
      'localizedMessages': [
        {
          'text': 'New Items',
          'lang': 'en'
        },
        {
          'text': 'Nouveaux articles',
          'lang': 'fr'
        },
        {
          'text': 'Nuevos artículos',
          'lang': 'es'
        },
        {
          'text': 'Neue Items',
          'lang': 'de'
        },
        {
          'text': 'Novos Itens',
          'lang': 'pt'
        },
        {
          'text': 'Nuovi articoli',
          'lang': 'it'
        },
        {
          'text': 'Yeni Öğeler',
          'lang': 'tr'
        },
        {
          'text': 'Nowe przedmioty',
          'lang': 'pl'
        },
        {
          'text': 'Новые предметы',
          'lang': 'ru'
        },
        {
          'text': 'Нові предмети',
          'lang': 'uk'
        },
        {
          'text': '새 아이템',
          'lang': 'ko'
        },
        {
          'text': '新物品',
          'lang': 'zh'
        },
        {
          'text': '新しいアイテム',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'newRecipesHeader',
      'localizedMessages': [
        {
          'text': 'New Recipes',
          'lang': 'en'
        },
        {
          'text': 'Nouvelles recettes',
          'lang': 'fr'
        },
        {
          'text': 'Nuevas recetas',
          'lang': 'es'
        },
        {
          'text': 'Neue Rezepte',
          'lang': 'de'
        },
        {
          'text': 'Novas Receitas',
          'lang': 'pt'
        },
        {
          'text': 'Nuove ricette',
          'lang': 'it'
        },
        {
          'text': 'Yeni Tarifler',
          'lang': 'tr'
        },
        {
          'text': 'Nowe przepisy',
          'lang': 'pl'
        },
        {
          'text': 'Новые рецепты',
          'lang': 'ru'
        },
        {
          'text': 'Нові рецепти',
          'lang': 'uk'
        },
        {
          'text': '새로운 레시피',
          'lang': 'ko'
        },
        {
          'text': '新配方',
          'lang': 'zh'
        },
        {
          'text': '新しいレシピ',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'modifiedRecipesHeader',
      'localizedMessages': [
        {
          'text': 'Modified Recipes',
          'lang': 'en'
        },
        {
          'text': 'Recettes modifiées',
          'lang': 'fr'
        },
        {
          'text': 'Recetas modificadas',
          'lang': 'es'
        },
        {
          'text': 'Modifizierte Rezepte',
          'lang': 'de'
        },
        {
          'text': 'Receitas modificadas',
          'lang': 'pt'
        },
        {
          'text': 'Ricette modificate',
          'lang': 'it'
        },
        {
          'text': 'Değiştirilmiş Tarifler',
          'lang': 'tr'
        },
        {
          'text': 'Zmodyfikowane przepisy',
          'lang': 'pl'
        },
        {
          'text': 'Измененные рецепты',
          'lang': 'ru'
        },
        {
          'text': 'Змінені рецепти',
          'lang': 'uk'
        },
        {
          'text': '수정된 레시피',
          'lang': 'ko'
        },
        {
          'text': '已修改的配方',
          'lang': 'zh'
        },
        {
          'text': '変更されたレシピ',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'restoreDefaultConfigInfo',
      'localizedMessages': [
        {
          'text': 'Click Save Connection to remove any custom skills, tables, items, and recipes from the calculator context.',
          'lang': 'en'
        },
        {
          'text': 'Cliquez sur Enregistrer la connexion pour supprimer toutes les compétences, tables, objets et recettes personnalisés du contexte du calculateur.',
          'lang': 'fr'
        },
        {
          'text': 'Haz clic en Guardar conexión para eliminar cualquier habilidad, tabla, elemento y receta personalizados del contexto de la calculadora.',
          'lang': 'es'
        },
        {
          'text': 'Klicken Sie auf Verbindung speichern, um benutzerdefinierte Fähigkeiten, Tabellen, Elemente und Rezepte aus dem Kontext des Rechners zu entfernen.',
          'lang': 'de'
        },
        {
          'text': 'Clique em Guardar Ligação para remover quaisquer competências, mesas, itens e receitas personalizados do contexto da calculadora.',
          'lang': 'pt'
        },
        {
          'text': 'Fai clic su Salva connessione per rimuovere abilità, tabelle, oggetti e ricette personalizzati dal contesto del calcolatore.',
          'lang': 'it'
        },
        {
          'text': 'Özel becerileri, tabloları, öğeleri ve tarifleri hesaplayıcı bağlamından kaldırmak için Bağlantıyı Kaydet\'e tıklayın.',
          'lang': 'tr'
        },
        {
          'text': 'Kliknij Zapisz połączenie, aby usunąć z kontekstu kalkulatora wszelkie niestandardowe umiejętności, stoły, przedmioty i przepisy.',
          'lang': 'pl'
        },
        {
          'text': 'Нажмите «Сохранить соединение», чтобы удалить все пользовательские навыки, столы, предметы и рецепты из контекста калькулятора.',
          'lang': 'ru'
        },
        {
          'text': 'Натисніть «Зберегти з’єднання», щоб видалити будь-які користувацькі навички, столи, предмети та рецепти з контексту калькулятора.',
          'lang': 'uk'
        },
        {
          'text': '연결 저장을 클릭하여 계산기 컨텍스트에서 사용자 지정 스킬, 테이블, 아이템 및 레시피를 제거합니다.',
          'lang': 'ko'
        },
        {
          'text': '单击“保存连接”以从计算器上下文中删除任何自定义技能、工作台、物品和配方。',
          'lang': 'zh'
        },
        {
          'text': '「接続を保存」をクリックして、カスタムスキル、テーブル、アイテム、レシピを計算機のコンテキストから削除します。',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'cancelButton',
      'localizedMessages': [
        {
          'text': 'Cancel',
          'lang': 'en'
        },
        {
          'text': 'Annuler',
          'lang': 'fr'
        },
        {
          'text': 'Cancelar',
          'lang': 'es'
        },
        {
          'text': 'Abbrechen',
          'lang': 'de'
        },
        {
          'text': 'Cancelar',
          'lang': 'pt'
        },
        {
          'text': 'Annulla',
          'lang': 'it'
        },
        {
          'text': 'İptal',
          'lang': 'tr'
        },
        {
          'text': 'Anuluj',
          'lang': 'pl'
        },
        {
          'text': 'Отмена',
          'lang': 'ru'
        },
        {
          'text': 'Скасувати',
          'lang': 'uk'
        },
        {
          'text': '취소',
          'lang': 'ko'
        },
        {
          'text': '取消',
          'lang': 'zh'
        },
        {
          'text': 'キャンセル',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'testConnectionButton',
      'localizedMessages': [
        {
          'text': 'Test Connection',
          'lang': 'en'
        },
        {
          'text': 'Tester la connexion',
          'lang': 'fr'
        },
        {
          'text': 'Probar conexión',
          'lang': 'es'
        },
        {
          'text': 'Verbindung testen',
          'lang': 'de'
        },
        {
          'text': 'Testar ligação',
          'lang': 'pt'
        },
        {
          'text': 'Test connessione',
          'lang': 'it'
        },
        {
          'text': 'Bağlantıyı Test Et',
          'lang': 'tr'
        },
        {
          'text': 'Test połączenia',
          'lang': 'pl'
        },
        {
          'text': 'Проверка соединения',
          'lang': 'ru'
        },
        {
          'text': 'Перевірити з’єднання',
          'lang': 'uk'
        },
        {
          'text': '연결 테스트',
          'lang': 'ko'
        },
        {
          'text': '测试连接',
          'lang': 'zh'
        },
        {
          'text': '接続テスト',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'saveConnectionButton',
      'localizedMessages': [
        {
          'text': 'Save Connection',
          'lang': 'en'
        },
        {
          'text': 'Enregistrer la connexion',
          'lang': 'fr'
        },
        {
          'text': 'Guardar conexión',
          'lang': 'es'
        },
        {
          'text': 'Verbindung speichern',
          'lang': 'de'
        },
        {
          'text': 'Guardar ligação',
          'lang': 'pt'
        },
        {
          'text': 'Salva connessione',
          'lang': 'it'
        },
        {
          'text': 'Bağlantıyı Kaydet',
          'lang': 'tr'
        },
        {
          'text': 'Zapisz połączenie',
          'lang': 'pl'
        },
        {
          'text': 'Сохранить соединение',
          'lang': 'ru'
        },
        {
          'text': 'Зберегти з’єднання',
          'lang': 'uk'
        },
        {
          'text': '연결 저장',
          'lang': 'ko'
        },
        {
          'text': '保存连接',
          'lang': 'zh'
        },
        {
          'text': '接続を保存',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'levelLabel',
      'localizedMessages': [
        {
          'text': 'Level',
          'lang': 'en'
        },
        {
          'text': 'Niveau',
          'lang': 'fr'
        },
        {
          'text': 'Nivel',
          'lang': 'es'
        },
        {
          'text': 'Level',
          'lang': 'de'
        },
        {
          'text': 'Nível',
          'lang': 'pt'
        },
        {
          'text': 'Livello',
          'lang': 'it'
        },
        {
          'text': 'Seviye',
          'lang': 'tr'
        },
        {
          'text': 'Poziom',
          'lang': 'pl'
        },
        {
          'text': 'Уровень',
          'lang': 'ru'
        },
        {
          'text': 'Рівень',
          'lang': 'uk'
        },
        {
          'text': '레벨',
          'lang': 'ko'
        },
        {
          'text': '等级',
          'lang': 'zh'
        },
        {
          'text': 'レベル',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'calsUnit',
      'localizedMessages': [
        {
          'text': 'Cals',
          'lang': 'en'
        },
        {
          'text': 'Cals',
          'lang': 'fr'
        },
        {
          'text': 'Cals',
          'lang': 'es'
        },
        {
          'text': 'Cals',
          'lang': 'de'
        },
        {
          'text': 'Cals',
          'lang': 'pt'
        },
        {
          'text': 'Cals',
          'lang': 'it'
        },
        {
          'text': 'Kalori',
          'lang': 'tr'
        },
        {
          'text': 'Cals',
          'lang': 'pl'
        },
        {
          'text': 'Кал',
          'lang': 'ru'
        },
        {
          'text': 'Кал',
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
      'id': 'atLabel',
      'localizedMessages': [
        {
          'text': 'at',
          'lang': 'en'
        },
        {
          'text': 'à',
          'lang': 'fr'
        },
        {
          'text': 'en',
          'lang': 'es'
        },
        {
          'text': 'bei',
          'lang': 'de'
        },
        {
          'text': 'em',
          'lang': 'pt'
        },
        {
          'text': 'a',
          'lang': 'it'
        },
        {
          'text': 'şurada:',
          'lang': 'tr'
        },
        {
          'text': 'przy',
          'lang': 'pl'
        },
        {
          'text': 'в',
          'lang': 'ru'
        },
        {
          'text': 'на',
          'lang': 'uk'
        },
        {
          'text': '에서',
          'lang': 'ko'
        },
        {
          'text': '在',
          'lang': 'zh'
        },
        {
          'text': 'で',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'inputsLabel',
      'localizedMessages': [
        {
          'text': 'Inputs',
          'lang': 'en'
        },
        {
          'text': 'Entrées',
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
          'text': '输入',
          'lang': 'zh'
        },
        {
          'text': '入力',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'outputsLabel',
      'localizedMessages': [
        {
          'text': 'Outputs',
          'lang': 'en'
        },
        {
          'text': 'Sorties',
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
          'text': 'Output',
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
          'text': 'Вихідні дані',
          'lang': 'uk'
        },
        {
          'text': '출력',
          'lang': 'ko'
        },
        {
          'text': '输出',
          'lang': 'zh'
        },
        {
          'text': '出力',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'staticLabel',
      'localizedMessages': [
        {
          'text': '(Static)',
          'lang': 'en'
        },
        {
          'text': '(Statique)',
          'lang': 'fr'
        },
        {
          'text': '(Estático)',
          'lang': 'es'
        },
        {
          'text': '(Statisch)',
          'lang': 'de'
        },
        {
          'text': '(Estático)',
          'lang': 'pt'
        },
        {
          'text': '(Statico)',
          'lang': 'it'
        },
        {
          'text': '(Statik)',
          'lang': 'tr'
        },
        {
          'text': '(Statyczny)',
          'lang': 'pl'
        },
        {
          'text': '(Статический)',
          'lang': 'ru'
        },
        {
          'text': '(Статичний)',
          'lang': 'uk'
        },
        {
          'text': '(고정)',
          'lang': 'ko'
        },
        {
          'text': '（静态）',
          'lang': 'zh'
        },
        {
          'text': '（静的）',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'reducibleLabel',
      'localizedMessages': [
        {
          'text': '(Reducible)',
          'lang': 'en'
        },
        {
          'text': '(Réductible)',
          'lang': 'fr'
        },
        {
          'text': '(Reducible)',
          'lang': 'es'
        },
        {
          'text': '(Reduzierbar)',
          'lang': 'de'
        },
        {
          'text': '(Redutível)',
          'lang': 'pt'
        },
        {
          'text': '(Riducibile)',
          'lang': 'it'
        },
        {
          'text': '(İndirgenebilir)',
          'lang': 'tr'
        },
        {
          'text': '(Redukowalne)',
          'lang': 'pl'
        },
        {
          'text': '(Редуцируемый)',
          'lang': 'ru'
        },
        {
          'text': '(Редукований)',
          'lang': 'uk'
        },
        {
          'text': '(감소 가능)',
          'lang': 'ko'
        },
        {
          'text': '（可减少）',
          'lang': 'zh'
        },
        {
          'text': '（還元可能）',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'betaLabel',
      'localizedMessages': [
        {
          'text': 'Beta',
          'lang': 'en'
        },
        {
          'text': 'Bêta',
          'lang': 'fr'
        },
        {
          'text': 'Beta',
          'lang': 'es'
        },
        {
          'text': 'Beta',
          'lang': 'de'
        },
        {
          'text': 'Beta',
          'lang': 'pt'
        },
        {
          'text': 'Beta',
          'lang': 'it'
        },
        {
          'text': 'Beta',
          'lang': 'tr'
        },
        {
          'text': 'Beta',
          'lang': 'pl'
        },
        {
          'text': 'Бета',
          'lang': 'ru'
        },
        {
          'text': 'Бета',
          'lang': 'uk'
        },
        {
          'text': '베타',
          'lang': 'ko'
        },
        {
          'text': '测试版',
          'lang': 'zh'
        },
        {
          'text': 'ベータ',
          'lang': 'ja'
        }
      ]
    },
    {
      'id': 'selectServerLabel',
      'localizedMessages': [
        {
          'text': 'Select server',
          'lang': 'en'
        },
        {
          'text': 'Sélectionner un serveur',
          'lang': 'fr'
        },
        {
          'text': 'Seleccionar servidor',
          'lang': 'es'
        },
        {
          'text': 'Server auswählen',
          'lang': 'de'
        },
        {
          'text': 'Selecionar servidor',
          'lang': 'pt'
        },
        {
          'text': 'Seleziona server',
          'lang': 'it'
        },
        {
          'text': 'Sunucu seçin',
          'lang': 'tr'
        },
        {
          'text': 'Wybierz serwer',
          'lang': 'pl'
        },
        {
          'text': 'Выберите сервер',
          'lang': 'ru'
        },
        {
          'text': 'Виберіть сервер',
          'lang': 'uk'
        },
        {
          'text': '서버 선택',
          'lang': 'ko'
        },
        {
          'text': '选择服务器',
          'lang': 'zh'
        },
        {
          'text': 'サーバーを選択',
          'lang': 'ja'
        }
      ]
    }
  ]
;
