module.exports = {
  // target: 'serverless',
  webpack: config => {
    config.node = {
      fs: 'empty',
      module: 'empty'
    }

    return config
  }
}
