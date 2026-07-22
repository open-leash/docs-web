import type { ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Download,
  FileSearch,
  Gauge,
  Github,
  KeyRound,
  Laptop,
  ListChecks,
  LockKeyhole,
  MonitorDown,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Star,
  TerminalSquare,
  UsersRound,
  WandSparkles
} from "lucide-react";
import { absoluteDocsUrl, docsDescription, docsTitle, docsUrl } from "./seo";

const mainSiteUrl = (process.env.NEXT_PUBLIC_MAIN_SITE_URL ?? "https://openleash.com").replace(/\/+$/, "");
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/open-leash";

type NavGroup = {
  title: string;
  items: Array<{ href: string; label: string }>;
};

export type DocPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  body: ReactNode;
};

export const navGroups: NavGroup[] = [
  {
    title: "GETTING STARTED",
    items: [
      { href: "/", label: "What is OpenLeash?" },
      { href: "/", label: "Quickstart" },
      { href: "/getting-started", label: "Configuration" },
      { href: "/getting-started/individual-open-source", label: "Individual Open Source" },
      { href: "/getting-started/openleash-cloud", label: "OpenLeash Cloud" },
      { href: "/getting-started/private-cloud", label: "Private Cloud" },
      { href: "/clients/desktop-client", label: "The cockpit" }
    ]
  },
  {
    title: "BUILDING PLUGINS",
    items: [
      { href: "/reference/plugins", label: "Your first plugin" },
      { href: "/reference/api", label: "Events reference" },
      { href: "/reference/api", label: "Capabilities API" },
      { href: "/reference/plugins", label: "Settings and Island UI" },
      { href: "/reference/plugins", label: "Publishing" }
    ]
  },
  {
    title: "OPERATIONS",
    items: [
      { href: "/deployment/self-hosted", label: "Self-hosting" },
      { href: "/features/audit-log", label: "SIEM export" },
      { href: "/features/identity", label: "Team management" },
      { href: "/reference/troubleshooting", label: "CLI reference" }
    ]
  }
];

const setupCards = [
  {
    href: "/getting-started/individual-open-source",
    icon: TerminalSquare,
    label: "Individual",
    title: "Individual Open Source",
    copy: "I want the real OpenLeash backend and Postgres on my own machine, without a cloud account.",
    bullets: ["Local client-api + Postgres", "Bring your own LLM key", "No cloud sign-in"]
  },
  {
    href: "/getting-started/openleash-cloud",
    icon: Cloud,
    label: "Individual",
    title: "OpenLeash Cloud",
    copy: "I want a hosted account for myself, but I am not managing a company.",
    bullets: ["Sign up in place", "Install desktop client", "No dashboard"]
  },
  {
    href: "/getting-started/openleash-cloud#org",
    icon: Building2,
    label: "Organization",
    title: "OpenLeash Cloud",
    copy: "We want OpenLeash hosted for our company, with policy and audit.",
    bullets: ["Work identity", "CISO dashboard", "Managed rollout"]
  },
  {
    href: "/getting-started/private-cloud",
    icon: LockKeyhole,
    label: "Organization",
    title: "Private Cloud",
    copy: "We need to host the APIs, dashboard, database, and identity ourselves.",
    bullets: ["Customer Postgres", "Customer IdP", "Open-source core"]
  }
];

const audienceCards = [
  {
    href: "/getting-started/individual",
    icon: Laptop,
    label: "Individual",
    title: "I'm protecting my own agents",
    copy: "Start with the desktop client, then choose personal OpenLeash Cloud or Individual Open Source. Solo users stay out of the dashboard.",
    bullets: ["No company setup", "No CISO dashboard", "Hosted or local backend"]
  },
  {
    href: "/getting-started/organization",
    icon: Building2,
    label: "Organization",
    title: "We're rolling this out for a team",
    copy: "Start with identity, policy, approvals, audit, and client rollout. Choose hosted or customer-hosted.",
    bullets: ["Identity and users", "Dashboard for admins", "Cloud or Private Cloud"]
  }
];

function MarketingNav() {
  return (
    <header className="marketingNav sticky">
      <a href={mainSiteUrl} className="marketingBrand">
        <span className="marketingBrandIcon" aria-hidden="true">🐾</span>
        <span>OpenLeash</span>
      </a>
      <nav className="marketingLinks">
        <a href={`${mainSiteUrl}/plugins`}>🧩 Plugins</a>
        <a className="active" href="/">📚 Docs</a>
        <a href={`${mainSiteUrl}/blog`}>✍️ Blog</a>
        <a href={`${mainSiteUrl}/pricing`}>💸 Pricing</a>
        <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="OpenLeash on GitHub">
          <span>⭐ 4.2k</span>
        </a>
        <a className="dark" href={`${mainSiteUrl}/account`}>Start free</a>
      </nav>
    </header>
  );
}

export function DocsLayout({ activePath, children }: { activePath: string; children: ReactNode }) {
  const navItems = navGroups.flatMap((group) => group.items);
  const currentPage =
    navItems.find((item) => item.href === activePath) ??
    navItems.find((item) => isActive(activePath, item.href));
  const renderNav = () => (
    <nav aria-label="Documentation">
      {navGroups.map((group) => (
        <section key={group.title}>
          <h2>{group.title}</h2>
          {group.items.map((item) => (
            <a className={navItemActive(activePath, item) ? "active" : ""} href={item.href} key={`${item.href}-${item.label}`}>
              {item.label}
            </a>
          ))}
        </section>
      ))}
    </nav>
  );

  return (
    <>
    <MarketingNav />
    <main className="docsShell">
      <aside className="side">
        <details className="mobileNav">
          <summary>
            <span className="mobileBrand">
              <span className="mark" aria-hidden="true">🐾</span>
              <span>
                <strong>OpenLeash</strong>
                <em>{currentPage?.label ?? "Docs"}</em>
              </span>
            </span>
            <span className="menuButton" aria-hidden="true">
              <span className="menuGlyph" />
              Menu
            </span>
          </summary>
          {renderNav()}
        </details>
        <div className="sideInner">
          <a className="brand" href="/">
            <span className="mark" aria-hidden="true">🐾</span>
            <span>
              <strong>OpenLeash</strong>
              <em>{currentPage?.label ?? "Docs"}</em>
            </span>
          </a>
          {renderNav()}
        </div>
        <div className="sidePanel">
          <p>Need source, releases, or examples?</p>
          <a href={githubUrl}><Github size={15} /> OpenLeash on GitHub</a>
        </div>
      </aside>

      <section className="content">
        {children}
      </section>
    </main>
    <footer className="docsFooter">
      <span>🐾 OpenLeash · MIT licensed · Open registry</span>
      <nav>
        <a href={`${mainSiteUrl}/blog`}>Blog</a>
        <a href={`${mainSiteUrl}/pricing`}>Pricing</a>
        <a href={githubUrl}>GitHub</a>
        <a href="https://x.com/openleash">X</a>
        <a href="https://www.linkedin.com/company/openleash">LinkedIn</a>
        <a href={`${mainSiteUrl}/terms`}>Terms of service</a>
        <a href={`${mainSiteUrl}/privacy`}>Privacy policy</a>
        <a href={`${mainSiteUrl}/support`}>Support</a>
      </nav>
    </footer>
    </>
  );
}

