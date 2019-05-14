import Vue from 'vue'
import InstantSearch from 'vue-instantsearch';

import App from './App.vue'

import 'bootstrap3/dist/css/bootstrap.min.css'
import * as uiv from 'uiv'

import './scss/app.scss' // import global app style file

Vue.config.productionTip = false

// Vue Plugins assigned to the Instance
Vue.use(uiv)
Vue.use(InstantSearch);

if (window.algolia_indices) {
  // full stop check to see if we have indicies to work with
  // these are written to the dom with PHP and input with ACF
  new Vue({
    render: h => h(App)
  }).$mount('#algolia-search-vue-app')
}
