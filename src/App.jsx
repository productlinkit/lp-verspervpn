import { useEffect } from 'react';
import PageChrome from './components/PageChrome.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Why from './components/Why.jsx';
import Tech from './components/Tech.jsx';
import Servers from './components/Servers.jsx';
import Apps from './components/Apps.jsx';
import Pricing from './components/Pricing.jsx';
import Faq from './components/Faq.jsx';
import Cta from './components/Cta.jsx';
import AuditStatus from './components/AuditStatus.jsx';
import UsabilityResearch from './components/UsabilityResearch.jsx';
import Accessibility from './components/Accessibility.jsx';
import Footer from './components/Footer.jsx';
import ChatFab from './components/ChatFab.jsx';
import Dialogs from './components/Dialogs.jsx';
import AuthModal from './components/AuthModal.jsx';
import Checkout from './components/Checkout.jsx';
import Account from './components/Account.jsx';
import { initInteractions } from './lib/interactions.js';

export default function App() {
  // The page's behaviour (menus, modals, checkout, FAQ, tooltips …) is the original
  // vanilla script. It runs once, after React has put the markup in the document,
  // which is exactly when it used to run at the end of <body>.
  useEffect(() => initInteractions(), []);

  return (
    <>
      <PageChrome />
      <Header />
      <main id="top" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Why />
        <Tech />
        <Servers />
        <Apps />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <AuditStatus />
      <UsabilityResearch />
      <Accessibility />
      <Footer />
      <ChatFab />
      <Dialogs />
      <AuthModal />
      <Checkout />
      <Account />
    </>
  );
}
