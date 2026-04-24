import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { ArrowRightIcon } from './Icons';

export default function ServiceCard({ serviceKey, Icon }) {
  const { t } = useI18n();
  const title = t(`services.items.${serviceKey}.title`);
  const description = t(`services.items.${serviceKey}.description`);

  return (
    <div className="card card-hover group flex flex-col p-6 h-full">
      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed flex-1">{description}</p>

      <Link
        to={`/request?service=${serviceKey}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 group/link self-start"
      >
        {t('services.requestButton')}
        <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
