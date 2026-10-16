import { defineComponent, ref, type PropType } from 'vue'
import type { CatalogItem } from '../../data/catalog'
import './MovieCard.css'

export const MovieCard = defineComponent({
  name: 'MovieCard',
  props: { item: { type: Object as PropType<CatalogItem>, required: true }, rank: Number },
  setup(props) {
    const isOpen = ref(false)
    const imageFailed = ref(false)
    const posterBackground = () => props.item.posterUrl && !imageFailed.value ? `linear-gradient(to top,rgba(0,0,0,.72),transparent), url(${props.item.posterUrl}) center/cover` : props.item.tone
    return () => <article class={['movie-card', { 'movie-card--ranked': props.rank, 'movie-card--open': isOpen.value }]} tabindex="0" onClick={() => { isOpen.value = !isOpen.value }}>
      <span class="movie-card__rank">{props.rank}</span>
      <div class={['movie-card__poster', { 'movie-card__poster--fallback': !props.item.posterUrl || imageFailed.value }]} style={{ background: posterBackground() }}>
        {props.item.posterUrl && !imageFailed.value && <img src={props.item.posterUrl} alt="" onError={() => { imageFailed.value = true }} />}
        <span>{props.item.label && <small>{props.item.label}</small>}{!props.item.posterUrl || imageFailed.value ? <><small>포스터 없음</small>{props.item.title}</> : props.item.title}</span>
      </div>
      <div class="movie-card__details"><div><button aria-label={`${props.item.title} 재생`} class="movie-card__circle">▶</button><button aria-label={`${props.item.title} 찜하기`} class="movie-card__circle movie-card__circle--add">＋</button></div><p><b>{props.item.match}% 일치</b> &nbsp; {props.item.year} &nbsp; <i>16+</i></p><h3>{props.item.title}</h3><span class="movie-card__votes">평점 {props.item.match / 10 || 'NR'} · {props.item.voteCount?.toLocaleString() || 0}명 참여</span><span>{props.item.overview || '줄거리 정보가 없습니다.'}</span></div>
    </article>
  },
})
