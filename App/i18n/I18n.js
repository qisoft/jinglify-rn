// @flow

import I18n, { getLanguages } from 'react-native-i18n'
import en from './languages/english.json';
import ru from './languages/ru.json';
import sv from './languages/sv.json';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true
I18n.pluralization["ru"] = (count) => {
  if(count === 0) return ["zero"];
  const key = count % 10 == 1 && count % 100 != 11
    ? "one"
    : [2, 3, 4].indexOf(count % 10) >= 0 && [12, 13, 14].indexOf(count % 100) < 0
      ? "few"
      : count % 10 == 0 || [5, 6, 7, 8, 9].indexOf(count % 10) >= 0 || [11, 12, 13, 14].indexOf(count % 100) >= 0
        ? "many"
        : "other";
  return [key];
};
getLanguages().then(languages => console.log(languages));
console.log(en);
// English language is the main language for fall back:
I18n.translations = {
  en: en,
  ru: ru,
  sv: sv,
};

export default I18n;
