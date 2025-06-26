<!-- 出勤ページ -->

<template>
  <v-container>
    <h2>{{ drawing.number }} - {{ title }}</h2>

    <v-form @submit.prevent="postDrawing" class="mt-2">
      <v-text-field
        v-model="drawingNumber"
        :rules="[rules.required]"
        label="改訂記号"
        variant="outlined"
      ></v-text-field>

      <v-file-input
        v-model="cadFiles"
        variant="outlined"
        accept=".dwg,.dxf,.sldprt,.sldasm,.slddrw,.step,.stp,.iges,.igs,.stl"
        label="CADファイル"
        :rules="[rules.required]"
        show-size
        prepend-icon="mdi-file-cad"
        multiple
      ></v-file-input>

      <v-file-input
        v-model="pdfFiles"
        variant="outlined"
        accept=".pdf"
        label="PDFファイル"
        :rules="[rules.required]"
        show-size
        prepend-icon="mdi-file-pdf-box"
        multiple
      ></v-file-input>

      <v-textarea
        v-model="remarks"
        variant="outlined"
        label="備考"
        >
        
      </v-textarea>


      <v-btn class="mt-2" type="submit" color="success" block>改訂</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { find, post, type DrawingRecord } from '../../api/Drawing';

const props = defineProps<{
  id: number
}>();

const title = "図面改訂";
const drawing = ref<DrawingRecord>();


const drawingNumber = ref('');
const drawingName = ref('');
const remarks = ref('');
const cadFiles = ref<File[]>([]);
const pdfFiles = ref<File[]>([]);
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
  tags.value.forEach(tag => {
    formData.append('tags[]', tag) // タグ追加
  })

  // ファイル添付
  console.log(cadFiles.value);
  cadFiles.value.forEach(file => {
    formData.append('drawing_revision[cad_files]', file)
  })
  pdfFiles.value.forEach(file => {
    formData.append('drawing_revision[pdf_files]', file)
  })
  console.log(formData)


  try {
    const data = await post(formData)
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  drawing.value = await find(props.id)
})

defineExpose({
  title,
});
</script>

