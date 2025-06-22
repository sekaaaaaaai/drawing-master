<!-- 出勤ページ -->

<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-app-bar-nav-icon variant="plain" icon="mdi-database" link to="/"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title><strong>{{ props.title }}</strong></v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{title: string}>()

const now = ref(new Date().toLocaleString('ja-JP'))
const timer = ref()

onMounted(() => {
  timer.value = setInterval(() => {
    now.value = new Date().toLocaleString('ja-JP')
  }, 500)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

