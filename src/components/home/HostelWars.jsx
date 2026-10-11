import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Crown, Clock, BarChart3, Shield } from '../common/Icons';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import BackgroundBeams from '../ui/BackgroundBeams';
import Meteors from '../ui/Meteors';
import MovingBorder from '../ui/MovingBorder';
import ShinyText from '../ui/ShinyText';
import GridBackground from '../ui/GridBackground';
import { HOUSES } from '../../data/registration';
import { HOUSE_POINTS } from '../../data/leaderboardData';

export default function HostelWars() {
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [graphMode, setGraphMode] = useState('bars');
  const [timeLeft, setTimeLeft] = useState({ days: 27, hours: 14, minutes: 20, seconds: 45 });

  useEffect(() => {
    const targetDate = new Date('2026-10-22T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const sortedHouses = useMemo(() => {
    return HOUSES.map((h) => ({
      ...h,
      points: HOUSE_POINTS[h.id] ?? 1000,
    })).sort((a, b) => b.points - a.points);
  }, []);

  const maxPoints = useMemo(() => {
    return Math.max(...sortedHouses.map((h) => h.points), 100);
  }, [sortedHouses]);

  return (
    <section
      id="leaderboard"
      style={{
        paddingTop: '2rem',
        paddingBottom: '5rem',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#050608',
        color: '#F5EAEB',
        overflow: 'visible',
      }}
    >
      <GridBackground color="rgba(255, 43, 60, 0.05)" maskRadius="60%" />
      <BackgroundBeams color="#FF2B3C" />
      <Meteors number={12} color="#FF7A32" />

      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          maxWidth: '100%',
          height: '450px',
          background: 'radial-gradient(ellipse at center, rgba(229, 9, 20, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1240px', margin: '0 auto', padding: '0 1.25rem' }}>
        <SectionTitle
          tagline="THE ROYAL CLASH"
          title="EIGHT HOUSES • ONE CROWN"
          highlightWord="CROWN"
          subtitle="REAL-TIME BATTLE POINTS GRAPH & ARENA STANDINGS"
        />

        {/* Live Status & Countdown Banner */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '14px 24px',
            borderRadius: '16px',
            background: 'radial-gradient(circle at center, rgba(28, 12, 18, 0.88), rgba(10, 5, 8, 0.95))',
            border: '1.5px solid rgba(255, 170, 64, 0.35)',
            backdropFilter: 'blur(16px)',
            marginBottom: '2.5rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={18} style={{ color: '#FFAA40' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#FFFFFF', letterSpacing: '0.08em' }}>
              <ShinyText color="#FFFFFF" shimmerColor="#FFAA40">
                BATTLE POINTS LEADERBOARD GRAPH
              </ShinyText>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={16} style={{ color: '#FF7A32' }} />
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.1em', color: '#B8A8AB', textTransform: 'uppercase' }}>
              COUNTDOWN:
            </span>
            <div
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
                fontSize: '1.15rem',
                fontWeight: '900',
                color: '#FFAA40',
                letterSpacing: '0.12em',
              }}
            >
              <ShinyText
                color="#FFAA40"
                shimmerColor="#FFFFFF"
              >
                {`${String(timeLeft.days).padStart(2, '0')}D ${String(timeLeft.hours).padStart(2, '0')}H ${String(timeLeft.minutes).padStart(2, '0')}M ${String(timeLeft.seconds).padStart(2, '0')}S`}
              </ShinyText>
            </div>
          </div>
        </div>

        {/* Top 3 Podium Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {sortedHouses.slice(0, 3).map((house, idx) => {
            const rank = idx + 1;
            const rankColor = rank === 1 ? '#FFD166' : rank === 2 ? '#E2E8F0' : '#CD7F32';
            const rankTitle =
              rank === 1 ? '1ST PLACE • REIGNING LEADER' : rank === 2 ? '2ND PLACE • CONTENDER' : '3RD PLACE • VANGUARD';

            return (
              <div
                key={house.id}
                style={{
                  background: 'radial-gradient(circle at 40% 30%, rgba(30, 12, 18, 0.95), rgba(8, 4, 6, 0.98))',
                  border: `1.5px solid ${rank === 1 ? 'rgba(255, 209, 102, 0.7)' : 'rgba(255, 170, 64, 0.3)'}`,
                  borderRadius: '18px',
                  padding: '1.6rem',
                  position: 'relative',
                  boxShadow: rank === 1 ? '0 10px 35px rgba(255, 209, 102, 0.2)' : '0 8px 24px rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: rankColor,
                    background: 'rgba(0,0,0,0.6)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    border: `1px solid ${rankColor}44`,
                  }}
                >
                  <Crown size={13} style={{ fill: rankColor }} />
                  {rankTitle}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '0.6rem' }}>
                  <div
                    style={{
                      fontSize: '2.4rem',
                      width: '56px',
                      height: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '14px',
                      background: `${house.color}22`,
                      border: `1px solid ${house.color}66`,
                    }}
                  >
                    {house.sigil}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontSize: '1.35rem',
                        fontWeight: '900',
                        color: '#FFFFFF',
                        letterSpacing: '0.05em',
                        margin: 0,
                      }}
                    >
                      {house.name}
                    </h3>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: house.color, fontWeight: '700' }}>
                      {house.motto}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '1.25rem',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.45)',
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#B8A8AB', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Battle Points
                  </span>
                  <div
                    style={{
                      fontFamily: "'Cinzel', Georgia, serif",
                      fontSize: '1.5rem',
                      fontWeight: '900',
                      color: house.color,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {house.points.toLocaleString()} PTS
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Battle Points Graph Visualizer */}
        <div
          style={{
            background: 'radial-gradient(circle at center, rgba(22, 10, 16, 0.94), rgba(7, 4, 6, 0.98))',
            borderRadius: '20px',
            border: '1.5px solid rgba(255, 170, 64, 0.35)',
            padding: '2rem 1.75rem',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              gap: '1rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '1.25rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={20} style={{ color: '#FF2B3C' }} />
                <h3
                  style={{
                    fontFamily: "'Cinzel', Georgia, serif",
                    fontSize: '1.3rem',
                    fontWeight: '900',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    margin: 0,
                  }}
                >
                  POINTS DISTRIBUTION GRAPH
                </h3>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#B8A8AB' }}>
                Real-time house points breakdown. Standing updates continuously across all festival arenas.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setGraphMode('bars')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: '1px solid',
                  borderColor: graphMode === 'bars' ? '#FFAA40' : 'rgba(255,255,255,0.14)',
                  background: graphMode === 'bars' ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: graphMode === 'bars' ? '#FFAA40' : '#B8A8AB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Horizontal Bars
              </button>
              <button
                type="button"
                onClick={() => setGraphMode('columns')}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: '1px solid',
                  borderColor: graphMode === 'columns' ? '#FFAA40' : 'rgba(255,255,255,0.14)',
                  background: graphMode === 'columns' ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255,255,255,0.04)',
                  color: graphMode === 'columns' ? '#FFAA40' : '#B8A8AB',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Vertical Columns
              </button>
            </div>
          </div>

          {/* Mode 1: Horizontal Progress Bars */}
          {graphMode === 'bars' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {sortedHouses.map((house, index) => {
                const percent = Math.max(12, Math.round((house.points / maxPoints) * 100));
                const rank = index + 1;
                const isSelected = selectedHouseId === house.id;

                return (
                  <div
                    key={house.id}
                    onClick={() => setSelectedHouseId(isSelected ? null : house.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: isSelected ? 'rgba(229, 9, 20, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1.5px solid ${isSelected ? house.color : 'rgba(255, 255, 255, 0.08)'}`,
                      boxShadow: isSelected ? `0 0 25px ${house.accentGlow}` : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            background:
                              rank === 1 ? '#FFD166' : rank === 2 ? '#CBD5E1' : rank === 3 ? '#CD7F32' : 'rgba(255,255,255,0.1)',
                            color: rank <= 3 ? '#000000' : '#FFFFFF',
                          }}
                        >
                          {rank}
                        </span>
                        <span style={{ fontSize: '1.2rem' }}>{house.sigil}</span>
                        <span
                          style={{
                            fontFamily: "'Cinzel', Georgia, serif",
                            fontSize: '1.05rem',
                            fontWeight: '800',
                            color: '#FFFFFF',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {house.name}
                        </span>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: house.color,
                            letterSpacing: '0.1em',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                          }}
                        >
                          {house.motto}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: '#B8A8AB', letterSpacing: '0.08em' }}>
                          {percent}% OF PEAK
                        </span>
                        <div
                          style={{
                            fontFamily: "'Cinzel', Georgia, serif",
                            fontSize: '1.25rem',
                            fontWeight: '900',
                            color: house.color,
                            minWidth: '90px',
                            textAlign: 'right',
                          }}
                        >
                          {house.points.toLocaleString()} PTS
                        </div>
                      </div>
                    </div>

                    {/* Visual Bar Track */}
                    <div
                      style={{
                        width: '100%',
                        height: '14px',
                        borderRadius: '7px',
                        background: 'rgba(0, 0, 0, 0.55)',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <div
                        style={{
                          width: `${percent}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${house.color}77 0%, ${house.color} 100%)`,
                          borderRadius: '7px',
                          boxShadow: `0 0 15px ${house.accentGlow}`,
                          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '4px',
                            height: '100%',
                            background: '#FFFFFF',
                            boxShadow: '0 0 8px #FFFFFF',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mode 2: Vertical Columns Chart */}
          {graphMode === 'columns' && (
            <div style={{ width: '100%', overflowX: 'auto', paddingBottom: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  minWidth: '600px',
                  height: '320px',
                  paddingTop: '2rem',
                  borderBottom: '2px solid rgba(255, 170, 64, 0.3)',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.06)' }} />

                {sortedHouses.map((house, idx) => {
                  const percent = Math.max(14, Math.round((house.points / maxPoints) * 100));
                  const rank = idx + 1;

                  return (
                    <div
                      key={house.id}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: '100%',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cinzel', Georgia, serif",
                          fontSize: '0.85rem',
                          fontWeight: '800',
                          color: house.color,
                          marginBottom: '6px',
                        }}
                      >
                        {house.points}
                      </span>

                      <div
                        style={{
                          width: '70%',
                          maxWidth: '48px',
                          height: `${percent}%`,
                          borderRadius: '8px 8px 0 0',
                          background: `linear-gradient(180deg, ${house.color} 0%, ${house.color}66 100%)`,
                          boxShadow: `0 -4px 15px ${house.accentGlow}`,
                          transition: 'height 0.8s ease',
                          position: 'relative',
                        }}
                      />

                      <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <div style={{ fontSize: '1.2rem', lineHeight: 1 }}>{house.sigil}</div>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            color: '#FFFFFF',
                            marginTop: '4px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          H-{house.number}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: house.color }}>#{rank}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Enter Arena CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ color: '#B8A8AB', fontSize: '0.92rem', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            EARN GLORY FOR YOUR HOSTEL IN SPORTS, LAN ESPORTS INFERNO & CULTURAL MASQUERADE.
          </p>
          <MovingBorder duration={3200} color="#FF2B3C" borderRadius="30px">
            <Button to="#houses" variant="primary" size="lg" icon={<Shield size={18} />}>
              SELECT YOUR HOUSE TO ENTER THE ARENA
            </Button>
          </MovingBorder>
        </div>
      </div>
    </section>
  );
}
