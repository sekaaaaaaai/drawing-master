<!-- 出勤ページ -->

<template>
  <v-item-group selected-class="bg-primary">
    <v-container>
      <div class="text-h4">昼食</div>
      <v-row>
        <v-col
          v-for="menu in menus"
          :key="menu.value"
          cols="12"
          md="4"
        >
          <v-item v-slot="{ selectedClass, toggle }">
            <v-card
              :class="['d-flex align-center bg-grey', selectedClass]"
              height="80px"
              dark
              @click="toggle"
            >
              <div
                class="text-h3 flex-grow-1 text-center"
              >
                {{ menu.name }}
              </div>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>

</template>

<script setup lang="ts">

const menus = [
  {
    name: "弁当",
    value: "01"
  },
  {
    name: "おかず",
    value: "02"
  },
  {
    name: "注文なし",
    value: "03"
  }
]

</script>

