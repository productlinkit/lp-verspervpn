export default function Dialogs() {
  return (
    <>
      {/* One overlay object at three severities, driven by openDialog() in the JS.
              Everything destructive on the account page routes through here instead of
              expanding a confirm row inline, so "are you sure" always looks, sounds and
              dismisses the same way.
         
              It is a native <dialog> opened with showModal(), which is what supplies the
              focus trap, the Escape handler, the inert background and the return of focus
              on close — the four things a hand-rolled overlay has to reimplement and this
              page previously did not have at all. */}
      <dialog className="dlg" id="dlg" aria-modal="true" aria-labelledby="dlg-title" aria-describedby="dlg-body">
        <div className="dlg-inner">
          <button type="button" className="dlg-x" id="dlg-x" aria-label="Close">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" focusable="false">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
          <div className="dlg-top">
            <span className="dlg-ic" id="dlg-ic" aria-hidden="true" />
            <div style={{ minWidth: "0" }}>
              <h2 id="dlg-title" />
              <div className="dlg-body" id="dlg-body" />
            </div>
          </div>
          <div className="dlg-actions" id="dlg-actions" />
        </div>
      </dialog>
      {/* transient confirmations and failures that do not deserve a modal */}
      {/* A named region, because the container is a direct child of <body> and its
              contents therefore belonged to no landmark — a screen-reader user moving by
              landmark had no route to a toast that was still on screen. It stays empty
              at rest, so the extra landmark costs nothing until something is announced.
              The toasts themselves carry the live-region semantics. */}
      <div className="toasts" id="toasts" role="region" aria-label="Notifications" />
    </>
  );
}
