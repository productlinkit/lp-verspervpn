export default function Apps() {
  return (
    <>
      {/* .sec, not the same clamp written inline: an inline padding is not reachable
              by the phone trim, so this section kept its 72px desktop rhythm on a 390px
              screen while every section around it had already come down to 40px. */}
      <section className="sec wrap" id="apps">
        <div className="apps up">
          <div className="apps-grid">
            <div>
              <span className="eyebrow">
                Download App
              </span>
              <h2 style={{ marginTop: "18px" }}>
                Download & Browse Freely{" "}
                <span className="serif">
                  with VesperVPN
                </span>
              </h2>
              <p className="lead" style={{ marginTop: "16px" }}>
                Protect your online activities with VesperVPN — the VPN crafted in Russia to ensure global privacy and security.
              </p>
              <div className="tabs" id="apptabs" role="tablist" aria-label="App feature" style={{ marginTop: "26px" }}>
                <button type="button" role="tab" id="apptab-0" data-app="0" aria-selected="true" aria-controls="appcopy" tabIndex={0} className="on">
                  No-Log VPN
                </button>
                {" "}
                <button type="button" role="tab" id="apptab-1" data-app="1" aria-selected="false" aria-controls="appcopy" tabIndex={-1}>
                  Global Coverage
                </button>
                {" "}
                <button type="button" role="tab" id="apptab-2" data-app="2" aria-selected="false" aria-controls="appcopy" tabIndex={-1}>
                  VPN Split Tunnel
                </button>
                {" "}
                <button type="button" role="tab" id="apptab-3" data-app="3" aria-selected="false" aria-controls="appcopy" tabIndex={-1}>
                  VPN Protocols
                </button>
              </div>
              {/* The tabpanel is the wrapper, not the <ul>. role="tabpanel" on a list
                            overrides its implicit role="list", which orphans every <li> — the
                            list stops being announced as a list at all. tabindex="0" because the
                            panel holds no focusable content, so the APG pattern makes the panel
                            itself the tab stop. */}
              <div id="appcopy" role="tabpanel" aria-labelledby="apptab-0" tabIndex={0}>
                <ul className="applist">
                  <li>
                    <span className="tick">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8.5l3.2 3.2L13 5" />
                      </svg>
                    </span>
                    <span>
                      We are a no-log VPN meaning that we don’t store any of your traffic logs.
                    </span>
                  </li>
                  <li>
                    <span className="tick">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8.5l3.2 3.2L13 5" />
                      </svg>
                    </span>
                    <span>
                      VesperVPN is committed to independent, no-log auditing — that audit is in progress.
                    </span>
                  </li>
                  <li>
                    <span className="tick">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8.5l3.2 3.2L13 5" />
                      </svg>
                    </span>
                    <span>
                      No third-party access to your VPN traffic. All data is securely managed from Moscow, free from Western interference.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="stores">
                <a href="#" className="store">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 2.9-.7s1.7.7 2.9.7 2-1.1 2.7-2.1c.9-1.2 1.2-2.4 1.2-2.4s-2.3-.9-2.3-3.5zM14.2 5.9c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.7-1.3z" />
                  </svg>
                  <i>
                    <span>
                      Download on the
                    </span>
                    <b>
                      App Store
                    </b>
                  </i>
                </a>
                {" "}
                <a href="#" className="store">
                  <svg viewBox="0 0 24 24" strokeWidth="1.05" strokeLinejoin="round">
                    <path fill="#4285F4" stroke="#4285F4" d="M3.6 2.6 12.6 12 3.6 21.4Z" />
                    <path fill="#34A853" stroke="#34A853" d="M3.6 2.6 15.6 9.08 12.6 12Z" />
                    <path fill="#FBBC04" stroke="#FBBC04" d="M15.6 9.08 21 12 15.6 14.92 12.6 12Z" />
                    <path fill="#EA4335" stroke="#EA4335" d="M3.6 21.4 15.6 14.92 12.6 12Z" />
                  </svg>
                  <i>
                    <span>
                      GET IT ON
                    </span>
                    <b>
                      Google Play
                    </b>
                  </i>
                </a>
                {" "}
                <a href="#" className="store">
                  <svg viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="xg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#2BA8FF" />
                        <stop offset=".55" stopColor="#8B5CF6" />
                        <stop offset="1" stopColor="#FF4D9D" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5.6" fill="url(#xg)" />
                    <path fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 6.8v6.6m0 0 3-3m-3 3-3-3M7.7 16.9h8.6" />
                  </svg>
                  <i>
                    <span>
                      GET IT ON
                    </span>
                    <b>
                      Xiaomi Apps
                    </b>
                  </i>
                </a>
                {" "}
                <a href="#" className="store">
                  <svg viewBox="0 0 24 24">
                    <path fill="none" stroke="#3DDC84" strokeWidth="1.1" strokeLinecap="round" d="M8.4 5.5 7 3.3M15.6 5.5 17 3.3" />
                    <path fill="#3DDC84" d="M5.6 10.5a6.4 6.4 0 0 1 12.8 0z" />
                    <circle cx="9.5" cy="8.1" r=".9" fill="#000" />
                    <circle cx="14.5" cy="8.1" r=".9" fill="#000" />
                    <rect x="5.6" y="11.5" width="12.8" height="7.3" rx="1.3" fill="#3DDC84" />
                    <rect x="2.1" y="11.5" width="2.5" height="6" rx="1.25" fill="#3DDC84" />
                    <rect x="19.4" y="11.5" width="2.5" height="6" rx="1.25" fill="#3DDC84" />
                    <rect x="8" y="18.6" width="2.5" height="3.5" rx="1.25" fill="#3DDC84" />
                    <rect x="13.5" y="18.6" width="2.5" height="3.5" rx="1.25" fill="#3DDC84" />
                  </svg>
                  <i>
                    <span>
                      Direct download
                    </span>
                    <b>
                      APK File
                    </b>
                  </i>
                </a>
                {" "}
                <a href="#" className="store">
                  <svg viewBox="0 0 24 24">
                    <rect x="2.4" y="2.4" width="9" height="9" fill="#F25022" />
                    <rect x="12.6" y="2.4" width="9" height="9" fill="#7FBA00" />
                    <rect x="2.4" y="12.6" width="9" height="9" fill="#00A4EF" />
                    <rect x="12.6" y="12.6" width="9" height="9" fill="#FFB900" />
                  </svg>
                  <i>
                    <span>
                      Download for
                    </span>
                    <b>
                      Windows
                    </b>
                  </i>
                </a>
                {" "}
                <a href="#" className="store">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.4 12.9c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 2.9-.7s1.7.7 2.9.7 2-1.1 2.7-2.1c.9-1.2 1.2-2.4 1.2-2.4s-2.3-.9-2.3-3.5zM14.2 5.9c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.7-1.3z" />
                  </svg>
                  <i>
                    <span>
                      Download app for
                    </span>
                    <b>
                      macOS
                    </b>
                  </i>
                </a>
              </div>
            </div>
            <div className="phones" id="phones">
              {/* src comes from the baked-in SHOT map, so there is nothing to keep beside the file */}
              <div className="phone p-side">
                <img id="ph-l" alt="VesperVPN app screen" />
              </div>
              <div className="phone p-main">
                <img id="ph-m" alt="VesperVPN connected screen" />
              </div>
              <div className="phone p-side">
                <img id="ph-r" alt="VesperVPN app screen" />
              </div>
            </div>
          </div>
          {/* pros & cons */}
          <div className="pc">
            <div className="pc-head">
              <h3>
                See Pros & Cons
              </h3>
              <div className="tabs" id="pctabs" role="tablist" aria-label="Download method">
                <button type="button" role="tab" id="pctab-0" data-pc="0" aria-selected="true" aria-controls="pc-panel" tabIndex={0} className="on">
                  Download Apps
                </button>
                {" "}
                <button type="button" role="tab" id="pctab-1" data-pc="1" aria-selected="false" aria-controls="pc-panel" tabIndex={-1}>
                  Download APK
                </button>
                {" "}
                <button type="button" role="tab" id="pctab-2" data-pc="2" aria-selected="false" aria-controls="pc-panel" tabIndex={-1}>
                  Download for Windows
                </button>
                {" "}
                <button type="button" role="tab" id="pctab-3" data-pc="3" aria-selected="false" aria-controls="pc-panel" tabIndex={-1}>
                  Download for Mac
                </button>
              </div>
            </div>
            <div className="pc-grid" id="pc-panel" role="tabpanel" aria-labelledby="pctab-0">
              <div className="pc-col pro">
                <h4 id="pc-pro-h">
                  Pros
                </h4>
                <ul id="pc-pro" aria-labelledby="pc-pro-h" />
              </div>
              <div className="pc-col con">
                <h4 id="pc-con-h">
                  Cons
                </h4>
                <ul id="pc-con" aria-labelledby="pc-con-h" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
