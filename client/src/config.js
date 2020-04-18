const config = {
  messageDateFormats: {
    messageTime: {
      wide: 'HH:mm:ss',
      short: {
        sameDay: 'HH:mm',
        lastDay: 'ddd',
        lastWeek: 'ddd',
        sameElse: 'DD/MM/YY',
      },
    },
    userLastDate: {
      sameDay: '[today at] HH:mm',
      lastDay: '[yesterday at] HH:mm',
      lastWeek: '[last] dddd [at] HH:mm',
      sameElse: 'DD/MM/YYYY',
    },
    historyDate: 'dddd, MMMM D, YYYY',
    messageHistoryDate: {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd, MMMM D, YYYY',
      sameElse: 'dddd, MMMM D, YYYY',
    },
  },
  tokenName: 'chatkilla_tkn',
  refreshTokenName: 'chatkilla_rfrsh_tkn',
};

export default Object.freeze(config);
