// 페이지: HomePage. 주요 컴포넌트: HeroBanner, MovieRow, AppFooter.
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { fetchMovies } from '../../api/tmdb'
import { AppFooter } from '../../components/AppFooter/AppFooter'
import { HeroBanner } from '../../components/HeroBanner/HeroBanner'
import { MovieRow } from '../../components/MovieRow/MovieRow'
import type { CatalogItem } from '../../data/catalog'
import './HomePage.css'

export const HomePage = defineComponent({
  name: 'HomePage', props: { apiKey: { type: String, required: true } },
  setup(props) {
    const movies = ref<CatalogItem[]>([]); const loading = ref(true); const error = ref(''); let controller: AbortController | undefined
    const load = async () => { controller?.abort(); controller = new AbortController(); const timer = window.setTimeout(() => controller?.abort(), 15000); loading.value = true; error.value = ''; try { movies.value = (await fetchMovies({ apiKey: props.apiKey, signal: controller.signal })).items } catch (caught) { if ((caught as Error).name !== 'AbortError') error.value = (caught as Error).message || '콘텐츠를 불러오지 못했습니다.' } finally { clearTimeout(timer); loading.value = false } }
    onMounted(() => { void load() }); onUnmounted(() => controller?.abort())
    const viewAll = () => { window.location.hash = 'popular' }
    return () => <div class="home-page"><HeroBanner movie={movies.value[0]} /><main class="home-page__content">{loading.value ? <p class="home-page__state">인기 콘텐츠를 불러오는 중입니다…</p> : error.value ? <div class="home-page__error"><p class="home-page__state home-page__state--error">{error.value}</p><button onClick={() => void load()}>다시 시도</button></div> : movies.value.length ? <MovieRow title="낫플릭스 인기 콘텐츠" items={movies.value.slice(0, 6)} onViewAll={viewAll} /> : <p class="home-page__state">표시할 콘텐츠가 없습니다.</p>}</main><AppFooter /></div>
  },
})
