import Vue from 'vue'
import InstantSearch from 'vue-instantsearch';

import ModalApp from './ModalApp'
import PageApp from './PageApp'

import 'bootstrap3/dist/css/bootstrap.min.css'
import * as uiv from 'uiv'

import './scss/app.scss' // import global app style file

Vue.config.productionTip = false

// Vue Plugins assigned to the Instance
Vue.use(uiv)
Vue.use(InstantSearch);

// This is the Search Modal UI
let TopNavSearchDiv = document.getElementById('algolia-search-vue-app')
if (TopNavSearchDiv && window.algolia_indices) {
  console.log('algolia_indices', window.algolia_indices)
  // full stop check to see if we have indices to work with
  // these are written to the dom with PHP and input with ACF
  new Vue({
    render: h => h(ModalApp)
  }).$mount('#algolia-search-vue-app')
}

// This is the Search Page UI
let searchPageDiv = document.getElementById('algolia-full-page-search-vue-app-anchor')
if (searchPageDiv && window.algolia_indices) {
  new Vue({
    render: h => h(PageApp)
  }).$mount('#algolia-full-page-search-vue-app-anchor')
}
