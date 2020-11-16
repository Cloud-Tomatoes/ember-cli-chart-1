/* global Chart */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EmberChart extends Component {

  @tracked legend = undefined;

  @action
  drawChart(element) {
    let { data, type, options, plugins } = this.args;
    let chart = new Chart(element, {
      type, data, options, plugins
    });

    if (this.args.useLegend)
      this.legend = chart.generateLegend();

    this.chart = chart;
  }

  @action
  updateChart() {
    let { chart, animate } = this.chart;
    let { data, options } = this.args;

    if (chart) {
      chart.data = data;
      chart.options = options;
      if (animate) {
        chart.update();
      } else {
        chart.update(0);
      }

      const content = chart.generateLegend();
      if (this.customLegendElement)
        this.customLegendElement.innerHTML = content;
      else if (this.args.useLegend)
        this.legend = content;
    }
  }

  willDestroy() {
    this.chart.destroy();
  }

}
