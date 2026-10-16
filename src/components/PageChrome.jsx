export default function PageChrome() {
  return (
    <>
      {/* first in the tab order, hidden until it has focus: 2.4.1 Bypass Blocks */}
      <a href="#top" className="skip">
        Skip to main content
      </a>
      {/* polite live region shared by the whole page. Filtering a list, switching a
              plan or finishing a form all write here, so state changes that are obvious
              on screen are also spoken. Kept empty at rest so nothing is announced twice. */}
      <p className="sr-only" id="live-polite" role="status" aria-live="polite" aria-atomic="true" />
      {/* and its assertive twin, for things that interrupt: a failed submit */}
      <p className="sr-only" id="live-alert" role="alert" aria-live="assertive" aria-atomic="true" />
      {/* the VesperVPN wordmark, defined once and pulled in wherever the brand
              appears. "Vesper" is currentColor so the same mark reads dark on the paper
              header and white on the navy auth panel; "VPN" always carries the brand blue. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <symbol id="logo-vespervpn" viewBox="0 1 196 40">
          <text x="0" y="31" fontFamily="'Host Grotesk','Inter',system-ui,sans-serif" fontWeight="700" fontSize="40" letterSpacing="-1.2" fill="currentColor">
            Vesper
            <tspan fill="#2563EB">
              VPN
            </tspan>
          </text>
        </symbol>
      </svg>
      <div id="prog" />
    </>
  );
}
