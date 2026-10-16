export default function Header() {
  return (
    <>
      <header id="hdr">
        <nav className="nav" aria-label="Main">
          <a href="#top" className="brand" aria-label="VesperVPN, back to top">
            <svg className="brand-logo" viewBox="0 1 196 40" aria-hidden="true">
              <use href="#logo-vespervpn" />
            </svg>
          </a>
          <div className="navlinks">
            <a href="#why">
              Benefits
            </a>
            {" "}
            <a href="#tech">
              Features
            </a>
            {" "}
            <a href="#servers">
              Global Coverage
            </a>
            {" "}
            <a href="#apps">
              Download App
            </a>
            {" "}
            <a href="#pricing">
              Pricing
            </a>
            {" "}
            <a href="#faq">
              FAQ
            </a>
          </div>
          <div className="navact">
            <div className="lang" data-lang-picker="">
              {/* 2.5.3 Label in Name: the button reads "EN" on screen but was named
                              "Change language", so the visible label appeared nowhere in the
                              accessible name — someone driving by voice saying "click EN" got
                              nothing. The name is built from content now, so it is "Language: EN"
                              and follows the code when the language changes. */}
              <button type="button" className="lang-btn" aria-haspopup="listbox" aria-expanded="false">
                <span className="sr-only">
                  Language:
                </span>
                {" "}
                <svg className="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
                </svg>
                {" "}
                <span className="code" data-lang-code="">
                  EN
                </span>
                {" "}
                <svg className="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>
              <div className="lang-menu" role="listbox" aria-label="Language">
                <button type="button" className="on" data-lang="en" role="option" aria-selected="true">
                  English
                  <span className="ab">
                    EN
                  </span>
                  <svg className="tickmark" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                </button>
                {" "}
                <button type="button" data-lang="id" role="option" aria-selected="false">
                  Indonesia
                  <span className="ab">
                    ID
                  </span>
                  <svg className="tickmark" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                </button>
              </div>
            </div>
            <a href="#" className="signin" data-auth="in">
              Login
            </a>
            {" "}
            <a href="#" className="btn btn-primary btn-sm" data-buy="">
              <span>
                Get VesperVPN
              </span>
              <span className="arw">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
            <div className="acct" id="acct">
              <button type="button" className="acct-btn" id="acct-btn" aria-expanded="false">
                <span className="ava" id="acct-ava">
                  Y
                </span>
                {" "}
                <span className="acct-name" id="acct-name">
                  you
                </span>
                {" "}
                <svg className="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>
              <div className="acct-menu">
                <div className="acct-head">
                  <span className="ava lg" id="acct-ava2">
                    Y
                  </span>
                  {" "}
                  <span className="acct-id">
                    <b id="acct-mail">
                      you@email.com
                    </b>
                    <i>
                      Subscription · Active
                    </i>
                  </span>
                </div>
                <a href="#account" data-account="overview">
                  My Account
                </a>
                {" "}
                <a href="#subscription" data-account="subscription">
                  Subscription
                </a>
                {" "}
                <a href="#billing" data-account="billing">
                  Billing & invoices
                </a>
                {" "}
                <a href="#security" data-account="security">
                  Security
                </a>
                {" "}
                <button type="button" className="out" id="acct-out">
                  Log out
                </button>
              </div>
            </div>
            <button className="burger" id="burger" aria-label="Open main menu" aria-expanded="false">
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>
      {/* A <nav>, not a <div>. The sheet lives outside the header, so as a generic
              div its eight links belonged to no landmark at all — a screen-reader user
              jumping by landmark skipped the entire mobile menu. Both navs are named
              because there are now two. */}
      <nav className="sheet" id="sheet" aria-label="Mobile menu">
        <a href="#why">
          Benefits
        </a>
        {" "}
        <a href="#tech">
          Features
        </a>
        {" "}
        <a href="#servers">
          Global Coverage
        </a>
        {" "}
        <a href="#apps">
          Download App
        </a>
        {" "}
        <a href="#pricing">
          Pricing
        </a>
        {" "}
        <a href="#faq">
          FAQ
        </a>
        <div className="sheet-cta" id="sheet-guest-cta">
          <a href="#" className="btn btn-ghost" data-auth="in">
            Login
          </a>
          {" "}
          <a href="#" className="btn btn-red" data-buy="">
            <span>
              Get VesperVPN
            </span>
            <span className="arw">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12L12 4M6 4h6v6" />
              </svg>
            </span>
          </a>
        </div>
        <div className="sheet-acct">
          <span className="ava lg" id="acct-ava3">
            Y
          </span>
          {" "}
          <span className="acct-id">
            <b id="sheet-mail">
              you@email.com
            </b>
            <i>
              Subscription · Active
            </i>
          </span>
        </div>
        <div className="sheet-cta" id="sheet-acct-cta" style={{ display: "none" }}>
          <a href="#account" className="btn btn-primary" data-account="overview">
            <span>
              My Account
            </span>
            <span className="arw">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12L12 4M6 4h6v6" />
              </svg>
            </span>
          </a>
          {" "}
          <button type="button" className="btn btn-ghost" id="sheet-out">
            Log out
          </button>
        </div>
      </nav>
    </>
  );
}
