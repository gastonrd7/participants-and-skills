import React from 'react';
import { Provider } from 'react-redux';
import { ParticipantsContainer } from './containers/Participants';
import { store } from './store';
// import logo from './logo.svg';
// import './App.css';

export const App: React.FC = () => (
  <Provider store={store}>
     <ParticipantsContainer />
  </Provider>
);
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
