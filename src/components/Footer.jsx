export default function Footer() {
  return (
    <>
      <footer className="wrap">
        <div className="fgrid">
          <div className="about">
            <a href="#top" className="brand" aria-label="VesperVPN, back to top">
              <svg className="brand-logo" viewBox="0 1 196 40" aria-hidden="true">
                <use href="#logo-vespervpn" />
              </svg>
            </a>
            <p>
              A secure and independent VPN solution, fully controlled from Moscow. VesperVPN is a privacy-focused VPN with a strict no-logs policy, built from the ground up locally in Russia.
            </p>
          </div>
          <div className="fcol">
            <h3>
              Product
            </h3>
            <a href="#why">
              Benefits
            </a>
            <a href="#tech">
              Features
            </a>
            <a href="#servers">
              Global Coverage
            </a>
            <a href="#apps">
              Download App
            </a>
            <a href="#pricing">
              Pricing
            </a>
          </div>
          <div className="fcol">
            <h3>
              Customer service
            </h3>
            {/* the audit status, usability research and accessibility links are out
                          while the transparency band is hidden: a footer link that scrolls to a
                          display:none section just does nothing. Restore them here when the
                          band comes back. */}
            <a href="#faq">
              FAQ
            </a>
            <a href="#">
              Send a Message
            </a>
            <a href="#">
              WhatsApp
            </a>
            <a href="#">
              Telegram
            </a>
            <a href="#" data-auth="in">
              My Account
            </a>
          </div>
          <div className="fcol">
            <h3>
              Address
            </h3>
            {/* the type and the measure come from .fcol p with the rest of the grid;
                          inline here it was the one column on its own set of numbers */}
            <p>
              Office Space in Presnenskaya emb., 12. MIBC Moscow City, Federation Tower East, 123112, Moscow, Russia
            </p>
          </div>
        </div>
        <div className="fbot">
          <p className="tiny">
            Copyright 2024 VesperVPN
          </p>
          <div className="soc">
            <a href="https://facebook.com/vespervpn" target="_blank" rel="noopener noreferrer" aria-label="Visit VesperVPN on Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.7v8h3.5z" />
              </svg>
            </a>
            {" "}
            <a href="https://instagram.com/vespervpn" target="_blank" rel="noopener noreferrer" aria-label="Follow VesperVPN on Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="3.7" />
                <circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {" "}
            <a href="#" aria-label="Chat on Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 4.5 2.9 11.4c-1 .4-1 1.7.1 2l4.6 1.4 1.7 5.2c.2.7 1.1.9 1.6.3l2.4-2.6 4.6 3.4c.7.5 1.6.1 1.8-.7L22.3 5.6c.2-.9-.5-1.5-1.3-1.1zM8.6 14.2l9.1-5.6-7.4 6.8-.3 3.2-1.4-4.4z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
