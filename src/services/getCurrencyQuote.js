const getCurrencyQuote = async () => {
  const linkAPI = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(linkAPI);
  const responseJson = await response.json();
  return responseJson;
};

export default getCurrencyQuote;
