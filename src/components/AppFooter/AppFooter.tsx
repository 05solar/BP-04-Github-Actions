import { defineComponent } from 'vue'
import './AppFooter.css'

export const AppFooter = defineComponent({
  name: 'AppFooter',
  setup() {
    return () => <footer class="app-footer"><strong>낫플릭스</strong><p>이 제품은 TMDB API를 사용하지만 TMDB의 보증이나 인증을 받지 않았습니다. 영화 데이터와 포스터를 불러오려면 인터넷 연결이 필요합니다.</p><p>인기 영화 · 현재 상영작 · 영화 검색 · 페이지 이동</p></footer>
  },
})
