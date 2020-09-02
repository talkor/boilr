<template>
  <section>
    <article class="media" v-for="i in [1, 2, 3, 4, 5]" :key="i">
      <div class="media-content">
        <b-skeleton height="45px"></b-skeleton>
      </div>
    </article>
  </section>
</template>
