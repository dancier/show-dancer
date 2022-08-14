// set environment variables in global window object
(function(window) {
  window.env = window.env || {};

  window.env = {
    // environment variables
    apiUrl: '${DANCIER_BACKEND_URL}'
  };
})(this);
