import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

declare global {
  interface Window {
    mermaid: any;
  }
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

// System Design architecture illustration
const CoverIllustration = () => (
  <svg
    viewBox="0 0 260 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: 'auto', maxWidth: '260px' }}
  >
    <defs>
      <filter id="fg" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="lbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
      </linearGradient>
    </defs>

    {/* Background grid */}
    {Array.from({ length: 12 }, (_, i) => (
      <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="200"
        stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <line key={`h${i}`} x1="0" y1={i * 25} x2="260" y2={i * 25}
        stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
    ))}

    {/* CLIENT */}
    <g filter="url(#fg)">
      <rect x="100" y="6" width="60" height="20" rx="4"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      <text x="130" y="20" textAnchor="middle"
        fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="monospace" letterSpacing="1">
        CLIENT
      </text>
    </g>

    {/* Client → LB */}
    <line x1="130" y1="26" x2="130" y2="48" stroke="rgba(129,140,248,0.65)" strokeWidth="1.5" filter="url(#fg)" />
    <polygon points="126,45 130,52 134,45" fill="rgba(129,140,248,0.65)" />

    {/* LOAD BALANCER */}
    <g filter="url(#fg)">
      <rect x="76" y="52" width="108" height="25" rx="6"
        fill="rgba(49,46,129,0.65)" stroke="url(#lbGrad)" strokeWidth="1.5" />
      <text x="130" y="68.5" textAnchor="middle"
        fill="rgba(199,210,254,1)" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        LOAD BALANCER
      </text>
    </g>

    {/* LB → Servers */}
    <line x1="106" y1="77" x2="62" y2="100" stroke="rgba(99,102,241,0.55)" strokeWidth="1.5" filter="url(#fg)" />
    <line x1="154" y1="77" x2="198" y2="100" stroke="rgba(99,102,241,0.55)" strokeWidth="1.5" filter="url(#fg)" />

    {/* SERVER 1 */}
    <g filter="url(#fg)">
      <rect x="14" y="100" width="96" height="22" rx="5"
        fill="rgba(30,27,75,0.5)" stroke="rgba(99,102,241,0.55)" strokeWidth="1" />
      <text x="62" y="115" textAnchor="middle"
        fill="rgba(165,180,252,0.9)" fontSize="7.5" fontFamily="monospace" letterSpacing="0.3">
        APP SERVER 1
      </text>
    </g>

    {/* SERVER 2 */}
    <g filter="url(#fg)">
      <rect x="150" y="100" width="96" height="22" rx="5"
        fill="rgba(30,27,75,0.5)" stroke="rgba(99,102,241,0.55)" strokeWidth="1" />
      <text x="198" y="115" textAnchor="middle"
        fill="rgba(165,180,252,0.9)" fontSize="7.5" fontFamily="monospace" letterSpacing="0.3">
        APP SERVER 2
      </text>
    </g>

    {/* Servers → Cache */}
    <line x1="62" y1="122" x2="104" y2="144" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" filter="url(#fg)" />
    <line x1="198" y1="122" x2="156" y2="144" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" filter="url(#fg)" />

    {/* CACHE */}
    <g filter="url(#fg)">
      <rect x="80" y="144" width="100" height="22" rx="5"
        fill="rgba(76,29,149,0.5)" stroke="rgba(167,139,250,0.75)" strokeWidth="1.5" />
      <text x="130" y="159" textAnchor="middle"
        fill="rgba(221,214,254,1)" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        CACHE
      </text>
    </g>

    {/* Cache → DB */}
    <line x1="130" y1="166" x2="130" y2="175" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" filter="url(#fg)" />
    <polygon points="126,172 130,179 134,172" fill="rgba(34,211,238,0.7)" />

    {/* DATABASE */}
    <g filter="url(#fg)">
      <rect x="80" y="179" width="100" height="22" rx="5"
        fill="rgba(6,78,100,0.6)" stroke="rgba(34,211,238,0.72)" strokeWidth="1.5" />
      <text x="130" y="194" textAnchor="middle"
        fill="rgba(165,243,252,1)" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        DATABASE
      </text>
    </g>

    {/* Corner accents */}
    <path d="M 0 0 L 18 0 L 0 18 Z" fill="rgba(99,102,241,0.12)" />
    <path d="M 260 0 L 242 0 L 260 18 Z" fill="rgba(99,102,241,0.12)" />
    <path d="M 0 200 L 18 200 L 0 182 Z" fill="rgba(99,102,241,0.12)" />
    <path d="M 260 200 L 242 200 L 260 182 Z" fill="rgba(99,102,241,0.12)" />
  </svg>
);

const SIDEBAR_W = 260;

function calcPageSize(sidebarOpen: boolean) {
  const navH = 62;
  const progressBarH = 3;
  const bottomPad = 160;
  const sidePad = 48;
  const usedSidebar = sidebarOpen ? SIDEBAR_W : 0;
  const availW = window.innerWidth - usedSidebar - sidePad;
  const availH = window.innerHeight - navH - progressBarH - bottomPad;
  const pageW = Math.floor(availW / 2) - 12;
  const a4H = Math.floor(pageW * 1.414);
  const pageH = Math.min(availH, a4H);
  return {
    width: Math.max(pageW, 280),
    height: Math.max(pageH, 396),
  };
}

export default function BookViewer({ chapters }: { chapters: Chapter[] }) {
  const bookRef = useRef<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pageSize, setPageSize] = useState(() => calcPageSize(true));
  const [currentPage, setCurrentPage] = useState(0);
  // Tracks when the back cover has been "closed" (flipped to single-page state)
  const [backCoverClosed, setBackCoverClosed] = useState(false);

  const totalPages = chapters.length + 3;
  const progress = Math.min((currentPage / Math.max(totalPages - 2, 1)) * 100, 100);

  const isOnCover = currentPage === 0;
  // Back cover closed = onFlip fires with page index === totalPages-1
  const isOnBackCover = backCoverClosed || currentPage === totalPages - 1;

  useEffect(() => {
    const onResize = () => setPageSize(calcPageSize(sidebarOpen));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [sidebarOpen]);

  // Recalculate page size after sidebar CSS transition completes (250ms)
  useEffect(() => {
    const t = setTimeout(() => setPageSize(calcPageSize(sidebarOpen)), 260);
    return () => clearTimeout(t);
  }, [sidebarOpen]);

  useEffect(() => {
    if (window.mermaid) {
      window.mermaid.contentLoaded();
    }
  }, []);

  const onFlip = (e: any) => {
    const page = e.data;
    setCurrentPage(page);
    setBackCoverClosed(page >= totalPages - 1);
    if (window.mermaid) {
      setTimeout(() => {
        window.mermaid.init(undefined, '.mermaid');
      }, 200);
    }
  };

  const turnToPage = (index: number) => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().turnToPage(index);
    }
  };

  const prevPage = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const nextPage = () => {
    if (bookRef.current && bookRef.current.pageFlip()) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  return (
    <div className="reader-layout">
      {/* Sidebar */}
      <aside className={`reader-sidebar${sidebarOpen ? '' : ' sidebar-closed'}`}>
        <div className="reader-sidebar-header">
          <p className="reader-sidebar-title">Contents</p>
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <button
          className={`reader-sidebar-item ${currentPage === 0 ? 'active' : ''}`}
          onClick={() => turnToPage(0)}
        >
          <span className="reader-sidebar-num">—</span>
          <span>Cover</span>
        </button>
        <button
          className={`reader-sidebar-item ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => turnToPage(1)}
        >
          <span className="reader-sidebar-num">—</span>
          <span>Table of Contents</span>
        </button>
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            className={`reader-sidebar-item ${currentPage === idx + 2 ? 'active' : ''}`}
            onClick={() => turnToPage(idx + 2)}
          >
            <span className="reader-sidebar-num">{String(idx + 1).padStart(2, '0')}</span>
            <span>{ch.title}</span>
          </button>
        ))}
      </aside>

      {/* Main content */}
      <div className="reader-main">
        {/* Progress bar */}
        <div className="reader-progress-bar">
          <div className="reader-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Sidebar reopen button — shown below progress bar when sidebar is closed */}
        {!sidebarOpen && (
          <button
            className="sidebar-open-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Contents</span>
          </button>
        )}

        {/* Book stage */}
        <div className="book-stage">
          {/* Clip wrapper: constrains to one page width on cover/back-cover, centering it */}
          <div style={{
            overflow: 'hidden',
            width: (isOnCover || isOnBackCover) ? pageSize.width : pageSize.width * 2,
            transition: 'width 300ms ease',
            flexShrink: 0,
          }}>
            <div style={{
              transform: isOnCover ? `translateX(-${pageSize.width}px)` : 'translateX(0px)',
              transition: 'transform 300ms ease',
            }}>
      <HTMLFlipBook
        width={pageSize.width}
        height={pageSize.height}
        size="fixed"
        minWidth={300}
        maxWidth={900}
        minHeight={420}
        maxHeight={1300}
        maxShadowOpacity={0.6}
        showCover={true}
        mobileScrollSupport={true}
        ref={bookRef}
        onFlip={onFlip}
        className="demo-book"
        style={{}}
        startPage={0}
        drawShadow={true}
        flippingTime={800}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {/* ── Cover ─────────────────────────────────────────── */}
        <div className="page page-cover" data-density="hard">
          <div className="cover-inner">
            <div className="cover-top-accent" />
            <div className="cover-title-area">
              <div className="cover-badge">EBook</div>
              <h1 className="cover-title">System<br />Design</h1>
              <p className="cover-subtitle">A Complete Technical Guide</p>
            </div>
            <div className="cover-illustration">
              <CoverIllustration />
            </div>
            <div className="cover-bottom">
              <div className="cover-divider" />
              <p className="cover-author">CS-EBooks · Pranjal Sharma</p>
            </div>
          </div>
        </div>

        {/* ── Table of Contents ─────────────────────────────── */}
        <div className="page">
          <div className="page-content">
            <div className="toc-header">
              <span className="toc-label">Contents</span>
              <div className="toc-rule" />
            </div>
            <ul className="toc-list">
              {chapters.map((ch, idx) => (
                <li key={ch.id} className="toc-item">
                  <button
                    className="toc-btn"
                    onClick={() => turnToPage(idx + 2)}
                  >
                    <span className="toc-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="toc-title-text">{ch.title}</span>
                    <span className="toc-page">{idx + 3}</span>
                  </button>
                </li>
              ))}
              {chapters.length === 0 && (
                <li style={{ color: 'var(--book-text)', opacity: 0.45, fontSize: '0.82rem', padding: '1.5rem 0', fontStyle: 'italic' }}>
                  No chapters yet.
                </li>
              )}
            </ul>
          </div>
          <div className="page-number-bar"><span>i</span></div>
        </div>

        {/* ── Chapters ──────────────────────────────────────── */}
        {chapters.map((ch, idx) => (
          <div className="page" key={ch.id}>
            <div className="page-content">
              <div className="chapter-header">
                <span className="chapter-number">Chapter {idx + 1}</span>
              </div>
              <h2 className="chapter-title">{ch.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: ch.content }} />
            </div>
            <div className="page-number-bar"><span>{idx + 3}</span></div>
          </div>
        ))}

        {/* ── Back Cover ────────────────────────────────────── */}
        <div className="page page-cover page-back-cover" data-density="hard">
          <div className="back-cover-inner">
            <div className="back-cover-accent" />
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ opacity: 0.2 }}>
                <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z"
                  stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M16 4V28M4 10L16 16L28 10"
                  stroke="white" strokeWidth="1" strokeOpacity="0.5" />
              </svg>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>
                The End
              </p>
              <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                CS-EBooks
              </p>
            </div>
          </div>
        </div>
      </HTMLFlipBook>
            </div>{/* end transform wrapper */}
          </div>{/* end clip wrapper */}

      {/* Navigation Buttons */}
      <div className="book-nav">
        <button className="book-nav-btn" onClick={prevPage} aria-label="Previous page">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 3.5L5.5 9L11 14.5" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="book-nav-btn" onClick={nextPage} aria-label="Next page">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 3.5L12.5 9L7 14.5" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
        </div>
      </div>
    </div>
  );
}
