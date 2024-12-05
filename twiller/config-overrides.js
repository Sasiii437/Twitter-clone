const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    util: require.resolve('util/'),
    // Add other fallbacks if necessary, e.g., "crypto", "stream" etc.
  };

  return config;
};
