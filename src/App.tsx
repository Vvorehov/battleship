import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from './store';
import Game from './components/Game';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <Game />
      </AppContainer>
    </Provider>
  );
}

export default App;
