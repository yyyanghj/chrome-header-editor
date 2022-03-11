<script setup lang="ts">

const props = withDefaults(defineProps<{
  outline: boolean
}>(), {
  outline: false,
})

</script>

<template>
  <button
    class="rounded cursor-pointer flex h-8  items-center justify-center"

    :class="outline ? 'text-zinc-900 border-currentColor border border-solid' : 'bg-zinc-900 text-zinc-50' "
  >
    <slot></slot>
  </button>
</template>
