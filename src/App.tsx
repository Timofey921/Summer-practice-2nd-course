import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './components/widgets/HomePage/HomePage.tsx';
import LogInPage from './components/pages/LogInPage/LogInPage.tsx';
import SignInPage from './components/pages/SignInPage/SignInPage.tsx';
import AuthorizedUserRoute from './routes/AuthorizedUserRoute.tsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signin" element={<SignInPage />} />

      <Route element={<AuthorizedUserRoute />}>
        <Route path="/workspace" element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;