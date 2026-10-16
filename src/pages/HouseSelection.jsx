import React, { useState } from 'react';
import { ArrowLeft, Flame, Film, Gamepad2, Trophy, Music, ExternalLink } from '../components/common/Icons';
import CircularHouseSelector from '../components/houses/CircularHouseSelector';
import Spotlight from '../components/ui/Spotlight';
import BackgroundBeams from '../components/ui/BackgroundBeams';
import GlitchText from '../components/ui/GlitchText';
import Magnetic from '../components/ui/Magnetic';
import ShinyText from '../components/ui/ShinyText';
import FloatingElements from '../components/ui/FloatingElements';
import GridBackground from '../components/ui/GridBackground';
import CardSpotlight from '../components/ui/CardSpotlight';
import FocusCards from '../components/ui/FocusCards';
import MovingBorder from '../components/ui/MovingBorder';
import { HOUSES } from '../data/registration';

export default function HouseSelection({ onBack }) {
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleBackToOverview = (e) => {
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

  const handleNavigateToLeaderboard = (e) => {
    if (e) e.preventDefault();
    window.location.hash = 'leaderboard';
  };

  const currentHouse = selectedHouse || HOUSES[0];

  const activitiesList = [
    {
      key: 'sports',
      title: 'SPORTS',
      subtitle: 'PHYSICAL VALOR & STADIUM WARS',
      icon: <Trophy size={34} style={{ color: currentHouse.color }} />,
      color: currentHouse.color,
      description:
        'Represent your house in floodlit box cricket, high-intensity futsal, volleyball tournaments, arm-wrestling cages, and the inter-hostel tug-of-war.',
      events: ['Inter-Hostel Box Cricket', '5v5 Turf Futsal', 'Arm Wrestling Cage', 'Tug of War Derby', 'Track Sprint'],
      formUrl: currentHouse.activities?.sports?.formUrl || '#',
    },
    {
      key: 'esports',
      title: 'ESPORTS',
      subtitle: 'LAN INFERNO & DIGITAL DOMINANCE',
      icon: <Gamepad2 size={34} style={{ color: '#3A86FF' }} />,
      color: '#3A86FF',
      description:
        '12-hour high-stakes LAN tournament hosted in high-spec gaming labs. Full squad battles and individual fighting game showdowns.',
      events: ['Valorant 5v5 Championship', 'BGMI Squad Battle Royale', 'EA Sports FC / FIFA 24', 'Tekken 8 Showdown'],
      formUrl: currentHouse.activities?.esports?.formUrl || '#',
    },
    {
      key: 'cultural',
      title: 'CULTURAL',
      subtitle: 'HAUTE COUTURE & ROCK STAGE',
      icon: <Music size={34} style={{ color: '#9D4EDD' }} />,
      color: '#9D4EDD',
      description:
        'The dark theatrical soul of AAVEG. Gothic haute couture fashion runways, 8-band college rock clashes, rap cyphers, and spooky cosplay.',
      events: ['Gothic Masquerade Runway', 'Battle of the College Bands', 'Rap Cypher Faceoff', 'Character Cosplay Parade'],
      formUrl: currentHouse.activities?.cultural?.formUrl || '#',
    },
  ];

  return (
    <div
      className="house-selection-page"
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '5rem',
        backgroundColor: '#050608',
        color: '#F5EAEB',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Spotlight fill="#FF2B3C" opacity={0.24} />
      <BackgroundBeams color="#FF2B3C" />
      <GridBackground color="rgba(255, 43, 60, 0.05)" maskRadius="60%">
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(229, 9, 20, 0.18) 0%, rgba(120, 8, 14, 0.06) 55%, transparent 75%)',
            filter: 'blur(55px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
          {/* Navigation Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Magnetic strength={0.2}>
              <button
                onClick={handleBackToOverview}
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
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
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
                <span>OVERVIEW / SANCTUM</span>
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
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '7px 16px',
                  borderRadius: '20px',
                  background: 'rgba(20, 9, 14, 0.85)',
                  border: '1px solid rgba(255, 170, 64, 0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
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
                <Film size={15} />
                <span>MOVIE SAGA</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                onClick={handleNavigateToLeaderboard}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
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
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
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
                <Trophy size={15} />
                <span>LEADERBOARD</span>
              </button>
            </Magnetic>
          </div>

          {!selectedHouse ? (
            <>
              {/* Page Header */}
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <FloatingElements duration={4} distance={4} rotate={1}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: '800',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: '#FFAA40',
                      marginBottom: '0.75rem',
                      padding: '6px 20px',
                      borderRadius: '30px',
                      background: 'rgba(229, 9, 20, 0.16)',
                      border: '1px solid rgba(255, 170, 64, 0.45)',
                    }}
                  >
                    <Flame size={16} />
                    <span>STAGE 01 OF 02 • HOUSE AFFILIATION</span>
                  </div>
                </FloatingElements>

                <h1
                  style={{
                    fontFamily: "'Cinzel Decorative', 'Anton', serif",
                    fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: '1.1',
                    marginBottom: '1rem',
                    textShadow: '0 4px 25px rgba(0,0,0,0.95), 0 0 35px rgba(255, 43, 60, 0.5)',
                  }}
                >
                  CHOOSE YOUR{' '}
                  <span style={{ color: '#FF2B3C' }}>
                    <ShinyText color="#FF2B3C" shimmerColor="#FFEAA7" speed={3}>
                      <GlitchText text="HOUSE" />
                    </ShinyText>
                  </span>
                </h1>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                    color: '#B8A8AB',
                    maxWidth: '650px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                  }}
                >
                  Rotate the circular dial below to select your hostel house (House 1 to House 8).
                  Next, choose your activity (Sports, Esports, or Cultural) to open your dedicated registration gateway.
                </p>
              </div>

              {/* Circular House Selector */}
              <CircularHouseSelector onSelectHouse={(house) => setSelectedHouse(house)} />
            </>
          ) : (
            /* Dedicated House Activity Gateway */
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <Magnetic strength={0.2}>
                  <button
                    onClick={() => setSelectedHouse(null)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#B8A8AB',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '8px 18px',
                      borderRadius: '24px',
                      background: 'rgba(20, 9, 14, 0.85)',
                      border: `1.5px solid ${selectedHouse.color}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ArrowLeft size={16} />
                    <span>← SWITCH HOUSE (CURRENT: {selectedHouse.name.toUpperCase()})</span>
                  </button>
                </Magnetic>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 22px',
                    borderRadius: '25px',
                    background: 'rgba(20, 10, 15, 0.95)',
                    border: `1.5px solid ${selectedHouse.color}`,
                    boxShadow: `0 0 25px ${selectedHouse.accentGlow}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cinzel Decorative', 'Anton', serif",
                      fontSize: '1.05rem',
                      fontWeight: '900',
                      color: selectedHouse.color,
                      letterSpacing: '0.12em',
                    }}
                  >
                    H{selectedHouse.number}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    letterSpacing: '0.24em',
                    color: selectedHouse.color,
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                  }}
                >
                  STAGE 02 OF 02 • ACTIVITY REGISTRATION
                </div>

                <h1
                  style={{
                    fontFamily: "'Cinzel Decorative', 'Anton', serif",
                    fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                    textShadow: '0 4px 25px rgba(0,0,0,0.9)',
                  }}
                >
                  SELECT ACTIVITY FOR{' '}
                  <span style={{ color: selectedHouse.color, textShadow: `0 0 30px ${selectedHouse.accentGlow}` }}>
                    <ShinyText color={selectedHouse.color} shimmerColor="#FFFFFF" speed={3}>
                      <GlitchText text={selectedHouse.name.toUpperCase()} />
                    </ShinyText>
                  </span>
                </h1>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                    color: '#B8A8AB',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                  }}
                >
                  Each house uses dedicated registration forms. Click an activity below to open the official Google Form
                  configured specifically for <strong>{selectedHouse.name}</strong>.
                </p>
              </div>

              {/* 3 Activities Focus Cards */}
              <FocusCards
                cards={activitiesList}
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem',
                  marginBottom: '4rem',
                }}
                renderCard={(act, idx, isHovered) => (
                  <CardSpotlight
                    key={act.key}
                    color={act.color}
                    glowRadius={380}
                    tilt={true}
                    style={{
                      padding: '2.5rem 1.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      background: isHovered ? 'radial-gradient(circle, rgba(34, 14, 20, 0.98), rgba(8, 4, 6, 0.98))' : 'radial-gradient(circle, rgba(18, 8, 12, 0.92), rgba(6, 3, 5, 0.96))',
                      border: isHovered ? `2px solid ${act.color}` : `1px solid ${act.color}55`,
                      boxShadow: isHovered ? `0 0 40px ${act.color}45, 0 15px 40px rgba(0,0,0,0.9)` : '0 10px 30px rgba(0,0,0,0.7)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '16px',
                          background: `${act.color}18`,
                          border: `1.5px solid ${act.color}66`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {act.icon}
                      </div>
                      <span
                        style={{
                          fontFamily: "'Cinzel', Georgia, serif",
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          letterSpacing: '0.15em',
                          color: act.color,
                          textTransform: 'uppercase',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          background: `${act.color}15`,
                          border: `1px solid ${act.color}44`,
                        }}
                      >
                        {act.subtitle}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontSize: '1.6rem',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        letterSpacing: '0.06em',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {act.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: '#B8A8AB', lineHeight: '1.55', marginBottom: '1.5rem', flexGrow: 1 }}>
                      {act.description}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.12em', color: '#FFFFFF', marginBottom: '8px', textTransform: 'uppercase' }}>
                        FEATURED EVENTS:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {act.events.map((ev, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.75rem',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              color: '#E0D4D6',
                            }}
                          >
                            {ev}
                          </span>
                        ))}
                      </div>
                    </div>

                    <MovingBorder duration={3200} color={act.color} borderRadius="25px" style={{ width: '100%' }}>
                      <a
                        href={act.formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: '100%',
                          padding: '12px 20px',
                          borderRadius: '25px',
                          background: act.color,
                          color: '#FFFFFF',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.85rem',
                          fontWeight: '800',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: `0 4px 20px ${act.color}55`,
                        }}
                      >
                        <span>OPEN REGISTRATION FORM</span>
                        <ExternalLink size={15} />
                      </a>
                    </MovingBorder>
                  </CardSpotlight>
                )}
              />
            </div>
          )}
        </div>
      </GridBackground>
    </div>
  );
}
