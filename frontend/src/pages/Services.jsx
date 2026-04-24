import { useI18n } from '../i18n';
import { SERVICES } from '../services';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const { t } = useI18n();

  return (
    <div className="animate-fade-in pt-32 md:pt-40 pb-20">
      <section className="container-pro text-center max-w-3xl mx-auto mb-14">
        <div className="chip mb-4">{t('nav.services')}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
          {t('services.pageTitle')}
        </h1>
        <p className="text-lg text-slate-600">{t('services.pageSubtitle')}</p>
      </section>

      <section className="container-pro">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((s, index) => (
            <div
              key={s.key}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ServiceCard serviceKey={s.key} Icon={s.icon} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
