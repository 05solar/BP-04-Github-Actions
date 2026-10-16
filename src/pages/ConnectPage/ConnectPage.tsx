// 페이지: ConnectPage. 주요 컴포넌트: 개인 TMDB API Key(v3) 연결 폼.
import { defineComponent, ref } from 'vue'
import { fetchMovies } from '../../api/tmdb'
import './ConnectPage.css'

export const ConnectPage = defineComponent({
  name: 'ConnectPage', emits: ['connect'],
  setup(_, { emit }) {
    const key = ref('')
    const error = ref('')
    const validating = ref(false)
    const connect = async () => {
      if (!key.value.trim() || validating.value) return
      validating.value = true
      error.value = ''
      try { await fetchMovies({ apiKey: key.value, page: 1 }); emit('connect', key.value.trim()) }
      catch (caught) { error.value = caught instanceof Error ? caught.message : 'API Key를 확인할 수 없습니다. 다시 입력해주세요.' }
      finally { validating.value = false }
    }
    return () => <main class="connect-page"><section class="connect-page__panel"><p>낫플릭스 · TMDB</p><h1>영화 이야기가<br />지금 시작됩니다.</h1><form onSubmit={(event) => { event.preventDefault(); void connect() }}><label for="api-key">TMDB API Key (v3)</label><div><input id="api-key" type="password" value={key.value} onInput={(event) => { key.value = (event.target as HTMLInputElement).value }} placeholder="개인 API Key(v3)를 입력하세요" aria-invalid={Boolean(error.value)} required /><button type="submit" disabled={validating.value}>{validating.value ? '확인 중…' : '연결'}</button></div></form>{error.value && <p class="connect-page__error" role="alert">{error.value} API Key(v3)를 다시 확인해 입력해주세요.</p>}<small>키는 이 탭의 메모리에만 보관되며 새로고침하면 삭제됩니다.</small></section></main>
  },
})
