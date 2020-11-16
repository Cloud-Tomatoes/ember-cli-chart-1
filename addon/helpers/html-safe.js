import Helper from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default class extends Helper {
  compute([str]) {
    return htmlSafe(str);
  }
}
