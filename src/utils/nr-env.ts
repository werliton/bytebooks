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

// @ts-ignore
if (typeof window !== "undefined") {
  // @ts-ignore
  window.NREUM = window.NREUM || {};
  // @ts-ignore
  window.NREUM.loader_config = {
    accountID: import.meta.env.VITE_NR_ACCOUNT_ID,
    trustKey: import.meta.env.VITE_NR_TRUST_KEY,
    agentID: import.meta.env.VITE_NR_AGENT_ID,
    licenseKey: import.meta.env.VITE_NR_LICENSE_KEY,
    applicationID: import.meta.env.VITE_NR_APPLICATION_ID,
  } as NreumLoaderConfig;
  // @ts-ignore
  window.NREUM.info = {
    beacon: import.meta.env.VITE_NR_BEACON,
    errorBeacon: import.meta.env.VITE_NR_ERROR_BEACON,
    licenseKey: import.meta.env.VITE_NR_LICENSE_KEY,
    applicationID: import.meta.env.VITE_NR_APPLICATION_ID,
    sa: 1,
  } as NreumInfo;
}
