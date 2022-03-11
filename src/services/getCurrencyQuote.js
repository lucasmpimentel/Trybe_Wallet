const getCurrencyQuote = async () => {
  const linkAPI = 'https://economia.awesomeapi.com.br/json/all';
  const request = await fetch(linkAPI);
  const requestJson = await request.json();
  return requestJson;
};

export default getCurrencyQuote;
