import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import { CogIcon, MenuIcon, XIcon, GlobeIcon } from './Icons';

export default function Navbar() {
  const { t, lang, toggle } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when the route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Add subtle elevation when user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-700'
    } after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-brand-600 after:transition-all after:duration-300 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="container-pro flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <CogIcon className="w-6 h-6" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-slate-900 text-sm">Industrial</span>
            <span className="text-xs text-brand-700 font-medium">Maintenance Services</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            {t('nav.services')}
          </NavLink>
          <NavLink to="/request" className={navLinkClass}>
            {t('nav.request')}
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all text-sm font-semibold"
          >
            <GlobeIcon className="w-4 h-4" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <Link to="/request" className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm">
            {t('nav.request')}
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            {open ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-slide-down">
          <div className="container-pro py-4 flex flex-col gap-2">
            <NavLink to="/" end className="px-3 py-3 rounded-lg text-slate-700 hover:bg-brand-50 hover:text-brand-700">
              {t('nav.home')}
            </NavLink>
            <NavLink to="/services" className="px-3 py-3 rounded-lg text-slate-700 hover:bg-brand-50 hover:text-brand-700">
              {t('nav.services')}
            </NavLink>
            <NavLink to="/request" className="px-3 py-3 rounded-lg text-slate-700 hover:bg-brand-50 hover:text-brand-700">
              {t('nav.request')}
            </NavLink>
            <Link to="/request" className="btn-primary mt-2">
              {t('nav.request')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
