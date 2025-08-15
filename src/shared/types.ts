// Chrome Extension Manifest Types
export interface ManifestV3 {
  manifest_version: 3;
  name: string;
  version: string;
  description: string;
  action?: {
    default_title?: string;
    default_popup?: string;
    default_icon?: string | Record<string, string>;
  };
  icons?: Record<string, string>;
  permissions: string[];
  background?: {
    service_worker: string;
    type?: string;
  };
  options_page?: string;
  web_accessible_resources?: Array<{
    resources: string[];
    matches: string[];
  }>;
  host_permissions?: string[];
  content_scripts?: Array<{
    matches: string[];
    js: string[];
    run_at?: string;
  }>;
}

// Chrome API Types
export interface ChromeTab {
  id?: number;
  url?: string;
  title?: string;
}

export interface ChromePort {
  name: string;
  onMessage: {
    addListener: (callback: (message: any) => void) => void;
  };
}

export interface ChromeMessage {
  type: string;
  origin?: string;
  pathname?: string;
}
