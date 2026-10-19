import { useEffect, useState, lazy, Suspense } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { usePrefersReducedMotion } from './lib/hooks';
import Hero from './components/Hero.jsx';

const MovieSagaPage = lazy(() => import('./pages/MovieSagaPage.jsx'));
const HouseSelection = lazy(() => import('./pages/HouseSelection.jsx'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage.jsx'));
const SponsorsPage = lazy(() => import('./pages/SponsorsPage.jsx'));

function getRouteFromHash() {
  const hash = typeof window !== 'undefined' ? window.location.hash.replace(/^#\/?/, '').toLowerCase() : '';
  if (hash === 'chronicle' || hash === 'movie-saga' || hash === 'saga') {
    return 'chronicle';
  }
  if (hash === 'houses' || hash === 'house' || hash.startsWith('house-') || /^h[1-8]$/.test(hash)) {
    return 'houses';
  }
  if (hash === 'leaderboard' || hash === 'standings' || hash === 'rankings') {
    return 'leaderboard';
  }
  if (hash === 'sponsors' || hash === 'sponsor' || hash === 'sponse') {
    return 'sponsors';
  }
  return 'home';
}

export default function App() {
  const reduced = usePrefersReducedMotion();
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    const handleHashChange = () => {
      const nextRoute = getRouteFromHash();
      setRoute(nextRoute);
      window.scrollTo(0, 0);
      if (nextRoute === 'home') {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToHome = () => {
    window.location.hash = '';
    setRoute('home');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <main>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#070608' }} />}>
          {route === 'chronicle' ? (
            <MovieSagaPage onBack={handleBackToHome} />
          ) : route === 'houses' ? (
            <HouseSelection onBack={handleBackToHome} />
          ) : route === 'leaderboard' ? (
            <LeaderboardPage onBack={handleBackToHome} />
          ) : route === 'sponsors' ? (
            <SponsorsPage onBack={handleBackToHome} />
          ) : (
            <Hero reduced={reduced} />
          )}
        </Suspense>
      </main>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
