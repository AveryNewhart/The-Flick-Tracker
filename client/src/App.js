import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider, 
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { Switch } from 'react-router-dom';
import './styles/App.css';
import AuthService from './utils/auth';

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SearchedContent from './pages/Searchedcontent';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
// import { ProtectedRoute } from './components/Nav';

// export const UserContext = React.createContext();

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route {...rest} render={(props) => (
  //     loggedIn ? <Component {...props} /> : <Navigate to='/login' />
  //   )} />
  // )
  // const auth = AuthService.loggedIn();
  // const navigate = useNavigate();

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-vh-100 main-div'
        // style={{ backgroundColor: "rgba(0, 0, 255, 0.1)"}}
        >
          <div>
            <Routes>
              <Route 
                path="/"
                element={<Homepage />}
              />
              <Route 
                path="/dashboard"
                element={<Dashboard />}
              />
                {/* <Route
          path="/dashboard"
          render={() => (isLoggedIn ? <Dashboard /> : <Navigate to="/login" />)}
        /> */}
              <Route 
                path="/login"
                element={<Login />}
              />
                      {/* <Route path="/login" render={() => <Login setIsLoggedIn={setIsLoggedIn} />} /> */}
              <Route 
                path="/signup" 
                element={<Signup />}
              />
                  <Route 
                path="/movie/:id" 
                // render={(props) => <SearchedContent {...props} match={props.match} />}
                //  component={SearchedContent}
                element={<SearchedContent />}
              />
              <Route 
                path="/profile"
                element={<Profile />} 
               />
               <Route 
                path="/user/:username"
                element={<User />} 
               />
                   {/* {auth && auth.user ? (
      <>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </>
    ) : (
      
      <Route path="/" element={<Login />} />
    )} */}
                  {/* <Route
          path="/profile"
          render={() => (isLoggedIn ? <Profile /> : <Navigate to="/login" />)}
        /> */}
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
