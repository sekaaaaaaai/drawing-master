<!-- 出勤ページ -->

<template>
  <v-container>
    <h2>新規図面</h2>

    <v-form @submit.prevent class="mt-2">
      <v-text-field
        v-model="drawingNumber"
        :rules="[rules.required]"
        label="図面番号"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="drawingName"
        :rules="[rules.required]"
        label="図面名称"
        variant="outlined"
        class="mt-2"
      ></v-text-field>

      <v-file-input
        label="CADファイル"
        show-size
        prepend-icon="mdi-file-cad"
      ></v-file-input>

      <v-file-input
        label="PDFファイル"
        show-size
        prepend-icon="mdi-file-pdf-box"
      ></v-file-input>


      <v-btn class="mt-2" type="submit" color="primary" block>新図作成</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VFileUpload } from 'vuetify/labs/VFileUpload';


const title = "新規図面";

const drawingNumber = ref('');

const rules = {
  required: (v: any) => !!v || '必須項目です',
};

defineExpose({
  title,
});
</script>

