import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import { CheckCircleIcon, ArrowRightIcon } from '../components/Icons';

export default function Success() {
  const { t } = useI18n();
  const location = useLocation();
  const reference = location.state?.reference;

  return (
    <div className="animate-fade-in pt-32 md:pt-40 pb-20 min-h-[80vh] flex items-center">
      <div className="container-pro max-w-2xl">
        <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-8 md:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-slide-up">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('success.title')}
          </h1>

          <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            {t('success.subtitle')}
          </p>

          {reference && (
            <div className="inline-block bg-brand-50 border border-brand-100 rounded-xl px-6 py-4 mb-8">
              <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-1">
                {t('success.reference')}
              </div>
              <div className="text-xl font-bold text-brand-900 font-mono">
                #{String(reference).padStart(6, '0')}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-secondary">
              {t('success.backHome')}
            </Link>
            <Link to="/request" className="btn-primary">
              {t('success.newRequest')}
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
