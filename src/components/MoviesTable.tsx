import * as React from 'react'
import styled, { css } from 'styled-components'
import { Table } from './MaterialTable'
import { Paginator } from './Paginator'
import { Movie } from 'models/Movie'

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

const Sorter = styled.span`
  display: inline-block;
  margin-left: 5px;
  color: #999;
`

const PER_PAGE = 10
// prettier-ignore
const COLUMNS = [
  { isSortable: true, type: String, name: 'title', text: 'Title', width: '30%' },
  { isSortable: true, type: Number, name: 'year', text: 'Year', width: 'auto' },
  { isSortable: true, type: Number, name: 'runtime', text: 'Runtime', width: 'auto' },
  { isSortable: true, type: Number, name: 'revenue', text: 'Revenue', width: 'auto' },
  { isSortable: true, type: Number, name: 'rating', text: 'Rating', width: 'auto' },
  { isSortable: false, type: String, name: 'genre', text: 'Genres', width: '20%' },
]

interface MoviesTableProps {
  genres: string[]
  movies: Movie[]
}

interface MoviesTableState {
  currPage: number
  filter: string
  genre: string
  sortBy: number
  sortDir: number
}

export class MoviesTable extends React.PureComponent<
  MoviesTableProps,
  MoviesTableState
> {
  constructor(props: MoviesTableProps) {
    super(props)
    this.state = {
      currPage: 1,
      filter: '',
      genre: '',
      sortBy: 0,
      sortDir: 1,
    }
  }

  getFilteredMovies() {
    const { movies } = this.props
    const { filter, genre, sortBy, sortDir } = this.state
    const sortName = COLUMNS[sortBy].name
    const sortType = COLUMNS[sortBy].type
    return movies
      .filter((m, i) => {
        if (filter && !m.title.toLowerCase().includes(filter.toLowerCase())) {
          return false
        }
        if (genre && !m.genre.includes(genre)) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortType(a[sortName]) < sortType(b[sortName])) return -1 * sortDir
        if (sortType(a[sortName]) > sortType(b[sortName])) return 1 * sortDir
        return 0
      })
  }

  render() {
    const { genres } = this.props
    const { filter, currPage, sortBy, sortDir } = this.state

    const filteredMovies = this.getFilteredMovies()
    const pagedMovies = filteredMovies.slice(
      (currPage - 1) * PER_PAGE,
      (currPage - 1) * PER_PAGE + PER_PAGE,
    )

    const pagesCount = Math.ceil(filteredMovies.length / PER_PAGE)

    return (
      <>
        <Table
          isBordered
          isStriped
          isResponsive
          isHoverable={Boolean(pagedMovies.length)}
        >
          <thead>
            <tr>
              {COLUMNS.map((column, i) => (
                <th
                  style={{
                    cursor: column.isSortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: column.width,
                  }}
                  key={i}
                  onClick={
                    column.isSortable
                      ? () =>
                          this.setState({
                            currPage: 1,
                            sortBy: i,
                            sortDir: sortBy === i ? sortDir * -1 : 1,
                          })
                      : undefined
                  }
                >
                  {column.text}
                  {sortBy === i && <Sorter>{sortDir === 1 ? '⯆' : '⯅'}</Sorter>}
                </th>
              ))}
            </tr>
            <tr>
              <th colSpan={5}>
                <Input
                  placeholder="Filter by title"
                  type="text"
                  value={filter}
                  onChange={e =>
                    this.setState({ filter: e.target.value, currPage: 1 })
                  }
                />
              </th>
              <th>
                <Select
                  defaultValue=""
                  onChange={e =>
                    this.setState({ genre: e.target.value, currPage: 1 })
                  }
                >
                  <option value="">No genre selected</option>
                  <option value="-" disabled>
                    ---
                  </option>
                  {genres.map((genre, i) => (
                    <option key={i} value={genre}>
                      {genre}
                    </option>
                  ))}
                </Select>
              </th>
            </tr>
          </thead>
          <tbody>
            {!pagedMovies.length && (
              <tr>
                <td colSpan={6}>Nothing found</td>
              </tr>
            )}
            {pagedMovies.map((movie, i) => (
              <tr key={i}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.runtime}</td>
                <td>{movie.revenue || 0}</td>
                <td>{movie.rating}</td>
                <td>{movie.genre.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Paginator
          total={pagesCount}
          current={currPage}
          onChange={i => this.setState({ currPage: i })}
        />
      </>
    )
  }
}
