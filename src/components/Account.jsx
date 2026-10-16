export default function Account() {
  return (
    <>
      <div className="account" id="account" role="dialog" aria-modal="true" aria-labelledby="ac-title">
        <div className="ac-top">
          <a href="#top" className="brand" data-ac-close="" aria-label="VesperVPN, back to site">
            <svg className="brand-logo" viewBox="0 1 196 40" aria-hidden="true">
              <use href="#logo-vespervpn" />
            </svg>
          </a>
          {" "}
          <button type="button" className="ac-back" data-ac-close="">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8H4M7.5 4.5L4 8l3.5 3.5" />
            </svg>
            {" "}Back to site
          </button>
          {" "}
          <span className="ava" id="ac-ava">
            Y
          </span>
        </div>
        <div className="ac-body wrap">
          {/* ---------- left rail ---------- */}
          <aside className="ac-nav">
            <div className="ac-me">
              <span className="ava lg" id="ac-ava2">
                Y
              </span>
              {" "}
              <span className="who">
                <b id="ac-name">
                  you
                </b>
                <i id="ac-mail">
                  you@email.com
                </i>
              </span>
            </div>
            <div className="ac-tabs" id="ac-tabs" role="tablist" aria-orientation="vertical" aria-label="Account sections">
              <button type="button" className="ac-link on" data-panel="overview" role="tab" id="actab-overview" aria-selected="true" aria-controls="acp-overview" tabIndex={0}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="9" rx="2" />
                  <rect x="14" y="3" width="7" height="5" rx="2" />
                  <rect x="14" y="12" width="7" height="9" rx="2" />
                  <rect x="3" y="16" width="7" height="5" rx="2" />
                </svg>
                {" "}Overview
              </button>
              {" "}
              <button type="button" className="ac-link" data-panel="subscription" role="tab" id="actab-subscription" aria-selected="false" aria-controls="acp-subscription" tabIndex={-1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v5.5c0 4.3-3 8-7 9.5-4-1.5-7-5.2-7-9.5V6l7-3z" />
                  <path d="M9.5 12l1.8 1.8L15 10" />
                </svg>
                {" "}Subscription
              </button>
              {" "}
              <button type="button" className="ac-link" data-panel="billing" role="tab" id="actab-billing" aria-selected="false" aria-controls="acp-billing" tabIndex={-1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M3 10h18" />
                </svg>
                {" "}Billing & invoices
              </button>
              {" "}
              <button type="button" className="ac-link" data-panel="devices" role="tab" id="actab-devices" aria-selected="false" aria-controls="acp-devices" tabIndex={-1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="14" height="10" rx="2" />
                  <rect x="17" y="9" width="5" height="11" rx="1.6" />
                  <path d="M6 18h6" />
                </svg>
                {" "}Devices{" "}
                <span className="pip" id="ac-dev-pip" />
              </button>
              {" "}
              <button type="button" className="ac-link" data-panel="security" role="tab" id="actab-security" aria-selected="false" aria-controls="acp-security" tabIndex={-1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="10" width="16" height="11" rx="2.5" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                {" "}Security
              </button>
              {" "}
              <button type="button" className="ac-link" data-panel="notifications" role="tab" id="actab-notifications" aria-selected="false" aria-controls="acp-notifications" tabIndex={-1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8.5a6 6 0 0 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5z" />
                  <path d="M10.3 20a2 2 0 0 0 3.4 0" />
                </svg>
                {" "}Notifications
              </button>
              {" "}
              <button type="button" className="ac-link" data-panel="support" role="tab" id="actab-support" aria-selected="false" aria-controls="acp-support" tabIndex={-1}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.4 9.4a2.7 2.7 0 1 1 3.4 3.4c-.6.3-.8.8-.8 1.4" />
                  <path d="M12 17.2h.01" />
                </svg>
                {" "}Support
              </button>
            </div>
            <button type="button" className="ac-link ac-out" id="ac-out">
              Log out
            </button>
          </aside>
          {/* was a second <main>. Two main landmarks means "skip to main content" has
                      two destinations and a screen reader's landmark list has an ambiguous
                      entry, so the account view is a labelled region instead (1.3.1). The
                      page keeps exactly one <main>, up at #top. */}
          <section className="ac-main" aria-label="Account settings">
            {/* ================= OVERVIEW ================= */}
            <section className="ac-panel on" data-p="overview" id="acp-overview" role="tabpanel" aria-labelledby="actab-overview" tabIndex={-1}>
              <div className="ac-head">
                <h2 id="ac-title">
                  Hei,{" "}
                  <span id="ac-hello">
                    you
                  </span>
                </h2>
                <p>
                  Everything about your account lives here. Your plan, your invoices, the devices you are signed in on, and the switches that decide what we email you.
                </p>
              </div>
              <div className="ac-grid">
                <div className="ac-stat">
                  <div className="k">
                    Current plan
                  </div>
                  <div className="v" id="ac-plan-name">
                    1-Year
                  </div>
                  <div className="n" id="ac-plan-note">
                    Premium, every feature included
                  </div>
                </div>
                <div className="ac-stat">
                  <div className="k">
                    Renews on
                  </div>
                  <div className="v mono" id="ac-renew">
                    6 Aug 2027
                  </div>
                  <div className="n" id="ac-renew-note">
                    Auto-renewal is on
                  </div>
                </div>
                <div className="ac-stat">
                  <div className="k">
                    Devices
                  </div>
                  <div className="v mono">
                    <span id="ac-dev-count">
                      3
                    </span>
                    {" "}
                    <em>
                      / 5
                    </em>
                  </div>
                  <div className="n">
                    Sign one out to free a slot
                  </div>
                </div>
                <div className="ac-stat">
                  <div className="k">
                    Data used
                  </div>
                  <div className="v">
                    Unlimited
                  </div>
                  <div className="n">
                    No cap on any paid plan
                  </div>
                </div>
              </div>
              <div className="ac-card dark" style={{ marginTop: "14px" }}>
                <h3>
                  Get VesperVPN on this device
                </h3>
                <p className="sub" style={{ marginTop: "6px", maxWidth: "52ch" }}>
                  One account covers five devices at once. Windows, macOS, Android, iOS and Linux, all from the same login.
                </p>
                <div className="ac-actions">
                  <a href="#apps" className="btn btn-white" data-ac-close="">
                    <span>
                      Download the app
                    </span>
                    <span className="arw">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12L12 4M6 4h6v6" />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <div className="ac-card" style={{ marginTop: "14px" }}>
                <h3>
                  Recent activity
                </h3>
                <p className="sub">
                  Last seven days on this account.
                </p>
                <div style={{ marginTop: "18px" }}>
                  <div className="ac-row">
                    <span className="ac-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    {" "}
                    <span className="txt">
                      <b>
                        Connected to Frankfurt
                      </b>
                      <span>
                        Today, 09:41 · Windows · 12 ms
                      </span>
                    </span>
                  </div>
                  <div className="ac-row">
                    <span className="ac-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="14" height="10" rx="2" />
                        <rect x="17" y="9" width="5" height="11" rx="1.6" />
                      </svg>
                    </span>
                    {" "}
                    <span className="txt">
                      <b>
                        New device signed in
                      </b>
                      <span>
                        4 Aug 2026, 20:12 · iPhone 15 · Jakarta
                      </span>
                    </span>
                  </div>
                  <div className="ac-row">
                    <span className="ac-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="3" />
                        <path d="M3 10h18" />
                      </svg>
                    </span>
                    {" "}
                    <span className="txt">
                      <b>
                        Payment received
                      </b>
                      <span>
                        6 Aug 2026 · $47.99 · Visa ending 4242
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* ================= SUBSCRIPTION ================= */}
            <section className="ac-panel" data-p="subscription" id="acp-subscription" role="tabpanel" aria-labelledby="actab-subscription" tabIndex={-1}>
              <div className="ac-head">
                <h2>
                  Subscription
                </h2>
                <p>
                  What you are on now, when it renews, and how to change either of those.
                </p>
              </div>
              <div className="ac-card dark">
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                  <div>
                    <h3 id="ac-sub-plan">
                      1-Year plan
                    </h3>
                    <p className="sub" style={{ marginTop: "6px" }}>
                      $47.99 billed once · $4.00 / month equivalent
                    </p>
                  </div>
                  <span className="ac-tag good" id="ac-sub-state" style={{ marginLeft: "auto" }}>
                    Active
                  </span>
                </div>
                <div className="ac-facts">
                  <div>
                    <div className="sub">
                      Started
                    </div>
                    <b className="mono">
                      6 Aug 2026
                    </b>
                  </div>
                  <div>
                    <div className="sub" id="ac-sub-endlabel">
                      Renews
                    </div>
                    <b className="mono" id="ac-sub-end">
                      6 Aug 2027
                    </b>
                  </div>
                  <div>
                    <div className="sub">
                      Paid with
                    </div>
                    <b>
                      Visa ···· 4242
                    </b>
                  </div>
                </div>
              </div>
              <div className="ac-card">
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Auto-renewal
                    </b>
                    <span id="ac-auto-note">
                      On. We will charge $47.99 on 6 Aug 2027 and your access carries on without a gap.
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="sw on act" id="ac-auto" role="switch" aria-checked="true" aria-label="Auto-renewal" />
                </div>
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Change plan
                    </b>
                    <span>
                      Longer plans cost less per month. Every plan has the same features.
                    </span>
                  </span>
                  {" "}
                  <a href="#pricing" className="btn btn-ghost btn-sm act" data-ac-close="">
                    See plans
                  </a>
                </div>
              </div>
              <div className="ac-card">
                <h3>
                  What is included
                </h3>
                <p className="sub">
                  All of it, on every plan. Nothing here is sold as an add-on.
                </p>
                <div className="ac-grid" style={{ marginTop: "18px", gap: "10px" }}>
                  <span className="ac-tag good" style={{ textTransform: "none", letterSpacing: "0", fontSize: "var(--fs-200)", fontWeight: "600" }}>
                    <span>
                      <span data-fact="servers">
                        700
                      </span>
                      + servers,{" "}
                      <span data-fact="countries">
                        90
                      </span>
                      + countries
                    </span>
                  </span>
                  {" "}
                  <span className="ac-tag good" style={{ textTransform: "none", letterSpacing: "0", fontSize: "var(--fs-200)", fontWeight: "600" }}>
                    5 devices at once
                  </span>
                  {" "}
                  <span className="ac-tag good" style={{ textTransform: "none", letterSpacing: "0", fontSize: "var(--fs-200)", fontWeight: "600" }}>
                    Unlimited bandwidth
                  </span>
                  {" "}
                  <span className="ac-tag good" style={{ textTransform: "none", letterSpacing: "0", fontSize: "var(--fs-200)", fontWeight: "600" }}>
                    Strict no-logs policy
                  </span>
                </div>
              </div>
              <div className="ac-card danger">
                <h3>
                  Cancel subscription
                </h3>
                <p className="sub" style={{ marginTop: "6px" }}>
                  Your premium access stays active until the end of your current billing period. After that your subscription ends and your account remains available.
                </p>
                {/* the confirm step used to expand inline here. It now goes through the
                                  shared dialog, so "are you sure" looks and dismisses the same way
                                  everywhere and cannot be missed below the fold. */}
                <div className="ac-actions" id="ac-cancel-wrap">
                  <button type="button" className="btn btn-ghost btn-sm" id="ac-cancel">
                    Cancel subscription
                  </button>
                </div>
                <div className="ac-ok" id="ac-cancel-ok" role="status">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  {" "}
                  <span>
                    Cancelled. Premium stays on until 6 Aug 2027.
                  </span>
                </div>
              </div>
            </section>
            {/* ================= BILLING ================= */}
            <section className="ac-panel" data-p="billing" id="acp-billing" role="tabpanel" aria-labelledby="actab-billing" tabIndex={-1}>
              <div className="ac-head">
                <h2>
                  Billing & invoices
                </h2>
                <p>
                  Your payment method and every receipt we have issued. Invoices stay downloadable even after a plan ends.
                </p>
              </div>
              <div className="ac-card">
                <div className="ac-row">
                  <span className="ac-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="3" />
                      <path d="M3 10h18" />
                    </svg>
                  </span>
                  {" "}
                  <span className="txt">
                    <b>
                      Visa ···· 4242
                    </b>
                    <span>
                      Expires 11 / 2029 · Default payment method
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="btn btn-ghost btn-sm act">
                    Replace
                  </button>
                </div>
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Billing email
                    </b>
                    <span id="ac-bill-mail">
                      you@email.com
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="btn btn-ghost btn-sm act">
                    Change
                  </button>
                </div>
              </div>
              <div className="ac-card">
                <h3>
                  Invoices
                </h3>
                <p className="sub">
                  Prices shown are what was charged, tax included.
                </p>
                <div className="ac-scroll" style={{ marginTop: "18px" }}>
                  <table className="ac-table">
                    <thead>
                      <tr>
                        <th>
                          Date
                        </th>
                        <th>
                          Description
                        </th>
                        <th>
                          Amount
                        </th>
                        <th>
                          Status
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="mono">
                          6 Aug 2026
                        </td>
                        <td>
                          1-Year plan
                        </td>
                        <td className="amt">
                          $47.99
                        </td>
                        <td>
                          <span className="ac-tag good">
                            Paid
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button type="button" className="dl">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M8 2v8M5 7.5L8 10.5l3-3M3 13.5h10" />
                            </svg>
                            PDF
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="mono">
                          6 Aug 2025
                        </td>
                        <td>
                          1-Year plan
                        </td>
                        <td className="amt">
                          $47.99
                        </td>
                        <td>
                          <span className="ac-tag good">
                            Paid
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button type="button" className="dl">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M8 2v8M5 7.5L8 10.5l3-3M3 13.5h10" />
                            </svg>
                            PDF
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="mono">
                          6 Jul 2025
                        </td>
                        <td>
                          1-Month plan
                        </td>
                        <td className="amt">
                          $9.99
                        </td>
                        <td>
                          <span className="ac-tag good">
                            Paid
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button type="button" className="dl">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M8 2v8M5 7.5L8 10.5l3-3M3 13.5h10" />
                            </svg>
                            PDF
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="mono">
                          3 Jul 2025
                        </td>
                        <td>
                          3-day trial
                        </td>
                        <td className="amt">
                          $0.00
                        </td>
                        <td>
                          <span className="ac-tag warn">
                            Free
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button type="button" className="dl">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M8 2v8M5 7.5L8 10.5l3-3M3 13.5h10" />
                            </svg>
                            PDF
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="ac-note">
                  Design prototype. The download buttons do not produce a real file.
                </p>
              </div>
            </section>
            {/* ================= DEVICES ================= */}
            <section className="ac-panel" data-p="devices" id="acp-devices" role="tabpanel" aria-labelledby="actab-devices" tabIndex={-1}>
              <div className="ac-head">
                <h2>
                  Devices
                </h2>
                <p>
                  Five at a time on any paid plan. Signing a device out here logs it out immediately, wherever it is.
                </p>
              </div>
              <div className="ac-card">
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                  <h3>
                    <span id="ac-dev-n">
                      3
                    </span>
                    {" "}of 5 slots in use
                  </h3>
                  <span className="sub" id="ac-dev-free">
                    2 free
                  </span>
                </div>
                <div className="meter">
                  <i id="ac-dev-bar" style={{ width: "60%" }} />
                </div>
              </div>
              <div className="ac-card" id="ac-dev-list">
                <div className="ac-row" data-device="">
                  <span className="ac-ic red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="13" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </span>
                  {" "}
                  <span className="txt">
                    <b>
                      Windows 11 · This device
                    </b>
                    <span>
                      Active now · Jakarta, Indonesia
                    </span>
                  </span>
                  {" "}
                  <span className="ac-tag good act">
                    Current
                  </span>
                </div>
                <div className="ac-row" data-device="">
                  <span className="ac-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="7" y="2" width="10" height="20" rx="2.5" />
                      <path d="M11 18.5h2" />
                    </svg>
                  </span>
                  {" "}
                  <span className="txt">
                    <b>
                      iPhone 15
                    </b>
                    <span>
                      Last active 2 hours ago · Jakarta, Indonesia
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="btn btn-ghost btn-sm act" data-signout="">
                    Sign out
                  </button>
                </div>
                <div className="ac-row" data-device="">
                  <span className="ac-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="12" rx="2" />
                      <path d="M2 20h20" />
                    </svg>
                  </span>
                  {" "}
                  <span className="txt">
                    <b>
                      MacBook Air
                    </b>
                    <span>
                      Last active 3 days ago · Bandung, Indonesia
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="btn btn-ghost btn-sm act" data-signout="">
                    Sign out
                  </button>
                </div>
              </div>
              <div className="ac-card danger">
                <h3>
                  Sign out everywhere
                </h3>
                <p className="sub" style={{ marginTop: "6px" }}>
                  Ends every session except the one you are using right now. Handy if you lost a phone.
                </p>
                <div className="ac-actions">
                  <button type="button" className="btn btn-ghost btn-sm" id="ac-dev-all">
                    Sign out all other devices
                  </button>
                </div>
                <div className="ac-ok" id="ac-dev-ok">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  {" "}
                  <span>
                    Done. Only this device is still signed in.
                  </span>
                </div>
              </div>
            </section>
            {/* ================= SECURITY ================= */}
            <section className="ac-panel" data-p="security" id="acp-security" role="tabpanel" aria-labelledby="actab-security" tabIndex={-1}>
              <div className="ac-head">
                <h2>
                  Security
                </h2>
                <p>
                  Your password, two-factor, and what we do when someone signs in from somewhere new.
                </p>
              </div>
              <div className="ac-card">
                <h3>
                  Change password
                </h3>
                <p className="sub">
                  Changing it signs out every other device automatically.
                </p>
                <form id="ac-pw-form" noValidate style={{ maxWidth: "440px" }}>
                  <div className="f-alert f-alert--bad" id="ac-pw-alert" role="alert" aria-live="assertive" />
                  <div className="fld" id="fld-cur">
                    <label className="lbl" htmlFor="ac-cur">
                      Current password
                    </label>
                    {" "}
                    <span className="fieldwrap">
                      <input type="password" id="ac-cur" placeholder="Enter your current password" autoComplete="current-password" aria-describedby="er-cur" />
                      {" "}
                      <span className="ok-tick" aria-hidden="true" />
                    </span>
                    {" "}
                    <em className="err" id="er-cur" />
                  </div>
                  <div className="fld" id="fld-new">
                    <label className="lbl" htmlFor="ac-new">
                      New password
                    </label>
                    {" "}
                    <span className="fieldwrap">
                      <input type="password" id="ac-new" placeholder="At least 6 characters" autoComplete="new-password" aria-describedby="hint-new er-new" />
                      {" "}
                      <span className="ok-tick" aria-hidden="true" />
                    </span>
                    {" "}
                    <span className="hint" id="hint-new">
                      At least 6 characters, and different from your current one.
                    </span>
                    {" "}
                    <em className="err" id="er-new" />
                  </div>
                  <div className="fld" id="fld-again">
                    <label className="lbl" htmlFor="ac-again">
                      Confirm new password
                    </label>
                    {" "}
                    <span className="fieldwrap">
                      <input type="password" id="ac-again" placeholder="Type it once more" autoComplete="new-password" aria-describedby="er-again" />
                      {" "}
                      <span className="ok-tick" aria-hidden="true" />
                    </span>
                    {" "}
                    <em className="err" id="er-again" />
                  </div>
                  <div className="ac-actions">
                    <button className="btn btn-red btn-sm" type="submit">
                      <span className="spin" aria-hidden="true" />
                      <span>
                        Save new password
                      </span>
                      <span className="arw">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <path d="M4 12L12 4M6 4h6v6" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
                <div className="ac-ok" id="ac-pw-ok" role="status">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  {" "}
                  <span>
                    Password updated. Other devices have been signed out.
                  </span>
                </div>
              </div>
              <div className="ac-card">
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Two-factor authentication
                    </b>
                    <span>
                      Ask for a code from your authenticator app on every new sign-in.
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="sw act" role="switch" aria-checked="false" aria-label="Two-factor authentication" />
                </div>
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Alert me about new sign-ins
                    </b>
                    <span>
                      An email whenever your account is used on a device we have not seen before.
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="sw on act" role="switch" aria-checked="true" aria-label="New sign-in alerts" />
                </div>
              </div>
            </section>
            {/* ================= NOTIFICATIONS ================= */}
            <section className="ac-panel" data-p="notifications" id="acp-notifications" role="tabpanel" aria-labelledby="actab-notifications" tabIndex={-1}>
              <div className="ac-head">
                <h2>
                  Notifications
                </h2>
                <p>
                  We keep this short. Security emails cannot be turned off, everything else is yours to decide.
                </p>
              </div>
              <div className="ac-card">
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Security alerts
                    </b>
                    <span>
                      New sign-ins, password changes, anything that touches access.
                    </span>
                  </span>
                  {" "}
                  <span className="ac-tag good act">
                    Always on
                  </span>
                </div>
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Renewal reminders
                    </b>
                    <span>
                      A heads-up seven days before we charge you, so nothing is a surprise.
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="sw on act" role="switch" aria-checked="true" aria-label="Renewal reminders" />
                </div>
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Product updates
                    </b>
                    <span>
                      New servers, new features, app releases. Roughly once a month.
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="sw on act" role="switch" aria-checked="true" aria-label="Product updates" />
                </div>
                <div className="ac-row">
                  <span className="txt">
                    <b>
                      Offers and discounts
                    </b>
                    <span>
                      Occasional deals on longer plans. Off by default.
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="sw act" role="switch" aria-checked="false" aria-label="Offers and discounts" />
                </div>
              </div>
            </section>
            {/* ================= SUPPORT ================= */}
            <section className="ac-panel" data-p="support" id="acp-support" role="tabpanel" aria-labelledby="actab-support" tabIndex={-1}>
              <div className="ac-head">
                <h2>
                  Support
                </h2>
                <p>
                  Real people in Moscow, not a bot that loops you back to the help page.
                </p>
              </div>
              <div className="ac-card">
                <div className="ac-row">
                  <span className="ac-ic red">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-3.3A8.4 8.4 0 1 1 21 11.5z" />
                    </svg>
                  </span>
                  {" "}
                  <span className="txt">
                    <b>
                      Live chat
                    </b>
                    <span>
                      Usually answers in under 5 minutes, 24 hours a day.
                    </span>
                  </span>
                  {" "}
                  <button type="button" className="btn btn-ghost btn-sm act" id="ac-chat">
                    Start a chat
                  </button>
                </div>
                <div className="ac-row">
                  <span className="ac-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2.5" />
                      <path d="M3.5 7l8.5 6 8.5-6" />
                    </svg>
                  </span>
                  {" "}
                  <span className="txt">
                    <b>
                      Email us
                    </b>
                    <span>
                      support@vespervpn.com · a reply within one working day.
                    </span>
                  </span>
                  {" "}
                  <a href="mailto:support@vespervpn.com" className="btn btn-ghost btn-sm act">
                    Write an email
                  </a>
                </div>
                <div className="ac-row">
                  <span className="ac-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M9.4 9.4a2.7 2.7 0 1 1 3.4 3.4c-.6.3-.8.8-.8 1.4" />
                      <path d="M12 17.2h.01" />
                    </svg>
                  </span>
                  {" "}
                  <span className="txt">
                    <b>
                      Read the FAQ
                    </b>
                    <span>
                      Logs, servers, ownership, refunds. The short answers.
                    </span>
                  </span>
                  {" "}
                  <a href="#faq" className="btn btn-ghost btn-sm act" data-ac-close="">
                    Open FAQ
                  </a>
                </div>
              </div>
              <div className="ac-card danger">
                <h3>
                  Delete account
                </h3>
                <p className="sub" style={{ marginTop: "6px" }}>
                  This removes your account and everything attached to it. It cannot be undone, and any time left on your plan is not refunded.
                </p>
                <div className="ac-actions" id="ac-del-wrap">
                  <button type="button" className="btn btn-ghost btn-sm" id="ac-del">
                    Delete my account
                  </button>
                </div>
                <p className="ac-note">
                  Design prototype. Nothing is actually deleted.
                </p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
