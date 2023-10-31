import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './components/AllRoutes';
import styled from 'styled-components';

function App() {
  return (
    <DIV className="App">
      <Navbar/>
      <AllRoutes/>
    </DIV>
  );
}

export default App;

const DIV=styled.div`
  background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% );
  height: 850px;
`