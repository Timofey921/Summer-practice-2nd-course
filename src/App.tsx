import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/widgets/HomePage/HomePage.tsx';
import LogInPage from './components/pages/LogInPage/LogInPage.tsx';
import SignInPage from './components/pages/SignInPage/SignInPage.tsx';
import AuthorizedUserRoute from './routes/AuthorizedUserRoute.tsx';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage.tsx';
import Welcome from './components/widgets/Welcome/Welcome.tsx';
import Profile from './components/pages/Profile/Profile.tsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signin" element={<SignInPage />} />

      <Route element={<AuthorizedUserRoute />}>
        <Route path="/workspace" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;