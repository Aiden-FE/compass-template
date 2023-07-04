import { defineStore } from '@/stores/core';

export default function useExampleStore() {
  return defineStore('example', () => {
    const state = ref({});

    function updateState(data: {}) {
      state.value = data;
    }

    return {
      state,
      updateState,
    };
  });
}
