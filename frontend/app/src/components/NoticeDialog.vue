<!-- お知らせ表示ダイアログ -->

<template>
  <v-dialog v-model="isShow" transition="dialog-bottom-transition" fullscreen>
    <v-card color="indigo">
      <v-card-title class="px-5 mt-3">
        <v-sheet class="pa-2 text-h4" color=grey-lighten-2>
          {{ notices[currentIndex]?.title }}
        </v-sheet>
      </v-card-title>
      <v-card-text class="pa-2 mx-5 mt-3 bg-grey-lighten-2 text-pre-wrap" style="font-size: 1.8rem;">
        {{ notices[currentIndex]?.body }}
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn variant="flat" class="text-h4 px-5" height="80px" min-width="160px" size="x-large" @click="confirmed">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type NoticeRecord } from '../api/Notice';

const isShow = ref(false);

const notices = ref<NoticeRecord[]>([]); // 発注情報リスト
const currentIndex = ref(0);
let resolver: (() => void) | null = null;


// ダイアログを表示する
const show = (noticeRecords: NoticeRecord[]) :Promise<void> => {
  currentIndex.value = 0; // インデックスを初期化
  notices.value = noticeRecords;
  isShow.value = true;
  return new Promise((resolve) => {
    resolver = resolve;
  });
};

// ダイアログを閉じる
const close = () => {
  isShow.value = false;
  resolver?.(); // ダイアログを閉じたら Promise を解決
  resolver = null;
};

// お知らせを確認した(OKボタン)
const confirmed = () => {
  if (currentIndex.value < notices.value.length - 1) { // 現在のインデックスがお知らせ配列の最終インデックスより小さい=次のお知らせがある
    currentIndex.value += 1; // 次のお知らせを表示
  }else{
    close(); // 最後まで確認できたので閉じる
  }
}


defineExpose({ show, close });
</script>