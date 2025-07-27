export const getFlagUrl = (langCode) => {
  const langToCountry = {
    en: 'gb',
    fr: 'fr',
    es: 'es',
    de: 'de',
    it: 'it',
    zh: 'cn',
    ja: 'jp',
    ru: 'ru',
    ko: 'kr',
    ar: 'sa',
    hi: 'in',
    pt: 'pt',
    nl: 'nl',
    vi: 'vn',
    id: 'id',
    tr: 'tr',
    pl: 'pl',
    sw: 'tz', // Swahili – Tanzania
  };

  const countryCode = langToCountry[langCode.toLowerCase()];
  return countryCode
    ? `https://flagcdn.com/w40/${countryCode}.png`
    : null;
};
