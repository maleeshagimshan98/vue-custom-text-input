import {createApp} from 'vue'

console.log(createApp)
import component from './App.vue'

const app = createApp(component)

app.mount('#app')