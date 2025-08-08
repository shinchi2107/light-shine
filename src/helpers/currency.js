function getLocaleByCurrency(currency) {
    const map = {
        VND: 'vi-VN',
        USD: 'en-US',
        EUR: 'de-DE',
        JPY: 'ja-JP',
        GBP: 'en-GB',
        CNY: 'zh-CN',
        KRW: 'ko-KR',
        AUD: 'en-AU',
        CAD: 'en-CA',
    }

    return map[currency] || 'vi-VN'
}

function convertCurrencyFixed(amount, toCurrency, rate) {
    if (!rate || isNaN(rate)) {
      throw new Error('Please provide a valid rate')
    }
  
    const converted = amount * rate
  
    return new Intl.NumberFormat(getLocaleByCurrency(toCurrency), {
      style: 'currency',
      currency: toCurrency
    }).format(converted)
  }

export { getLocaleByCurrency, convertCurrencyFixed };