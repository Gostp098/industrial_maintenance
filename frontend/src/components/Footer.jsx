import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { CogIcon, MailIcon, PhoneIcon, MapPinIcon } from './Icons';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-pro py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white">
                <CogIcon className="w-6 h-6" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-white text-sm">Industrial</span>
                <span className="text-xs text-brand-300 font-medium">Maintenance Services</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-brand-300 transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/services" className="hover:text-brand-300 transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/request" className="hover:text-brand-300 transition-colors">{t('nav.request')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">Nabeul , Tunisia </span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <a href="mailto:mariemhilali17@gmail.com" className="text-slate-400 hover:text-brand-300 transition-colors">
                  mariemhilali17@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <a href="tel:+21652521952" className="text-slate-400 hover:text-brand-300 transition-colors">
                  +216 52521952
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-pro py-6 text-center text-xs text-slate-500">
          © {year} Industrial Maintenance Services. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
