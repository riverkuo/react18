import './App.css';
import { Home } from './layput/home';
function App() {
  console.log('access server base url from secrets', process.env.REACT_APP_SERVER_BASE_URL);
  return <Home />;
}

export default App;
