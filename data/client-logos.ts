/**
 * Client / partner logo assets for the trust section marquee.
 *
 * No client logo files exist in /public yet — keep this array empty until
 * real assets are provided. Each logo should live under e.g.
 * /public/images/clients/ and include accessible alt text via `name`.
 *
 * @example
 * export const CLIENT_LOGOS: ClientLogo[] = [
 *   { name: 'Acme Corp', src: '/images/clients/acme.svg' },
 *   { name: 'State Agency', src: '/images/clients/state-agency.png', href: 'https://...' },
 * ];
 */
export type ClientLogo = {
  name: string;
  src: string;
  href?: string;
};

/** Populate with real client/partner logos when assets are available. */
export const CLIENT_LOGOS: ClientLogo[] = [];
