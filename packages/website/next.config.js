const withTM = require('next-transpile-modules')(['eth-hooks'])

module.exports = withTM({
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  }
})
