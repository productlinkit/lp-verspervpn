export default function Faq() {
  return (
    <>
      <section className="sec wrap" id="faq" style={{ paddingTop: "0" }}>
        <div className="sec-head">
          <div className="col up">
            <span className="eyebrow is-neutral">
              FAQ
            </span>
            <h2>
              Questions we get a lot
            </h2>
          </div>
          <p className="aside up" style={{ "--d": "100ms" }}>
            Still stuck? Send a message to customer service on WhatsApp or Telegram and a person writes back.
          </p>
        </div>
        {/* twelve questions is past the point where scanning a list works, so it gets
                  a search. It filters on the question, the answer body and the category, so
                  "refund", "money back" and "Billing" all reach the same row. */}
        <div className="qsearch up" style={{ marginBottom: "22px" }}>
          <div className="srch" id="q-srch">
            <svg className="mag" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
              <circle cx="7" cy="7" r="4.6" />
              <path d="M10.5 10.5 14 14" />
            </svg>
            {" "}
            <label className="sr-only" htmlFor="q-q">
              Search the FAQ
            </label>
            {" "}
            <input type="search" id="q-q" placeholder="Search help — refunds, devices, protocols…" autoComplete="off" />
            {" "}
            <button type="button" className="clr" id="q-clr" aria-label="Clear search">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
          <p className="srch-count" id="q-count" />
        </div>
        <div className="qsplit up" id="qsplit">
          <div className="qnav">
            <div className="qrow is-on" data-cat="Privacy">
              <button className="qitem" id="qbtn-1" aria-expanded="true" aria-controls="qans-1">
                <span className="qn mono">
                  01
                </span>
                {" "}
                <span className="qt">
                  Do you keep any logs?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-1" role="region" aria-labelledby="qbtn-1">
                <div>
                  <p>
                    VesperVPN is committed to independent, no-log auditing — that audit is in progress. We don’t store your browsing activity, traffic logs, DNS queries, or connection history tied to your account. We are a no-log VPN meaning that we don’t store any of your traffic logs.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Global Coverage">
              <button className="qitem" id="qbtn-2" aria-expanded="false" aria-controls="qans-2">
                <span className="qn mono">
                  02
                </span>
                {" "}
                <span className="qt">
                  Where are your servers?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-2" role="region" aria-labelledby="qbtn-2">
                <div>
                  <p>
                    <span data-fact="servers">
                      700
                    </span>
                    + servers worldwide, spanning North America, South America, Europe, Asia, Africa, and Oceania. With{" "}
                    <span data-fact="servers">
                      700
                    </span>
                    + servers in{" "}
                    <span data-fact="countries">
                      90
                    </span>
                    + countries, you can easily access all of your favorite content – shows, music, apps, and more – regardless of where you live.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Ownership">
              <button className="qitem" id="qbtn-3" aria-expanded="false" aria-controls="qans-3">
                <span className="qn mono">
                  03
                </span>
                {" "}
                <span className="qt">
                  Who owns and runs VesperVPN?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-3" role="region" aria-labelledby="qbtn-3">
                <div>
                  <p>
                    VesperVPN is run and owned by local people that care about internet privacy and security in Russia. No shadowy megacorporation abroad involvement. Owned and operated in-house, following strict Russian security standards.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Performance">
              <button className="qitem" id="qbtn-4" aria-expanded="false" aria-controls="qans-4">
                <span className="qn mono">
                  04
                </span>
                {" "}
                <span className="qt">
                  Will VesperVPN slow my connection down?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-4" role="region" aria-labelledby="qbtn-4">
                <div>
                  <p>
                    Advanced hardware ensures fast speeds and smooth streaming. Automatic server switching prevents slowdowns for uninterrupted service, and we offer the most advanced VPN protocols for the fastest and most secure connection.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Streaming">
              <button className="qitem" id="qbtn-5" aria-expanded="false" aria-controls="qans-5">
                <span className="qn mono">
                  05
                </span>
                {" "}
                <span className="qt">
                  Does it work with streaming services?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-5" role="region" aria-labelledby="qbtn-5">
                <div>
                  <p>
                    We have optimized streaming servers around the globe, allowing you to get the most from your existing streaming subscription. Access your favorite content across our global VPN network, regardless of where you live.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Subscription">
              <button className="qitem" id="qbtn-6" aria-expanded="false" aria-controls="qans-6">
                <span className="qn mono">
                  06
                </span>
                {" "}
                <span className="qt">
                  Can I cancel auto-renewal?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-6" role="region" aria-labelledby="qbtn-6">
                <div>
                  <p>
                    Yes. Turn off auto-renewal from My Account and you will keep access until the end of the paid period, and your card will not be charged again. Every invoice sits under transaction history, alongside manage payment & invoices.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Billing">
              <button className="qitem" id="qbtn-7" aria-expanded="false" aria-controls="qans-7">
                <span className="qn mono">
                  07
                </span>
                {" "}
                <span className="qt">
                  Can I get a refund?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-7" role="region" aria-labelledby="qbtn-7">
                <div>
                  <p>
                    Ask within 30 days of the charge and we refund it in full, no questions about why. Write from the email on the account, or open Billing & invoices in My Account and use the receipt for the payment you want back. Money goes back to the card or wallet it came from and usually lands within five working days.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Devices">
              <button className="qitem" id="qbtn-8" aria-expanded="false" aria-controls="qans-8">
                <span className="qn mono">
                  08
                </span>
                {" "}
                <span className="qt">
                  How many devices can I use at once?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-8" role="region" aria-labelledby="qbtn-8">
                <div>
                  <p>
                    Five at a time, on any mix of Windows, macOS, Android, iOS and Linux. There is no per-platform licence — one login covers all of them. When you need a sixth, open Devices in My Account and sign one out; the slot frees up straight away.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Setup">
              <button className="qitem" id="qbtn-9" aria-expanded="false" aria-controls="qans-9">
                <span className="qn mono">
                  09
                </span>
                {" "}
                <span className="qt">
                  How do I get started?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-9" role="region" aria-labelledby="qbtn-9">
                <div>
                  <p>
                    Create an account, download the app for your platform, sign in with the same email, and press connect. The app picks the fastest server near you on its own; the country list is there when you want to choose for yourself. No configuration files, no manual keys.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Protocols">
              <button className="qitem" id="qbtn-10" aria-expanded="false" aria-controls="qans-10">
                <span className="qn mono">
                  10
                </span>
                {" "}
                <span className="qt">
                  Which VPN protocols do you support?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-10" role="region" aria-labelledby="qbtn-10">
                <div>
                  <p>
                    WireGuard by default, because it is the fastest to connect and the lightest on battery, with OpenVPN over UDP and TCP available for networks that block it. Automatic is the right setting for almost everyone — the app falls back on its own when a network refuses the first choice.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Payment">
              <button className="qitem" id="qbtn-11" aria-expanded="false" aria-controls="qans-11">
                <span className="qn mono">
                  11
                </span>
                {" "}
                <span className="qt">
                  How can I pay?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-11" role="region" aria-labelledby="qbtn-11">
                <div>
                  <p>
                    Visa, Mastercard, PayPal, Apple Pay and Google Pay. We never see or store your card number. The charge shows on your statement under our billing descriptor, and every payment produces a downloadable invoice in My Account.
                  </p>
                </div>
              </div>
            </div>
            <div className="qrow" data-cat="Privacy">
              <button className="qitem" id="qbtn-12" aria-expanded="false" aria-controls="qans-12">
                <span className="qn mono">
                  12
                </span>
                {" "}
                <span className="qt">
                  What happens if a server is seized?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-12" role="region" aria-labelledby="qbtn-12">
                <div>
                  <p>
                    Our servers run from RAM and keep no persistent disk, so a machine that is powered down keeps nothing. There are no connection logs, no traffic logs and no DNS logs to hand over — a seized server holds the software that routes traffic and nothing that identifies who sent it.
                  </p>
                </div>
              </div>
            </div>
            {/* The answer is prose with no link in it on purpose. The desktop panel
                          is built with qpA.textContent = $('.qinline p', r).textContent, so an
                          <a> here would survive in the mobile accordion and vanish silently on
                          desktop, which is the worst of both. The status section is named
                          instead, and the footer already links it.
                          Wording follows #audit-status, which is the authoritative statement:
                          committed, scope defined, no auditor appointed, nothing completed. */}
            <div className="qrow" data-cat="Privacy">
              <button className="qitem" id="qbtn-13" aria-expanded="false" aria-controls="qans-13">
                <span className="qn mono">
                  13
                </span>
                {" "}
                <span className="qt">
                  Has the no-log claim been independently audited?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-13" role="region" aria-labelledby="qbtn-13">
                <div>
                  <p>
                    Not yet, and we would rather say so than imply otherwise. We run VesperVPN as a no-log service — no traffic logs, no DNS query logs, no connection timestamps tied to an account — and we have committed to having that claim examined by an outside firm instead of asking you to take our word for it. No auditor has been appointed yet and no report exists, so we do not describe the service as audited anywhere on this site. The scope to be assessed and the current state of the work are set out under “Independent audit — status”, linked in the footer, and that is where the report will be published in full when there is one, including any findings against us.
                  </p>
                </div>
              </div>
            </div>
            {/* hidden with the usability research section it points at. data-off
                          drops it from the script's row set, so it is out of the count, the
                          search and the arrow-key walk rather than merely invisible. */}
            <div className="qrow" data-off="" data-cat="Research">
              <button className="qitem" id="qbtn-14" aria-expanded="false" aria-controls="qans-14">
                <span className="qn mono">
                  14
                </span>
                {" "}
                <span className="qt">
                  Have you checked that the site is actually easy to use?
                </span>
                {" "}
                <span className="qc">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8.5 4.5L12 8l-3.5 3.5" />
                  </svg>
                </span>
              </button>
              <div className="qinline" id="qans-14" role="region" aria-labelledby="qbtn-14">
                <div>
                  <p>
                    Yes, and we treat it the same way as the no-log claim — by checking, not asserting. So far this has been an expert usability review with a modeled five-participant benchmark across the discovery, pricing, checkout and account flows. It is meant for finding and fixing problems, not for quoting as a recruited-user study, and we do not present its figures as one. It flagged a confusing sign-in screen and competing calls-to-action; both have been changed — login now asks only for email and password, and the funnel leads with a single primary action. What was tested, what it found and what we changed are set out under “Usability research — status”, linked in the footer, and a recruited real-user study is the next step, published there in full including anything it finds against us.
                  </p>
                </div>
              </div>
            </div>
            {/* a search that finds nothing has to offer the next move, not just go
                          blank. This is the "empty" half of the state set the audit asked for. */}
            <div className="state" id="q-empty">
              <span className="si">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="M15.5 15.5 21 21M8 10.5h5" />
                </svg>
              </span>
              <h3>
                No answer matches “
                <span id="q-empty-term" />
                ”
              </h3>
              <p>
                Try a shorter word, or ask us directly — someone writes back rather than a bot.
              </p>
              <div className="ac-actions" style={{ justifyContent: "center" }}>
                <button type="button" className="btn btn-ghost btn-sm" id="q-empty-clear">
                  Clear the search
                </button>
                {" "}
                <a href="#" className="btn btn-primary btn-sm" data-fab-open="">
                  <span>
                    Send a message
                  </span>
                  <span className="arw">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                      <path d="M4 12L12 4M6 4h6v6" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="qpanel" id="qpanel">
            <span className="ghost mono" id="qp-ghost">
              01
            </span>
            <div className="qp-top">
              <span className="qp-count mono" id="qp-count">
                01 / 06
              </span>
              {" "}
              <span className="qp-cat" id="qp-cat">
                Privacy
              </span>
            </div>
            <div className="qp-body">
              <h3 className="qp-q" id="qp-q">
                Do you keep any logs?
              </h3>
              <p className="qp-a" id="qp-a" />
            </div>
            <div className="qp-foot">
              <span className="hint">
                Didn't find it here?
              </span>
              {" "}
              <a href="#" className="link-u" data-fab-open="">
                Send a Message
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: "13px", height: "13px" }} aria-hidden="true" focusable="false">
                  <path d="M4 12L12 4M6 4h6v6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
