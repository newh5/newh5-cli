'use strict';

var _ = require('lodash');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var sprites = require('postcss-sprites');
var assets = require('postcss-assets');
var px2rem = require('postcss-plugin-px2rem');

var allConfig = require('../config/index.js');
var NODE_ENV = process.env.NODE_ENV || '';
var config = _.merge({}, allConfig, allConfig[NODE_ENV.toUpperCase()]);

var postcssPlugins = [].concat(allConfig.postcssPlugins);

// assets
postcssPlugins.push(assets(config.assetsOptions));

// sprites
var spritesOptions = config.spritesOptions;
if (config.enableREM) {
  var updateRule = require('postcss-sprites/lib/core').updateRule;

  spritesOptions.hooks = {
    onUpdateRule: function onUpdateRule(rule, token, image) {
      updateRule(rule, token, image);

      rule.insertAfter(rule.last, postcss.decl({
        prop: 'background-size',
        value: image.spriteWidth / image.ratio + 'px ' + image.spriteHeight / image.ratio + 'px;'
      }));
    }
  };
}
if (config.enableSpritesOnDev || NODE_ENV === 'production') {
  postcssPlugins.push(sprites(spritesOptions));
}

// px2rem
if (config.enableREM) {
  postcssPlugins.push(px2rem(_.assign(config.px2remOptions, {
    rootValue: config.designLayoutWidth / config.baseSize
  })));
}

// autoprefixer
postcssPlugins.push(autoprefixer(config.autoprefixerOptions));

module.exports = function () {
  return postcssPlugins;
};