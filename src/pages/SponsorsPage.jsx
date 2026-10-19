import React from 'react';
import { ArrowLeft, Film, Shield, Trophy, Sparkles, MapPin, Calendar, ExternalLink } from '../components/common/Icons';
import GridBackground from '../components/ui/GridBackground';
import CardSpotlight from '../components/ui/CardSpotlight';
import ShinyText from '../components/ui/ShinyText';
import Magnetic from '../components/ui/Magnetic';
import FloatingElements from '../components/ui/FloatingElements';
import Footer from '../components/common/Footer';


export default function SponsorsPage({ onBack }) {
  const handleBackToHome = (e) => {
    if (e) e.preventDefault();
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  const handleNavigate = (hash) => (e) => {
    if (e) e.preventDefault();
    window.location.hash = hash;
  };

  return (
    <div
      className="sponsors-page"
      style={{
        paddingTop: '2.5rem',
        paddingBottom: 0,
        backgroundColor: '#050608',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        width: '100%',
        color: '#F5EAEB',
      }}
    >
      <GridBackground color="rgba(255, 170, 64, 0.04)" maskRadius="60%" />
      <FloatingElements count={12} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        {/* Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '2.5rem',
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
                  padding: '8px 18px',
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
                onClick={handleNavigate('chronicle')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#B8A8AB',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  background: 'rgba(15, 6, 10, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                }}
              >
                <Film size={14} />
                <span>Chronicle</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                onClick={handleNavigate('houses')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#B8A8AB',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  background: 'rgba(15, 6, 10, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                }}
              >
                <Shield size={14} />
                <span>Houses</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                onClick={handleNavigate('leaderboard')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#B8A8AB',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  background: 'rgba(15, 6, 10, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                }}
              >
                <Trophy size={14} />
                <span>Leaderboard</span>
              </button>
            </Magnetic>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#FFAA40',
                background: 'rgba(255, 170, 64, 0.1)',
                padding: '4px 12px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 170, 64, 0.3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: '700',
              }}
            >
              <Sparkles size={13} />
              AAVEG 2026 ALLIANCE
            </span>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#FFAA40',
              fontWeight: 800,
              marginBottom: '0.8rem',
              padding: '4px 16px',
              borderRadius: '20px',
              background: 'radial-gradient(circle, rgba(255, 170, 64, 0.15) 0%, transparent 100%)',
              border: '1px solid rgba(255, 170, 64, 0.25)',
            }}
          >
            OFFICIAL EVENT PARTNERS
          </div>

          <h1
            style={{
              fontFamily: "'Cinzel Decorative', 'DM Sans', serif",
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 900,
              letterSpacing: '0.05em',
              color: '#FFFFFF',
              margin: '0 0 1rem 0',
              textShadow: '0 0 40px rgba(255, 122, 50, 0.4), 0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            OUR SPONSORS
          </h1>

          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: '#D4C4C7',
              lineHeight: 1.6,
            }}
          >
            Meet the iconic brand partners powering the grandeur, energy, and victory celebrations of AAVEG 2026.
          </p>
        </div>

        {/* Hero Sponsor Spotlight: Plum BodyLovin' */}
        <div style={{ marginBottom: '4rem' }}>
          <CardSpotlight
            color="#FF7A32"
            glowRadius={360}
            style={{
              background: 'radial-gradient(circle at 40% 30%, rgba(35, 12, 18, 0.95) 0%, rgba(12, 4, 7, 0.98) 100%)',
              border: '1.5px solid rgba(255, 170, 64, 0.45)',
              borderRadius: '24px',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 45px rgba(255, 122, 50, 0.15)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Details */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #FF2B3C 0%, #FF7A32 100%)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '5px 14px',
                      borderRadius: '14px',
                      boxShadow: '0 0 16px rgba(255, 43, 60, 0.4)',
                    }}
                  >
                    GIFTING PARTNER
                  </span>
                  <span
                    style={{
                      color: '#FFAA40',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    ✦ Official Collaboration
                  </span>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    padding: '1.5rem 1.8rem',
                    borderRadius: '18px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/assets/sponsor_logo_wide_color.png"
                    alt="Plum BodyLovin' - Play Some More"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '110px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 0 12px rgba(255, 122, 50, 0.35))',
                    }}
                  />
                </div>

                <h2
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    color: '#FFAA40',
                    margin: '0 0 0.75rem 0',
                  }}
                >
                  plum® BodyLovin'
                </h2>

                <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    color: '#E5D6D8',
                    marginBottom: '1.75rem',
                  }}
                >
                  We are thrilled to welcome <strong style={{ color: '#FFAA40' }}>Plum BodyLovin'</strong> as the official Gifting Partner for AAVEG 2026. Known for fun, fragrant, and fabulous bath & body care essentials, Plum BodyLovin' is treating participants, performers, and house champions to exciting gift hampers, luscious mists, and signature self-care sets.
                </p>

                {/* Badges / Highlights */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      padding: '8px 14px',
                      background: 'rgba(20, 8, 14, 0.7)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 170, 64, 0.25)',
                      fontSize: '0.85rem',
                      color: '#F5EAEB',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>🎁</span> House Champions Hampers
                  </div>
                  <div
                    style={{
                      padding: '8px 14px',
                      background: 'rgba(20, 8, 14, 0.7)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 170, 64, 0.25)',
                      fontSize: '0.85rem',
                      color: '#F5EAEB',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>🌸</span> Fragrance Experience Booth
                  </div>
                  <div
                    style={{
                      padding: '8px 14px',
                      background: 'rgba(20, 8, 14, 0.7)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 170, 64, 0.25)',
                      fontSize: '0.85rem',
                      color: '#F5EAEB',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>✨</span> Exclusive Event Goodies
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#B8A8AB', fontSize: '0.88rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={15} style={{ color: '#FFAA40' }} />
                    13 OCT 2026
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={15} style={{ color: '#FF2B3C' }} />
                    PIET, JAIPUR
                  </span>
                </div>
              </div>

              {/* Right Column: Event Poster Preview */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255, 170, 64, 0.4)',
                    boxShadow: '0 15px 45px rgba(0,0,0,0.8), 0 0 35px rgba(255, 43, 60, 0.3)',
                    maxWidth: '380px',
                    width: '100%',
                  }}
                >
                  <img
                    src="/assets/sponsor_poster.jpg"
                    alt="AAVEG 2026 & Poornima Raas 2026 - Plum BodyLovin' Gifting Partner"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(5, 6, 8, 0.95) 75%)',
                      padding: '1.25rem 1rem 0.85rem',
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#FFAA40', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Official Event Poster
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardSpotlight>
        </div>

        {/* Partnership Perks Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <h3
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: '1.4rem',
              color: '#FFAA40',
              textAlign: 'center',
              marginBottom: '2rem',
              letterSpacing: '0.08em',
            }}
          >
            WHAT TO EXPECT AT THE SANCTUM
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                background: 'radial-gradient(circle at top, rgba(30, 10, 16, 0.85) 0%, rgba(9, 4, 7, 0.95) 100%)',
                border: '1px solid rgba(255, 170, 64, 0.25)',
                borderRadius: '18px',
                padding: '1.75rem',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 170, 64, 0.15)',
                  border: '1px solid rgba(255, 170, 64, 0.4)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                }}
              >
                🏆
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 700 }}>
                House Winner Trophies & Hampers
              </h4>
              <p style={{ color: '#B8A8AB', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                The triumphant hostel house taking the crown in AAVEG 2026 will be rewarded with premium curated Plum BodyLovin' wellness and grooming kits.
              </p>
            </div>

            <div
              style={{
                background: 'radial-gradient(circle at top, rgba(30, 10, 16, 0.85) 0%, rgba(9, 4, 7, 0.95) 100%)',
                border: '1px solid rgba(255, 170, 64, 0.25)',
                borderRadius: '18px',
                padding: '1.75rem',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 43, 60, 0.15)',
                  border: '1px solid rgba(255, 43, 60, 0.4)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                }}
              >
                🎪
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 700 }}>
                Interactive Festival Booth
              </h4>
              <p style={{ color: '#B8A8AB', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Visit the Plum BodyLovin' live kiosk on festival grounds to explore refreshing mists, enjoy fragrance testing, and win surprise spot gifts.
              </p>
            </div>

            <div
              style={{
                background: 'radial-gradient(circle at top, rgba(30, 10, 16, 0.85) 0%, rgba(9, 4, 7, 0.95) 100%)',
                border: '1px solid rgba(255, 170, 64, 0.25)',
                borderRadius: '18px',
                padding: '1.75rem',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 170, 64, 0.15)',
                  border: '1px solid rgba(255, 170, 64, 0.4)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                }}
              >
                🎭
              </div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 700 }}>
                Performer Goodies
              </h4>
              <p style={{ color: '#B8A8AB', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                Every star delivering an electrifying stage performance in dance, music, and drama walks away with exclusive Plum BodyLovin' celebration packs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
