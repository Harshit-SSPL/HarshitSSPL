/**
 * Neutral SVG Fallbacks & Placeholders
 * Used across the frontend when backend media is loading, empty, or unconfigured.
 * Prevents layout shifts, 404 errors, and broken image states.
 */

export const NEUTRAL_PRODUCT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Crect width='100%25' height='100%25' fill='%2318181b'/%3E%3Cpath d='M300 360 L300 440 M260 400 L340 400' stroke='%233f3f46' stroke-width='3' stroke-linecap='round'/%3E%3Ctext x='50%25' y='480' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='14' font-weight='700' letter-spacing='2'%3ESSIL INFRASTRUCTURE%3C/text%3E%3C/svg%3E";

export const NEUTRAL_BANNER_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='600' viewBox='0 0 1920 600'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2309090b'/%3E%3Cstop offset='50%25' stop-color='%2318181b'/%3E%3Cstop offset='100%25' stop-color='%2309090b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23bg)'/%3E%3Ccircle cx='960' cy='300' r='180' fill='%2327272a' fill-opacity='0.15'/%3E%3Ctext x='50%25' y='300' dominant-baseline='middle' text-anchor='middle' fill='%2352525b' font-family='sans-serif' font-size='18' font-weight='700' letter-spacing='4'%3ESSIL INDUSTRIAL LIGHTING &amp; STRUCTURES%3C/text%3E%3C/svg%3E";

export const NEUTRAL_LOGO_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'%3E%3Crect width='100%25' height='100%25' fill='transparent'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23dc2626' font-family='sans-serif' font-size='20' font-weight='900' letter-spacing='1'%3ESSIL%3C/text%3E%3C/svg%3E";
