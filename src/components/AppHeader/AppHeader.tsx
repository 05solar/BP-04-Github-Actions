import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import './AppHeader.css'

export const AppHeader = defineComponent({
  name: 'AppHeader',
  props: { activePage: { type: String, required: true } },
  emits: ['navigate', 'search'],
  setup(props, { emit }) {
    const isScrolled = ref(false)
    const query = ref('')
    const updateScroll = () => { isScrolled.value = window.scrollY > 32 }
    const submit = () => emit('search', query.value)
    const navigate = (page: 'home' | 'popular') => emit('navigate', page)
    onMounted(() => window.addEventListener('scroll', updateScroll))
    onUnmounted(() => window.removeEventListener('scroll', updateScroll))

    return () => <header class={['app-header', { 'app-header--scrolled': isScrolled.value }]}>
      <a class="app-header__brand" href="#home" onClick={(event) => { event.preventDefault(); navigate('home') }}>낫플릭스</a>
      <nav class="app-header__nav" aria-label="주요 메뉴">
        <a class={['app-header__link', { 'app-header__link--active': props.activePage === 'home' }]} href="#home" onClick={(event) => { event.preventDefault(); navigate('home') }}>홈</a>
        <a class={['app-header__link', { 'app-header__link--active': props.activePage === 'popular' }]} href="#popular" onClick={(event) => { event.preventDefault(); navigate('popular') }}>인기 콘텐츠</a>
      </nav>
      <div class="app-header__actions"><form class="app-header__search" onSubmit={(event) => { event.preventDefault(); submit() }}><input value={query.value} onInput={(event) => { query.value = (event.target as HTMLInputElement).value }} aria-label="낫플릭스 검색" placeholder="제목, 배우, 감독으로 검색" /><button type="submit" aria-label="검색">⌕</button></form><span class="app-header__avatar">무</span></div>
    </header>
  },
})
