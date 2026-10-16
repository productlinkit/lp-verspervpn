import benefit1Img from '../assets/images/benefit-1.jpg';
import benefit2Img from '../assets/images/benefit-2.jpg';
import benefit3Img from '../assets/images/benefit-3.jpg';
import benefit4Img from '../assets/images/benefit-4.jpg';

export default function Why() {
  return (
    <>
      <section className="sec wrap" id="why">
        <div className="sec-head">
          <div className="col up">
            <span className="eyebrow">
              Benefits
            </span>
            <h2>
              Why Choose VesperVPN?
            </h2>
          </div>
          <p className="aside up" style={{ "--d": "100ms" }}>
            A secure and independent VPN solution, fully controlled from Moscow. Owned and operated in-house, following strict Russian security standards.
          </p>
        </div>
        <div className="rail up" id="rail">
          <button className="rcard is-open" data-i="0" aria-expanded="true">
            <figure className="media">
              <img src={benefit1Img} alt="VesperVPN app connected to an optimized streaming server" />
            </figure>
            <span className="veil" />
            {" "}
            <span className="num mono">
              01
            </span>
            {" "}
            <span className="plus">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
            {" "}
            <span className="vert">
              <span>
                Best Streaming Experience
              </span>
            </span>
            {" "}
            <span className="full">
              <h3>
                Best Streaming Experience
              </h3>
              <p>
                We have optimized streaming servers around the globe, allowing you to get the most from your existing streaming subscription.
              </p>
              <span className="pill">
                <span>
                  Optimized streaming servers
                </span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </span>
          </button>
          {" "}
          <button className="rcard" data-i="1" aria-expanded="false">
            <figure className="media">
              <img src={benefit2Img} alt="VesperVPN app screen showing the no-logs policy" />
            </figure>
            <span className="veil" />
            {" "}
            <span className="num mono">
              02
            </span>
            {" "}
            <span className="plus">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
            {" "}
            <span className="vert">
              <span>
                Strict No-Logs Policy
              </span>
            </span>
            {" "}
            <span className="full">
              <h3>
                Strict No-Logs Policy
              </h3>
              <p>
                VesperVPN is committed to independent, no-log auditing — that audit is in progress. We don’t store your browsing activity, traffic logs, DNS queries, or connection history tied to your account.
              </p>
              <span className="pill">
                <span>
                  Audit in progress
                </span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </span>
          </button>
          {" "}
          <button className="rcard" data-i="2" aria-expanded="false">
            <figure className="media">
              <img src={benefit3Img} alt="VesperVPN server list, run on locally owned servers" />
            </figure>
            <span className="veil" />
            {" "}
            <span className="num mono">
              03
            </span>
            {" "}
            <span className="plus">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
            {" "}
            <span className="vert">
              <span>
                100% Independent Local Provider Server
              </span>
            </span>
            {" "}
            <span className="full">
              <h3>
                100% Independent Local Provider Server
              </h3>
              <p>
                VesperVPN is run and owned by local people that care about internet privacy and security in Russia. No shadowy megacorporation abroad involvement.
              </p>
              <span className="pill">
                <span>
                  Owned and operated in-house
                </span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </span>
          </button>
          {" "}
          <button className="rcard" data-i="3" aria-expanded="false">
            <figure className="media">
              <img src={benefit4Img} alt="VesperVPN app browsing content without restrictions" />
            </figure>
            <span className="veil" />
            {" "}
            <span className="num mono">
              04
            </span>
            {" "}
            <span className="plus">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
            {" "}
            <span className="vert">
              <span>
                Access Your Favorite Content
              </span>
            </span>
            {" "}
            <span className="full">
              <h3>
                Access Your Favorite Content
              </h3>
              <p>
                With{" "}
                <span data-fact="servers">
                  700
                </span>
                + servers in{" "}
                <span data-fact="countries">
                  90
                </span>
                + countries, you can easily access all of your favorite content – shows, music, apps, and more – regardless of where you live.
              </p>
              <span className="pill">
                <span>
                  <span data-fact="countries">
                    90
                  </span>
                  + countries
                </span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </span>
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
