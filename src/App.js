import { BrowserRouter, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';

function App() {
  return (
    <BrowserRouter basename='/'>
      <main className='h-auto min-h-screen'>
        <Route path='/' component={WelcomeScreen} />
      </main>
    </BrowserRouter>
  );
}

export default App;
