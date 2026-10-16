export type CatalogItem = { id?: number; title: string; year: string; match: number; voteCount?: number; overview?: string; tone: string; posterUrl?: string; label?: string }

export const popular: CatalogItem[] = [
  { title: '미드나잇 시그널', year: '2026', match: 98, tone: 'linear-gradient(145deg,#230b35,#c31432)' },
  { title: '라스트 호라이즌', year: '2026', match: 96, tone: 'linear-gradient(145deg,#102f48,#9c536d)' },
  { title: '폴 이후', year: '2025', match: 95, tone: 'linear-gradient(145deg,#3a1b55,#d26a75)' },
  { title: '네온 시티', year: '2026', match: 94, tone: 'linear-gradient(145deg,#00416a,#7da1b3)' },
  { title: '와일드 커런트', year: '2025', match: 93, tone: 'linear-gradient(145deg,#134e5e,#71b280)' },
  { title: '윈터 코드', year: '2026', match: 92, tone: 'linear-gradient(145deg,#141e30,#35506e)' },
]

export const lessons: CatalogItem[] = [
  { title: 'TMDB 계정 만들기', year: '실습 01', match: 100, tone: 'linear-gradient(145deg,#4b134f,#c94b4b)', label: '시작하기' },
  { title: 'Vue 스타터 실행하기', year: '실습 02', match: 100, tone: 'linear-gradient(145deg,#16222a,#3a6073)' },
  { title: '인기 영화 불러오기', year: '실습 03', match: 100, tone: 'linear-gradient(145deg,#283048,#859398)' },
  { title: '영화 검색 추가하기', year: '실습 04', match: 100, tone: 'linear-gradient(145deg,#3e5151,#decba4)' },
  { title: '정적 파일 배포하기', year: '실습 05', match: 100, tone: 'linear-gradient(145deg,#1d4350,#a43931)' },
]
