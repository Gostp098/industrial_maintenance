import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n';
import { SERVICES } from '../services';
import { createRequest } from '../api';
import { ArrowRightIcon } from '../components/Icons';

const initialState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  service: '',
  type: 'service',
  description: '',
  urgency: 'medium',
  preferredDate: '',
};

export default function Request() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Pre-fill service via ?service=xxx (from the Services page cards)
  useEffect(() => {
    const preselected = searchParams.get('service');
    if (preselected && SERVICES.find((s) => s.key === preselected)) {
      setForm((prev) => ({ ...prev, service: preselected }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t('request.required');
    if (!form.email.trim()) {
      e.email = t('request.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t('request.invalidEmail');
    }
    if (!form.phone.trim()) {
      e.phone = t('request.required');
    } else if (!/^[+]?[\d\s()-]{6,}$/.test(form.phone)) {
      e.phone = t('request.invalidPhone');
    }
    if (!form.address.trim()) e.address = t('request.required');
    if (!form.service) e.service = t('request.required');
    if (!form.description.trim()) e.description = t('request.required');
    if (!form.preferredDate) e.preferredDate = t('request.required');
    return e;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Payload keys match the database columns exactly
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        service: form.service,
        type: form.type,
        description: form.description.trim(),
        urgency: form.urgency,
        preferred_date: form.preferredDate,
      };
      const result = await createRequest(payload);
      navigate('/success', { state: { reference: result?.data?.id ?? result?.id } });
    } catch (err) {
      setServerError(
        err?.response?.data?.error || err?.message || t('request.errorGeneric')
      );
    } finally {
      setLoading(false);
    }
  };

  // Block past dates in the date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="animate-fade-in pt-32 md:pt-40 pb-20">
      <div className="container-pro max-w-3xl">
        <div className="text-center mb-12">
          <div className="chip mb-4">{t('nav.request')}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {t('request.pageTitle')}
          </h1>
          <p className="text-lg text-slate-600">{t('request.pageSubtitle')}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl shadow-card border border-slate-100 p-6 md:p-10 space-y-6"
        >
          {serverError && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {serverError}
            </div>
          )}

          {/* Row 1: name + email */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="label">
                {t('request.fullName')} <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder={t('request.fullNamePh')}
                className={`input-field ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="label">
                {t('request.email')} <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('request.emailPh')}
                className={`input-field ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1.5">{errors.email}</p>}
            </div>
          </div>

          {/* Row 2: phone + service */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="label">
                {t('request.phone')} <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder={t('request.phonePh')}
                className={`input-field ${errors.phone ? 'error' : ''}`}
              />
              {errors.phone && <p className="text-xs text-red-600 mt-1.5">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="service" className="label">
                {t('request.service')} <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                className={`input-field ${errors.service ? 'error' : ''}`}
              >
                <option value="">{t('request.servicePh')}</option>
                {SERVICES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {t(`services.items.${s.key}.title`)}
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-xs text-red-600 mt-1.5">{errors.service}</p>}
            </div>
          </div>

          {/* Row 3: full-width ADDRESS (new field from updated schema) */}
          <div>
            <label htmlFor="address" className="label">
              {t('request.address')} <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder={t('request.addressPh')}
              className={`input-field ${errors.address ? 'error' : ''}`}
            />
            {errors.address && <p className="text-xs text-red-600 mt-1.5">{errors.address}</p>}
          </div>

          {/* Request type — pill radio */}
          <div>
            <span className="label">{t('request.type')}</span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'service', label: t('request.typeService') },
                { value: 'consultation', label: t('request.typeConsultation') },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                    form.type === opt.value
                      ? 'border-brand-600 bg-brand-50 text-brand-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={opt.value}
                    checked={form.type === opt.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label">
              {t('request.description')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
              placeholder={t('request.descriptionPh')}
              className={`input-field resize-none ${errors.description ? 'error' : ''}`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1.5">{errors.description}</p>
            )}
          </div>

          {/* Row 4: urgency + preferred date */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <span className="label">{t('request.urgency')}</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'low', label: t('request.urgencyLow'), color: 'green' },
                  { value: 'medium', label: t('request.urgencyMedium'), color: 'amber' },
                  { value: 'high', label: t('request.urgencyHigh'), color: 'red' },
                ].map((opt) => {
                  const selected = form.urgency === opt.value;
                  const colorClasses = {
                    green: selected
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-slate-200 hover:border-green-300',
                    amber: selected
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-slate-200 hover:border-amber-300',
                    red: selected
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-slate-200 hover:border-red-300',
                  };
                  return (
                    <label
                      key={opt.value}
                      className={`flex items-center justify-center px-3 py-3 rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${colorClasses[opt.color]}`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={opt.value}
                        checked={selected}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="preferredDate" className="label">
                {t('request.preferredDate')} <span className="text-red-500">*</span>
              </label>
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                min={today}
                value={form.preferredDate}
                onChange={handleChange}
                className={`input-field ${errors.preferredDate ? 'error' : ''}`}
              />
              {errors.preferredDate && (
                <p className="text-xs text-red-600 mt-1.5">{errors.preferredDate}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {t('request.submitting')}
              </>
            ) : (
              <>
                {t('request.submit')}
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
