// Declaração global para window.NREUM
import type { NreumLoaderConfig, NreumInfo } from "../utils/nr-env";

declare global {
  interface Window {
    NREUM: {
      loader_config?: NreumLoaderConfig;
      info?: NreumInfo;
      [key: string]: unknown;
    };
  }
}

export {};
