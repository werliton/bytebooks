/* eslint-disable @typescript-eslint/ban-ts-comment */
// Este script define as variáveis NREUM usando variáveis de ambiente Vite

export interface NreumLoaderConfig {
  accountID: string;
  trustKey: string;
  agentID: string;
  licenseKey: string;
  applicationID: string;
}
export interface NreumInfo {
  beacon: string;
  errorBeacon: string;
  licenseKey: string;
  applicationID: string;
  sa: number;
}
/** @ts-ignore */
if (typeof window !== "undefined" && window.__NEW_RELIC_ENV__) {
  /** @ts-ignore */
  const env = window.__NEW_RELIC_ENV__;
  window.NREUM = window.NREUM || {};
  window.NREUM.loader_config = {
    accountID: env.VITE_NR_ACCOUNT_ID,
    trustKey: env.VITE_NR_TRUST_KEY,
    agentID: env.VITE_NR_AGENT_ID,
    licenseKey: env.VITE_NR_LICENSE_KEY,
    applicationID: env.VITE_NR_APPLICATION_ID,
  };
  window.NREUM.info = {
    beacon: env.VITE_NR_BEACON,
    errorBeacon: env.VITE_NR_ERROR_BEACON,
    licenseKey: env.VITE_NR_LICENSE_KEY,
    applicationID: env.VITE_NR_APPLICATION_ID,
    sa: 1,
  };
}
