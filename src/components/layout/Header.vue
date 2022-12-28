<template>
  <a-space align="start" style="justify-content: space-between;width: 100%">
    <h1 class="app-title">
      Title
    </h1>
    <a-menu class="app-menu" v-model:selected-keys="currentPage" @select="menuSelected" mode="horizontal" :theme="theme">
      <a-menu-item class="app-menu-item" v-for="item in navMenu" :key="item.key">
        <router-link :to="{name: item.key}">{{ item.title }}</router-link>
      </a-menu-item>
    </a-menu>
  </a-space>
</template>

<script setup>
import menu from "@/hooks/useNavMenu.js";
import {computed, onMounted, ref} from "vue";
import {useCache} from "@/stores/cache.js";
import {RouterLink} from "vue-router";

const Cache = useCache()
const navMenu = menu
let theme = computed(() => {
  return Cache.getTheme
})
let currentPage = ref([])
onMounted(()=>{
  currentPage.value = [getCurrentPageFromLocalStorage()]
  if(!currentPage.value) {
    setCurrentPageToLocalStorage('home')
  }
  Cache.currentPage = currentPage.value[0]
  console.log(currentPage.value[0], 'now')
  let themeLocalStorage = getThemeFromLocalStorage()
  if(!themeLocalStorage) {
    setThemeToLocalStorage(theme.value)
  } else {
    Cache.theme = themeLocalStorage
  }
  console.log('theme:', theme.value)
})

function getThemeFromLocalStorage() {
  return window.localStorage.getItem('theme')
}
function setThemeToLocalStorage(theme) {
  window.localStorage.setItem('theme', theme)
  return getThemeFromLocalStorage()
}

function getCurrentPageFromLocalStorage() {
  return window.localStorage.getItem('currentPage')
}
function setCurrentPageToLocalStorage(page) {
  window.localStorage.setItem('currentPage', page)
  return getCurrentPageFromLocalStorage()
}

function menuSelected(item) {
  console.log(item.key, 'selected')
  setCurrentPageToLocalStorage(item.key)
  Cache.currentPage = item.key
}
</script>

<style scoped>
.app-title {
  font-size: 24px;
  color: rgb(24, 144, 255);
}
.app-menu {
  line-height: 64px;
}
</style>
