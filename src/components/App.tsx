import * as React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import 'utils/defaultStyles'
import { Table } from './MaterialTable'
import { Movie } from 'models/Movie'
import { State } from 'models/State'

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;
`

const controlStyle = css`
  border: 1px solid #e1e1e1;
  padding: 0.5em 1em;
  border-radius: 3px;
  width: 100%;
  line-height: 1;
`

const Input = styled.input`
  ${controlStyle};
`

const Select = styled.select`
  ${controlStyle};
`

// ⯆⯅

const COLUMNS = ['Title', 'Year', 'Runtime', 'Revenue', 'Rating', 'Genres']

interface AppProps {}

interface StateProps {
  movies?: Movie[]
}

export const App = connect<StateProps>((state: State) => ({
  movies: (!state.movies.isFetching && state.movies.data) || undefined,
}))(
  class extends React.PureComponent<AppProps & StateProps> {
    render() {
      const { movies } = this.props
      return (
        <AppRoot>
          <Table
            isBordered
            isStriped
            isResponsive
            isHoverable={Boolean(movies)}
          >
            <thead>
              <tr>
                {COLUMNS.map((column, i) => (
                  <th key={i}>{column}</th>
                ))}
              </tr>
              <tr>
                <th colSpan={5}>
                  <Input type="text" placeholder="Filter by title" />
                </th>
                <th>
                  <Select name="" id="">
                    <option value="">1</option>
                    <option value="">2</option>
                  </Select>
                </th>
              </tr>
            </thead>
            <tbody>
              {!movies && (
                <tr>
                  <td colSpan={6}>Loading...</td>
                </tr>
              )}
              {movies &&
                movies.map((movie, i) => (
                  <tr key={i}>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.runtime}</td>
                    <td>{movie.revenue}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.genre.join(', ').slice(0, -2)}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </AppRoot>
      )
    }
  },
)
