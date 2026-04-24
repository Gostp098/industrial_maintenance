import {
  WrenchIcon,
  CogIcon,
  BoltIcon,
  CpuChipIcon,
  LightBulbIcon,
  FireIcon,
  WrenchScrewdriverIcon,
} from './components/Icons';

/**
 * Services catalog — single source of truth.
 *
 * The `key` values are the exact strings sent to the API and stored in the
 * `requests.service` column (VARCHAR(50)). Translations for title/description
 * are looked up under `services.items.{key}.title|description`.
 */
export const SERVICES = [
  { key: 'repair', icon: WrenchIcon },
  { key: 'installation', icon: WrenchScrewdriverIcon },
  { key: 'hvac', icon: FireIcon },
  { key: 'electrical', icon: BoltIcon },
  { key: 'mechanical', icon: CogIcon },
  { key: 'smart', icon: CpuChipIcon },
  { key: 'consultation', icon: LightBulbIcon },
];
