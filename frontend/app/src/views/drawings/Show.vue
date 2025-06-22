<!-- 出勤ページ -->

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3 v-if="drawing">{{ ToString_NumberAndName(drawing) }}</h3>
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>図面番号</v-list-item-title>
                <v-list-item-subtitle>{{ drawing?.number }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>図面名称</v-list-item-title>
                <v-list-item-subtitle>{{ drawing?.name }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>備考</v-list-item-title>
                <v-list-item-subtitle>{{ drawing?.remarks || '―' }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <v-divider class="my-4" />

            <div class="d-flex ga-3">
              <v-btn
                v-if="drawing?.pdf_file_url"
                :href="drawing.pdf_file_url"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                prepend-icon="mdi-open-in-new"
              >
                PDFを開く
              </v-btn>
  
              <v-btn
                v-if="drawing?.cad_file_url"
                :href="drawing.cad_file_url"
                download
                color="primary"
                prepend-icon="mdi-download"
              >
                CADファイルをダウンロード
              </v-btn>
            </div>

            <v-divider class="my-4" />

            <v-timeline side="end" truncate-line="start">
              <v-timeline-item
                v-for="item in items"
                :key="item.id"
                dot-color="grey-darken-1"
                size="small"
              >
                <v-alert
                  :value="true"
                >
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                </v-alert>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type DrawingRecord, find, post, ToString_NumberAndName } from '../../api/Drawing';

const props = defineProps<{
  id: number
}>();

const title = '';
const drawing = ref<DrawingRecord>();
const revisions = [
  {
    id: 1,
    color: 'info',
    icon: 'mdi-information',
  },
  {
    id: 2,
    color: 'error',
    icon: 'mdi-alert-circle',
  },
];

onMounted(async () => {
  drawing.value = await find(props.id)
})

defineExpose({
  title,
});
</script>

