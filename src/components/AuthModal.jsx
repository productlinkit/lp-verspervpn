import authSideImg from '../assets/images/auth-side.jpg';

export default function AuthModal() {
  return (
    <>
      <div className="auth" id="auth" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="auth-scrim" data-close="" />
        <div className="auth-card">
          <aside className="auth-side">
            <img className="auth-bg" src={authSideImg} alt="" />
            {" "}
            <span className="auth-veil" />
            {/* role="img" is what licenses the aria-label. A bare <span> has no role,
                          and aria-label on a roleless generic is discarded — the wordmark would
                          have gone unnamed here, where it is the only branding in the panel. */}
            <span className="brand" role="img" aria-label="VesperVPN">
              <svg className="brand-logo" viewBox="0 1 196 40" aria-hidden="true">
                <use href="#logo-vespervpn" />
              </svg>
            </span>
            <p>
              Security. Privacy. Freedom. For everyone.
            </p>
            <ul>
              <li>
                <i />
                <span>
                  <b>
                    Russian Reliability
                  </b>
                  {" "}— owned and operated in-house
                </span>
              </li>
              <li>
                <i />
                <span>
                  <b>
                    Global Coverage
                  </b>
                  {" "}—{" "}
                  <span data-fact="servers">
                    700
                  </span>
                  + servers worldwide
                </span>
              </li>
              <li>
                <i />
                <span>
                  <b>
                    Unmatched Privacy
                  </b>
                  {" "}— no third-party access to your VPN traffic
                </span>
              </li>
              <li>
                <i />
                <span>
                  <b>
                    Protect your privacy
                  </b>
                  {" "}with a strict no-logs policy
                </span>
              </li>
            </ul>
          </aside>
          <div className="auth-main">
            <div className="auth-top">
              <a href="#top" className="brand" data-close="" aria-label="VesperVPN, back to site">
                <svg className="brand-logo" viewBox="0 1 196 40" aria-hidden="true">
                  <use href="#logo-vespervpn" />
                </svg>
              </a>
              {" "}
              <button type="button" className="auth-back" data-close="">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8H4M7.5 4.5L4 8l3.5 3.5" />
                </svg>
                {" "}Back to site
              </button>
            </div>
            <div className="auth-inner">
              <div className="auth-tabs" id="auth-tabs" role="tablist" aria-label="Sign in or register">
                <button type="button" className="on" data-view="in" role="tab" id="authtab-in" aria-selected="true" aria-controls="auth-form" tabIndex={0}>
                  Login
                </button>
                {" "}
                <button type="button" data-view="up" role="tab" id="authtab-up" aria-selected="false" aria-controls="auth-form" tabIndex={-1}>
                  Register
                </button>
              </div>
              <form className="auth-form" id="auth-form" noValidate>
                <h3 id="auth-title">
                  Sign in to your account
                </h3>
                <p className="auth-sub" id="auth-sub">
                  High-speed and secure Russian VPN that protects your privacy.
                </p>
                <button type="button" className="auth-google" id="auth-google">
                  <svg viewBox="0 0 48 48">
                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
                    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                  </svg>
                  {" "}
                  <span id="auth-google-label">
                    Continue with Google
                  </span>
                </button>
                <div className="auth-or" id="auth-or">
                  <span>
                    or use your email
                  </span>
                </div>
                {/* the attempt failed as a whole (wrong password, network, server) —
                                distinct from a field being wrong, and announced without stealing
                                focus. Filled in by JS; empty and hidden at rest. */}
                <div className="f-alert f-alert--bad" id="auth-alert" role="alert" aria-live="assertive" />
                {/* Each field is a <div>, not a wrapping <label>. A wrapping label folds
                                the hint and the error message into the input's accessible name, so
                                the field announced itself as "Email address We send your download
                                link here Please enter a valid email address". Explicit for/id keeps
                                the name to the label, and aria-describedby carries the rest. */}
                <div className="fld" id="fld-email">
                  <label className="lbl" id="lbl-email" htmlFor="au-email">
                    Email address
                  </label>
                  {" "}
                  <span className="fieldwrap">
                    <input type="email" id="au-email" placeholder="you@email.com" autoComplete="email" spellCheck="false" inputMode="email" aria-describedby="hint-email er-email" />
                    {" "}
                    <span className="ok-tick" aria-hidden="true" />
                  </span>
                  {" "}
                  <span className="hint" id="hint-email">
                    Your download link and every receipt go here.
                  </span>
                  {" "}
                  <em className="err" id="er-email" />
                </div>
                <div className="fld" id="fld-pass">
                  <label className="lbl" id="lbl-pass" htmlFor="au-pass">
                    Password
                  </label>
                  {" "}
                  <span className="pwwrap fieldwrap">
                    <input type="password" id="au-pass" placeholder="Enter your password" autoComplete="current-password" aria-describedby="hint-pass er-pass" />
                    {" "}
                    <span className="ok-tick" aria-hidden="true" />
                    {/* aria-pressed, so the label stays put and the *state* is what
                                        changes — a label that renames itself mid-press reads as a
                                        different button each time */}
                    <button type="button" className="peek" id="au-peek" aria-label="Show password" aria-pressed="false">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                        <path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z" />
                        <circle cx="12" cy="12" r="2.8" />
                      </svg>
                    </button>
                  </span>
                  {" "}
                  <span className="hint" id="hint-pass" />
                  {" "}
                  <em className="err" id="er-pass" />
                </div>
                <div className="fld" id="fld-confirm" style={{ display: "none" }}>
                  <label className="lbl" id="lbl-confirm" htmlFor="au-confirm">
                    Confirm Password
                  </label>
                  {" "}
                  <span className="fieldwrap">
                    <input type="password" id="au-confirm" placeholder="Confirm your password" autoComplete="new-password" aria-describedby="hint-confirm er-confirm" />
                    {" "}
                    <span className="ok-tick" aria-hidden="true" />
                  </span>
                  {" "}
                  <span className="hint" id="hint-confirm">
                    Type the same password once more.
                  </span>
                  {" "}
                  <em className="err" id="er-confirm" />
                </div>
                <p className="auth-hint" id="auth-hint" style={{ display: "none" }} />
                <div className="auth-row" id="auth-forgot">
                  <a href="#" data-view="reset">
                    Forgot Password?
                  </a>
                </div>
                <button className="btn btn-red auth-submit" type="submit" id="au-submit">
                  <span className="spin" aria-hidden="true" />
                  {" "}
                  <span id="au-submit-label">
                    Sign in
                  </span>
                  {" "}
                  <span className="arw">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                      <path d="M4 12L12 4M6 4h6v6" />
                    </svg>
                  </span>
                </button>
                <p className="auth-fine" id="auth-fine" />
                <p className="auth-terms" id="auth-terms" style={{ display: "none" }}>
                  Your information is safe with us. We will only contact you when it is required to deliver our services.
                </p>
              </form>
              <div className="auth-done" id="auth-done" style={{ display: "none" }}>
                <span className="tickbig">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                </span>
                <h3 id="done-title" tabIndex={-1}>
                  Check Your Email
                </h3>
                <p id="done-sub" />
                <p className="note" id="done-note">
                  Design prototype. Nothing was actually sent.
                </p>
                <div className="done-actions">
                  <button type="button" className="btn btn-red" id="done-next" style={{ display: "none" }}>
                    <span id="done-next-label">
                      Continue
                    </span>
                    {" "}
                    <span className="arw">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12L12 4M6 4h6v6" />
                      </svg>
                    </span>
                  </button>
                  {" "}
                  <button type="button" className="btn btn-ghost" data-close="">
                    Back to site
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
