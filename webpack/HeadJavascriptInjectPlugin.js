'use strict';
const allConfig = require('../config/index.js')

const headJavascript = `
<!-- begin REM Zoom 计算 -->
<script type="text/javascript">
  (function (win) {
    var remCalc = {};
    var docEl = win.document.documentElement,
      tid,
      hasRem = ${allConfig.enableREM},
      hasZoom = ${allConfig.enableZoom},
      zoomRuler = '${allConfig.baseZoomRuler}',
      designWidth = ${allConfig.designLayoutWidth},
      designHeight = ${allConfig.designLayoutHeight};

    function refresh() {
      var width = docEl.clientWidth;
      var height = docEl.clientHeight;
      if (width > 768) width = 768;
      if (hasRem) {
        var rem = width / ${allConfig.baseSize};
        docEl.style.fontSize = rem + "px";
        remCalc.rem = rem;
        var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
        if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
          var remScaled = rem * rem / actualSize;
          docEl.style.fontSize = remScaled + "px";
        }
      }
      if (hasZoom) {
        var style = document.getElementById('J__style');
        if (!style) {
          style = document.createElement('style');
          style.id = 'J__style';
        }
        var r,s;
        if (zoomRuler === 'height') {
          r = height / designHeight;
        } else {
          r = width / designWidth;
        }
        r.toFixed && (r = r.toFixed(5));
        s = '.__z{zoom:' + r + '} ';
        s += '.__s{-webkit-transform: scale(' + r + ');transform: scale(' + r + ')}';

        style.innerHTML = s;
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    }

    function dbcRefresh() {
      clearTimeout(tid);
      tid = setTimeout(refresh, 100)
    }
    win.addEventListener("resize", function () {
      dbcRefresh()
    }, false);

    win.addEventListener("pageshow", function (e) {
      if (e.persisted) {
        dbcRefresh();
      }
    }, false);
    refresh();
    if (hasRem) {
      remCalc.refresh = refresh;
      remCalc.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === "string" && d.match(/rem$/)) {
          val += "px";
        }
        return val;
      };
      remCalc.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === "string" && d.match(/px$/)) {
          val += "rem";
        }
        return val;
      };
      win.remCalc = remCalc;
    }
  })(window);

</script>
<!-- end REM Zoom 计算 -->
`


/**
 * depend on HtmlWebpackPlugin
 * @param {*} options 
 */
function HeadJavascriptInjectPlugin(options) {
    // Configure your plugin with options...
}

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

    compiler.plugin('compilation', compilation => {

        console.log('The compiler is starting a new compilation...')

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
        compilation.plugin(
            'html-webpack-plugin-before-html-processing',
            function (htmlPluginData) {
                let html = htmlPluginData.html
                html = html.replace('{{{__HEAD_JAVASCRIPT__}}}', headJavascript)
                htmlPluginData.html = html
            })
    })
}

module.exports = HeadJavascriptInjectPlugin