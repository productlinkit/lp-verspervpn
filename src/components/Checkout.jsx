export default function Checkout() {
  return (
    <>
      {/* Opens on a plan choice from the pricing block. It reuses the overlay
              contract the auth panel and the account page already follow — role="dialog",
              aria-modal, the rest of the page inert, Esc closes and focus goes back to
              the trigger — rather than inventing a fourth way to be a dialog.
         
              Order of the page is deliberate. What you are buying and what it renews to
              come before anything is typed, and the payment method is chosen before the
              fields it governs appear, so nobody fills in a card and then discovers the
              method they wanted was elsewhere. */}
      <div className="co" id="checkout" role="dialog" aria-modal="true" aria-labelledby="co-title">
        <div className="co-scrim" data-co-close="" />
        <div className="co-card">
          <button type="button" className="co-x" id="co-x" aria-label="Close checkout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true" focusable="false">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className="co-body">
            <h2 id="co-title">
              Confirm your plan
            </h2>
            <p className="co-sub">
              Cancel any time from your account. No charge until you press pay.
            </p>
            {/* ---------- what you are buying ---------- */}
            <section className="co-sum" aria-labelledby="co-sum-h">
              <h3 id="co-sum-h">
                Order summary
              </h3>
              <dl className="co-rows">
                <div className="co-row">
                  <dt>
                    Plan
                  </dt>
                  <dd id="co-plan">
                    1-Year plan
                  </dd>
                </div>
                <div className="co-row">
                  <dt>
                    Billed
                  </dt>
                  <dd id="co-term">
                    every 12 months
                  </dd>
                </div>
                <div className="co-row">
                  <dt>
                    Works out at
                  </dt>
                  <dd id="co-per">
                    $4.00 / month
                  </dd>
                </div>
                <div className="co-row co-row--total">
                  <dt>
                    Total payable at checkout
                  </dt>
                  <dd>
                    <strong id="co-total">
                      $47.99
                    </strong>
                  </dd>
                </div>
              </dl>
              <button type="button" className="co-change" id="co-change">
                Change plan
              </button>
            </section>
            {/* Said here as well as in the pricing block. Renewal terms belong at the
                          moment of payment, not only where the price was advertised. */}
            <p className="co-renew" id="co-renew">
              This renews automatically at{" "}
              <strong id="co-renew-amt">
                $47.99
              </strong>
              {" "}every{" "}
              <span id="co-renew-term">
                12 months
              </span>
              {" "}until you stop it. To stop it, open{" "}
              <b>
                My Account → Subscription → Cancel subscription
              </b>
              . Cancelling keeps your plan running until the paid period ends, and never deletes the account.
            </p>
            <form className="co-form" id="co-form" noValidate>
              {/* whole-attempt failure: declined card, network, gateway. Distinct from
                              a field being wrong, and announced without stealing focus. */}
              <div className="f-alert f-alert--bad" id="co-alert" role="alert" aria-live="assertive" />
              {/* ---------- method chosen before the fields it controls ---------- */}
              <fieldset className="co-pay">
                <legend>
                  Payment method
                </legend>
                {/* no role="radiogroup" here: <fieldset> + <legend> around native
                                  radios already is the group, and naming it twice made the legend
                                  compete with itself */}
                <div className="co-methods">
                  <label className="co-method">
                    <input type="radio" name="co-method" value="card" id="co-m-card" defaultChecked />
                    {" "}
                    <span className="co-method-b">
                      <span className="co-method-n">
                        Card
                      </span>
                      {" "}
                      <span className="co-method-d">
                        Visa, Mastercard
                      </span>
                    </span>
                  </label>
                  {" "}
                  <label className="co-method">
                    <input type="radio" name="co-method" value="paypal" id="co-m-paypal" />
                    {" "}
                    <span className="co-method-b">
                      <span className="co-method-n">
                        PayPal
                      </span>
                      {" "}
                      <span className="co-method-d">
                        You finish paying on PayPal
                      </span>
                    </span>
                  </label>
                  {" "}
                  <label className="co-method">
                    <input type="radio" name="co-method" value="applepay" id="co-m-applepay" />
                    {" "}
                    <span className="co-method-b">
                      <span className="co-method-n">
                        Apple Pay
                      </span>
                      {" "}
                      <span className="co-method-d">
                        Confirm with Face ID or Touch ID
                      </span>
                    </span>
                  </label>
                  {" "}
                  <label className="co-method">
                    <input type="radio" name="co-method" value="googlepay" id="co-m-googlepay" />
                    {" "}
                    <span className="co-method-b">
                      <span className="co-method-n">
                        Google Pay
                      </span>
                      {" "}
                      <span className="co-method-d">
                        You finish paying in Google Pay
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>
              {/* Carried from signup when we already have it — 3.3.7. Still editable,
                              because the address you buy with is not always the one you signed up
                              with, and a read-only field would be the wrong kind of helpful.
                 
                              Every .err slot below carries role="alert" aria-live="polite".
                              aria-describedby alone only speaks when focus reaches the field, so
                              a message written into a field you have already left — which is
                              exactly when blur validation writes them — was silent. The slots
                              are empty at rest, so nothing is announced until one is filled;
                              polite rather than assertive because a correction is not an
                              interruption, and focus is never moved out from under anyone. */}
              <div className="fld" id="co-fld-email">
                <label className="lbl" htmlFor="co-email">
                  Email address
                </label>
                {" "}
                <span className="fieldwrap">
                  <input type="email" id="co-email" placeholder="you@email.com" autoComplete="email" spellCheck="false" inputMode="email" aria-describedby="co-hint-email co-er-email" />
                  {" "}
                  <span className="ok-tick" aria-hidden="true" />
                </span>
                {" "}
                <span className="hint" id="co-hint-email">
                  Your receipt and licence key go here.
                </span>
                {" "}
                <em className="err" id="co-er-email" role="alert" aria-live="polite" />
              </div>
              <div className="co-card-fields" id="co-card-fields">
                <div className="fld" id="co-fld-name">
                  <label className="lbl" htmlFor="co-name">
                    Name on card
                  </label>
                  {" "}
                  <span className="fieldwrap">
                    <input type="text" id="co-name" placeholder="As printed on the card" autoComplete="cc-name" aria-describedby="co-er-name" />
                    {" "}
                    <span className="ok-tick" aria-hidden="true" />
                  </span>
                  {" "}
                  <em className="err" id="co-er-name" role="alert" aria-live="polite" />
                </div>
                <div className="fld" id="co-fld-num">
                  <label className="lbl" htmlFor="co-num">
                    Card number
                  </label>
                  {" "}
                  <span className="fieldwrap">
                    <input type="text" id="co-num" placeholder="1234 5678 9012 3456" autoComplete="cc-number" inputMode="numeric" maxLength={23} aria-describedby="co-hint-num co-er-num" />
                    {" "}
                    <span className="ok-tick" aria-hidden="true" />
                  </span>
                  {" "}
                  <span className="hint" id="co-hint-num">
                    16 digits, on the front of the card.
                  </span>
                  {" "}
                  <em className="err" id="co-er-num" role="alert" aria-live="polite" />
                </div>
                <div className="co-pair">
                  <div className="fld" id="co-fld-exp">
                    <label className="lbl" htmlFor="co-exp">
                      Expiry date
                    </label>
                    {" "}
                    <span className="fieldwrap">
                      <input type="text" id="co-exp" placeholder="MM/YY" autoComplete="cc-exp" inputMode="numeric" maxLength={5} aria-describedby="co-hint-exp co-er-exp" />
                      {" "}
                      <span className="ok-tick" aria-hidden="true" />
                    </span>
                    {" "}
                    <span className="hint" id="co-hint-exp">
                      Month then year, like 04/28.
                    </span>
                    {" "}
                    <em className="err" id="co-er-exp" role="alert" aria-live="polite" />
                  </div>
                  <div className="fld" id="co-fld-csc">
                    <label className="lbl" htmlFor="co-csc">
                      Security code
                    </label>
                    {" "}
                    <span className="fieldwrap">
                      <input type="text" id="co-csc" placeholder="123" autoComplete="cc-csc" inputMode="numeric" maxLength={4} aria-describedby="co-hint-csc co-er-csc" />
                      {" "}
                      <span className="ok-tick" aria-hidden="true" />
                    </span>
                    {" "}
                    <span className="hint" id="co-hint-csc">
                      3 digits on the back, 4 on the front for Amex.
                    </span>
                    {" "}
                    <em className="err" id="co-er-csc" role="alert" aria-live="polite" />
                  </div>
                </div>
              </div>
              {/* Shown instead of the card fields. Saying where the payment finishes
                              beats letting the button be a surprise. */}
              <p className="co-offsite" id="co-offsite" style={{ display: "none" }} />
              <button type="submit" className="btn btn-red co-submit" id="co-submit">
                <span id="co-submit-label">
                  Pay $47.99
                </span>
                {" "}
                <span className="spin" aria-hidden="true" />
              </button>
              <p className="co-secure">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
                  <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
                </svg>
                {" "}
                <span>
                  Encrypted end to end. We never see your card number.
                </span>
              </p>
            </form>
            {/* success replaces the form; role="status" so it is announced without
                          interrupting, and the heading takes focus so reading starts here */}
            <div className="co-done" id="co-done" role="status" aria-live="polite" style={{ display: "none" }}>
              <span className="co-done-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6.5 9.5 17 4 11.5" />
                </svg>
              </span>
              <h3 id="co-done-title" tabIndex={-1}>
                Payment received
              </h3>
              <p id="co-done-body" />
              <button type="button" className="btn btn-primary" id="co-done-go">
                Go to my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