export function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: docsTitle,
    url: docsUrl,
    description: docsDescription,
    publisher: { "@type": "Organization", name: "OpenLeash", url: mainSiteUrl }
  };

  return (
    <DocsLayout activePath="/">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="docsQuickstart">
        <div className="docsCrumbs">
          <span>Docs</span><span>›</span><span>Getting started</span><span>›</span><strong>Quickstart</strong>
        </div>
        <h1>Quickstart</h1>
        <p className="docsLead">Get from zero to a leashed agent in about 30 seconds. Install the desktop client, then use personal OpenLeash Cloud or run the real open-source backend and Postgres locally.</p>

        <h2>1. Install</h2>
        <InstallCommand command="curl -fsSL https://openleash.com/install.sh | sh" copyLabel="Copy" />
        <p>The default installer opens setup so you can choose personal OpenLeash Cloud, an organization, or Individual Open Source. To bootstrap the local open-source backend immediately, append <code>-- --open-source</code>. Windows, Linux, iOS and Android builds are coming.</p>

        <h2>2. Choose the backend</h2>
        <p>OpenLeash desktop is always backend-backed. Personal Cloud keeps your account and plugin configuration hosted; Individual Open Source starts the same public <code>client-api</code> and Postgres locally with Docker.</p>
        <CodeBlock>{`Hosted personal setup:
OpenLeash -> Personal -> sign in

Local open-source setup:
curl -fsSL https://openleash.com/install.sh | sh -s -- --open-source`}</CodeBlock>

        <h2>3. Find and leash your agents</h2>
        <p>OpenLeash detects supported agents such as Claude Code, Codex, Cursor, Gemini CLI, OpenCode, Copilot, Windsurf, and Cline. Install their hooks from the desktop or CLI, then verify what is protected:</p>
        <CodeBlock>{`$ openleash status
✓ claude-code   leashed  (3 plugins active)
✓ cursor        leashed  (3 plugins active)
✓ codex         leashed  (3 plugins active)`}</CodeBlock>

        <h2>4. Add your first plugins</h2>
        <p>The starter set covers the three things everyone wants first - not deleting prod, not leaking keys, and not burning tokens:</p>
        <CodeBlock>{`$ openleash plugins install blast-radius data-leakage-prevention token-saver`}</CodeBlock>
        <p>Browse the current registry in the <a href={`${mainSiteUrl}/plugins`}>plugin catalog</a> - 9 plugins across security, cost, and visibility.</p>

        <h2>5. Watch it work</h2>
        <p>The OpenLeash Island shows live sessions, approvals, blocked actions, completion notices, and bounded plugin-contributed status. Open the main window for plugin settings, outcomes, and history.</p>

        <div className="docsNextBox">
          <strong>Next steps</strong>
          <a href="/reference/plugins">→ Write your first plugin - a manifest, an event, a run(). ~80 lines.</a>
          <a href="/reference/api">→ Events reference - all 12 hooks, payloads, and return types.</a>
          <a href="/deployment/self-hosted">→ Self-hosting - Docker compose, air-gapped installs, SIEM export.</a>
        </div>

        <div className="docsPager">
          <a href="/">← What is OpenLeash?</a>
          <a href="/getting-started">Configuration →</a>
        </div>
      </section>
    </DocsLayout>
  );
}

