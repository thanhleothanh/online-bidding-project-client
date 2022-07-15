import { BrowserRouter, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import WelcomeScreen from './screens/WelcomeScreen';
import AuctionScreen from './screens/AuctionScreen';
import { Entry } from './screens/Entry';

function App() {
  return (
    <BrowserRouter basename='/'>
      <main className='flex flex-row h-auto min-h-screen bg-gray-900'>
        <NavigationBar />
        <Route path='/' component={WelcomeScreen} exact />
        <Route path='/auctions/:id' component={AuctionScreen} />
        <Route path='/login' component={Entry} />
      </main>
    </BrowserRouter>
  );
}

export default App;
