var Vue = require('vue');

Vue.directive('collapse', {
  _click: function() {
    this.el.classList.toggle('collapse-open');
  },
  bind: function() {
    this.el.classList.add('collapse');
    this._click = this._click.bind(this);
    this.el.addEventListener('click', this._click);
  },
  unbind: function() {
    this.el.removeEventListener('click', this._click);
  }
});

var rulesTableView = new Vue({
  el: '#table',
  data: {
    title: 'Rules',
    items: [{
      name: 'foo',
      enabled: true,
      template: '',
      regexp: false,
      posts: 1,
      comments: 1,
      save: 0
    }, {
      name: 'bar',
      enabled: true,
      template: '',
      regexp: false,
      posts: 1,
      comments: 1,
      save: 0
    }]
  }
});

/*

name: '',
enabled: true,
template: '',
regexp: false,
posts: 1,
comments: 1,
save: 0

*/