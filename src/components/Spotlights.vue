<template>
  <div class="result-item row">
    <div v-if="hit.images.thumbnail && hit.images.thumbnail.url" class="photo">
      <img :src="hit.images.thumbnail.url" alt class="profileImg">
    </div>
    <div v-if="!hit.images.thumbnail || !hit.images.thumbnail.url" class="photo">
      <img src="https://cssh.northeastern.edu/wp-content/uploads/2019/05/logo-algolia.jpg" alt class="profileImg empty">
    </div>
    <div class="content">
      <h4>
        <span class="category">{{hit.post_type}}:</span>
        <ais-highlight attribute="post_title" :hit="hit"/>
      </h4>
      <p class="detail" v-trim v-html="hit.content"></p>
      <p v-html="hit.post_excerpt"></p>
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
        if (resultString.length > max_len)
        {
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
        if (resultString.length > max_len)
        {
            resultString = str.substring(0, max_len - 1) + "...";
        }
    
        el.innerHTML = resultString;
      }
    }
  },
};
</script>
<style lang="scss">
</style>
