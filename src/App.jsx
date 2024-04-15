import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Wallpaper from './components/Wallpaper/Wallpaper';
import Weather from './components/Weather/Weather';
import {Container} from  'react-bootstrap'

function App() {
  return (
    <>
      <Wallpaper/>
      <Container>
        <SearchBar/>
        <Weather/>
      </Container>
      
    </>
  );
}

export default App;
