

<template>
  <v-app>
    <ApplicationBar :title="currentTitle" />
    
    <v-main>
      <router-view v-slot="{ Component }">
        <component :is="Component" ref="componentRef" />
      </router-view>
    </v-main>
    
  </v-app>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ApplicationBar from './components/ApplicationBar.vue'
import { ref, watch } from 'vue';

const currentTitle = ref(''); // タイトルバーに表示する名前
const route = useRoute();
const componentRef = ref<InstanceType<any> | null>(null);

// 子コンポーネントの title を取得して反映
watch(
  () => route.fullPath, // ページが変わったら
  () => {
    // nextTickで描画後を待つのもOK（タイミングによって必要）
    setTimeout(() => {
      if (componentRef.value?.title) {
        currentTitle.value = componentRef.value.title;
      }
    }, 0);
  },
  { immediate: true }
);
</script>

