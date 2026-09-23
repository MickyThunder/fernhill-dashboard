import { useState } from 'react';
import Card from '../components/ui/Card.jsx';
import Switch from '../components/ui/Switch.jsx';

const PICKUP_TIMES = ['1:00 pm', '3:00 pm', '5:00 pm'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SettingsPage({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function updateNotification(key, value) {
    setDraft((current) => ({ ...current, notifications: { ...current.notifications, [key]: value } }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!draft.shopName.trim()) nextErrors.shopName = 'Enter a shop name.';
    if (!EMAIL_PATTERN.test(draft.email.trim())) nextErrors.email = 'Enter an email address like name@example.com.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSave({ ...draft, shopName: draft.shopName.trim(), email: draft.email.trim() });
    }
  }

  const unchanged = JSON.stringify(draft) === JSON.stringify(settings);

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-3xl space-y-6">
      <Card title="Shop details" description="Shown on packing slips and customer emails.">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="shop-name" className="label">
              Shop name
            </label>
            <input
              id="shop-name"
              className="input"
              value={draft.shopName}
              onChange={(event) => update('shopName', event.target.value)}
              aria-invalid={Boolean(errors.shopName)}
              aria-describedby={errors.shopName ? 'shop-name-error' : undefined}
            />
            {errors.shopName && (
              <p id="shop-name-error" className="mt-1.5 text-sm text-rosehip dark:text-[#E59A9C]">
                {errors.shopName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className="label">
              Contact email
            </label>
            <input
              id="contact-email"
              type="email"
              className="input"
              value={draft.email}
              onChange={(event) => update('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 text-sm text-rosehip dark:text-[#E59A9C]">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="pickup-time" className="label">
              Courier pickup
            </label>
            <select
              id="pickup-time"
              className="input"
              value={draft.pickupTime}
              onChange={(event) => update('pickupTime', event.target.value)}
            >
              {PICKUP_TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card title="Notifications" description="Choose what you hear about by email." bodyClassName="px-5 py-2">
        <div className="divide-y divide-black/[0.06] dark:divide-night-border">
          <Switch
            label="New orders"
            description="An email for every order as it comes in."
            checked={draft.notifications.newOrders}
            onChange={(value) => updateNotification('newOrders', value)}
          />
          <Switch
            label="Low stock"
            description="When a plant drops to 5 or fewer in the greenhouse."
            checked={draft.notifications.lowStock}
            onChange={(value) => updateNotification('lowStock', value)}
          />
          <Switch
            label="Daily summary"
            description="A short recap of sales and packing every evening."
            checked={draft.notifications.dailySummary}
            onChange={(value) => updateNotification('dailySummary', value)}
          />
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button type="button" className="btn btn-secondary" onClick={() => { setDraft(settings); setErrors({}); }} disabled={unchanged}>
          Discard changes
        </button>
        <button type="submit" className="btn btn-primary" disabled={unchanged}>
          Save changes
        </button>
      </div>
    </form>
  );
}
