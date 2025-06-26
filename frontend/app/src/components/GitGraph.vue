<template>
  <div ref="gitgraphContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createGitgraph } from '@gitgraph/js'

const gitgraphContainer = ref(null)


onMounted(() => {
  const gitgraph = createGitgraph(gitgraphContainer.value)
  
  const master = gitgraph.branch('master')
  master.commit({
    subject: '新規図面',
    author: ' <坂井 聖士>',
    hash: 'C14531',
  })
  
  const develop = gitgraph.branch('develop')
  develop.commit({
    subject: '新規図面(派生)',
    author: ' <坂井 聖士>',
    hash: 'C14700',
  })
  develop.commit({
    subject: '改訂',
    author: ' <坂井 聖士>',
    hash: 'C1470a0',
  })
  
})
</script>