import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="pt-32 md:pt-40 pb-20 min-h-[80vh] flex items-center">
      <div className="container-pro text-center max-w-md">
        <div className="text-8xl font-bold text-brand-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h1>
        <p className="text-slate-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">{t('success.backHome')}</Link>
      </div>
    </div>
  );
}
