import { ArrowLeft, Shield, Film } from '../components/common/Icons';
import HostelWars from '../components/home/HostelWars';
import GridBackground from '../components/ui/GridBackground';
import ShinyText from '../components/ui/ShinyText';
import Magnetic from '../components/ui/Magnetic';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';


export default function LeaderboardPage({ onBack }) {
  const handleBackToHome = (e) => {
    if (e) e.preventDefault();
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  const handleNavigateToChronicle = (e) => {
    if (e) e.preventDefault();
    window.location.hash = 'chronicle';
  };



  return (
    <div
      className="leaderboard-page"
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '5rem',
        backgroundColor: '#050608',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'visible',
        width: '100%',
        color: '#F5EAEB',
      }}
    >
      <GridBackground color="rgba(255, 43, 60, 0.05)" maskRadius="60%" />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Magnetic strength={0.2}>
              <button
                onClick={handleBackToHome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#B8A8AB',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '7px 16px',
                  borderRadius: '20px',
                  background: 'rgba(20, 9, 14, 0.85)',
                  border: '1px solid rgba(255, 170, 64, 0.35)',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFAA40';
                  e.currentTarget.style.borderColor = '#FF2B3C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#B8A8AB';
                  e.currentTarget.style.borderColor = 'rgba(255, 170, 64, 0.35)';
                }}
              >
                <ArrowLeft size={16} />
                <span>
                  <ShinyText color="#FFAA40" shimmerColor="#FFFFFF">
                    BACK TO SANCTUM
                  </ShinyText>
                </span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                onClick={handleNavigateToChronicle}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#B8A8AB',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '7px 14px',
                  borderRadius: '20px',
                  background: 'rgba(20, 9, 14, 0.75)',
                  border: '1px solid rgba(255, 170, 64, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFAA40')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B8A8AB')}
              >
                <Film size={14} />
                <span>MOVIE SAGA</span>
              </button>
            </Magnetic>


          </div>

          <Magnetic strength={0.2}>
            <Button
              to="#houses"
              variant="primary"
              size="sm"
              icon={<Shield size={14} />}
              style={{ fontWeight: '800', padding: '7px 18px' }}
            >
              SELECT YOUR HOUSE
            </Button>
          </Magnetic>
        </div>
      </div>

      <HostelWars />
      <Footer />
    </div>
  );
}
