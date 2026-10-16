export default function AuditStatus() {
  return (
    <>
      {/* A destination, so the footer link can point at something instead of "#".
              Deliberately a plain strip and not a badge: a seal is what you earn once
              there is a report, and dressing a pending audit up as one is the exact
              move this section exists to stop. It says what has been done, what has
              not, and when — and when a report exists it replaces this copy rather
              than being bolted on somewhere else.
         
              It runs as one band with USABILITY RESEARCH below it, because the FAQ says
              the two claims are treated the same way and a page that gave one a section
              and the other a footer link would be showing the opposite. Two sections
              rather than one so each keeps its own landmark and named anchor; .sec-pair-a
              / .sec-pair-b just move the padding to the outside of the pair. */}
      <section className="wrap sec-pair-a" id="audit-status" aria-labelledby="audit-status-h">
        <div className="astat">
          <div className="astat-t">
            <span className="eyebrow">
              <i className="dot" />
              <span>
                Transparency
              </span>
            </span>
            <h2 id="audit-status-h">
              Independent audit — status
            </h2>
          </div>
          <div className="astat-b">
            <p>
              <b>
                No independent audit has been completed yet.
              </b>
              {" "}We run VesperVPN as a no-log service — no traffic logs, no DNS query logs, no connection timestamps tied to an account — and we have committed to having that claim examined by an outside firm rather than asking you to take our word for it.
            </p>
            <p>
              Until a report exists and is published here in full, we do not describe the service as “audited”. A claim you cannot check is not evidence, and a seal with nothing behind it is worth less than saying so plainly.
            </p>
            <dl className="astat-rows">
              <div>
                <dt>
                  Scope to be assessed
                </dt>
                <dd>
                  Connection, traffic and DNS logging across all production regions
                </dd>
              </div>
              <div>
                <dt>
                  Auditor
                </dt>
                <dd>
                  Not yet appointed
                </dd>
              </div>
              <div>
                <dt>
                  Report
                </dt>
                <dd>
                  Will be published here in full, including any findings against us
                </dd>
              </div>
            </dl>
            <p className="tiny">
              Last reviewed 11 August 2026.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
