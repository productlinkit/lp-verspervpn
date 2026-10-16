export default function ChatFab() {
  return (
    <>
      <div className="fab" id="fab">
        <div className="opts">
          <a href="#" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24" fill="#25D366">
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.5 14c-.3.8-1.5 1.4-2.1 1.5-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.4-4.7-5.6-4.9-.2-.2-1.4-1.8-1.4-3.5s.9-2.5 1.2-2.8c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l1 2.4c.1.2.1.4 0 .6l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l1-1.2c.2-.2.4-.2.6-.1l2.2 1.1c.3.1.5.2.6.4.1.1.1.6-.2 1.4z" />
            </svg>
            WhatsApp
          </a>
          {" "}
          <a href="#" aria-label="Chat on Telegram">
            <svg viewBox="0 0 24 24" fill="#2AABEE">
              <path d="M21 4.5 2.9 11.4c-1 .4-1 1.7.1 2l4.6 1.4 1.7 5.2c.2.7 1.1.9 1.6.3l2.4-2.6 4.6 3.4c.7.5 1.6.1 1.8-.7L22.3 5.6c.2-.9-.5-1.5-1.3-1.1zM8.6 14.2l9.1-5.6-7.4 6.8-.3 3.2-1.4-4.4z" />
            </svg>
            Telegram
          </a>
        </div>
        <button className="toggle" id="fabtoggle" aria-label="Customer service" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5.2A8 8 0 1 1 21 12z" />
          </svg>
        </button>
      </div>
    </>
  );
}
