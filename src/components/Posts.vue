<template>
  <div class="result-item row">
    <div class="photo">
      <img
        v-if="hit.images.thumbnail && hit.images.thumbnail.url"
        :src="hit.images.thumbnail.url"
        alt
        class="profileImg"
      />
      <img
        v-else
        src="https://cssh.northeastern.edu/wp-content/uploads/2019/05/logo-algolia.jpg"
        alt
        class="profileImg empty"
      />
    </div>
    <!-- <div class="photo">
      <img
        v-if="hit.images.thumbnail && hit.images.thumbnail.url"
        :src="hit.images.thumbnail.url"
        alt
        class="profileImg"
      >
    </div>
    <div v-if="!hit.images.thumbnail || !hit.images.thumbnail.url" class="photo">
      <img src="Logo.png" alt class="profileImg empty">
    </div>-->
    <div class="content">
      <h4 style="margin-top:0;margin-bottom:0;">
        <ais-highlight attribute="post_title" :hit="hit" />
      </h4>
      <div class="text-capitalize">{{hit.post_type}} - {{hit.post_date_formatted}}</div>
      <p class="detail" v-trim v-text="hit.content"></p>
      <p v-trim v-html="hit.post_excerpt"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hit"],
  data() {
    return {};
  },
  directives: {
    trim: {
      // directive definition
      inserted: function(el) {
        var str = el.innerHTML;
        /*var max_words = 200;
        var resultString = str.split(" ");
        resultString =   resultString.slice(0, max_words).join(" ");
        if (resultString.length> max_words)
          resultString  =resultString + "...";*/

        var max_len = 200;

        var resultString = str;
        if (resultString.length > max_len) {
          resultString = str.substring(0, max_len - 1) + "...";
        }

        el.innerHTML = resultString;
      },
      componentUpdated: function(el) {
        var str = el.innerHTML;
        /*var max_words = 200;
        var resultString = str.split(" ");
        resultString =   resultString.slice(0, max_words).join(" ");
        if (resultString.length> max_words)
          resultString  =resultString + "...";*/

        var max_len = 200;

        var resultString = str;
        if (resultString.length > max_len) {
          resultString = str.substring(0, max_len - 1) + "...";
        }

        el.innerHTML = resultString;
      }
    }
  }
};
</script>
<style lang="scss">
</style>
