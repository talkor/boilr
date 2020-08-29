<template>
  <section>
    <article class="media" v-for="i in [1, 2, 3]" :key="i">
      <figure class="media-left">
        <p class="image is-30X30">
          <b-skeleton circle width="30px" height="30px"></b-skeleton>
        </p>
      </figure>
      <div class="media-content">
        <b-skeleton height="57px"></b-skeleton>
      </div>
    </article>
  </section>
</template>
