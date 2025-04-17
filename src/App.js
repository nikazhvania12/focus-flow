import './App.css';
import Filter from './Components/Filter/Filter';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
        <Header />
        <Filter />
        <Home />
    </div>
  );
}

export default App;
