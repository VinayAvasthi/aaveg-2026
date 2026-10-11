import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Flame,
  Sparkles,
  MapPin,
  Clock,
  Trophy,
  Shield,
  ArrowRight,
  Calendar,
  Compass,
} from '../common/Icons';
import Button from '../common/Button';
import CardSpotlight from '../ui/CardSpotlight';
import MovingBorder from '../ui/MovingBorder';
import Lamp from '../ui/Lamp';
import Magnetic from '../ui/Magnetic';
import FloatingElements from '../ui/FloatingElements';
import ShinyText from '../ui/ShinyText';
import FocusCards from '../ui/FocusCards';
import GridBackground from '../ui/GridBackground';

export default function FestivalMovieJourney() {
  const [activeAct, setActiveAct] = useState(0);
  const [activeNightTab, setActiveNightTab] = useState(0);
  const [movieProgress, setMovieProgress] = useState(0);

  const act0Ref = useRef(null);
  const act1Ref = useRef(null);
  const act2Ref = useRef(null);
  const act3Ref = useRef(null);
  const actRefs = useMemo(() => [act0Ref, act1Ref, act2Ref, act3Ref], []);

  // 4 Cinematic Movie Chapters
  const chapters = [
    { id: 0, tag: 'ACT 01', name: 'THE AWAKENING', title: 'WHAT IS AAVEG?' },
    { id: 1, tag: 'ACT 02', name: 'THE 4 NIGHTS', title: 'THE SAGA OF CHAOS' },
    { id: 2, tag: 'ACT 03', name: 'EIGHT HOUSES', title: 'THE BATTLE FOR THE CROWN' },
    { id: 3, tag: 'ACT 04', name: 'THE ARENA', title: 'ENTER THE ARENA' },
  ];

  // The 3 Nights Data
  const nights = [
    {
      night: 'NIGHT 01',
      date: '22 OCT 2026',
      title: 'NIGHT OF THE SPECTERS',
      subtitle: 'TORCH MARCH & OPENING REVELATION',
      color: '#FF2B3C',
      time: '6:00 PM – MIDNIGHT',
      venue: 'Amphitheatre & Main Quadrangle',
      summary:
        'Over 1,500 hostellers march with blazing torches through the dark campus gates, carrying their house banners to inaugurate the 2026 festival wars.',
      highlights: ['Torchlit Grand March', 'Acoustic Graveyard Sessions', 'Unveiling 2026 Trophy', 'Midnight Flashmob'],
    },
    {
      night: 'NIGHT 02',
      date: '23 OCT 2026',
      title: 'THE CLASH OF HOUSES & MASQUERADE',
      subtitle: 'SPORTS WAR, LAN INFERNO & GOTHIC ROCK',
      color: '#FF7A32',
      time: '10:00 AM – 11:30 PM',
      venue: 'Floodlit Sports Grounds & PCE Auditorium',
      summary:
        'Eight rival houses face off in high-stakes floodlit box cricket, Valorant/BGMI LAN wars, gothic cosplay runways, and battle of the bands.',
      highlights: ['Box Cricket & LAN War', 'Hostel Tug-of-War', 'Gothic Runway Competition', 'Battle of the College Bands'],
    },
    {
      night: 'NIGHT 03',
      date: '24 OCT 2026 • FINALE',
      title: 'EDM INFERNO & CORONATION',
      subtitle: 'CROWNING OF THE CHAMPION HOUSE',
      color: '#FFAA40',
      time: '7:00 PM – TILL DAWN',
      venue: 'Main Festival Grounds',
      summary:
        'The grand climax of AAVEG. Golden firework cascades erupt as the 2026 Champion House lifts the crown, before celebrity DJs take over the stage.',
      highlights: ['Championship Cup Ceremony', 'Celebrity DJ & Laser Storm', 'The Forever Bonfire', 'Hostel Anthem Choir'],
    },
  ];

  // The 8 Houses Data
  const houses = [
    { name: 'HOUSE 1', tag: 'SCARLET TITANS', color: '#FF2B3C', motto: 'Unyielding Strength & Primal Fury', sigil: '⚔️' },
    { name: 'HOUSE 2', tag: 'SOLAR PHOENIX', color: '#FF7A32', motto: 'Rising Above Ashes to Reign', sigil: '🐺' },
    { name: 'HOUSE 3', tag: 'GOLDEN VALIANT', color: '#FFAA40', motto: 'Honor, Valor & Golden Legacy', sigil: '⚡' },
    { name: 'HOUSE 4', tag: 'EMERALD VIPERS', color: '#06D6A0', motto: 'Lethal Precision & Relentless Will', sigil: '👁️' },
    { name: 'HOUSE 5', tag: 'COBALT THUNDER', color: '#118AB2', motto: 'Strategic Dominance & Raw Power', sigil: '🐍' },
    { name: 'HOUSE 6', tag: 'SHADOW SPECTRES', color: '#9D4EDD', motto: 'Mastery in Silence & Decisive Strikes', sigil: '🔥' },
    { name: 'HOUSE 7', tag: 'CRIMSON BERSERKERS', color: '#EF476F', motto: 'Fearless Spirit in Every Clash', sigil: '🦅' },
    { name: 'HOUSE 8', tag: 'FROST MONARCHS', color: '#4CC9F0', motto: 'Cold Logic, Absolute Supremacy', sigil: '💀' },
  ];

  // Track active act and journey scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = document.getElementById('festival-movie');
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const totalHeight = sectionEl.offsetHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentScrolled = -rect.top;
          const pct = Math.min(100, Math.max(0, (currentScrolled / totalHeight) * 100));
          setMovieProgress(pct);
        }
      }

      actRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveAct(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [actRefs]);

  const scrollToAct = (actIdx) => {
    if (actRefs[actIdx] && actRefs[actIdx].current) {
      actRefs[actIdx].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="festival-movie"
      className="movie-story-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <div id="about" style={{ position: 'absolute', top: 0, height: '1px' }} />
      <div id="nights" style={{ position: 'absolute', top: '25%', height: '1px' }} />

      {/* Sticky Director's Filmstrip HUD */}
      <div
        className="movie-directors-hud"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 35,
          background: 'rgba(7, 6, 8, 0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 170, 64, 0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.85)',
          padding: '0.75rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Live Recording Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#FF2B3C',
                display: 'inline-block',
                boxShadow: '0 0 12px #FF2B3C',
                animation: 'recordPulse 1.6s infinite',
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                fontWeight: '800',
                letterSpacing: '0.22em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
              }}
            >
              REC • {chapters[activeAct].tag} // {chapters[activeAct].name}
            </span>
          </div>

          {/* Act Jump Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => scrollToAct(idx)}
                style={{
                  background: activeAct === idx ? 'rgba(229, 9, 20, 0.3)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${activeAct === idx ? '#FF2B3C' : 'rgba(255, 255, 255, 0.12)'}`,
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontFamily: "'Cinzel', Georgia, serif",
                  fontSize: '0.75rem',
                  fontWeight: activeAct === idx ? '800' : '600',
                  color: activeAct === idx ? '#FFAA40' : 'rgba(245, 234, 235, 0.75)',
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.25s ease',
                  boxShadow: activeAct === idx ? '0 0 14px rgba(255, 43, 60, 0.45)' : 'none',
                }}
              >
                <span>{ch.tag}</span>
                <span className="desktop-hud-title" style={{ opacity: 0.75 }}>
                  • {ch.name}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Action */}
          <Button to="#houses" variant="primary" size="sm">
            SELECT HOUSE
          </Button>
        </div>

        {/* Thin Scrub Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '2.5px',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${movieProgress}%`,
              background: 'linear-gradient(90deg, #FF2B3C, #FFAA40)',
              boxShadow: '0 0 10px #FF2B3C',
              transition: 'width 0.15s ease-out',
            }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACT 01: THE AWAKENING (WHAT IS AAVEG?)                                    */}
      {/* ========================================================================= */}
      <div
        ref={actRefs[0]}
        id="act-01"
        style={{
          position: 'relative',
          padding: '6rem 1.5rem',
          borderBottom: '1px solid rgba(255, 170, 64, 0.15)',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(180, 10, 20, 0.12) 0%, transparent 65%)',
        }}
      >
        <GridBackground color="rgba(255, 43, 60, 0.06)" maskRadius="65%">
          <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <FloatingElements duration={4} distance={5} rotate={1}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 20px',
                  borderRadius: '30px',
                  background: 'rgba(229, 9, 20, 0.15)',
                  border: '1px solid rgba(255, 170, 64, 0.45)',
                  color: '#FFAA40',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                <Flame size={15} />
                <span>ACT 01 // PROLOGUE • THE AWAKENING OF MADNESS</span>
              </div>
            </FloatingElements>

            <h2
              style={{
                fontFamily: "'Cinzel Decorative', 'Anton', serif",
                fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: '1.05',
                maxWidth: '920px',
                margin: '0 auto 1.5rem auto',
                textShadow: '0 4px 30px rgba(0,0,0,0.95), 0 0 45px rgba(255, 43, 60, 0.5)',
              }}
            >
              WHAT IS{' '}
              <ShinyText color="#FF2B3C" shimmerColor="#FFEAA7" speed={3.2}>
                AAVEG?
              </ShinyText>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                color: '#E0D4D6',
                maxWidth: '820px',
                lineHeight: '1.7',
                margin: '0 auto 3rem auto',
              }}
            >
              AAVEG is not merely an annual college event. It is a 3-day supernatural adrenaline phenomenon where
              routine campus rules dissolve into midnight torch marches, ground-shaking stadium rivalries, and memories
              etched in fire.
            </p>

            {/* 4 Pillars with FocusCards & CardSpotlight */}
            <FocusCards
              cards={[
                { num: '35+', label: 'ARENA TOURNAMENTS', desc: 'Sports derbies, LAN gaming battles, and cultural stages.' },
                { num: '1,500+', label: 'HOSTELLERS CLASHING', desc: 'United by fraternity, separated only by house pride.' },
                { num: '03', label: 'HAUNTED NIGHTS', desc: 'From torchlit graveyard acoustics to EDM inferno finale.' },
                { num: '01', label: 'ETERNAL TROPHY', desc: 'Only one house hoists the legendary Aaveg Cup.' },
              ]}
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                maxWidth: '1150px',
                margin: '0 auto 3rem auto',
              }}
              renderCard={(stat, i, isHovered) => (
                <CardSpotlight
                  key={i}
                  color="#FF2B3C"
                  glowRadius={280}
                  tilt={true}
                  style={{
                    padding: '2.2rem 1.4rem',
                    textAlign: 'center',
                    background: isHovered ? 'radial-gradient(circle, rgba(45, 12, 18, 0.95), rgba(12, 5, 8, 0.98))' : 'radial-gradient(circle, rgba(24, 8, 14, 0.88), rgba(8, 3, 6, 0.94))',
                    border: isHovered ? '1.5px solid #FFAA40' : '1px solid rgba(255, 170, 64, 0.25)',
                    boxShadow: isHovered ? '0 0 35px rgba(255, 43, 60, 0.45)' : 'none',
                  }}
                >
                  <div
                    style={{
                    fontFamily: "'Anton', 'Cinzel', sans-serif",
                    fontSize: '3.4rem',
                    color: '#FF2B3C',
                    lineHeight: '1',
                    marginBottom: '8px',
                    textShadow: '0 0 20px rgba(255, 43, 60, 0.65)',
                  }}
                >
                  <ShinyText color="#FF2B3C" shimmerColor="#FFF4D0" speed={4}>
                    {stat.num}
                  </ShinyText>
                </div>
                <div
                  style={{
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: '0.92rem',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    letterSpacing: '0.12em',
                    marginBottom: '6px',
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#B8A8AB', lineHeight: '1.45' }}>
                  {stat.desc}
                </div>
              </CardSpotlight>
            )}
          />

          <Magnetic strength={0.25}>
            <Button
              onClick={() => scrollToAct(1)}
              variant="outline"
              size="lg"
              icon={<ArrowRight size={18} />}
            >
              EXPLORE THE 3 NIGHTS →
            </Button>
          </Magnetic>
        </div>
      </GridBackground>
    </div>

    {/* ========================================================================= */}
    {/* ACT 02: THE 3 NIGHTS (THE SAGA OF CHAOS)                                  */}
    {/* ========================================================================= */}
    <div
      ref={actRefs[1]}
      id="act-02"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        borderBottom: '1px solid rgba(255, 170, 64, 0.15)',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(229, 9, 20, 0.1) 0%, transparent 70%)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              borderRadius: '30px',
              background: 'rgba(255, 122, 50, 0.14)',
              border: '1px solid rgba(255, 170, 64, 0.45)',
              color: '#FFAA40',
              fontSize: '0.82rem',
              fontWeight: '800',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Calendar size={15} />
            <span>ACT 02 // CHRONICLES • THE 3 NIGHTS</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cinzel Decorative', 'Anton', serif",
              fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.95)',
            }}
          >
            THE THREE NIGHTS OF <span style={{ color: '#FF7A32' }}>RECKONING</span>
          </h2>

          <p style={{ color: '#B8A8AB', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto' }}>
            Three distinct chapters. Three unforgettable spectacles under the Sitapura midnight sky.
          </p>
          </div>

          {/* Interactive Night Selector Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '2.5rem',
            }}
          >
            {nights.map((n, idx) => (
              <Magnetic key={idx} strength={0.2}>
                <button
                  onClick={() => setActiveNightTab(idx)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '30px',
                    background: activeNightTab === idx ? `${n.color}25` : 'rgba(255, 255, 255, 0.04)',
                    border: `1.5px solid ${activeNightTab === idx ? n.color : 'rgba(255, 255, 255, 0.14)'}`,
                    color: activeNightTab === idx ? '#FFFFFF' : '#B8A8AB',
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: activeNightTab === idx ? `0 0 24px ${n.color}55` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: n.color,
                      boxShadow: `0 0 8px ${n.color}`,
                    }}
                  />
                  <span>{n.night}</span>
                  <span style={{ opacity: 0.65, fontSize: '0.75rem' }}>({n.date})</span>
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Active Night Spotlight Card */}
          {(() => {
            const cur = nights[activeNightTab];
            return (
              <CardSpotlight
                color={cur.color}
                glowRadius={420}
                tilt={true}
                style={{
                  maxWidth: '1020px',
                  margin: '0 auto',
                  padding: 'clamp(1.5rem, 4vw, 3rem)',
                  border: `1.5px solid ${cur.color}88`,
                  background: 'radial-gradient(circle at 40% 30%, rgba(32, 12, 18, 0.95), rgba(8, 4, 6, 0.98))',
                  boxShadow: `0 15px 50px rgba(0,0,0,0.95), 0 0 45px ${cur.color}35`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '1.25rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: cur.color,
                        fontWeight: '800',
                        fontSize: '0.85rem',
                        letterSpacing: '0.2em',
                        marginBottom: '4px',
                      }}
                    >
                      {cur.night} • {cur.date} • {cur.subtitle}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Cinzel Decorative', 'Anton', serif",
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        color: '#FFFFFF',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        margin: 0,
                      }}
                    >
                      {cur.title}
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#B8A8AB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                      <Clock size={16} style={{ color: cur.color }} />
                      <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{cur.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                      <MapPin size={16} style={{ color: cur.color }} />
                      <span>{cur.venue}</span>
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '1.1rem',
                    color: '#E0D4D6',
                    lineHeight: '1.7',
                    marginBottom: '2rem',
                  }}
                >
                  {cur.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {cur.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${cur.color}55`,
                        fontSize: '0.88rem',
                        fontWeight: '700',
                        color: '#FFFFFF',
                      }}
                    >
                      <Sparkles size={14} style={{ color: cur.color }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </CardSpotlight>
            );
          })()}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACT 03: EIGHT HOUSES • THE BATTLE FOR THE CROWN                          */}
      {/* ========================================================================= */}
      <div
        ref={actRefs[2]}
        id="act-03"
        style={{
          position: 'relative',
          padding: '6rem 1.5rem',
          borderBottom: '1px solid rgba(255, 170, 64, 0.15)',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(157, 78, 221, 0.1) 0%, transparent 70%)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 20px',
              borderRadius: '30px',
              background: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid rgba(255, 170, 64, 0.45)',
              color: '#FFAA40',
              fontSize: '0.82rem',
              fontWeight: '800',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Trophy size={15} />
            <span>ACT 03 // FACTIONS • INTER-HOUSE BLOOD RIVALRY</span>
          </div>

          <h2
            style={{
              fontFamily: "'Cinzel Decorative', 'Anton', serif",
              fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
              fontWeight: '900',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.95)',
            }}
          >
            EIGHT HOUSES • ONE GOLDEN <span style={{ color: '#FFAA40' }}>CROWN</span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.1rem',
              color: '#B8A8AB',
              maxWidth: '720px',
              lineHeight: '1.6',
              margin: '0 auto 3rem auto',
            }}
          >
            Hostellers turn competitors. Friendly rooms become battlefields. Points tally continuously across Sports,
            Esports, and Cultural arenas until one house conquers.
          </p>

          {/* 8 Houses Grid */}
          <FocusCards
            cards={houses}
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              maxWidth: '1200px',
              margin: '0 auto 2.5rem auto',
            }}
            renderCard={(h, idx, isHovered) => (
              <CardSpotlight
                key={idx}
                color={h.color}
                glowRadius={240}
                tilt={true}
                style={{
                  padding: '1.6rem 1rem',
                  textAlign: 'center',
                  border: isHovered ? `1.5px solid ${h.color}` : `1px solid ${h.color}44`,
                  background: isHovered ? 'radial-gradient(circle, rgba(28, 12, 18, 0.98), rgba(8, 4, 6, 0.98))' : 'radial-gradient(circle, rgba(16, 8, 12, 0.9), rgba(6, 3, 5, 0.95))',
                  boxShadow: isHovered ? `0 0 35px ${h.color}55, 0 10px 30px rgba(0,0,0,0.9)` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <FloatingElements duration={3.5 + idx * 0.3} distance={5} rotate={2}>
                  <div
                    style={{
                      fontSize: '2.2rem',
                      marginBottom: '6px',
                      filter: `drop-shadow(0 0 12px ${h.color})`,
                    }}
                  >
                    {h.sigil}
                  </div>
                </FloatingElements>

                <h4
                  style={{
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    marginBottom: '2px',
                  }}
                >
                  <ShinyText color={h.color} shimmerColor="#FFFFFF" speed={3.5}>
                    {h.name}
                  </ShinyText>
                </h4>

                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    letterSpacing: '0.15em',
                    color: h.color,
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  {h.tag}
                </span>

                <p style={{ fontSize: '0.8rem', color: '#B8A8AB', lineHeight: '1.3' }}>
                  "{h.motto}"
                </p>
              </CardSpotlight>
            )}
          />

          <Magnetic strength={0.25}>
            <MovingBorder duration={3400} color="#FF7A32" borderRadius="30px">
              <Button to="#houses" variant="primary" size="lg" icon={<Compass size={18} />}>
                OPEN CIRCULAR HOUSE SELECTOR
              </Button>
            </MovingBorder>
          </Magnetic>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACT 04: THE FINAL ARENA & REGISTRATION GATEWAY                           */}
      {/* ========================================================================= */}
      <div
        ref={actRefs[3]}
        id="act-04"
        style={{
          position: 'relative',
          padding: '4rem 1.5rem 6rem',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(229, 9, 20, 0.14) 0%, transparent 65%)',
        }}
      >
        <Lamp color="#FF2B3C" secondaryColor="#FFAA40">
          <div style={{ maxWidth: '1020px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <FloatingElements duration={4} distance={4} rotate={1}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 20px',
                  borderRadius: '30px',
                  background: 'rgba(229, 9, 20, 0.16)',
                  border: '1px solid rgba(255, 170, 64, 0.5)',
                  color: '#FFAA40',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={15} />
                <span>ACT 04 // THE FINAL ARENA • REGISTRATION CODEX</span>
              </div>
            </FloatingElements>

            <h2
              style={{
                fontFamily: "'Cinzel Decorative', 'Anton', serif",
                fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: '1.05',
                marginBottom: '1.25rem',
                textShadow: '0 4px 25px rgba(0,0,0,0.95), 0 0 50px rgba(255, 43, 60, 0.65)',
              }}
            >
              WILL YOU SPECTATE, OR WILL YOU{' '}
              <ShinyText color="#FF2B3C" shimmerColor="#FFEAA7" speed={3}>
                CONQUER?
              </ShinyText>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                color: '#E0D4D6',
                maxWidth: '750px',
                lineHeight: '1.7',
                margin: '0 auto 3rem auto',
              }}
            >
              Select your House to unlock the dedicated registration gateway for Sports Championships,
              LAN Gaming Arenas, and Gothic Cultural Stages.
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
                <MovingBorder duration={2800} color="#FF2B3C" borderRadius="30px">
                  <Button
                    to="#houses"
                    variant="primary"
                    size="xl"
                    icon={<Shield size={20} />}
                    style={{
                      fontSize: '1.1rem',
                      padding: '16px 38px',
                      boxShadow: '0 0 40px rgba(255, 43, 60, 0.65), 0 8px 30px rgba(0,0,0,0.85)',
                    }}
                  >
                    SELECT YOUR HOUSE & REGISTER
                  </Button>
                </MovingBorder>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Button
                  to="#leaderboard"
                  variant="outline"
                  size="xl"
                  icon={<Trophy size={20} />}
                  style={{
                    fontSize: '1.1rem',
                    padding: '16px 36px',
                    borderColor: 'rgba(255, 170, 64, 0.45)',
                  }}
                >
                  VIEW LIVE STANDINGS
                </Button>
              </Magnetic>
            </div>
          </div>
        </Lamp>
      </div>
    </section>
  );
}

