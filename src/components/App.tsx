import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import 'utils/defaultStyles'
import { Movie } from 'models/Movie'
import { State } from 'models/State'
import { MoviesTable } from './MoviesTable'

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
`

interface AppProps {}

interface StateProps {
  genres?: string[]
  movies?: Movie[]
}

type EnhancedProps = AppProps & StateProps

export const App = connect<StateProps>((state: State) => {
  const { data, isFetching } = state.movies

  return {
    genres:
      (!isFetching &&
        data &&
        data
          .reduce<string[]>(
            (genres, movie) => [
              ...genres,
              ...movie.genre.filter(g => genres.indexOf(g) === -1),
            ],
            [],
          )
          .sort((a, b) => {
            if (a < b) return -1
            if (a > b) return 1
            return 0
          })) ||
      undefined,
    movies: (!isFetching && data) || undefined,
  }
})(({ genres, movies }: EnhancedProps) => (
  <AppRoot>
    {genres && movies ? (
      <MoviesTable genres={genres} movies={movies} />
    ) : (
      <div>Loading...</div>
    )}
  </AppRoot>
))
