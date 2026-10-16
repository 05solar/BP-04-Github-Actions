import type { CatalogItem } from '../data/catalog'

const API_BASE = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

export class TmdbError extends Error { constructor(public status: number, message: string) { super(message) } }
type TmdbMovie = { id: number; title: string; release_date?: string; overview?: string; vote_average: number; vote_count: number; poster_path?: string | null }
type TmdbResponse = { page: number; total_pages: number; results: TmdbMovie[] }
const toItem = (movie: TmdbMovie): CatalogItem => ({ id: movie.id, title: movie.title, year: movie.release_date?.slice(0, 4) || '개봉일 미정', match: Math.round(movie.vote_average * 10), voteCount: movie.vote_count, overview: movie.overview || '줄거리 정보가 없습니다.', tone: 'linear-gradient(145deg,#251127,#7e1d32)', posterUrl: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : undefined })

export async function fetchMovies({ apiKey, query = '', page = 1, signal }: { apiKey: string; query?: string; page?: number; signal?: AbortSignal }) {
  if (!apiKey.trim()) throw new TmdbError(0, 'TMDB API Key(v3)를 입력해주세요.')
  const endpoint = query.trim() ? '/search/movie' : '/movie/popular'
  const params = new URLSearchParams({ api_key: apiKey.trim(), language: 'ko-KR', page: String(page) })
  if (query.trim()) { params.set('query', query.trim()); params.set('include_adult', 'false') }
  const response = await fetch(`${API_BASE}${endpoint}?${params}`, { headers: { accept: 'application/json' }, signal })
  if (!response.ok) { const messages: Record<number, string> = { 401: 'API Key(v3)가 올바르지 않습니다.', 403: 'TMDB 접근 권한이 없습니다.', 429: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' }; throw new TmdbError(response.status, messages[response.status] || `TMDB 요청에 실패했습니다. (HTTP ${response.status})`) }
  const data = await response.json() as TmdbResponse
  if (!Array.isArray(data.results)) throw new TmdbError(0, 'TMDB 응답 형식이 올바르지 않습니다.')
  return { items: data.results.map(toItem), page: data.page, totalPages: Math.min(data.total_pages, 500) }
}
