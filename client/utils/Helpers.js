module.exports = {
  slugFromRoute: (route) => {
    const segments = route.path.split('/');
    return segments[segments.length - 1];
  }
};