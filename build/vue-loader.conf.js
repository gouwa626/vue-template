'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    // 将px转换为rem
    require('postcss-plugin-px2rem')({ //postcss-pxtorem
        // font-size 默认值
        rootValue: 20,
        // 需转换的最小数值
        minPixelValue: 2,
        // 屏蔽转换名单
        selectorBlackList: ['html'],
        // 需转换css 属性列表，留空默认全部转换
        propWhiteList: []
    }),
    require('autoprefixer')({
        browsers: ['last 2 versions']
    })
  ]
}
