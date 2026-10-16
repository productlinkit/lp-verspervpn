export default function Accessibility() {
  return (
    <>
      <section className="wrap sec-pair-b" id="accessibility" aria-labelledby="a11y-h">
        <div className="astat">
          <div className="astat-t">
            <h2 id="a11y-h">
              Accessibility — status
            </h2>
          </div>
          <div className="astat-b">
            <p>
              <b>
                The site is built to WCAG 2.2 AA, and we would rather show the work than wear a badge.
              </b>
              {" "}Every text colour clears its required ratio on the surface it sits on — 4.5:1 for body text, 3:1 for large display type; the brand red is darkened on buttons so white still clears 4.5:1 at the lightest point of the gradient. Focus is always visible at a consistent 3px ring, motion honours{" "}
              <span className="mono">
                prefers-reduced-motion
              </span>
              , every field is labelled, and dialogs trap focus, close on Esc and return focus to where you left.
            </p>
            <p>
              Automated testing (axe-core, WCAG 2.0/2.1/2.2 A & AA) reports zero violations. That is the floor, not the finish line: automated tools cannot judge a screen-reader journey, so we do not claim more than we have checked.
            </p>
            <dl className="astat-rows">
              <div>
                <dt>
                  Standard
                </dt>
                <dd>
                  WCAG 2.2 level AA — contrast, focus, labels, motion, dialogs
                </dd>
              </div>
              <div>
                <dt>
                  Verified (automated)
                </dt>
                <dd>
                  Zero automated violations; keyboard path, visible focus, dialog focus-trapping and status-message announcements confirmed by an AT-API + keyboard audit
                </dd>
              </div>
              <div>
                <dt>
                  Verified (screen reader)
                </dt>
                <dd>
                  Recorded VoiceOver / Safari (iOS) listen-through, 12 Aug 2026 — recording on file
                </dd>
              </div>
              <div>
                <dt>
                  Not yet
                </dt>
                <dd>
                  A Windows High-Contrast (forced-colors) review — in progress
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
