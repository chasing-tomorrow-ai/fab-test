import type { ManifestV3 } from './shared/types';

export default function manifest(env: Record<string, string>): ManifestV3 {
  const auto = env.VITE_AUTO_INJECT === 'true';

  const base: ManifestV3 = {
    manifest_version: 3,
    name: auto ? 'FAB Test (Dev Auto-Inject)' : 'FAB Test (Click to Inject)',
    version: '0.1.0',
    description: 'Discovery build for FAB injection & interactions.',
    action: { default_title: 'FAB Test' },
    icons: { "16": "public/icon16.svg", "48": "public/icon48.svg", "128": "public/icon128.svg" },
    permissions: ["storage", "activeTab"],
    background: { service_worker: "src/background/index.ts", type: "module" },
    options_page: "src/options/index.html",
    // Resources the page can access if needed later (kept minimal now)
    web_accessible_resources: [
      { resources: ["src/content/index.ts"], matches: ["<all_urls>"] }
    ]
  };

  if (auto) {
    base.host_permissions = ["<all_urls>"];
    base.content_scripts = [
      { matches: ["<all_urls>"], js: ["src/content/index.ts"], run_at: "document_idle" }
    ];
  }
  return base;
}
