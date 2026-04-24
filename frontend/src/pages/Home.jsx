import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { SERVICES } from '../services';
import ServiceCard from '../components/ServiceCard';
import SmartImage from '../components/SmartImage';
import {
  ArrowRightIcon,
  ShieldIcon,
  ClockIcon,
  SparklesIcon,
  CheckIcon,
} from '../components/Icons';

export default function Home() {
  const { t } = useI18n();
  const previewServices = SERVICES.slice(0, 6);

  const whyItems = [
    { Icon: ShieldIcon, title: t('home.why1Title'), desc: t('home.why1Desc') },
    { Icon: ClockIcon, title: t('home.why2Title'), desc: t('home.why2Desc') },
    { Icon: SparklesIcon, title: t('home.why3Title'), desc: t('home.why3Desc') },
  ];

  const stats = [
    { value: '25+', label: t('home.statsExperience') },
    { value: '1000+', label: t('home.statsProjects') },
    { value: '450+', label: t('home.statsClients') },
    { value: '24/7', label: t('home.statsSupport') },
  ];

  return (
    <div className="animate-fade-in">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-white to-white" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 -left-24 w-80 h-80 bg-brand-100/60 rounded-full blur-3xl -z-10" />

        <div className="container-pro grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-slide-up">
            <div className="chip mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
              {t('home.heroBadge')}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
              {t('home.heroTitle')}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              {t('home.heroSubtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/request" className="btn-primary">
                {t('home.heroCta')}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <Link to="/services" className="btn-secondary">
                {t('home.heroCtaSecondary')}
              </Link>
            </div>
          </div>

          <div className="relative animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-[5/6]">
              <SmartImage
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
                alt="Industrial maintenance technician"
                fallbackLabel="Industrial Maintenance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

         

            <div className="hidden md:flex absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <ClockIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">24/7</div>
                <div className="text-xs text-slate-500">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-12 md:py-16 border-y border-slate-100 bg-slate-50/50">
        <div className="container-pro grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-700 mb-1">{s.value}</div>
              <div className="text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SERVICES PREVIEW ============ */}
      <section className="section">
        <div className="container-pro">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="chip mb-4">{t('nav.services')}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {t('home.servicesTitle')}
            </h2>
            <p className="text-slate-600 text-lg">{t('home.servicesSubtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewServices.map((s) => (
              <ServiceCard key={s.key} serviceKey={s.key} Icon={s.icon} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-secondary">
              {t('home.viewAll')}
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="section bg-slate-50/50">
        <div className="container-pro">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <SmartImage
                src="https://images.unsplash.com/photo-1565608087341-404b25492fee?w=800&q=80"
                alt="Engineer working on industrial systems"
                fallbackLabel="Industrial Engineering"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="chip mb-4">{t('home.whyTitle')}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {t('home.whyTitle')}
              </h2>
              <p className="text-slate-600 text-lg mb-8">{t('home.whySubtitle')}</p>

              <div className="space-y-5">
                {whyItems.map(({ Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-soft">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      
      <section className="section">
        <div className="container-pro">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-10 md:p-16 text-center text-white shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="ctaGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.3" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#ctaGrid)" />
              </svg>
            </div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto">
                {t('home.ctaTitle')}
              </h2>
              <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">{t('home.ctaSubtitle')}</p>
              <Link
                to="/request"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-brand-700 font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                {t('home.ctaButton')}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
