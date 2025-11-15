import * as Localization from 'expo-localization'
import { SUPPORTED_LANGUAGES, LanguageCode, DEFAULT_LANGUAGE } from '../../shared/constants/languages'

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    'home.title': 'RoastArena',
    'create.title': 'Create Roast',
    'create.prompt': 'What do you want to roast?',
    'create.generate': 'Generate Roast',
    'create.save': 'Save Roast',
  },
  cs: {
    'home.title': 'RoastArena',
    'create.title': 'Vytvořit Roast',
    'create.prompt': 'Co chceš roastnout?',
    'create.generate': 'Vygenerovat Roast',
    'create.save': 'Uložit Roast',
  },
  de: {
    'home.title': 'RoastArena',
    'create.title': 'Roast Erstellen',
    'create.prompt': 'Was möchtest du roasten?',
    'create.generate': 'Roast Generieren',
    'create.save': 'Roast Speichern',
  },
  ru: {
    'home.title': 'RoastArena',
    'create.title': 'Создать Roast',
    'create.prompt': 'Что вы хотите roastить?',
    'create.generate': 'Сгенерировать Roast',
    'create.save': 'Сохранить Roast',
  },
}

function getLocale(): LanguageCode {
  const locale = Localization.locale
  const lang = locale.split('-')[0] as LanguageCode
  return SUPPORTED_LANGUAGES[lang] ? lang : DEFAULT_LANGUAGE
}

export function t(key: string): string {
  const locale = getLocale()
  return translations[locale]?.[key] || translations[DEFAULT_LANGUAGE]?.[key] || key
}
