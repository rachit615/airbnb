import countries from "world-countries";

const getFlagUrl = (unicodeFlag: string) => {
  const flagCode = unicodeFlag.toLowerCase();
  return `https://flagcdn.com/48x36/${flagCode}.png`;
};

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAllCountries = () => {
    return formattedCountries;
  };
  const getCountryByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };
  return { getCountryByValue, getAllCountries };
};

export default useCountries;
