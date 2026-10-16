import { defineComponent, type PropType } from 'vue'
import type { CatalogItem } from '../../data/catalog'
import './HeroBanner.css'

export const HeroBanner = defineComponent({
  name: 'HeroBanner',
  props: { movie: Object as PropType<CatalogItem | undefined> },
  setup(props) {
    const browse = () => document.querySelector('#popular')?.scrollIntoView({ behavior: 'smooth' })
    const connect = () => document.querySelector('#connect')?.scrollIntoView({ behavior: 'smooth' })
    const title = () => props.movie?.title || '지금 뜨는 영화'
    const poster = () => props.movie?.posterUrl ? { background: `url(${props.movie.posterUrl}) center/cover` } : undefined

    return () => <section id="home" class="hero-banner">
      <div class="hero-banner__art" aria-hidden="true" />
      <div class="hero-banner__poster" style={poster()} aria-hidden="true" />
      <div class="hero-banner__content">
        <p class="hero-banner__eyebrow">낫플릭스 추천</p>
        <h1>{title()}</h1>
        <div class="hero-banner__meta"><span>{props.movie?.match || 0}% 일치</span><span>{props.movie?.year || '공개 예정'}</span><span class="hero-banner__rating">15+</span><span>영화</span></div>
        <p class="hero-banner__description">지금 낫플릭스에서 가장 많은 사랑을 받고 있는 작품입니다. 마음에 드는 이야기를 바로 찾아보세요.</p>
        <div class="hero-banner__actions"><button class="hero-banner__play" onClick={browse}>▶ 재생</button><button class="hero-banner__info" onClick={connect}>ⓘ 상세 정보</button></div>
      </div>
    </section>
  },
})
