'use strict';

var allConfig = require('../config/index.js');

var headJavascript = '\n<!-- begin REM Zoom \u8BA1\u7B97 -->\n<script type="text/javascript">\n  (function (win) {\n    var remCalc = {};\n    var docEl = win.document.documentElement,\n      tid,\n      hasRem = ' + allConfig.enableREM + ',\n      hasZoom = ' + allConfig.enableZoom + ',\n      zoomRuler = \'' + allConfig.baseZoomRuler + '\',\n      designWidth = ' + allConfig.designLayoutWidth + ',\n      designHeight = ' + allConfig.designLayoutHeight + ';\n\n    function refresh() {\n      var width = docEl.clientWidth;\n      var height = docEl.clientHeight;\n      if (width > 768) width = 768;\n      if (hasRem) {\n        var rem = width / ' + allConfig.baseSize + ';\n        docEl.style.fontSize = rem + "px";\n        remCalc.rem = rem;\n        var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);\n        if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {\n          var remScaled = rem * rem / actualSize;\n          docEl.style.fontSize = remScaled + "px";\n        }\n      }\n      if (hasZoom) {\n        var style = document.getElementById(\'J__style\');\n        if (!style) {\n          style = document.createElement(\'style\');\n          style.id = \'J__style\';\n        }\n        var r,s;\n        if (zoomRuler === \'height\') {\n          r = height / designHeight;\n        } else {\n          r = width / designWidth;\n        }\n        r.toFixed && (r = r.toFixed(5));\n        s = \'.__z{zoom:\' + r + \'} \';\n        s += \'.__s{-webkit-transform: scale(\' + r + \');transform: scale(\' + r + \')}\';\n\n        style.innerHTML = s;\n        document.getElementsByTagName(\'head\')[0].appendChild(style);\n      }\n    }\n\n    function dbcRefresh() {\n      clearTimeout(tid);\n      tid = setTimeout(refresh, 100)\n    }\n    win.addEventListener("resize", function () {\n      dbcRefresh()\n    }, false);\n\n    win.addEventListener("pageshow", function (e) {\n      if (e.persisted) {\n        dbcRefresh();\n      }\n    }, false);\n    refresh();\n    if (hasRem) {\n      remCalc.refresh = refresh;\n      remCalc.rem2px = function (d) {\n        var val = parseFloat(d) * this.rem;\n        if (typeof d === "string" && d.match(/rem$/)) {\n          val += "px";\n        }\n        return val;\n      };\n      remCalc.px2rem = function (d) {\n        var val = parseFloat(d) / this.rem;\n        if (typeof d === "string" && d.match(/px$/)) {\n          val += "rem";\n        }\n        return val;\n      };\n      win.remCalc = remCalc;\n    }\n  })(window);\n\n</script>\n<!-- end REM Zoom \u8BA1\u7B97 -->\n';

/**
 * depend on HtmlWebpackPlugin
 * @param {*} options 
 */
function HeadJavascriptInjectPlugin(options) {}
// Configure your plugin with options...


// const wirePluginEvent = (event, compilation, fn) => {
//     compilation.plugin(event, (pluginArgs, callback) => {
//         try {
//             fn(pluginArgs);
//             callback && callback(null, pluginArgs);
//         } catch (err) {
//             callback && callback(err);
//         }
//     });
// };


HeadJavascriptInjectPlugin.prototype.apply = function (compiler) {

  compiler.plugin('compilation', function (compilation) {

    console.log('The compiler is starting a new compilation...');

    // wirePluginEvent('html-webpack-plugin-before-html-processing',
    //     compilation,
    //     (htmlPluginData) => {
    //         let html = htmlPluginData.html
    //         html = html.replace('{{{__HEAD_JAVASCRIPT__}}}', headJavascript)
    //         htmlPluginData.html = html
    //         // callback(null, htmlPluginData)
    //     }
    // )

    // https://doc.webpack-china.org/api/compilation
    // 主要的编译实例
    // 随后所有的方法都从 compilation.plugin 上得来
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData) {
      var html = htmlPluginData.html;
      html = html.replace('{{{__HEAD_JAVASCRIPT__}}}', headJavascript);
      htmlPluginData.html = html;
    });
  });
};

module.exports = HeadJavascriptInjectPlugin;