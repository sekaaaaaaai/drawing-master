

<template>
  <v-navigation-drawer permanent>
    <v-list-item class="py-5">
      <div class="d-flex align-center justify-space-between">
        <strong>
          Top drawings
        </strong>
        <v-btn :to="'/new'" color="primary" prepend-icon="mdi-folder-plus-outline">
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
      <v-list-item link>
        <v-list-item-title>
          <div>{{ d.name }}</div>
          <small>{{ d.drawingNumber }}</small>
        </v-list-item-title>
      </v-list-item>
    </template>

    <template v-if="!displayMore">
      <v-divider class="mt-2"></v-divider>
      <v-list-item link class="text-center" @click="() => {displayMore = !displayMore}">
        <strong><small>もっと見る</small></strong>
      </v-list-item>
    </template>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';

const drawings = [
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
    {
      drawingNumber: 'C12345',
      name: "電気回路図○○○○",
    },
  ]

  const displayMore = ref(false); // もっと見る

  const diaplayedDrawings = computed(() => {
    return displayMore.value ? drawings : drawings.slice(0, 5);
  })

</script>

