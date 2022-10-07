// set environment variables in global window object
(function (window) {
  window.env = {
    // environment variables
    apiUrl: '${DANCIER_BACKEND_URL}',
  };
})(this);
