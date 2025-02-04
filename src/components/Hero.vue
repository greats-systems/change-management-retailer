<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

defineProps({
  title: {
    type: String,
    default: 'Change Management'
  },
  subtitle: {
    type: String,
    default: 'This is a prototype landing page for Cashly'
  },
});
</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl">
      {{ title }}
    </h1>
    <!-- <p class="my-4 text-xl text-black">
      {{ subtitle }}
    </p> -->
  </div>
</template>
