<!-- 出勤ページ -->

<template>
  <v-container>
    <h2>新規図面</h2>

    <v-form @submit.prevent="postDrawing" class="mt-2">
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
        v-model="cadFile"
        variant="outlined"
        accept=".dwg,.dxf,.sldprt,.sldasm,.slddrw,.step,.stp,.iges,.igs,.stl"
        label="CADファイル"
        :rules="[rules.required]"
        show-size
        prepend-icon="mdi-file-cad"
      ></v-file-input>

      <v-file-input
        v-model="pdfFile"
        variant="outlined"
        accept=".pdf"
        label="PDFファイル"
        :rules="[rules.required]"
        show-size
        prepend-icon="mdi-file-pdf-box"
      ></v-file-input>

      <v-combobox
        variant="outlined"
        v-model="tags"
        :items="items"
        label="タグ"
        prepend-icon="mdi-tag"
        chips
        clearable
        closable-chips
        multiple
      >
        <template v-slot:chip="{ props, item }">
          <v-chip v-bind="props">
            <strong>{{ item.raw }}</strong>&nbsp;
            <span>(interest)</span>
          </v-chip>
        </template>
      </v-combobox>

      <v-textarea
        v-model="remarks"
        variant="outlined"
        label="備考"
        >
        
      </v-textarea>


      <v-btn class="mt-2" type="submit" color="primary" block>新図作成</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { post } from '../../api/Drawing';


const title = "新規図面";

const drawingNumber = ref('');
const drawingName = ref('');
const remarks = ref('');
const cadFile = ref<File | null>(null);
const pdfFile = ref<File | null>(null);
const tags = ref(['Programming', 'Playing video games', 'Watching movies', 'Sleeping'])
const items = ref(['Streaming', 'Eating'])

const rules = {
  required: (v: any) => !!v || '必須項目です',
};

const postDrawing = async () => {
  const formData = new FormData()
  // テキスト情報
  formData.append('drawing[number]', drawingNumber.value)
  formData.append('drawing[name]', drawingName.value)
  formData.append('drawing[remarks]', remarks.value)

  // ファイル添付
  if (cadFile.value) {
    formData.append('drawing[cad_file]', cadFile.value)
  }
  if (pdfFile.value) {
    formData.append('drawing[pdf_file]', pdfFile.value)
  }
  console.log(formData)

  try {
    const data = await post(formData)
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

defineExpose({
  title,
});
</script>