export const pages: Record<string, DocPage> = {
  "getting-started": {
    slug: "getting-started",
    eyebrow: "Getting started",
    title: "First, tell us who you are.",
    description: "The docs get easier when the path starts with you. Individuals get a short setup. Organizations get identity, policy, audit, and rollout guidance.",
    body: (
      <>
        <section className="section first">
          <JourneyStrip steps={["Pick audience", "Pick mode", "Install client", "Configure protections"]} active={0} />
          <AudienceGrid />
        </section>
        <section className="section">
          <SectionTitle title="Already Know The Mode?" text="OpenLeash has three backend-backed modes: Individual Open Source, OpenLeash Cloud, and Private Cloud." />
          <SetupGrid />
        </section>
        <section className="section">
          <SectionTitle title="Quick Decision" text="Read this like a normal person in a hurry." />
          <DecisionTable rows={[
            ["Just me, fully local", "Individual Open Source", "Run the real client-api and Postgres locally. No OpenLeash Cloud account."],
            ["Just me", "OpenLeash Cloud", "Create a personal account where you started. Still no dashboard."],
            ["My company", "OpenLeash Cloud", "Use work identity, then configure users and policy in the dashboard."],
            ["My company hosts it", "Private Cloud", "Run the public core in your own environment."]
          ]} />
        </section>
        <section className="section">
          <SectionTitle title="Next Step" text="Choose the full journey that matches you." />
          <NextStepCards cards={[
            ["I'm an individual", "/getting-started/individual", "Choose a hosted personal account or a local open-source backend."],
            ["I'm an organization", "/getting-started/organization", "Connect identity, configure policy, and roll OpenLeash out to your team."]
          ]} />
        </section>
      </>
    )
  },
  "getting-started/individual": {
    slug: "getting-started/individual",
    eyebrow: "Individual",
    title: "You want protection without admin homework.",
    description: "Start with the desktop client, then choose personal OpenLeash Cloud or Individual Open Source. Solo users never go to the dashboard.",
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Install desktop", "Choose mode", "Install hooks", "Done"]} active={0} />
            <SectionTitle title="Your Simple Path" text="You are not setting policy for a company. You are protecting your own agents." />
            <StepList steps={[
              "Install the desktop client.",
              "Choose personal OpenLeash Cloud or Individual Open Source.",
              "Sign in for Cloud, or let the installer start local client-api and Postgres.",
              "Install hooks for the agents you use.",
              "Keep working. OpenLeash interrupts only the risky stuff."
            ]} />
          </div>
          <DesktopScreenshot />
        </section>
        <section className="section">
          <Notice title="Tiny but important" text="Solo OpenLeash Cloud users never go to the dashboard. That surface is for organization admins and security teams." />
        </section>
        <section className="section">
          <SectionTitle title="Choose The Individual Backend" text="Personal Cloud hosts account state and evaluation. Individual Open Source keeps the same backend concepts in local Postgres and requires your own LLM key." />
          <NextStepCards cards={[
            ["OpenLeash Cloud", "/getting-started/openleash-cloud", "Personal hosted account and sync, while still keeping solo users out of the dashboard."],
            ["Individual Open Source", "/getting-started/individual-open-source", "Run the public client-api and Postgres locally without cloud sign-in."]
          ]} />
        </section>
      </>
    )
  },
  "getting-started/individual-open-source": {
    slug: "getting-started/individual-open-source",
    eyebrow: "Individual Open Source",
    title: "The real OpenLeash backend, on your machine.",
    description: "Individual Open Source runs desktop-client, the public client-api, and Postgres locally. It is not a standalone desktop-only mode.",
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Check Docker", "Install", "Start backend", "Add BYOK key", "Leash agents"]} active={1} />
            <SectionTitle title="Local Open-Source Path" text="No OpenLeash Cloud account, billing, or hosted evaluation is involved." />
            <StepList steps={[
              "Install and start Docker Desktop, OrbStack, or another supported Docker runtime.",
              "Run the installer with --open-source.",
              "Let it start the public client-api and Postgres with persistent volumes.",
              "Enter your own supported LLM provider key.",
              "Install hooks against the local client-api and manage plugins locally."
            ]} />
          </div>
          <DesktopScreenshot mode="open-source" />
        </section>
        <section className="section">
          <SectionTitle title="Install" text="The release pins the backend image by version and immutable digest, runs migrations, seeds the single local account, and launches desktop." />
          <InstallCommand command="curl -fsSL https://openleash.com/install.sh | sh -s -- --open-source" copyLabel="Copy" />
        </section>
        <section className="section">
          <Notice title="Backend-backed, still local" text="Local state, plugin settings, approvals, outcomes, and audit live in local Postgres. The desktop helper may cache setup state, but it is not a second backend and does not replace Postgres with SQLite." />
        </section>
        <section className="section">
          <SectionTitle title="Reachability" text="Hooks on this computer use the local client-api, usually http://127.0.0.1:9318. Cloud-run agents cannot reach loopback unless you deliberately expose the backend through a tunnel, VPN, LAN, or reachable URL." />
        </section>
      </>
    )
  },
  "getting-started/organization": {
    slug: "getting-started/organization",
    eyebrow: "Organization",
    title: "You want policy, users, approvals, and proof.",
    description: "Organizations use OpenLeash Cloud when OpenLeash hosts it, or Private Cloud when the customer hosts the stack.",
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Choose hosting", "Configure dashboard", "Deploy clients", "Operate"]} active={0} />
            <SectionTitle title="Admin Path" text="First connect identity. Then set policy. Then roll clients out." />
            <StepList steps={[
              "Choose OpenLeash Cloud or Private Cloud.",
              "Open the dashboard as an admin or CISO.",
              "Connect your identity provider.",
              "Set action and secret protection policies.",
              "Choose mandatory/default plugins, employee install freedom, and organization or per-agent settings.",
              "Deploy the desktop client to employees.",
              "Use audit logs when you need answers."
            ]} />
          </div>
          <DashboardScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Choose Your Organization Path" text="The dashboard journey is the same shape; the hosting responsibility changes." />
          <NextStepCards cards={[
            ["OpenLeash Cloud rollout", "/deployment/openleash-cloud", "Hosted OpenLeash: sign in with work identity, configure the dashboard, deploy clients."],
            ["Private Cloud rollout", "/getting-started/private-cloud", "Customer-hosted OpenLeash: bootstrap the dashboard, connect identity, then enroll clients."]
          ]} />
        </section>
      </>
    )
  },
  "getting-started/local-mode": {
    slug: "getting-started/local-mode",
    eyebrow: "Backend Required",
    title: "Local means Individual Open Source.",
    description: "OpenLeash supports a local open-source product mode only when desktop uses the real public client-api and Postgres. There is no standalone desktop-only backend.",
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Install desktop", "Choose backend", "Connect", "Install hooks", "Protected"]} active={1} />
            <SectionTitle title="What Happens" text="Choose one of three backend-backed modes. Hooks call the configured client-api directly; provider proxy traffic can pass through the desktop edge for local container-plugin execution." />
            <StepList steps={[
              "Install the desktop client.",
              "Choose Individual Open Source, OpenLeash Cloud, or Private Cloud.",
              "Start the local backend, sign in to personal Cloud, or enroll with your organization.",
              "Install agent hooks.",
              "Keep coding."
            ]} />
          </div>
          <DesktopScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Backend Required" text="Policy, evaluation, plugin settings, approvals, audit, and account state come from client-api and Postgres in every mode." />
          <CodeBlock>{`Individual Open Source hooks:
http://127.0.0.1:9318/v1/hooks/:agent/:event

OpenLeash Cloud hooks:
https://api.openleash.com/v1/hooks/:agent/:event

Private Cloud hooks:
https://openleash.company.example/v1/hooks/:agent/:event`}</CodeBlock>
        </section>
        <section className="section">
          <SectionTitle title="What This Means" text="The desktop may keep local cache/setup state, but it is not the source of truth." />
          <Checklist items={["Backend and Postgres are required", "Hooks target the configured client-api directly", "Protected hooks fail closed when the backend is unavailable", "Individual Open Source stores BYOK locally", "Organization plugin policy flows from the dashboard"]} />
        </section>
        <section className="section">
          <SectionTitle title="Finish Line" text="You are done when the desktop client is running, hooks are installed, and the backend connection is healthy." />
          <NextStepCards cards={[
            ["Individual Open Source", "/getting-started/individual-open-source", "Run the real local backend and Postgres."],
            ["Understand the desktop client", "/clients/desktop-client", "See what the tray app, Island, proxy edge, and hook installer own."]
          ]} />
        </section>
      </>
    )
  },
  "getting-started/openleash-cloud": {
    slug: "getting-started/openleash-cloud",
    eyebrow: "OpenLeash Cloud",
    title: "Hosted OpenLeash, two very different journeys.",
    description: "Individuals use OpenLeash Cloud without the dashboard. Organizations use the dashboard for identity, policy, deployment, and audit.",
    body: (
      <>
        <section className="section first split alt">
          <PersonalCloudScreenshot />
          <div>
            <JourneyStrip steps={["Sign up", "Install desktop", "Install hooks", "Protected"]} active={0} />
            <SectionTitle title="If It Is Just You" text="Sign up where you started. Then install the desktop client. That is it." />
            <StepList steps={[
              "Start from web, desktop, or mobile.",
              "Create your personal account.",
              "Install the desktop client.",
              "The desktop client forwards to OpenLeash Cloud when online."
            ]} />
          </div>
        </section>
        <section className="section split" id="org">
          <div>
            <JourneyStrip steps={["Work sign-in", "Dashboard setup", "Policies", "Client rollout"]} active={1} />
            <SectionTitle title="If It Is Your Company" text="Use work identity and finish setup in the dashboard." />
            <StepList steps={[
              "Sign in with work identity.",
              "Create or join the organization.",
              "Connect identity and groups.",
              "Set policies and approval routes.",
              "Set plugin requirements, configuration locks, and agent-specific profiles.",
              "Deploy desktop and mobile clients."
            ]} />
          </div>
          <DashboardScreenshot />
        </section>
        <section className="section">
          <Notice title="Product rule" text="Solo users stay out of the dashboard. Organization admins and CISOs use it every day." />
        </section>
        <section className="section">
          <SectionTitle title="Continue The Journey" text="Pick the next page based on whether you are installing for yourself or rolling out a team." />
          <NextStepCards cards={[
            ["Desktop client", "/clients/desktop-client", "Install hooks and understand the local relay runtime."],
            ["Cloud rollout", "/deployment/openleash-cloud", "Finish organization setup, deployment tokens, and employee rollout."]
          ]} />
        </section>
      </>
    )
  },
  "getting-started/private-cloud": {
    slug: "getting-started/private-cloud",
    eyebrow: "Private Cloud",
    title: "Same OpenLeash, hosted by the customer.",
    description: "Private Cloud is for organizations that need customer-owned APIs, dashboard, database, identity, logs, secrets, and upgrades.",
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Run stack", "Open dashboard", "Connect identity", "Deploy clients"]} active={1} />
            <SectionTitle title="Bootstrap Flow" text="There is no public sign-up path. Start from the customer-hosted dashboard." />
            <StepList steps={[
              "Install the Private Cloud stack.",
              "Open the customer-hosted dashboard.",
              "Create the first admin.",
              "Name the organization.",
              "Connect identity.",
              "Point clients at the customer API URL."
            ]} />
          </div>
          <PrivateCloudScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="What You Run" text="The public core stays open-source and customer-operated." />
          <div className="featureGrid">
            <Mini title="Client API" text="Receives desktop, mobile, hook, enrollment, update, and evaluation traffic." />
            <Mini title="Dashboard" text="Used by admins and CISOs for users, policy, audit, usage, and deployment." />
            <Mini title="Postgres" text="Customer-owned database. Run migrations before upgrades." />
            <Mini title="Identity sync" text="Google Workspace, Okta, Entra ID, Ping, or LDAP-style providers." />
            <Mini title="Clients" text="Desktop and mobile use the customer API. Installed hooks target the customer-hosted client-api directly." />
          </div>
        </section>
        <section className="section">
          <SectionTitle title="Continue The Journey" text="After the stack exists, the work moves into dashboard configuration and endpoint rollout." />
          <NextStepCards cards={[
            ["Private Cloud rollout", "/deployment/private-cloud", "Configure dashboard values, identity, policy, tokens, and clients."],
            ["Self-hosted ops", "/deployment/self-hosted", "See operator responsibilities: services, migrations, secrets, ingress, and backups."]
          ]} />
        </section>
      </>
    )
  },
  "clients/desktop-client": featurePage("Desktop Client", "The installed tray app, approval surface, Island host, provider-proxy edge, hook installer, and backend enrollment client.", <DesktopScreenshot />, [
    ["Managed hooks", "Installed hooks call the configured client-api directly: hosted, customer-hosted, or local Individual Open Source."],
    ["Hook installer", "Installs integrations for supported local agents."],
    ["Settings", "Stores desktop preferences and backend enrollment state."],
    ["Island", "Renders approvals, session activity, completion notices, and typed plugin contributions without allowing plugin-owned UI."],
    ["Provider edge", "Runs constrained local container plugins before relaying normalized enforcement to the configured backend."]
  ], "Client", "clients/desktop-client"),
  "clients/mobile-client": featurePage("Mobile Client", "The approval companion for people who need to decide away from the desk.", <MobileScreenshot />, [
    ["Approvals", "Review held actions from your phone."],
    ["Activity", "See the recent decisions that need your attention."],
    ["Private Cloud", "Point mobile at the customer API URL and sign in with company identity."]
  ], "Client", "clients/mobile-client"),
  "clients/dashboard": featurePage("Dashboard for CISOs", "The admin surface for organizations. Solo users do not enter it.", <DashboardScreenshot />, [
    ["Identity", "Connect users, groups, roles, and devices."],
    ["Policy", "Set the rules employees inherit."],
    ["Plugins", "Choose mandatory/default plugins, catalog freedom, locked or editable settings, and organization agent profiles."],
    ["Audit", "Answer who did what, when, and why."],
    ["Rollout", "Issue deployment tokens and track protected endpoints."]
  ], "Client", "clients/dashboard"),
  "features/action-protection": featurePage("Action Protection", "Approvals pause the moments where an agent needs human judgment before continuing.", <ApprovalScreenshot />, [
    ["Held actions", "Pause commands, file access, deploys, secret exposure, and branch operations."],
    ["Local relay", "Individuals and teams use the desktop relay while decisions come from the configured backend."],
    ["Audit context", "Each decision keeps user, agent, project, reason, policy, and time."]
  ]),
  "features/policies": featurePage("Policies", "Policies say what agents can do, what gets denied, and what needs approval.", <PolicyScreenshot />, [
    ["Defaults", "Start with secrets, deletion, external sharing, force pushes, and infrastructure changes."],
    ["Team rules", "Add rules for production systems, repositories, providers, and sensitive folders."],
    ["Enforcement", "CISO-managed policy cannot be disabled locally by employees."]
  ]),
  "features/secret-protection": featurePage("Secret Protection", "Catch secrets before agents read, send, or commit them.", <SecretScreenshot />, [
    ["Credential files", "Flag .env files, SSH keys, npm tokens, kubeconfigs, and cloud credentials."],
    ["Prompt masking", "Mask or hold prompts with keys, tokens, PII, PHI, or credentials."],
    ["Commit safety", "Require approval before suspicious staged content is committed."]
  ]),
  "features/prompt-compression": featurePage("token-saver", "Shrink large prompts while keeping task intent and important context.", <CompressionScreenshot />, [
    ["Cost control", "Lower token usage before sending context to model-backed checks."],
    ["Policy aware", "Compression can run alongside DLP and approval policies."],
    ["BYOK friendly", "Use customer-provided model keys when teams bring their own provider."]
  ]),
  "features/identity": featurePage("Identity & Users", "Identity connects people, groups, roles, and devices to decisions.", <IdentityScreenshot />, [
    ["Providers", "Google Workspace, Microsoft Entra ID, Okta, Ping, and LDAP-style sync are the intended admin choices."],
    ["Provisioning", "Employees sign in through the configured provider."],
    ["Roles", "Admins manage policy and audit. Employees follow organization policy."]
  ]),
  "features/audit-log": featurePage("Audit Log", "Audit explains what the agent tried and how OpenLeash responded.", <AuditScreenshot />, [
    ["Event history", "Track prompts, tools, shell commands, file access, and decisions."],
    ["Decision reasons", "Show why an action was allowed, held, masked, or denied."],
    ["Investigation", "Filter by user, agent, project, policy, event type, and time."]
  ]),
  "features/usage": featurePage("Provider Usage", "Usage helps admins understand requests, tokens, and spend.", <UsageScreenshot />, [
    ["Provider connections", "Connect organization admin keys for OpenAI, Claude, Cursor, and other supported providers."],
    ["Budget context", "See requests, tokens, and cost trends."],
    ["BYOK", "Bring your own model keys for checks and reporting."]
  ]),
  "deployment/openleash-cloud": deploymentPage("OpenLeash Cloud", "Hosted by OpenLeash. Individuals stay simple; organizations use the dashboard.", `Individual:
1. Install desktop or mobile.
2. Sign in from that app.
3. Choose plugins and global, agent-kind, or exact-agent settings.
4. Install hooks and start protection.

Organization:
1. Admin signs in with work identity.
2. Dashboard opens setup.
3. Configure identity, roles, policies, approvals, plugins, and deployment tokens.
4. For each plugin, choose mandatory/default state, install freedom, configuration locking, and organization agent profiles.
5. Deploy desktop clients.
6. Employees sign in, inherit required configuration, and receive only the plugin freedom the admin allows.`, ["No customer infrastructure is required for the hosted path.", "Do not expose implementation service names or internal hostnames in customer-facing rollout instructions.", "Admins configure the organization from the dashboard; employees install or receive the desktop and mobile clients."]),
  "deployment/private-cloud": deploymentPage("Private Cloud", "Customer-hosted rollout for organizations.", `Admin bootstrap:
1. Open the customer-hosted dashboard.
2. Enter the organization name.
3. Save the API URL used by desktop and mobile.
4. Connect identity.
5. Configure policies, plugins, employee freedom, approvals, audit, usage, and updates.
6. Create a deployment token.
7. Deploy clients.

Endpoint setup:
desktop app -> Organization -> Private Cloud -> API URL -> company sign-in -> agents -> install hooks
mobile app  -> custom API URL -> company sign-in -> approvals/activity`, ["Same admin concepts as OpenLeash Cloud.", "Customer owns API, dashboard, database, identity, logs, backups, and upgrades.", "Employees sign in and receive dashboard-managed policy."]),
  "deployment/self-hosted": deploymentPage("Self-Hosted", "Operator notes for running Private Cloud yourself.", `Platform setup:
1. Provision Postgres.
2. Deploy client-api, dashboard-api, and dashboard-web.
3. Run migrations.
4. Store credentials in your secret manager.
5. Expose the client API to desktop/mobile.
6. Expose the dashboard to admins.

Dashboard setup:
1. Configure identity.
2. Sync users and groups.
3. Assign roles.
4. Configure policies, plugin controls, agent profiles, and provider keys.
5. Issue deployment tokens.
6. Roll out clients.

Client bootstrap:
desktop: Organization -> Private Cloud -> your managed API URL -> sign in -> install hooks
mobile:  Custom API URL -> sign in -> register device -> approve held actions`, ["Self-hosted is the operator-run form of Private Cloud, not a separate product mode.", "Document services, secrets, ingress, migration jobs, and backups.", "Desktop clients require the managed backend."]),
  "reference/architecture": referencePage("Architecture", "The shortest useful map.", `Individual Open Source:
agent hook -> local client-api -> local Postgres
provider request -> local proxy -> desktop edge -> plugin containers -> provider

OpenLeash Cloud:
agent hook -> hosted client-api -> hosted Postgres
provider request -> local proxy -> desktop edge -> plugin containers -> hosted client-api -> provider

Private Cloud:
agent hook -> customer client-api -> customer Postgres
dashboard-web -> dashboard-api -> customer Postgres

All modes use the same public client-api contracts and plugin model.`),
  "reference/plugins": {
    slug: "reference/plugins",
    eyebrow: "Reference",
    title: "Plugins",
    description: "OpenLeash features are ordered pipeline plugins. A plugin subscribes to narrow events, declares permissions and settings, uses stable capabilities, and returns typed results.",
    body: (
      <>
        <section className="section first split">
          <div>
            <SectionTitle title="Plain Model" text="Agents emit hooks or provider traffic. OpenLeash normalizes both into events. The runtime resolves the effective plugin state for the authenticated user and agent, then runs enabled plugins in manifest order." />
            <CodeBlock>{`installed agent hook
  -> configured client-api
  -> OpenLeash event
  -> ordered plugin pipeline
  -> audit, approval, transformed prompt, or allow/deny response`}</CodeBlock>
          </div>
          <RuntimeScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Build A Tiny Plugin" text="Start with the manifest. It is the plugin's store card, permission request, config contract, and ordering hint." />
          <CodeBlock>{`export const manifest = {
  id: "acme.prompt-labeler",
  name: "Prompt Labeler",
  version: "1.0.0",
  publisher: "acme",
  runtime: "container",
  entrypoint: "container",
  execution: {
    type: "container",
    placement: "server",
    protocol: "openleash-container-plugin.v1",
    image: "ghcr.io/acme/prompt-labeler:1.0.0",
    digest: "sha256:<immutable-image-digest>",
    eventPath: "/v1/events"
  },
  events: ["prompt.beforeSubmit"],
  permissions: ["event:read", "prompt:read", "audit:write", "island:publish"],
  effects: ["observe"],
  ordering: { priority: 250, after: ["openleash.dlp"] },
  configSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      enabled: { type: "boolean" },
      label: { type: "string" }
    }
  },
  defaultConfig: { enabled: true, label: "reviewed" }
};`}</CodeBlock>
        </section>
        <section className="section split">
          <div>
            <SectionTitle title="Implementation Shape" text="Plugins do not import OpenLeash database modules, evaluators, API handlers, or model-key readers. They receive capabilities from the runtime." />
            <CodeBlock>{`export async function run(input, capabilities) {
  if (!input.config.enabled) {
    return { status: "skipped", summary: "Disabled." };
  }

  await capabilities.storage.set({
    scope: { sessionId: input.event.sessionId },
    key: "labels/latest",
    value: { label: input.config.label, at: Date.now() },
    ttlSeconds: 86400
  });

  return {
    status: "passed",
    summary: "Prompt labeled.",
    findings: [{
      title: "Prompt label",
      severity: "info",
      summary: input.config.label
    }]
  };
}`}</CodeBlock>
          </div>
          <div className="featureStack">
            <Mini icon={<ListChecks />} title="Events" text="Use the narrowest event: startup, agent detected, skill changed, prompt before submit, agent response, tool before/after use, session start/end." />
            <Mini icon={<LockKeyhole />} title="Permissions" text="Declare only what the plugin needs: prompt read/write, tool read, model invoke, storage, audit, log, signal, usage, decision, or notification." />
            <Mini icon={<Database />} title="Storage" text="Use plugin-scoped JSON storage. OpenLeash injects organization and plugin identity so plugins cannot read each other's state." />
          </div>
        </section>
        <section className="section split">
          <div>
            <SectionTitle title="Publish To The Island" text="Plugins own logic and bounded wording; OpenLeash owns every pixel, interaction, accessibility rule, and scope check." />
            <CodeBlock>{`await capabilities.island.annotateSession({
  key: "destructive-risk",
  label: "Destructive filesystem operation",
  detail: "Recursive deletion affects this workspace.",
  value: "critical",
  tone: "danger",
  ttlSeconds: 180,
  action: {
    id: "open",
    label: "Open session",
    type: "open-session"
  }
});

await capabilities.island.reportActivity({
  key: "test-suite",
  title: "Test suite running",
  status: "running",
  progress: { current: 18, total: 24 }
});`}</CodeBlock>
          </div>
          <div className="featureStack">
            <Mini icon={<Bell />} title="Short-lived" text="Contributions expire after a bounded TTL and can be refreshed or cleared by plugin key." />
            <Mini icon={<ShieldCheck />} title="Host rendered" text="No plugin HTML, CSS, JavaScript, URLs, shell commands, Electron IPC, or custom components." />
            <Mini icon={<UsersRound />} title="Correctly scoped" text="Organization, user, session, agent kind, and exact enrolled agent identity come from trusted runtime context." />
          </div>
        </section>
        <section className="section split">
          <div>
            <SectionTitle title="Signals And Usage" text="Plugins report normalized facts to OpenLeash. They do not write database rows or build their own reporting backend." />
            <CodeBlock>{`await capabilities.signals.emit({
  kind: "security.finding",
  severity: "high",
  title: "Destructive command blocked",
  decision: "blocked",
  status: "contained",
  correlationKeys: ["policy:prod-safety"]
});

await capabilities.usage.record({
  kind: "llm.tokens",
  provider: "openleash-evaluator",
  inputTokens: 4200,
  savedTokens: 1600,
  estimatedCostUsd: 0.018
});`}</CodeBlock>
          </div>
          <div className="featureStack">
            <Mini icon={<ShieldAlert />} title="CISO View" text="The dashboard reads OpenLeash-owned signal records to show incidents, findings, affected employees, contained actions, and plugin sources." />
            <Mini icon={<Gauge />} title="Cost View" text="Usage records power plugin and employee cost summaries without exposing provider keys or raw database access to plugins." />
            <Mini icon={<UsersRound />} title="Identity" text="OpenLeash stamps organization, synced user, computer, runtime, and conversation context. Plugins cannot spoof those trusted fields." />
          </div>
        </section>
        <section className="section">
          <SectionTitle title="Correlation" text="General dashboards correlate plugin output through OpenLeash-owned context, not plugin-to-plugin database reads." />
          <DecisionTable rows={[
            ["Same user", "IdP-synced user id", "Show incidents, usage, and risky actions for one employee."],
            ["Same conversation", "conversation_event_id", "Connect prompt, tool, data protection, MCP, and rules-enforcer records."],
            ["Same device/runtime", "computer_id and agent_runtime_id", "Spot endpoint-specific agent behavior."],
            ["Explicit pattern", "correlationKeys", "Let plugins add safe keys such as policy ids, secret categories, tools, or command classes."]
          ]} />
        </section>
        <section className="section">
          <SectionTitle title="Ordering" text="The runtime resolves before/after dependencies first, then priority. This keeps transformations and checks deterministic." />
          <CodeBlock>{`prompt.beforeSubmit:
openleash.prompt-compression
  -> openleash.dlp
  -> openleash.sensitive-access

tool.beforeUse:
openleash.sensitive-access
  -> openleash.blast-radius
  -> openleash.rules-enforcer
  -> openleash.mcp-scanner`}</CodeBlock>
        </section>
        <section className="section">
          <SectionTitle title="Settings And Rollout" text="Plugin authors define one config schema and consume one resolved input.config. OpenLeash owns product mode, organization roles, employee freedom, and agent-profile merging." />
          <Checklist items={[
            "Individual Open Source and personal OpenLeash Cloud users control their own plugins and profiles",
            "Organization admins independently choose mandatory state, default enablement, employee install permission, and configuration locking",
            "Mandatory does not imply locked: an admin can require a plugin while allowing employee configuration",
            "Profiles can target every agent, an agent kind such as Claude Code or Codex, an exact authenticated/enrolled runtime ID, or both",
            "Caller-supplied agent IDs never become authorization scope",
            "Runtime capabilities provide primitive services while plugin code owns its detection logic"
          ]} />
          <CodeBlock>{`effective input.config:
manifest defaultConfig
  -> organization base settings
  -> matching organization profiles by priority
  -> user base settings when configuration is unlocked
  -> matching user profiles by priority when unlocked

mandatory plugin:
  cannot be removed or disabled by an employee
  can still accept employee configuration when configLocked is false`}</CodeBlock>
        </section>
        <section className="section">
          <SectionTitle title="Product Modes" text="The same manifest, schema, profiles, and runtime contract travel across all supported products." />
          <DecisionTable rows={[
            ["Individual Open Source", "Local client-api + Postgres", "The individual owns installs and settings; cloud-only plugins are refused."],
            ["Personal OpenLeash Cloud", "Hosted client-api", "The individual owns synchronized installs and settings without entering the org dashboard."],
            ["Organization OpenLeash Cloud", "Hosted APIs + dashboard", "Admins set organization policy; employees get exactly the allowed install and configuration freedom."],
            ["Private Cloud", "Customer-hosted APIs + dashboard", "The same organization controls run entirely on customer infrastructure."]
          ]} />
        </section>
        <section className="section">
          <SectionTitle title="Plugin Data" text="Plugins can keep private state without owning a database or raw SQL access. Use scoped storage for session memory, caches, heuristics, and notification dedupe." />
          <CodeBlock>{`const scope = {
  sessionId: input.event.sessionId,
  conversationId: input.event.conversationId
};

const previous = await capabilities.storage.get({
  scope,
  key: "notifications/customer-data-risk"
});

if (!previous) {
  await capabilities.storage.set({
    scope,
    key: "notifications/customer-data-risk",
    value: { shownAt: Date.now() },
    ttlSeconds: 5 * 60 * 60
  });
}`}</CodeBlock>
        </section>
        <section className="section">
          <SectionTitle title="First-Party Plugins" text="These ship preinstalled today and also serve as reference implementations for plugin builders." />
          <DecisionTable rows={[
            ["openleash.prompt-compression", "prompt.beforeSubmit", "Token-saver rewrites noisy prompts with its own prompt/schema and reports savings."],
            ["openleash.dlp", "prompt.beforeSubmit", "Data-leakage-prevention owns masking/detection logic and emits secret detection signals."],
            ["openleash.sensitive-access", "prompt, response, tool", "Catches env-file reads, secret exposure, env dumps, and exfiltration attempts."],
            ["openleash.blast-radius", "tool.beforeUse", "Guards destructive tools and broad data operations."],
            ["openleash.rules-enforcer", "prompt, agent.response, tool", "Evaluates natural-language rules with plugin-owned prompts and emits security findings."],
            ["openleash.mcp-scanner", "tool.beforeUse and tool.afterUse", "Inventories MCP tool calls for audit, review, and dashboard correlation."],
            ["openleash.skill-scanner", "startup, agent.detected, skill.detected, skill.changed", "Observes agent skills and emits signals for suspicious instructions."],
            ["openleash.siem-exporter", "security, log, outcome", "Exports events and plugin logs to configured SIEM targets."]
          ]} />
        </section>
        <section className="section">
          <SectionTitle title="Source And Examples" text="Plugin examples and the preinstalled plugin repos live under the OpenLeash GitHub organization." />
          <NextStepCards cards={[
            ["First-party plugin repos", "https://github.com/open-leash?q=plugin-", "Read the public plugin-* repositories, each with its own icon, source, manifest, prompts, and parser logic."],
            ["Client API source", "https://github.com/open-leash/client-api/tree/main/src/plugins", "See the runtime and first-party plugin integration."]
          ]} />
        </section>
      </>
    )
  },
  "reference/api": referencePage("API Surfaces", "Clients and admins use different APIs.", `client-api:
/health
/v1/hooks/:agent/:event
/v1/evaluate
/api/updates/check

dashboard-api:
/admin/overview
/admin/users
/admin/policies
/admin/logs
/admin/provider-usage`),
  "reference/migrations": referencePage("Migrations", "Migrations matter because the backend is the product authority.", `Test matrix:
1. Fresh desktop install with backend enrollment
2. Old desktop cache -> migrate -> current
3. Private Cloud Postgres old schema -> current
4. Public Cloud Postgres migration
5. Self-hosted manual upgrade

Rule:
Desktop cache migrations must not become product authority; backend data lives in Postgres.`),
  "reference/troubleshooting": referencePage("Troubleshooting", "Start with the symptom, then the mode.", `Desktop hook not firing:
- Inspect the installed agent hook and confirm its configured client-api URL
- Check that client-api /health is reachable from the agent environment
- For Individual Open Source, check http://127.0.0.1:9318/health
- Check desktop is signed in/enrolled so approvals and activity can arrive
- Reinstall hooks

Cloud API unhealthy:
- Check DATABASE_URL secret
- Check Cloud SQL attachment
- Run migrations
- Check revision logs

Dashboard missing data:
- Check dashboard-api health
- Check identity sync
- Check organization/tenant mapping`)
};

