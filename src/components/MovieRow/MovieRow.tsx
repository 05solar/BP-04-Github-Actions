import { defineComponent, type PropType } from 'vue'
import type { CatalogItem } from '../../data/catalog'
import { MovieCard } from '../MovieCard/MovieCard'
import './MovieRow.css'

export const MovieRow = defineComponent({
  name: 'MovieRow',
  props: { title: { type: String, required: true }, items: { type: Array as PropType<CatalogItem[]>, required: true }, ranked: Boolean, onViewAll: Function as PropType<() => void> },
  setup(props) {
    return () => <section class={['movie-row', { 'movie-row--top': props.ranked }]}><div class="movie-row__heading"><h2>{props.title}</h2><a href="#popular" onClick={(event) => { if (props.onViewAll) { event.preventDefault(); props.onViewAll() } }}>전체 보기 ›</a></div><div class="movie-row__track">{props.items.map((item, index) => <MovieCard key={item.id ?? item.title} item={item} rank={props.ranked ? index + 1 : undefined} />)}</div></section>
  },
})
