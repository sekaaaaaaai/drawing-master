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
                <v-list-item-title>タグ</v-list-item-title>
                <v-list-item-subtitle class="d-flex ga-1">
                  <template
                    v-for="(tag, i) in drawing?.tags"
                    :key="i">
                    <v-chip>{{ tag }}</v-chip>
                  </template>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>備考</v-list-item-title>
                <v-list-item-subtitle>{{ drawing?.remarks || '―' }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <div class="d-flex justify-end">
              <v-btn color="success" :to="`/drawings/${props.id}/revision`">図面改訂</v-btn>
            </div>

            <v-divider class="my-4" />


            <v-list>
              <v-list-subheader class="text-black"><h3>CADファイル</h3></v-list-subheader>
              <v-list-item
                  v-for="(file, i) in drawing?.latest_revision?.cad_files"
                :key="i"
                :value="file"
                rounded="xl"
                @click="openFile(file.url, false)"
                :active="false"
              >
                <template v-slot:append>
                  <v-icon icon="mdi-download"></v-icon>
                </template>

                <v-list-item-title v-text="file.name"></v-list-item-title>
              </v-list-item>
            </v-list>

            <v-list>
              <v-list-subheader class="text-black"><h3>PDFファイル</h3></v-list-subheader>
              <v-list-item
                  v-for="(file, i) in drawing?.latest_revision?.pdf_files"
                :key="i"
                :value="file"
                rounded="xl"
                @click="openFile(file.url, true)"
                :active="false"
              >
                <template v-slot:append>
                  <v-icon icon="mdi-open-in-new"></v-icon>
                </template>

                <v-list-item-title v-text="file.name"></v-list-item-title>
              </v-list-item>
            </v-list>

            <v-divider class="my-4" />

            <h3>グラフ</h3>
            <GitGraph ></GitGraph>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type DrawingRecord, find, post, ToString_NumberAndName } from '../../api/Drawing';
import GitGraph from '../../components/GitGraph.vue';

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
const panels = ref([0, 1])

const openFile = (url: string, useBlank: boolean = true) => {
  if (useBlank) {
    window.open(url, '_blank'); // 新しいタブで開く
  } else {
    window.location.href = url;
  }
};

onMounted(async () => {
  drawing.value = await find(props.id)
})

defineExpose({
  title,
});
</script>

