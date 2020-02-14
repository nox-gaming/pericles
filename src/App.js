import React from 'react';
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

import RedButton from './components/RedButton/RedButton'
import Home from './Pages/Home/Home'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    background-color: rgb(255, 254, 252);
  }
`

const AppWrapper = styled.div`
  display: grid;
`

function App() {
  return (
    <AppWrapper>
      <GlobalStyle whiteColor />
      <Home />
    </AppWrapper>
  );
}

export default App;
