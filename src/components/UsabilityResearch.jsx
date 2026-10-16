export default function UsabilityResearch() {
  return (
    <>
      {/* The second half of the transparency band. Same shape as the audit block on
              purpose: method, what changed, what is next — and the same refusal to call
              a modeled benchmark a user study. There is no separate report page to link,
              so this section is the report rather than a teaser for one; every claim in
              it is checkable on this page (open the login panel and it asks for an email
              and a password, nothing else). */}
      <section className="wrap sec-pair-m" id="ux-research" aria-labelledby="ux-research-h">
        <div className="astat">
          <div className="astat-t">
            <h2 id="ux-research-h">
              Usability research — status
            </h2>
          </div>
          <div className="astat-b">
            <p>
              <b>
                We test the experience the same way we treat the no-log claim: by checking, not asserting.
              </b>
              {" "}So far this has been an expert usability review with a modeled five-participant benchmark — a structured walkthrough of the discovery, pricing, checkout and account flows.
            </p>
            <p>
              It is useful for finding and fixing problems; it is not a recruited real-user study, and we do not present its numbers as one. What it flagged, we changed rather than filed away: a confusing sign-in screen (a “confirm password” field on the login state) and competing calls-to-action are both fixed — login now asks only for email and password, and the funnel leads with one primary action.
            </p>
            <dl className="astat-rows">
              <div>
                <dt>
                  Method
                </dt>
                <dd>
                  Expert usability review + modeled 5-participant benchmark — not recruited users
                </dd>
              </div>
              <div>
                <dt>
                  Changed so far
                </dt>
                <dd>
                  Sign-in simplified, calls-to-action unified — both already live on this page
                </dd>
              </div>
              <div>
                <dt>
                  Next
                </dt>
                <dd>
                  A recruited real-user study, published here in full including any findings against us
                </dd>
              </div>
            </dl>
            <p className="tiny">
              Last reviewed 12 August 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
