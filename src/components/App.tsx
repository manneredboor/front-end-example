import * as React from 'react'
import styled from 'styled-components'
import { colors } from 'utils/styles'
import 'utils/defaultStyles'

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.bg};
`

export const App = () => {
  return (
    <AppRoot>
      <div>App</div>
    </AppRoot>
  )
}
