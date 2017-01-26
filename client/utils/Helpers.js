module.exports = {
  slugFromRoute: (route) => {
    const segments = route.path.split('/');
    return segments[segments.length - 1];
  },
  getServerUrl: () => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
      return '';
    } else {
      return process.env.SERVER_URL + ':' + process.env.SERVER_PORT;
    }
  }
};