// 페이지: PopularPage. 주요 컴포넌트: MovieRow, AppFooter.
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { fetchMovies } from '../../api/tmdb'
import { AppFooter } from '../../components/AppFooter/AppFooter'
import { MovieRow } from '../../components/MovieRow/MovieRow'
import type { CatalogItem } from '../../data/catalog'
import './PopularPage.css'

export const PopularPage = defineComponent({
  name: 'PopularPage',
  props: { apiKey: { type: String, required: true }, query: { type: String, required: true } },
  setup(props) {
    const movies = ref<CatalogItem[]>([])
    const page = ref(1)
    const totalPages = ref(1)
    const loading = ref(false)
    const error = ref('')
    const title = ref('인기 콘텐츠')
    let controller: AbortController | undefined
    const load = async (nextPage = 1) => { controller?.abort(); controller = new AbortController(); const timer = window.setTimeout(() => controller?.abort(), 15000); loading.value = true; error.value = ''; try { const response = await fetchMovies({ apiKey: props.apiKey, query: props.query, page: nextPage, signal: controller.signal }); movies.value = response.items; page.value = response.page; totalPages.value = response.totalPages; title.value = props.query ? `“${props.query}” 검색 결과` : '인기 콘텐츠' } catch (caught) { if ((caught as Error).name !== 'AbortError') error.value = (caught as Error).message || '콘텐츠를 불러오지 못했습니다.' } finally { clearTimeout(timer); loading.value = false } }
    watch(() => props.query, () => { window.scrollTo({ top: 0 }); void load() })
    onMounted(() => { void load() })
    onUnmounted(() => controller?.abort())
    return () => <div class="popular-page"><main class="popular-page__content"><header class="popular-page__heading"><p>낫플릭스</p><h1>{title.value}</h1><span>{props.query ? '검색 결과를 확인해보세요.' : '인기 영화를 둘러보세요.'}</span></header>{error.value ? <div class="popular-page__error"><p class="popular-page__state popular-page__state--error">{error.value}</p><button onClick={() => void load(page.value)}>현재 검색 다시 시도</button></div> : movies.value.length ? <><MovieRow title={title.value} items={movies.value.slice(0, 18)} /><nav class="popular-page__pagination"><button disabled={page.value <= 1 || loading.value} onClick={() => void load(page.value - 1)}>이전</button><span>{page.value} / {totalPages.value} 페이지</span><button disabled={page.value >= totalPages.value || loading.value} onClick={() => void load(page.value + 1)}>다음</button></nav></> : <p class="popular-page__state">{loading.value ? '콘텐츠를 불러오는 중입니다…' : '검색 결과가 없습니다.'}</p>}</main><AppFooter /></div>
  },
})
