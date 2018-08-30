import { Movie } from 'models/Movie'

export interface MoviesState {
  data?: Movie[]
  isFetching: boolean
}
