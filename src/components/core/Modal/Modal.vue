<template>
  <b-modal
    aria-role="dialog"
    aria-modal
    :active.sync="isActive"
    :full-screen="false"
  >
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit time</p>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
    </div>
    <footer class="modal-card-foot">
      <Button :noBorder="true" @click="$parent.close()" text="Cancel" />
      <Button :primary="true" text="Save" />
    </footer>
  </b-modal>
</template>

<script>
import Button from '@/components/core/Button/Button';

export default {
  props: {
    isActive: {
      type: Boolean
    }
  },
  components: {
    Button
  }
};
</script>
