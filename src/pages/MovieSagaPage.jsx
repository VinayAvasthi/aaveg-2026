import React from 'react';
import { ArrowLeft, Shield, Trophy, Film, Sparkles } from '../components/common/Icons';
import ThreeScrollExperience from '../components/home/ThreeScrollExperience';
import FestivalMovieJourney from '../components/home/FestivalMovieJourney';
import Button from '../components/common/Button';
import Magnetic from '../components/ui/Magnetic';
import ShinyText from '../components/ui/ShinyText';
import FloatingElements from '../components/ui/FloatingElements';

export default function MovieSagaPage({ onBack }) {
  const handleBackToHome = (e) => {
    if (e) e.preventDefault();
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  return (
    <div
      className="movie-saga-page"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#050608',
        color: '#F5EAEB',
        overflowX: 'hidden',
      }}
    >
      {/* 01. 3D Scroll Engine (Realistic Procedural Jack-o'-lanterns flythrough) */}
      <ThreeScrollExperience />

      {/* 02. Top Sub-Header & Sequence Breadcrumb Bar */}
      <div
        style={{
          paddingTop: '1.25rem',
          paddingBottom: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'linear-gradient(180deg, rgba(7, 6, 8, 0.96) 0%, rgba(7, 6, 8, 0.75) 80%, transparent 100%)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 170, 64, 0.18)',
        }}
      >
        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Previous Step: Back to Home Sanctum */}
          <Magnetic strength={0.2}>
            <button
              onClick={handleBackToHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#B8A8AB',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '8px 18px',
                borderRadius: '24px',
                background: 'rgba(20, 9, 14, 0.85)',
                border: '1px solid rgba(255, 170, 64, 0.35)',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFAA40';
                e.currentTarget.style.borderColor = '#FF2B3C';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 43, 60, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#B8A8AB';
                e.currentTarget.style.borderColor = 'rgba(255, 170, 64, 0.35)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ArrowLeft size={15} />
              <span>← PREVIOUS: SANCTUM</span>
            </button>
          </Magnetic>

          {/* Sequence Step Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '24px',
              background: 'rgba(229, 9, 20, 0.16)',
              border: '1px solid rgba(255, 170, 64, 0.45)',
              fontSize: '0.78rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FFAA40',
            }}
          >
            <Film size={14} />
            <span>PAGE 2 OF 3 • 4-ACT CINEMATIC CHRONICLE</span>
          </div>

          {/* Quick Direct Actions: House Selection & Leaderboard */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Magnetic strength={0.2}>
              <Button
                to="#houses"
                variant="primary"
                size="sm"
                icon={<Shield size={14} />}
                style={{ padding: '7px 16px', fontSize: '0.8rem', fontWeight: '800' }}
              >
                SELECT YOUR HOUSE
              </Button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <Button
                to="#leaderboard"
                variant="glass"
                size="sm"
                icon={<Trophy size={14} />}
                style={{
                  padding: '7px 16px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  border: '1px solid rgba(255, 170, 64, 0.4)',
                }}
              >
                VIEW LEADERBOARD →
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* 03. The Scrolling Movie Journey: 4 Acts */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <FestivalMovieJourney />
      </div>

      {/* 04. Bottom Sequence Milestone */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          padding: '4rem 1.5rem 6rem 1.5rem',
          background: 'linear-gradient(180deg, transparent 0%, rgba(12, 6, 9, 0.95) 40%, #050608 100%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: '3.5rem 2rem',
            borderRadius: '24px',
            background: 'radial-gradient(circle at center, rgba(32, 12, 18, 0.92) 0%, rgba(9, 4, 7, 0.98) 100%)',
            border: '1.5px solid rgba(255, 170, 64, 0.4)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(229, 9, 20, 0.25)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <FloatingElements duration={4} distance={4}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '20px',
                background: 'rgba(229, 9, 20, 0.18)',
                border: '1px solid rgba(255, 170, 64, 0.5)',
                color: '#FFAA40',
                fontSize: '0.8rem',
                fontWeight: '800',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={14} />
              <span>CHAPTER 2 COMPLETE // NEXT DESTINATION</span>
            </div>
          </FloatingElements>

          <h3
            style={{
              fontFamily: "'Cinzel Decorative', 'Anton', serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              lineHeight: '1.1',
              marginBottom: '1rem',
            }}
          >
            READY TO CLAIM THE{' '}
            <ShinyText color="#FF2B3C" shimmerColor="#FFEAA7" speed={3}>
              GOLDEN CROWN?
            </ShinyText>
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: '#B8A8AB',
              maxWidth: '650px',
              margin: '0 auto 2.5rem auto',
              lineHeight: '1.6',
            }}
          >
            Represent your fraternity in the arena, rack up house points across sports and cultural battles, and climb to the top of the live standings.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Magnetic strength={0.25}>
              <Button
                to="#houses"
                variant="primary"
                size="xl"
                icon={<Shield size={20} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 36px',
                  fontWeight: '800',
                  boxShadow: '0 0 35px rgba(255, 43, 60, 0.55), 0 8px 30px rgba(0,0,0,0.85)',
                }}
              >
                SELECT YOUR HOUSE →
              </Button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Button
                to="#leaderboard"
                variant="outline"
                size="xl"
                icon={<Trophy size={20} />}
                style={{
                  fontSize: '1.05rem',
                  padding: '16px 32px',
                  fontWeight: '800',
                }}
              >
                VIEW LIVE STANDINGS
              </Button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                onClick={handleBackToHome}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FFFFFF',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  padding: '16px 28px',
                  borderRadius: '30px',
                  background: 'rgba(28, 12, 18, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.75)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FFAA40';
                  e.currentTarget.style.color = '#FFAA40';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <ArrowLeft size={18} />
                <span>BACK TO SANCTUM</span>
              </button>
            </Magnetic>
        </div>
      </div>
    </div>
  </div>
);
}

