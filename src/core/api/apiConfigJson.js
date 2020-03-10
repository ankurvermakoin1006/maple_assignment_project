export default {
  services: {
    url: '/winter.inquickerstaging.com/services',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  },
  providers: {
    url: '/winter.inquickerstaging.com/providers?include=locations%2Cschedules.location&amp;page%5Bnumber%5D=1&amp;page%5Bsize%5D=10',
    method: 'GET',
    data: {},
    showResultMessage: false,
    showErrorMessage: false
  }
};
