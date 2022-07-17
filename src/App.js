import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './components/NavigationBar';
import WelcomeScreen from './screens/WelcomeScreen';
import AuctionScreen from './screens/AuctionScreen';
import MyAuctionsScreen from './screens/MyAuctionsScreen';
import { Entry } from './screens/Entry';

function App() {
  return (
    <BrowserRouter basename='/'>
      <main className='flex flex-row h-auto min-h-screen bg-gray-900 scrollbar-none'>
        <NavigationBar />
        <Route path='/' component={WelcomeScreen} exact />
        <Route path='/myAuctions' component={MyAuctionsScreen} />
        <Route path='/auctions/:id' component={AuctionScreen} />
        <Route path='/entry' component={Entry} />
        <ToastContainer
          position='bottom-right'
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </main>
    </BrowserRouter>
  );
}

export default App;
