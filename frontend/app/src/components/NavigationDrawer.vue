

<template>
  <v-navigation-drawer permanent>
    <v-list-item class="py-5">
      <div class="d-flex align-center justify-space-between">
        <strong>
          Top drawings
        </strong>
        <v-btn :to="'/drawings/new'" color="primary" prepend-icon="mdi-folder-plus-outline">
          <strong>新規</strong>
        </v-btn>
      </div>
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="図面検索"
        variant="outlined"
        hide-details
        single-line
        class="mt-2"
      ></v-text-field>
    </v-list-item>    

    <template v-for="(d, index) in diaplayedDrawings" :key="index">
      <v-list-item lin :to="`/drawings/${d.id}`">
        <v-list-item-title>
          <div>{{ d.name }}</div>
          <small>{{ d.number }}</small>
        </v-list-item-title>
      </v-list-item>
    </template>

    <template v-if="!displayMore && drawings.length > 5">
      <v-divider class="mt-2"></v-divider>
      <v-list-item link class="text-center" @click="() => {displayMore = !displayMore}">
        <strong><small>もっと見る</small></strong>
      </v-list-item>
    </template>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { get, type DrawingRecord } from '../api/Drawing';

const drawings = ref<DrawingRecord[]>([])

const displayMore = ref(false); // もっと見る

const diaplayedDrawings = computed(() => {
  return displayMore.value ? drawings.value : drawings.value.slice(0, 5);
})

onMounted(async () => {
  drawings.value = await get();
})

</script>

