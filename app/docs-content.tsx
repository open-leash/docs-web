import type { ReactNode } from "react";
import { ArrowRight, Check, Cloud, Github, Laptop, ShieldCheck, TerminalSquare } from "lucide-react";
import { docsDescription, docsTitle } from "./seo";

const mainSiteUrl = (process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://openleash.com").replace(/\/+$/, "");
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/open-leash";

type NavGroup = { title: string; items: Array<{ href: string; label: string }> };
export type DocPage = { slug: string; title: string; eyebrow: string; description: string; body: ReactNode };

export const navGroups: NavGroup[] = [
  {
    title: "GETTING STARTED",
    items: [
      { href: "/", label: "What is Leash?" },
      { href: "/getting-started", label: "Quickstart" },
      { href: "/getting-started/personal-open-source", label: "Personal Open Source" },
      { href: "/getting-started/leash-cloud", label: "Leash Cloud" },
      { href: "/clients/desktop-client", label: "Desktop client" }
    ]
  },
  {
    title: "FEATURES",
    items: [
      { href: "/features", label: "Built-in Features" },
      { href: "/features/rules-enforcer", label: "Leash Rules Protection" },
      { href: "/features/authoring", label: "Maintainer authoring" }
    ]
  },
  {
    title: "REFERENCE",
    items: [
      { href: "/reference/events", label: "Events and hooks" },
      { href: "/reference/troubleshooting", label: "Troubleshooting" }
    ]
  }
];

function MarketingNav() {
  return (
    <header className="marketingNav sticky">
      <a href={mainSiteUrl} className="marketingBrand"><img className="marketingBrandIcon" src="/openleash-icon.png" alt="" /><span>Leash</span></a>
      <nav className="marketingLinks">
        <a href={`${mainSiteUrl}/features`}>🧩 Features</a>
        <a className="active" href="/">📚 Docs</a>
        <a href={`${mainSiteUrl}/blog`}>✍️ Blog</a>
        <a href={`${mainSiteUrl}/pricing`}>💸 Pricing</a>
        <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
        <a className="dark" href={`${mainSiteUrl}/account`}>Start free</a>
      </nav>
    </header>
  );
}

export function DocsLayout({ activePath, children }: { activePath: string; children: ReactNode }) {
  const renderNav = () => <nav aria-label="Documentation">{navGroups.map((group) => (
    <section key={group.title}><h2>{group.title}</h2>{group.items.map((item) => (
      <a className={activePath === item.href.replace(/^\//, "") || (activePath === "" && item.href === "/") ? "active" : ""} href={item.href} key={item.href}>{item.label}</a>
    ))}</section>
  ))}</nav>;
  return <><MarketingNav /><main className="docsShell"><aside className="side"><div className="sideInner">
    <a className="brand" href="/"><img className="mark" src="/openleash-icon.png" alt="" /><span><strong>Leash</strong><em>Docs</em></span></a>{renderNav()}
  </div><div className="sidePanel"><p>Source and releases</p><a href={githubUrl}><Github size={15} /> Leash on GitHub</a></div></aside>
  <section className="content">{children}</section></main></>;
}

export function HomePage() {
  return <DocsLayout activePath=""><article className="docArticle landingArticle">
    <span className="eyebrow">PERSONAL AGENT CONTROL</span><h1>{docsTitle}</h1><p className="lead">{docsDescription}</p>
    <div className="heroActions"><a className="primary" href="/getting-started">Get started <ArrowRight size={16} /></a><a href={`${mainSiteUrl}/features`}>Explore Features</a></div>
    <div className="pathGrid">
      <a className="pathCard" href="/getting-started/leash-cloud"><Cloud /><span>HOSTED</span><h2>Leash Cloud</h2><p>A personal hosted account with no dashboard or organization setup.</p></a>
      <a className="pathCard" href="/getting-started/personal-open-source"><TerminalSquare /><span>OPEN SOURCE</span><h2>Personal Open Source</h2><p>The real client API and Postgres on your computer, with your own model key.</p></a>
    </div>
  </article></DocsLayout>;
}

const FeatureList = () => <ul className="checkList">
  {[
    "Leash Destructive Protection blocks destructive actions",
    "Sensitive Access asks before credential reads",
    "Leash Private Data Protection masks secrets",
    "Leash Rules Protection imports rules from agent instruction files",
    "Leash Tool Protection, Leash Prompt Injection Protection, and Leash Code Protection surface concrete risk",
    "Token Saver compresses repetitive context"
  ].map((item) => <li key={item}><Check size={16} /> {item}</li>)}
</ul>;

export const pages: Record<string, DocPage> = {
  "getting-started": {
    slug: "getting-started", title: "Quickstart", eyebrow: "GETTING STARTED",
    description: "Install Leash and protect your first personal AI coding agent.",
    body: <><p>Install the desktop client, choose Leash Cloud or Personal Open Source, select the agents to monitor, choose whether to use the Island, and enable the built-in Features you want.</p>
      <h2>Recommended path</h2><ol><li>Download Leash for macOS or Windows.</li><li>Choose your personal backend.</li><li>Select Codex, Claude Code, or another supported agent.</li><li>Review the Island screenshot and choose Island or tray-only mode.</li><li>Review the built-in Features and finish setup.</li><li>Run a harmless test prompt and confirm it appears in History and, when enabled, the Island.</li></ol></>
  },
  "getting-started/personal-open-source": {
    slug: "getting-started/personal-open-source", title: "Personal Open Source", eyebrow: "LOCAL BACKEND",
    description: "Run Leash client-api and Postgres locally for one person.",
    body: <><p>This mode has no Leash Cloud sign-in. Docker is used for Postgres and the client API; Features themselves run directly inside the Node.js client API and do not use containers.</p>
      <pre><code>python3 run.py --mode individual-open-source --clean-slate --yes</code></pre>
      <p>Provide your own model provider key when a Feature needs evaluation. Desktop updates still use the public Leash update feed.</p></>
  },
  "getting-started/individual-open-source": {
    slug: "getting-started/personal-open-source", title: "Personal Open Source", eyebrow: "MOVED",
    description: "The personal local Leash runtime.", body: <p>Individual Open Source is now called Personal Open Source.</p>
  },
  "getting-started/leash-cloud": {
    slug: "getting-started/leash-cloud", title: "Leash Cloud", eyebrow: "HOSTED PERSONAL",
    description: "Use Leash with a personal hosted account.",
    body: <><p>Create your account in the desktop, mobile, or web client. Personal users remain in those clients; there is no public admin dashboard.</p><p>Choose managed evaluation or BYOK, enroll the desktop, select agents, and configure Features.</p></>
  },
  "getting-started/openleash-cloud": {
    slug: "getting-started/leash-cloud", title: "Leash Cloud", eyebrow: "MOVED", description: "Personal hosted Leash.", body: <p>Leash Cloud is now called Leash Cloud.</p>
  },
  "clients/desktop-client": {
    slug: "clients/desktop-client", title: "Desktop client", eyebrow: "THE COCKPIT", description: "Monitor agents, answer approvals, and configure Features.",
    body: <><p>Setup shows a real Island preview and asks whether to enable it. The tray is always installed; tray-only mode opens the desktop window instead of presenting the Island. History records decisions and Feature outcomes. Settings can change Island visibility later.</p><p>The “open agent” action targets the existing editor window and project whenever the agent exposes enough session context.</p></>
  },
  "features": {
    slug: "features", title: "Built-in Features", eyebrow: "FIRST PARTY", description: "The reviewed capabilities included with Leash.", body: <><p>Features are built and released by the Leash team. There is no public marketplace, uploader, publisher profile, rating, or download counter.</p><FeatureList /></>
  },
  "features/rules-enforcer": {
    slug: "features/rules-enforcer", title: "Leash Rules Protection", eyebrow: "PROJECT INSTRUCTIONS", description: "Discover and enforce the rules already used by your agents.",
    body: <><p>Leash Rules Protection starts empty. Leash scans the supported instruction files for your selected agents, presents candidate rules, and lets you choose which ones to enforce.</p><p>Imported rules can ask you before continuing or block immediately. They remain editable in Feature settings.</p></>
  },
  "features/authoring": {
    slug: "features/authoring", title: "Maintainer Feature authoring", eyebrow: "LEASH CONTRIBUTORS", description: "Add a reviewed first-party Feature to client-api.",
    body: <><p>Feature authoring is an internal maintainer workflow, not a public publishing surface. Add the TypeScript implementation under <code>apps/client-api/src/plugins</code>, register its handler in <code>feature-runtime.ts</code>, and add its manifest to the shared first-party catalog.</p>
      <p>Every Feature must declare events, permissions, configuration schema, and failure mode. Add unit tests for allow, ask, block, failure, audit, and UI-visible outcomes as applicable.</p><pre><code>{`export async function runMyFeature(event, config, capabilities) {
  return { decision: "allow", outcomes: [] };
}`}</code></pre></>
  },
  "reference/events": {
    slug: "reference/events", title: "Events and hooks", eyebrow: "REFERENCE", description: "Stable compatibility contracts used by Leash clients and agents.",
    body: <><p>Existing <code>/v1/plugins</code>, manifest IDs, <code>openleash.*</code> identifiers, and environment variables remain stable compatibility contracts. Product UI calls the bundled implementations Features.</p><p>Installed hooks send normalized agent events to the configured client API. The API executes enabled Features in process and returns allow, ask, deny, or modified input.</p></>
  },
  "reference/troubleshooting": {
    slug: "reference/troubleshooting", title: "Troubleshooting", eyebrow: "REFERENCE", description: "Check hooks, proxy connectivity, Feature health, and updates.",
    body: <><h2>Agent says Reconnecting</h2><p>Confirm the local proxy is healthy and that the configured provider endpoint is reachable. Hook visibility alone does not prove the proxy transport is healthy.</p><h2>Feature health</h2><pre><code>curl -H "Authorization: Bearer $OPENLEASH_TOKEN" http://127.0.0.1:9318/v1/plugin-runtime/verify</code></pre><h2>Personal Open Source</h2><p>Start Docker, rerun the personal mode, and check that Postgres and client-api pass their health checks.</p></>
  }
};

export function RenderDocPage({ page, activePath }: { page: DocPage; activePath: string }) {
  return <DocsLayout activePath={activePath}><article className="docArticle"><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p className="lead">{page.description}</p>{page.body}
    <div className="nextCard"><ShieldCheck /><span><strong>Leash is personal-first</strong><small>Every public flow is designed for one developer and their agents.</small></span></div>
  </article></DocsLayout>;
}
