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
  },

  moveItemInArray: (array, fromIndex, toIndex) => {
    if (toIndex >= array.length) {
      var delta = toIndex - array.length;
      while ((delta--) + 1) {
        array.push(undefined);
      }
    }
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    return array;
  },

};