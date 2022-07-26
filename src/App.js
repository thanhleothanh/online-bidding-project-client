import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './components/NavigationBar';
import WelcomeScreen from './screens/WelcomeScreen';
import AuctionScreen from './screens/AuctionScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MyAuctionsScreen from './screens/MyAuctionsScreen';
import MyInterestedAuctionsScreen from './screens/MyInterestedAuctionsScreen';
import './index.css';
import ProfileScreen from './screens/ProfileScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import AdminAuctionScreen from './screens/AdminAuctionScreen';
import AdminReportScreen from './screens/AdminReportScreen';
import AdminProfileScreen from './screens/AdminProfileScreen';

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-row h-auto min-h-screen bg-gray-900 '>
        <NavigationBar />
        <Route path='/myAuctions' component={MyAuctionsScreen} />
        <Route
          path='/interestedAuctions'
          component={MyInterestedAuctionsScreen}
        />
        <Route path='/myProfile' component={MyProfileScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/signup' component={SignupScreen} />
        <Route path='/admin/auctions' component={AdminAuctionScreen} />
        <Route path='/admin/users' component={AdminProfileScreen} />
        <Route path='/admin/reports' component={AdminReportScreen} />
        <Route path='/auctions/:id' component={AuctionScreen} />
        <Route path='/profiles/:id' component={ProfileScreen} />
        <Route path='/' component={WelcomeScreen} exact />
        <ToastContainer
          position='bottom-right'
          autoClose={2000}
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