pages["getting-started/personal-cloud"] = pages["getting-started/openleash-cloud"];
pages["getting-started/team-cloud"] = pages["getting-started/openleash-cloud"];
pages["features/desktop-client"] = pages["clients/desktop-client"];
pages["features/mobile"] = pages["clients/mobile-client"];
pages["features/approvals"] = pages["features/action-protection"];

export function RenderDocPage({ page, activePath }: { page: DocPage; activePath: string }) {
  const canonicalPath = page.slug !== activePath && pages[page.slug] ? page.slug : activePath;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.title,
    description: page.description,
    url: absoluteDocsUrl(`/${canonicalPath}`),
    articleSection: page.eyebrow,
    author: { "@type": "Organization", name: "OpenLeash", url: mainSiteUrl },
    publisher: { "@type": "Organization", name: "OpenLeash", url: mainSiteUrl }
  };

  return (
    <DocsLayout activePath={`/${activePath}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      {page.body}
    </DocsLayout>
  );
}

function featurePage(title: string, description: string, screenshot: ReactNode, points: Array<[string, string]>, eyebrow = "Feature", slugOverride?: string): DocPage {
  const slug = slugOverride ?? `features/${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  return {
    slug,
    eyebrow,
    title,
    description,
    body: (
      <>
        <section className="section first split">
          <div>
            <SectionTitle title="Purpose" text={description} />
            <div className="featureStack">
              {points.map(([heading, text]) => <Mini key={heading} title={heading} text={text} />)}
            </div>
          </div>
          {screenshot}
        </section>
        <section className="section">
          <SectionTitle title="Where You See It" text="Start simple. The same idea grows as your setup grows." />
          <DecisionTable rows={[
            ["Individual local", "Desktop client", "Configure and review locally."],
            ["Individual cloud", "Desktop plus account surface", "Cloud sync, no dashboard."],
            ["Organization", "Dashboard and clients", "Admins configure policy; employees follow it."],
            ["Private Cloud", "Customer-hosted dashboard", "Same concepts, customer-owned backend."]
          ]} />
        </section>
      </>
    )
  };
}

function deploymentPage(title: string, description: string, code: string, notes: string[]): DocPage {
  return {
    slug: `deployment/${title.toLowerCase().replace(/\s+/g, "-")}`,
    eyebrow: "Deployment",
    title,
    description,
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Prepare", "Configure", "Deploy", "Verify"]} active={1} />
            <SectionTitle title="Rollout Flow" text={description} />
            <CodeBlock>{code}</CodeBlock>
          </div>
          <RolloutScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Operator Notes" text="Keep these in mind before you release or upgrade." />
          <Checklist items={notes} />
        </section>
        <section className="section">
          <SectionTitle title="Complete When" text="Use this as the practical finish line for the rollout." />
          <Checklist items={[
            "Admins can sign in to the right OpenLeash surface",
            "Identity, users, roles, and policies are saved",
            "A deployment token or install path exists",
            "At least one desktop client is enrolled",
            "A test risky action is allowed, held, or denied as expected"
          ]} />
        </section>
      </>
    )
  };
}

function referencePage(title: string, description: string, code: string): DocPage {
  return {
    slug: `reference/${title.toLowerCase().replace(/\s+/g, "-")}`,
    eyebrow: "Reference",
    title,
    description,
    body: (
      <section className="section first">
        <SectionTitle title="Details" text={description} />
        <CodeBlock>{code}</CodeBlock>
      </section>
    )
  };
}

function Hero({ eyebrow, title, description, primary }: { eyebrow: string; title: string; description: string; primary?: { href: string; label: string } }) {
  return (
    <section className="hero">
      <div className="eyebrow"><BookOpen size={15} /> {eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
      {primary && (
        <div className="heroActions">
          <a className="primary" href={primary.href}>{primary.label} <ArrowRight size={16} /></a>
          <a className="secondary" href="/clients/desktop-client"><MonitorDown size={16} /> Explore clients</a>
        </div>
      )}
    </section>
  );
}

function SetupGrid() {
  return (
    <div className="flowGrid">
      {setupCards.map((card) => {
        const Icon = card.icon;
        return (
          <a className="flowCard" href={card.href} key={card.href}>
            <span className="tag">{card.label}</span>
            <Icon size={22} />
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
            <ul>
              {card.bullets.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
            </ul>
          </a>
        );
      })}
    </div>
  );
}

function AudienceGrid() {
  return (
    <div className="audienceGrid">
      {audienceCards.map((card) => {
        const Icon = card.icon;
        return (
          <a className="flowCard audienceCard" href={card.href} key={card.href}>
            <span className="tag">{card.label}</span>
            <Icon size={24} />
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
            <ul>
              {card.bullets.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
            </ul>
          </a>
        );
      })}
    </div>
  );
}

function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <div className="sectionHead">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function JourneyStrip({ steps, active }: { steps: string[]; active: number }) {
  return (
    <div className="journeyStrip" aria-label="Journey">
      {steps.map((step, index) => (
        <div className={index <= active ? "done" : ""} key={step}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}

function NextStepCards({ cards }: { cards: Array<[string, string, string]> }) {
  return (
    <div className="nextGrid">
      {cards.map(([title, href, text]) => (
        <a className="nextCard" href={href} key={href}>
          <span>Next</span>
          <strong>{title}</strong>
          <p>{text}</p>
          <ArrowRight size={16} />
        </a>
      ))}
    </div>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return <ol className="steps">{steps.map((step) => <li key={step}>{step}</li>)}</ol>;
}

function Checklist({ items }: { items: string[] }) {
  return <div className="checkGrid">{items.map((item) => <div key={item}><Check size={16} /> {item}</div>)}</div>;
}

function CodeBlock({ children }: { children: string }) {
  return <pre className="codeBlock">{children}</pre>;
}

function InstallCommand({ command, copyLabel }: { command: string; copyLabel: string }) {
  return (
    <div className="installCommand">
      <span>$</span>
      <code>{command}</code>
      <button type="button">{copyLabel}</button>
    </div>
  );
}

function Notice({ title, text }: { title: string; text: string }) {
  return <div className="notice"><strong>{title}</strong><p>{text}</p></div>;
}

function Mini({ icon, title, text }: { icon?: ReactNode; title: string; text: string }) {
  return <article className="mini">{icon && <span>{icon}</span>}<h3>{title}</h3><p>{text}</p></article>;
}

function DecisionTable({ rows }: { rows: Array<[string, string, string]> }) {
  return (
    <div className="decisionTable">
      {rows.map(([who, path, note]) => (
        <div key={`${who}-${path}`}>
          <strong>{who}</strong>
          <span>{path}</span>
          <p>{note}</p>
          <ChevronRight size={16} />
        </div>
      ))}
    </div>
  );
}

function DesktopScreenshot({ mode = "cloud" }: { mode?: "cloud" | "open-source" }) {
  const openSource = mode === "open-source";
  return (
    <div className="screenshot desktopShot">
      <div className="windowBar"><span /><span /><span /></div>
      <div className="shotTitle"><Laptop size={18} /> OpenLeash Desktop</div>
      <div className="modeRow"><button className={openSource ? "active" : undefined}>Open Source</button><button className={openSource ? undefined : "active"}>Personal Cloud</button></div>
      <div className="field"><span>Backend</span><strong>{openSource ? "127.0.0.1:9318" : "api.openleash.com"}</strong></div>
      <div className="field"><span>Hooks</span><strong>Claude, Codex, Cursor, Gemini, OpenCode, OpenClaw, NanoClaw</strong></div>
      <div className="status good"><Check size={15} /> {openSource ? "Local client-api + Postgres connected" : "Cloud backend connected · local plugin edge ready"}</div>
    </div>
  );
}

function RuntimeScreenshot() {
  return (
    <div className="screenshot diagramShot">
      <div className="node"><TerminalSquare size={18} /> Agent hook</div>
      <div className="line" />
      <div className="node"><Cloud size={18} /> Configured client-api</div>
      <div className="line" />
      <div className="node"><Database size={18} /> Plugin pipeline + Postgres</div>
    </div>
  );
}

function PersonalCloudScreenshot() {
  return (
    <div className="screenshot accountShot">
      <div className="shotPill">Personal</div>
      <h3>You are in</h3>
      <p>To monitor your agents, install the desktop client.</p>
      <button><Download size={16} /> Download desktop client</button>
      <div className="smallRows">
        <span>No dashboard</span>
        <span>Hosted backend</span>
        <span>Synced plugin settings</span>
      </div>
    </div>
  );
}

function DashboardScreenshot() {
  return (
    <div className="screenshot dashboardShot">
      <div className="dashSide">
        <strong>OpenLeash</strong>
        <span>Overview</span>
        <span>Users</span>
        <span>Identity</span>
        <span>Policies</span>
        <span>Plugins</span>
      </div>
      <div className="dashMain">
        <div className="dashTop"><h3>Overview</h3><span>Acme Security</span></div>
        <div className="metricRow"><b>184</b><span>protected endpoints</span></div>
        <div className="metricRow warn"><b>12</b><span>actions held today</span></div>
        <div className="policyLine"><ShieldCheck size={16} /> Secret and token access requires approval</div>
      </div>
    </div>
  );
}

function PrivateCloudScreenshot() {
  return (
    <div className="screenshot privateShot">
      <div className="node"><MonitorDown size={18} /> Desktop and mobile clients</div>
      <div className="line" />
      <div className="node"><Code2 size={18} /> Customer-managed API URL</div>
      <div className="node"><UsersRound size={18} /> Admin dashboard</div>
      <div className="node"><Database size={18} /> Customer Postgres</div>
      <div className="node"><KeyRound size={18} /> Customer identity provider</div>
    </div>
  );
}

function RolloutScreenshot() {
  return (
    <div className="screenshot privateShot">
      <div className="node"><UsersRound size={18} /> Admin configures dashboard</div>
      <div className="line" />
      <div className="node"><KeyRound size={18} /> Identity and roles</div>
      <div className="node"><ShieldCheck size={18} /> Policies and approvals</div>
      <div className="node"><MonitorDown size={18} /> Desktop rollout</div>
      <div className="node"><Smartphone size={18} /> Mobile approvals</div>
    </div>
  );
}

function ApprovalScreenshot() {
  return <CardShot icon={<ShieldAlert />} title="Approval required" rows={["Command: terraform destroy", "Policy: Infrastructure destruction", "Decision: waiting for admin"]} />;
}

function PolicyScreenshot() {
  return <CardShot icon={<ListChecks />} title="Policy rule" rows={["Secret files: hold", "Force push main: deny", "Production deploy: approval"]} />;
}

function SecretScreenshot() {
  return <CardShot icon={<LockKeyhole />} title="Sensitive context" rows={[".env read detected", "Token-like value masked", "Credential access held"]} />;
}

function CompressionScreenshot() {
  return <CardShot icon={<WandSparkles />} title="Prompt plugins" rows={["token-saver enabled", "data-leakage-prevention enabled", "Model: BYOK provider"]} />;
}

function IdentityScreenshot() {
  return <CardShot icon={<UsersRound />} title="Identity sync" rows={["Google Workspace connected", "128 users synced", "14 groups mapped"]} />;
}

function AuditScreenshot() {
  return <CardShot icon={<FileSearch />} title="Audit event" rows={["Agent: OpenClaw", "Action: file read", "Decision: approved"]} />;
}

function UsageScreenshot() {
  return <CardShot icon={<Gauge />} title="Provider usage" rows={["OpenAI: 1.2M tokens", "Claude: 842K tokens", "Budget: 64% used"]} />;
}

function MobileScreenshot() {
  return (
    <div className="phoneShot">
      <div className="phoneTop" />
      <div className="phoneCard"><Smartphone size={18} /><strong>Approval waiting</strong><p>An agent wants to read .env.production</p><button>Approve</button></div>
    </div>
  );
}

function CardShot({ icon, title, rows }: { icon: ReactNode; title: string; rows: string[] }) {
  return (
    <div className="screenshot cardShot">
      <div className="shotTitle">{icon}{title}</div>
      {rows.map((row) => <div className="field" key={row}><span>{row.split(":")[0]}</span><strong>{row.includes(":") ? row.split(":").slice(1).join(":").trim() : row}</strong></div>)}
    </div>
  );
}

function isActive(activePath: string, href: string) {
  if (href === "/") return activePath === "/";
  return activePath === href || activePath.startsWith(`${href}/`);
}

function navItemActive(activePath: string, item: { href: string; label: string }) {
  if (activePath === "/" && item.href === "/") return item.label === "Quickstart";
  return isActive(activePath, item.href);
}
