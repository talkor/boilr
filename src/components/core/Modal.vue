<template>
  <b-modal
    aria-role="dialog"
    aria-modal
    :active.sync="isActive"
    :full-screen="false"
  >
    <div class="modal-card" style="width: auto;">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit time</p>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
    <footer class="modal-card-foot">
      <CoreButton :noBorder="true" @click="$parent.close()" text="Cancel" />
      <CoreButton :primary="true" text="Save" />
    </footer>
  </b-modal>
</template>

<script>
import CoreButton from '@/components/core/CoreButton';

export default {
  props: {
    isActive: Boolean
  },
  components: {
    Button
  }
};
</script>
