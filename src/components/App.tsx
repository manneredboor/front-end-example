import * as React from 'react'
import styled, { css } from 'styled-components'
import { Table } from './MaterialTable'
import 'utils/defaultStyles'

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

export const App = () => {
  return (
    <AppRoot>
      <Table
        isBordered
        isStriped
        isResponsive
      >
        <thead>
          <tr>
            {[
              'Title',
              'Year',
              'Runtime',
              'Revenue',
              'Rating',
              'Genres',
            ].map((t, i) => (<th key={i}>{t}</th>))}
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
          {[...(Array(5))].map((_, i) => (
            <tr key={i}>
              <td>Guards</td>
              <td>2014</td>
              <td>2h</td>
              <td>$333.3</td>
              <td>8.1</td>
              <td>Action, adventure, sci-fi</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AppRoot>
  )
}
