import regionEuropeImg from '../assets/images/region-europe.jpg';
import regionNorthAmericaImg from '../assets/images/region-north-america.jpg';
import regionAsiaImg from '../assets/images/region-asia.jpg';
import regionSouthAmericaImg from '../assets/images/region-south-america.jpg';
import regionAfricaImg from '../assets/images/region-africa.jpg';

export default function Servers() {
  return (
    <>
      <section className="navyband" id="servers">
        <div className="wrap sec">
          <div className="sec-head">
            <div className="col up">
              <span className="eyebrow is-neutral">
                Global Coverage
              </span>
              {/* bound to FACTS, which is summed from the rows below — see the JS */}
              <h2>
                <span data-fact="servers">
                  700
                </span>
                + servers worldwide.
              </h2>
            </div>
            <p className="aside up" style={{ "--d": "100ms" }}>
              Spanning North America, South America, Europe, Asia, Africa, and Oceania. Automatic server switching prevents slowdowns for uninterrupted service.
            </p>
          </div>
          <div className="srv-tools up">
            <div className="srch" id="srv-srch">
              <svg className="mag" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
                <circle cx="7" cy="7" r="4.6" />
                <path d="M10.5 10.5 14 14" />
              </svg>
              {" "}
              <label className="sr-only" htmlFor="srv-q">
                Filter regions
              </label>
              {" "}
              <input type="search" id="srv-q" placeholder="Filter by region…" autoComplete="off" />
              {" "}
              <button type="button" className="clr" id="srv-clr" aria-label="Clear filter">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
            <p className="srch-count" id="srv-count" />
          </div>
          {/* the list is static here, but a real one arrives over the wire. The skeleton
                    is the shape the rows will take, shown while the (simulated) fetch runs and
                    on every retry, so the loading state is a real designed state rather than a
                    blank gap. */}
          <div className="rows skel" id="srv-skel" aria-hidden="true">
            <div className="skel-row">
              <span className="skel-bar w1" />
              <span className="skel-bar w2" />
              <span className="skel-bar w3" />
              <span className="skel-bar dot" />
            </div>
            <div className="skel-row">
              <span className="skel-bar w1" />
              <span className="skel-bar w2" />
              <span className="skel-bar w3" />
              <span className="skel-bar dot" />
            </div>
            <div className="skel-row">
              <span className="skel-bar w1" />
              <span className="skel-bar w2" />
              <span className="skel-bar w3" />
              <span className="skel-bar dot" />
            </div>
            <div className="skel-row">
              <span className="skel-bar w1" />
              <span className="skel-bar w2" />
              <span className="skel-bar w3" />
              <span className="skel-bar dot" />
            </div>
          </div>
          <div className="rows up" id="rows">
            <a className="rowi" href="#" data-peek={regionEuropeImg}>
              <span className="nm">
                Europe
              </span>
              {" "}
              <span className="tag" data-countries="32" data-servers="240">
                32 countries · 240 servers
              </span>
              {" "}
              <span className="lat mono">
                avg{" "}
                <b>
                  14 ms
                </b>
              </span>
              {" "}
              <span className="go">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
            {" "}
            <a className="rowi" href="#" data-peek={regionNorthAmericaImg}>
              <span className="nm">
                North America
              </span>
              {" "}
              <span className="tag" data-countries="5" data-servers="150">
                5 countries · 150 servers
              </span>
              {" "}
              <span className="lat mono">
                avg{" "}
                <b>
                  42 ms
                </b>
              </span>
              {" "}
              <span className="go">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
            {" "}
            <a className="rowi" href="#" data-peek={regionAsiaImg}>
              <span className="nm">
                Asia
              </span>
              {" "}
              <span className="tag" data-countries="21" data-servers="140">
                21 countries · 140 servers
              </span>
              {" "}
              <span className="lat mono">
                avg{" "}
                <b>
                  48 ms
                </b>
              </span>
              {" "}
              <span className="go">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
            {" "}
            <a className="rowi" href="#" data-peek={regionSouthAmericaImg}>
              <span className="nm">
                South America
              </span>
              {" "}
              <span className="tag" data-countries="12" data-servers="80">
                12 countries · 80 servers
              </span>
              {" "}
              <span className="lat mono">
                avg{" "}
                <b>
                  66 ms
                </b>
              </span>
              {" "}
              <span className="go">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
            {" "}
            <a className="rowi" href="#" data-peek={regionAfricaImg}>
              <span className="nm">
                Africa
              </span>
              {" "}
              <span className="tag" data-countries="14" data-servers="55">
                14 countries · 55 servers
              </span>
              {" "}
              <span className="lat mono">
                avg{" "}
                <b>
                  58 ms
                </b>
              </span>
              {" "}
              <span className="go">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
            {/* add data-peek="…" here once there is an Oceania photo to bake in */}
            <a className="rowi" href="#">
              <span className="nm">
                Oceania
              </span>
              {" "}
              <span className="tag" data-countries="6" data-servers="35">
                6 countries · 35 servers
              </span>
              {" "}
              <span className="lat mono">
                avg{" "}
                <b>
                  71 ms
                </b>
              </span>
              {" "}
              <span className="go">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </a>
          </div>
          <div className="state" id="srv-empty">
            <span className="si">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9" />
              </svg>
            </span>
            <h3>
              No region called “
              <span id="srv-empty-term" />
              ”
            </h3>
            <p>
              We cover six continents. Try a continent name, or clear the filter to see all of them.
            </p>
            <button type="button" className="btn btn-white btn-sm" id="srv-empty-clear">
              Show every region
            </button>
          </div>
          <div className="state state--bad" id="srv-error">
            <span className="si">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M12 3l9 16H3l9-16z" />
                <path d="M12 9v4M12 16.5h.01" />
              </svg>
            </span>
            <h3>
              We could not reach the server list
            </h3>
            <p>
              Your connection is fine — ours hiccuped. Nothing about your account has changed.
            </p>
            <button type="button" className="btn btn-white btn-sm" id="srv-retry">
              Try again
            </button>
          </div>
          {/* ---------- PROOF, not just the claim ----------
                    The parked "independently audited" seal that used to sit here is gone. A
                    card built to display an auditor's name, a report date and a link to the
                    report is the right shape for evidence — and the wrong thing to keep in
                    the markup while all three are placeholders, because the only way it ever
                    ships is by someone deleting one attribute. The claim it carried now
                    reads as the status it actually has, in every place it appeared, and the
                    status itself is stated once at #audit-status and linked from the footer.
                    When there is a real report, that section is where it goes. */}
        </div>
      </section>
      <figure className="media" id="peek">
        <img alt="" />
        {" "}
        <span className="ph">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <circle cx="8.5" cy="9.5" r="1.6" />
            <path d="M4 17l4.5-4.5 3.5 3.5 3-2.5L20 18" />
          </svg>
          <b>
            region photo
          </b>
          800 × 600
        </span>
      </figure>
    </>
  );
}
