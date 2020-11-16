'use strict';

const FastbootTransform = require('fastboot-transform');


module.exports = {
  name: require('./package').name,
  options: {
  nodeAssets: {
    'chart.js': {
      vendor: {
          srcDir: 'dist',
          include: ['Chart.min.js'],
          processTree(input) {
            return FastbootTransform(input);
          }
        }
      }
    }
  },

  included(app) {
    this._super.included.apply(this, arguments);
    this._ensureThisImport();

    // Chart.js
    this.import('vendor/chart.js/Chart.min.js');

    // Dashkit theme
    [
      'css/style.min.css',
      'js/charts.min.js',
      'js/chart-extension.min.js'
    ].forEach( (f) => {
      this.import(`vendor/dashkit/${f}`);
    });

    const customOptions = app.options.chart || {};
    const colorScheme = customOptions.colorScheme;
    if (colorScheme && colorScheme === 'dark') {
      this.import(`vendor/dashkit/js/charts-dark.min.js`);
    }
  },
  
  _ensureThisImport() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;

        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        let app = this._findHost();
        app.import(asset, options);
      };
    }
  }
};
