<!-- メッセージBOX -->

<template>
  <v-container>
    <v-card
      :color="COLOR_MAP[colorType]"
      class="d-flex align-center"
      height="100%">
      <v-card-text :class="['text-pre-wrap']" style="font-size: 2rem;">
        {{ message }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineExpose } from 'vue';

const props = defineProps<{ defaultMessage: string }>()
const message = ref('')
const timeoutId = ref<number>();

// メッセージ枠の色制御
type ColorType = 'default' | 'success' | 'error' | 'info' | 'warning';

const COLOR_MAP: Record<ColorType, string> = {
  default: 'white',
  success: 'green-lighten-3',
  error: 'red-lighten-3',
  info: 'blue-lighten-3',
  warning: 'amber-lighten-3',
};
const colorType = ref<ColorType>('default')

// メッセージを表示
const setMessage = (newMessage: string, newColorType: ColorType = 'default') => {
  message.value = newMessage
  colorType.value = newColorType
  if (timeoutId) {
    clearTimeout(timeoutId.value)
    timeoutId.value = undefined
  }
}

// 時間経過でデフォルトメッセージに戻るメッセージを表示
interface SetTimeoutMessageOptions {
  colorType?: ColorType;
  timeout?: number;
}
const setTimeoutMessage = (newMessage: string, options: SetTimeoutMessageOptions = {}) => {
  const { colorType = 'default', timeout = 5000 } = options;
  setMessage(newMessage, colorType) // メッセージをセット
  setResetMessageTimeout(timeout) // 時間経過で元のメッセージに戻すタイムアウトを設定
}

// 時間経過で元のメッセージに戻すタイムアウトを設定
const setResetMessageTimeout = (timeout: number = 5000) => {
  clearResetMessageTimeout() // 設定前に前のタイムアウトを解除
  timeoutId.value = setTimeout(() => {
    setMessage(props.defaultMessage)
  }, timeout);
}

// 時間経過で元のメッセージに戻すタイムアウトを解除
const clearResetMessageTimeout = () => {
  if (timeoutId.value) { // タイムアウトが設定されている場合
    clearTimeout(timeoutId.value) // タイムアウトを解除
    timeoutId.value = undefined // IDをリセット
  }
}

onMounted(() => {
  message.value = props.defaultMessage
}),

onUnmounted(() => {
  clearResetMessageTimeout()
})

// 親からアクセスできるように関数を公開
defineExpose({
  setMessage,
  setTimeoutMessage,
  setResetMessageTimeout
});
</script>

