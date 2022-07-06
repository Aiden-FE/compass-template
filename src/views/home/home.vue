<template>
  <p>{{ text }}</p>
</template>

<script setup lang="ts">
const text = ref('');
text.value = 'Hello world';
</script>
