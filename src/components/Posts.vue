<template>
<div class="result-item row">
  <div v-if="hit.images.thumbnail && hit.images.thumbnail.url" class="photo" >
    <img :src="hit.images.thumbnail.url" alt class="profileImg">
  </div>
  <div v-if="!hit.images.thumbnail || !hit.images.thumbnail.url" class="photo" >
    <img src="Logo.png" alt class="profileImg empty">
  </div>                     
  <div class="content">
    <h4>
     {{hit.post_type}}:        
      <ais-highlight attribute="post_title" :hit="hit"/>
      <div class="detail">
      <small v-trim>{{hit.content}}</small>
      </div>
    </h4>

    <p v-html="hit.post_excerpt"></p>
  </div>
</div>

</template>

<script>

export default {
   props: ['hit'],
  data()
  {
    return {


    }
  },
  directives: {
  trim: {
    // directive definition
      inserted: function (el) {
        var str = el.innerHTML;
        var resultString = str.split(' ').slice(0, 240).join(" ") + "...";
        el.innerHTML = resultString
      }
    }
  }
}

</script>
<style lang="scss">

</style>
