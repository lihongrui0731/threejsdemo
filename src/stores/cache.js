import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useCache = defineStore('cache', () => {
    // theme
    const theme = ref('dark');
    const getTheme = computed(() => {
        return theme.value
    })

    //page
    const currentPage = ref('')
    const getCurrentPage = computed(() => {
        return currentPage.value
    })

    return {theme, getTheme, currentPage, getCurrentPage}
})
