<template>
  <v-alert type="error" closable :text="text" @input="onClose"></v-alert>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>
