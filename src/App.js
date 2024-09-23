import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Tagline from './components/Tagline';
import './App.css';




function App() {
  return (
    <div style={{width:'100%'}}>
      <Banner/>
      <Navbar/>
      <Details/>
      <Tagline/>
    </div>
  
  );
}

export default App;
