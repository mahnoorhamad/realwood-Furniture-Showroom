import {useEffect, useState, type ReactNode} from 'react';
import {Route, Routes, useLocation, Navigate} from 'react-router-dom';
import {APIProvider} from '@vis.gl/react-google-maps';
import {Layout} from './components/Layout';
import {HomePage} from './pages/HomePage';
import {CollectionsPage} from './pages/CollectionsPage';
import {AboutContactPage} from './pages/AboutContactPage';

function MapsProviderWrapper({children}: {children: ReactNode}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  if (!apiKey) {
    return <>{children}</>;
  }
  return (
    <APIProvider apiKey={apiKey} libraries={['places', 'marker']} language="en" region="PK">
      {children}
    </APIProvider>
  );
}

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [pathname]);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  return (
    <MapsProviderWrapper>
      <Layout quotaExceeded={quotaExceeded}>
        <Routes>
          <Route path="/" element={<HomePage quotaExceeded={quotaExceeded} />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route
            path="/about-contact"
            element={<AboutContactPage quotaExceeded={quotaExceeded} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </MapsProviderWrapper>
  );
}
