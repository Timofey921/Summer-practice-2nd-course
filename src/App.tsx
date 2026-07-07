import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './UI/pages/HomePage/HomePage.tsx';
import LogInPage from './UI/pages/LogInPage/LogInPage.tsx';
import SignInPage from './UI/pages/SignInPage/SignInPage.tsx';
import AuthorizedUserRoute from './routes/AuthorizedUserRoute';

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