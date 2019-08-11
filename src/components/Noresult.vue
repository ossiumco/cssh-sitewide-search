<template>
  <div>
    <p v-if="index.label !== 'primary'" class="result_title">No results found on {{index.label}}</p>
    <p v-else class="result_title">No results found on this site</p>
    <div class="content noresult">
      <span style="font-size: 1.5em;">Would you like to retry your search across all of CSSH?</span>
      <button @click="goToSiteWideSearch" class="btn btn-danger btn-lg btn-block">Search All of CSSH</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "searchTerm"],
  data() {
    return {};
  },
  methods: {
    goToSiteWideSearch() {
      let searchTerm = encodeURI(this.searchTerm);
      window.location.assign(
        `https://cssh.northeastern.edu/sitewide-search?searchFor=${searchTerm}`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.content.noresult {
  @media (min-width: 768px) {
    padding-top: 10px;
    padding-left: 18px;
  }
}
.btn {
  margin-top: 2em;
}
</style>
