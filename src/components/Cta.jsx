export default function Cta() {
  return (
    <>
      {/* same reason as #apps: as an inline padding the phone trim could not reach it */}
      <section className="wrap sec-cta">
        <div className="cta up" id="cta">
          {/* no photo baked in for this one yet. instead of a "missing file" box it
                      falls back to the navy backdrop below, which is a finished look on its
                      own. drop a cta.jpg beside this file and it takes over automatically. */}
          <figure className="media cta-back">
            <img src="images/rusnetvpn/cta.jpg" alt="" onError={(e) => e.currentTarget.remove()} />
          </figure>
          <span className="veil" />
          {" "}
          <span className="spot" />
          <div className="inner">
            <span className="eyebrow" style={{ background: "rgba(255,255,255,.1)", color: "#fff", borderColor: "rgba(255,255,255,.16)" }}>
              <i className="dot" />
              Create your account
            </span>
            <h2>
              High-speed and secure Russian VPN{" "}
              <span className="serif">
                that protects your privacy
              </span>
            </h2>
            <p>
              Protect your online activities with VesperVPN — the VPN crafted in Russia to ensure global privacy and security.
            </p>
            {/* the label used to be an aria-label only, so the field was announced but
                          never *shown* as anything except a grey example that vanishes on the
                          first keystroke (3.3.2). Now it is a real, permanent label. */}
            <div className="cta-form-wrap">
              <label className="cta-lbl" htmlFor="cta-email">
                Email address
              </label>
              <form className="form" id="cta-form" noValidate>
                <input type="email" id="cta-email" placeholder="you@email.com" inputMode="email" autoComplete="email" spellCheck="false" aria-describedby="cta-err" />
                {" "}
                <button className="btn btn-red btn-sm" type="submit">
                  <span className="spin" aria-hidden="true" />
                  Create Account
                  <span className="arw">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                      <path d="M4 12L12 4M6 4h6v6" />
                    </svg>
                  </span>
                </button>
              </form>
              <p className="cta-err" id="cta-err" role="alert" />
            </div>
            <div className="row">
              <span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5l3.2 3.2L13 5" />
                </svg>
                Russia-based
              </span>
              {" "}
              <span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5l3.2 3.2L13 5" />
                </svg>
                30-Day Money-Back Guarantee
              </span>
              {" "}
              <span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5l3.2 3.2L13 5" />
                </svg>
                Keep the strict no-logs policy
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
