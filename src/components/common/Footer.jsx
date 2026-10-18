import React from 'react';

export default function Footer({ style = {} }) {
  const handleNav = (hash) => (e) => {
    e.preventDefault();
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="aaveg-footer" aria-label="AAVEG event footer" style={style}>
      <img
        className="footer-art"
        src="/assets/aaveg-footer.png"
        alt="AAVEG — 4-Act Cinematic Chronicle. Navigation: Chronicle, Houses, Leaderboard, Sponsors. Houses H1 through H8. Developed by Divyansh Yadav, Aryan Gour, Vinay Avasthi, Kuldeep Gurjar, Ishank Kukreja, and Priyanshu Sharma."
        draggable="false"
      />

      <nav className="footer-hotspots" aria-label="Footer navigation">
        <a className="hotspot chronicle" href="#chronicle" onClick={handleNav('chronicle')} aria-label="Chronicle" />
        <a className="hotspot houses" href="#houses" onClick={handleNav('houses')} aria-label="Houses" />
        <a className="hotspot leaderboard" href="#leaderboard" onClick={handleNav('leaderboard')} aria-label="Leaderboard" />
        <a className="hotspot sponsors" href="#sponsors" onClick={handleNav('sponsors')} aria-label="Sponsors" />

        <a className="hotspot house h1" href="#houses" onClick={handleNav('houses')} aria-label="House H1" />
        <a className="hotspot house h2" href="#houses" onClick={handleNav('houses')} aria-label="House H2" />
        <a className="hotspot house h3" href="#houses" onClick={handleNav('houses')} aria-label="House H3" />
        <a className="hotspot house h4" href="#houses" onClick={handleNav('houses')} aria-label="House H4" />
        <a className="hotspot house h5" href="#houses" onClick={handleNav('houses')} aria-label="House H5" />
        <a className="hotspot house h6" href="#houses" onClick={handleNav('houses')} aria-label="House H6" />
        <a className="hotspot house h7" href="#houses" onClick={handleNav('houses')} aria-label="House H7" />
        <a className="hotspot house h8" href="#houses" onClick={handleNav('houses')} aria-label="House H8" />
      </nav>
    </footer>
  );
}
