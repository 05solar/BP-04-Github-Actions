import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { AppHeader } from './components/AppHeader/AppHeader'
import { ConnectPage } from './pages/ConnectPage/ConnectPage'
import { HomePage } from './pages/HomePage/HomePage'
import { PopularPage } from './pages/PopularPage/PopularPage'

export default defineComponent({
  name: 'App',
  setup() {
    const apiKey = ref('')
    const hash = ref(window.location.hash)
    const updateRoute = () => { hash.value = window.location.hash }
    const page = computed(() => hash.value.startsWith('#popular') ? 'popular' : 'home')
    const searchQuery = computed(() => new URLSearchParams(hash.value.split('?')[1] || '').get('query') || '')
    const navigate = (nextPage: 'home' | 'popular') => { window.location.hash = nextPage === 'popular' ? 'popular' : 'home' }
    const search = (query: string) => { window.location.hash = `popular${query.trim() ? `?query=${encodeURIComponent(query.trim())}` : ''}` }
    onMounted(() => window.addEventListener('hashchange', updateRoute))
    onUnmounted(() => window.removeEventListener('hashchange', updateRoute))
    return () => !apiKey.value ? <ConnectPage onConnect={(value: string) => { apiKey.value = value }} /> : <><AppHeader activePage={page.value} onNavigate={navigate} onSearch={search} />{page.value === 'popular' ? <PopularPage apiKey={apiKey.value} query={searchQuery.value} /> : <HomePage apiKey={apiKey.value} />}</>
  },
})
