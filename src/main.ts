import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faSquare, faTrashCan)

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
