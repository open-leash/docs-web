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
  Network,
  ScrollText,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  TerminalSquare,
  UsersRound,
  WandSparkles
} from "lucide-react";

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:9300";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/open-leash";
const signInHref = `${dashboardUrl.replace(/\/+$/, "")}/auth/cloud/start`;

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
    title: "Start",
    items: [
      { href: "/", label: "What Is OpenLeash?" },
      { href: "/getting-started", label: "Choose Your Setup" },
      { href: "/getting-started/local-mode", label: "Local Mode" },
      { href: "/getting-started/personal-cloud", label: "Personal Cloud" },
      { href: "/getting-started/team-cloud", label: "Team Cloud" },
      { href: "/getting-started/private-cloud", label: "Private Cloud" }
    ]
  },
  {
    title: "Features",
    items: [
      { href: "/features/desktop-client", label: "Desktop Client" },
      { href: "/features/approvals", label: "Approvals" },
      { href: "/features/policies", label: "Policies" },
      { href: "/features/secret-protection", label: "Secret Protection" },
      { href: "/features/prompt-compression", label: "Prompt Compression" },
      { href: "/features/identity", label: "Identity & Users" },
      { href: "/features/audit-log", label: "Audit Log" },
      { href: "/features/usage", label: "Provider Usage" },
      { href: "/features/mobile", label: "Mobile Companion" }
    ]
  },
  {
    title: "Deploy",
    items: [
      { href: "/deployment/openleash-cloud", label: "OpenLeash Cloud" },
      { href: "/deployment/private-cloud", label: "Private Cloud" },
      { href: "/deployment/self-hosted", label: "Self-Hosted" }
    ]
  },
  {
    title: "Reference",
    items: [
      { href: "/reference/architecture", label: "Architecture" },
      { href: "/reference/api", label: "API Surfaces" },
      { href: "/reference/migrations", label: "Migrations" },
      { href: "/reference/troubleshooting", label: "Troubleshooting" }
    ]
  }
];

const setupCards = [
  {
    href: "/getting-started/local-mode",
    icon: Laptop,
    label: "Solo Dev",
    title: "Fully Local",
    copy: "The desktop app runs on one computer, hooks call the local API, and no account or dashboard is required.",
    bullets: ["No cloud dependency", "Optional local LLM key", "Works offline"]
  },
  {
    href: "/getting-started/personal-cloud",
    icon: Cloud,
    label: "Solo Dev",
    title: "OpenLeash Cloud",
    copy: "Personal hosted account sync and cloud coverage without sending solo users into the admin dashboard.",
    bullets: ["Sign up where you started", "Install desktop client", "Dashboard never appears"]
  },
  {
    href: "/getting-started/team-cloud",
    icon: Building2,
    label: "Org Admin",
    title: "Team Cloud",
    copy: "OpenLeash-hosted APIs and dashboard for companies that want managed identity, policy, audit, and deployment.",
    bullets: ["Work identity first", "Dashboard onboarding", "Managed team rollout"]
  },
  {
    href: "/getting-started/private-cloud",
    icon: LockKeyhole,
    label: "Org Admin",
    title: "Private Cloud",
    copy: "Customer-hosted APIs, dashboard, database, and identity configuration in a private cloud or on-prem environment.",
    bullets: ["Customer Postgres", "Customer identity provider", "Open-source core"]
  }
];

export function DocsLayout({ activePath, children }: { activePath: string; children: ReactNode }) {
  return (
    <main className="docsShell">
      <aside className="side">
        <a className="brand" href="/">
          <img className="mark" src="/openleash-icon.png" alt="" />
          <span>
            <strong>OpenLeash</strong>
            <em>Docs</em>
          </span>
        </a>
        <nav aria-label="Documentation">
          {navGroups.map((group) => (
            <section key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <a className={isActive(activePath, item.href) ? "active" : ""} href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </section>
          ))}
        </nav>
        <div className="sidePanel">
          <p>Need source, releases, or examples?</p>
          <a href={githubUrl}><Github size={15} /> OpenLeash on GitHub</a>
        </div>
      </aside>

      <section className="content">
        <header className="top">
          <a href={githubUrl}>GitHub</a>
          <a className="button" href={signInHref}>Open Cloud <ArrowRight size={15} /></a>
        </header>
        {children}
      </section>
    </main>
  );
}

export function HomePage() {
  return (
    <DocsLayout activePath="/">
      <Hero
        eyebrow="Start here"
        title="Understand OpenLeash before you install it."
        description="OpenLeash is a control plane for AI coding agents. It watches the risky moments, applies policy, asks for approval when judgment is needed, and keeps an audit trail for individuals and teams."
        primary={{ href: "/getting-started", label: "Choose your setup" }}
      />

      <section className="section">
        <SectionTitle title="What OpenLeash Does" text="AI agents can read files, run commands, edit code, call tools, and push changes. OpenLeash gives those actions a review layer without forcing developers through a proxy." />
        <div className="featureGrid">
          <Mini icon={<ShieldCheck />} title="Protect risky actions" text="Hold or block shell commands, destructive infrastructure changes, secret access, sensitive file reads, force pushes, and production deploys." />
          <Mini icon={<Bell />} title="Ask at the right time" text="Let normal work continue while pausing the moments that need a developer, admin, or security reviewer to decide." />
          <Mini icon={<ScrollText />} title="Keep evidence" text="Record the agent, user, project, action, decision, and policy context so security teams can understand what happened later." />
        </div>
      </section>

      <section className="section">
        <SectionTitle title="Four Real User Journeys" text="OpenLeash is not one install path. Pick the path that matches who you are and where policy should live." />
        <SetupGrid />
      </section>

      <section className="section split">
        <div>
          <SectionTitle title="The Core Runtime" text="Hooks always talk to the desktop local API first. Local mode can stay fully local; managed modes can forward to a cloud or private API when available." />
          <CodeBlock>{`Installed hooks -> Desktop local API
http://127.0.0.1:9317/v1/hooks/:agent/:event

Local mode:
desktop-client -> local evaluation

Managed modes:
desktop-client -> local API -> client-api`}</CodeBlock>
        </div>
        <RuntimeScreenshot />
      </section>
    </DocsLayout>
  );
}

export const pages: Record<string, DocPage> = {
  "getting-started": {
    slug: "getting-started",
    eyebrow: "Getting started",
    title: "Choose the right setup before typing commands.",
    description: "The fastest way to succeed with OpenLeash is to start from the correct product path. Solo local, solo cloud, team cloud, and private cloud have different onboarding surfaces.",
    body: (
      <>
        <section className="section first">
          <SetupGrid />
        </section>
        <section className="section">
          <SectionTitle title="Decision Guide" text="Use this when you are unsure which flow applies." />
          <DecisionTable rows={[
            ["I want everything on my laptop", "Local mode", "No account, no dashboard, optional local LLM key."],
            ["I am one person but want hosted sync", "Personal cloud", "Sign up in web/desktop/mobile; install desktop after sign-up."],
            ["I manage a company rollout", "Team cloud", "Use work identity, then finish onboarding in the dashboard."],
            ["My customer must host everything", "Private Cloud", "Deploy client-api, dashboard-api, dashboard-web, Postgres, and identity config."]
          ]} />
        </section>
      </>
    )
  },
  "getting-started/local-mode": {
    slug: "getting-started/local-mode",
    eyebrow: "Solo Dev",
    title: "Install OpenLeash in Local mode.",
    description: "Local mode is for one developer who wants protection without an account, hosted API, dashboard, or internet dependency.",
    body: (
      <>
        <section className="section first split">
          <div>
            <SectionTitle title="What Happens" text="The desktop client initializes local storage, starts a local API, installs hooks, and evaluates actions locally." />
            <StepList steps={[
              "Download and install OpenLeash Desktop.",
              "Choose Individual.",
              "Choose Local mode.",
              "Optionally paste your own OpenAI, Claude, Gemini, DeepSeek, or compatible LLM key.",
              "Install hooks for the local agents you use.",
              "Keep coding. The hook calls stay on 127.0.0.1 first."
            ]} />
          </div>
          <DesktopScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="LLM Keys In Local Mode" text="A model key is optional. If you add one, it is used for richer security evaluations. If you do not, deterministic fallback rules still protect obvious risky actions." />
          <CodeBlock>{`Desktop settings:
Provider: OpenAI / Claude / Gemini / DeepSeek compatible
API key: stored by the desktop client

Hooks call:
http://127.0.0.1:9317/v1/hooks/:agent/:event`}</CodeBlock>
        </section>
        <section className="section">
          <SectionTitle title="What You Do Not Need" text="Local mode intentionally avoids the operational pieces required by team deployments." />
          <Checklist items={["No OpenLeash account", "No dashboard", "No Postgres", "No Docker", "No Cloud Run", "No identity provider"]} />
        </section>
      </>
    )
  },
  "getting-started/personal-cloud": {
    slug: "getting-started/personal-cloud",
    eyebrow: "Solo Dev",
    title: "Use OpenLeash Cloud as a personal user.",
    description: "Personal cloud is hosted, but it is not the admin dashboard path. Solo users complete account creation where they start and then install the desktop client.",
    body: (
      <>
        <section className="section first split alt">
          <PersonalCloudScreenshot />
          <div>
            <SectionTitle title="The Rule" text="Solo developers never see the dashboard. The website, desktop app, or mobile app can start sign-up, but the flow finishes in that same surface." />
            <StepList steps={[
              "Start from the website, desktop client, or mobile app.",
              "Sign up with Google, GitHub, or email when enabled.",
              "Finish account creation in the same surface.",
              "Install the desktop client when prompted.",
              "The desktop local API forwards to OpenLeash Cloud only when configured and reachable."
            ]} />
          </div>
        </section>
        <section className="section">
          <Notice title="Do not send personal users to /dashboard" text="If a solo public-cloud flow opens the dashboard, the product flow is wrong. The dashboard is for organization admins and CISOs." />
        </section>
      </>
    )
  },
  "getting-started/team-cloud": {
    slug: "getting-started/team-cloud",
    eyebrow: "Org Admin",
    title: "Set up OpenLeash Cloud for a team.",
    description: "Team cloud is the managed SaaS path for organization admins. It uses the hosted dashboard for identity, users, policies, audit, usage, and deployment.",
    body: (
      <>
        <section className="section first split">
          <div>
            <SectionTitle title="Admin Journey" text="A company setup starts with work identity and finishes in the dashboard." />
            <StepList steps={[
              "Sign up with a work Google Workspace or Microsoft 365 / Entra ID account.",
              "OpenLeash derives or finds the organization workspace from the verified domain.",
              "Continue onboarding in the dashboard.",
              "Connect identity: Google Workspace, Okta, Microsoft Entra ID, Ping, or LDAP-style sync.",
              "Configure policies and rollout rules.",
              "Distribute the desktop client to employees."
            ]} />
          </div>
          <DashboardScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Employee Journey" text="Employees do not create the organization and do not choose security policy." />
          <Checklist items={["Employee installs or receives desktop client", "Employee signs in through company identity provider", "Policies sync from the organization", "Risky actions are held according to admin policy", "Approvals and audit show in the dashboard"]} />
        </section>
      </>
    )
  },
  "getting-started/private-cloud": {
    slug: "getting-started/private-cloud",
    eyebrow: "Org Admin",
    title: "Bootstrap a Private Cloud deployment.",
    description: "Private Cloud uses the same core product surfaces, but the customer hosts the APIs, dashboard, database, and identity integration.",
    body: (
      <>
        <section className="section first split">
          <div>
            <SectionTitle title="Bootstrap Flow" text="There is no marketing-site sign-up for Private Cloud. The customer starts from the installed dashboard." />
            <StepList steps={[
              "Install the Private Cloud stack.",
              "Open the customer-hosted dashboard.",
              "Create the first admin user with local credentials.",
              "Name the organization.",
              "Connect identity or configure local auth.",
              "Point desktop and mobile clients at the customer-hosted client-api."
            ]} />
          </div>
          <PrivateCloudScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Services" text="A minimal Private Cloud deployment needs these components." />
          <div className="featureGrid">
            <Mini title="client-api" text="Client-facing API for desktop hooks, evaluations, enrollment, mobile, and updates." />
            <Mini title="dashboard-api" text="Admin API for users, identity, policy, audit, usage, and deployment." />
            <Mini title="dashboard-web" text="Admin and CISO web app." />
            <Mini title="Postgres" text="Customer-owned database. Run migrations before upgrades." />
            <Mini title="Identity loader" text="Syncs Google Workspace, Okta, Entra ID, Ping, or LDAP-style providers." />
            <Mini title="Desktop client" text="Still receives hooks locally first, then forwards to customer-hosted APIs." />
          </div>
        </section>
      </>
    )
  },
  "features/desktop-client": featurePage("Desktop Client", "Installed tray app, local API, hook installer, local settings, and the surface employees actually live with day to day.", <DesktopScreenshot />, [
    ["Local API", "Hooks call 127.0.0.1:9317 first, even in managed deployments."],
    ["Hook installer", "Installs and updates integrations for supported local agents."],
    ["Personal settings", "Stores local mode settings and optional LLM provider keys."],
    ["Forwarding", "In cloud/private modes, forwards policy checks and events to the configured client-api."]
  ]),
  "features/approvals": featurePage("Approvals", "Approvals pause the moments where an agent needs human judgment before continuing.", <ApprovalScreenshot />, [
    ["Held actions", "Block command execution, file access, deployment, secret exposure, or branch operations until a decision is made."],
    ["Local first", "A local developer can approve from desktop. Managed teams can route decisions through organization policy."],
    ["Audit context", "The approval includes user, agent, project, tool, reason, policy, and timestamp."]
  ]),
  "features/policies": featurePage("Policies", "Policies describe what agents are allowed to do, what should be denied, and what requires approval.", <PolicyScreenshot />, [
    ["Default protections", "Start with protections for filesystem destruction, secrets, external sharing, force pushes, and infrastructure changes."],
    ["Team rules", "Admins can add rules for production systems, repositories, providers, and sensitive directories."],
    ["Mandatory controls", "CISO-managed policies can be enforced for employees and cannot be disabled locally."]
  ]),
  "features/secret-protection": featurePage("Secret Protection", "OpenLeash detects secret access, credential files, token-looking values, and sensitive staged content.", <SecretScreenshot />, [
    ["Credential file access", "Flag .env files, SSH keys, npm tokens, kubeconfigs, and cloud credential stores."],
    ["Prompt masking", "Mask or hold prompts that include keys, tokens, PII, PHI, or credentials."],
    ["Commit safety", "Require approval before committing staged content that appears to contain secrets."]
  ]),
  "features/prompt-compression": featurePage("Prompt Compression", "Reduce prompt size while preserving task intent, constraints, identifiers, code names, and important context.", <CompressionScreenshot />, [
    ["Cost control", "Lower token usage before sending context to model-backed checks."],
    ["Policy aware", "Compression can run alongside DLP and approval policies."],
    ["BYOK friendly", "Use customer-provided provider keys when teams choose managed plus their own LLM."]
  ]),
  "features/identity": featurePage("Identity & Users", "Identity connects human users, groups, roles, and devices to policy decisions.", <IdentityScreenshot />, [
    ["Providers", "Google Workspace, Microsoft Entra ID, Okta, Ping, and LDAP-style sync are the intended admin choices."],
    ["Provisioning", "Employees sign in through the configured provider and are provisioned automatically."],
    ["Roles", "Owners and admins manage policies, deployment, and audit. Employees follow organization policy."]
  ]),
  "features/audit-log": featurePage("Audit Log", "The audit log explains what the agent tried, what policy decided, and how people responded.", <AuditScreenshot />, [
    ["Event history", "Track prompts, tools, shell commands, file access, and decisions."],
    ["Decision reasons", "Show why an action was allowed, held, masked, or denied."],
    ["Investigation view", "Filter by user, agent, project, policy, event type, and time."]
  ]),
  "features/usage": featurePage("Provider Usage", "Usage visibility helps admins understand requests, token usage, and spend across connected model providers.", <UsageScreenshot />, [
    ["Provider connections", "Connect organization admin keys for OpenAI, Claude, Cursor, and other supported providers."],
    ["Budget context", "See requests, tokens, and cost trends by team or provider."],
    ["BYOK plans", "Bring your own model keys for AI-assisted checks and usage reporting."]
  ]),
  "features/mobile": featurePage("Mobile Companion", "The mobile app is an approval companion and a sign-up surface for cloud and private deployments.", <MobileScreenshot />, [
    ["Approvals", "Review held actions when away from the desk."],
    ["Sign-up surface", "Personal and org cloud sign-up can start from mobile."],
    ["Private Cloud", "Mobile points at the customer-hosted URL and signs in through the configured identity provider."]
  ]),
  "deployment/openleash-cloud": deploymentPage("OpenLeash Cloud", "The hosted SaaS deployment operated by OpenLeash.", `api.openleash.com              -> cloud-client-api
api.dashboard.openleash.com    -> cloud-dashboard-api
dashboard.openleash.com        -> cloud-dashboard-web
docs.openleash.com             -> docs-web
openleash.com                  -> main-web`, ["OpenLeash operates tenancy, billing, production credentials, abuse controls, and hosted release infrastructure.", "Public users install the same desktop client.", "Org admins use the hosted dashboard after work-identity sign-up."]),
  "deployment/private-cloud": deploymentPage("Private Cloud", "Customer-hosted managed runtime for one organization or private multi-tenant environment.", `desktop-client -> customer client-api
mobile-client  -> customer client-api
dashboard-web  -> customer dashboard-api
dashboard-api  -> customer Postgres
identity sync  -> customer identity provider`, ["The UX mirrors hosted dashboard onboarding.", "The customer controls network, database, identity, backups, upgrades, and logs.", "No OpenLeash Cloud SaaS adapters are required in the public core."]),
  "deployment/self-hosted": deploymentPage("Self-Hosted", "Download and run the open-source core yourself.", `npm run dev:mode:self-hosted

# Production checklist
Postgres ready
Run migrations
Deploy client-api
Deploy dashboard-api
Deploy dashboard-web
Configure identity
Distribute desktop-client`, ["Best for customers who want to manage their own runtime.", "Run migration tests before every upgrade.", "Keep production secrets in a secret manager or vault."]),
  "reference/architecture": referencePage("Architecture", "How the product surfaces fit together.", `Local mode:
agent hook -> desktop local API -> local evaluation

Managed modes:
agent hook -> desktop local API -> client-api -> policy/evaluation
dashboard-web -> dashboard-api -> Postgres

Private Cloud:
same public core, customer-hosted services`),
  "reference/api": referencePage("API Surfaces", "OpenLeash separates client-facing and dashboard/admin APIs.", `client-api:
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
  "reference/migrations": referencePage("Migrations", "Treat migrations as release-critical for all deployment modes.", `Test matrix:
1. Fresh local install
2. Old local install -> migrate -> current
3. Private Cloud Postgres old schema -> current
4. Public Cloud Postgres migration
5. Self-hosted manual upgrade

Rule:
Never require Postgres for Local mode.`),
  "reference/troubleshooting": referencePage("Troubleshooting", "Start from the symptom and the deployment mode.", `Desktop hook not firing:
- Check desktop app is running
- Check local API on 127.0.0.1:9317
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

export function RenderDocPage({ page, activePath }: { page: DocPage; activePath: string }) {
  return (
    <DocsLayout activePath={`/${activePath}`}>
      <Hero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      {page.body}
    </DocsLayout>
  );
}

function featurePage(title: string, description: string, screenshot: ReactNode, points: Array<[string, string]>): DocPage {
  const slug = `features/${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  return {
    slug,
    eyebrow: "Feature",
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
          <SectionTitle title="Where It Appears" text="The same feature shows up differently depending on whether you are a solo developer, an organization admin, or an employee." />
          <DecisionTable rows={[
            ["Solo local", "Desktop client", "Configure and review locally."],
            ["Solo cloud", "Desktop plus account surface", "Cloud sync without dashboard onboarding."],
            ["Team cloud", "Dashboard and desktop", "Admins configure policy; employees follow it."],
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
            <SectionTitle title="Deployment Shape" text={description} />
            <CodeBlock>{code}</CodeBlock>
          </div>
          <PrivateCloudScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Operator Notes" text="Keep these in mind before you release or upgrade." />
          <Checklist items={notes} />
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
          <a className="secondary" href="/features/desktop-client"><MonitorDown size={16} /> Explore features</a>
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

function SectionTitle({ title, text }: { title: string; text: string }) {
  return (
    <div className="sectionHead">
      <h2>{title}</h2>
      <p>{text}</p>
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

function DesktopScreenshot() {
  return (
    <div className="screenshot desktopShot">
      <div className="windowBar"><span /><span /><span /></div>
      <div className="shotTitle"><Laptop size={18} /> OpenLeash Desktop</div>
      <div className="modeRow"><button>Individual</button><button className="active">Local mode</button></div>
      <div className="field"><span>LLM provider</span><strong>Your key, stored locally</strong></div>
      <div className="field"><span>Hooks</span><strong>Claude Code, Cursor, Codex</strong></div>
      <div className="status good"><Check size={15} /> Local API listening on 127.0.0.1:9317</div>
    </div>
  );
}

function RuntimeScreenshot() {
  return (
    <div className="screenshot diagramShot">
      <div className="node"><TerminalSquare size={18} /> Agent hook</div>
      <div className="line" />
      <div className="node"><Laptop size={18} /> Desktop local API</div>
      <div className="line" />
      <div className="node"><Cloud size={18} /> Cloud or Private client-api</div>
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
        <span>Local API first</span>
        <span>Cloud sync when online</span>
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
      <div className="node"><MonitorDown size={18} /> desktop-client</div>
      <div className="line" />
      <div className="node"><Code2 size={18} /> client-api</div>
      <div className="node"><UsersRound size={18} /> dashboard-web</div>
      <div className="node"><ServerCog size={18} /> dashboard-api</div>
      <div className="node"><Database size={18} /> customer Postgres</div>
      <div className="node"><KeyRound size={18} /> customer IdP</div>
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
  return <CardShot icon={<WandSparkles />} title="Prompt transform" rows={["Compression enabled", "DLP checks enabled", "Model: BYOK provider"]} />;
}

function IdentityScreenshot() {
  return <CardShot icon={<UsersRound />} title="Identity sync" rows={["Google Workspace connected", "128 users synced", "14 groups mapped"]} />;
}

function AuditScreenshot() {
  return <CardShot icon={<FileSearch />} title="Audit event" rows={["Agent: Claude Code", "Action: file read", "Decision: approved"]} />;
}

function UsageScreenshot() {
  return <CardShot icon={<Gauge />} title="Provider usage" rows={["OpenAI: 1.2M tokens", "Claude: 842K tokens", "Budget: 64% used"]} />;
}

function MobileScreenshot() {
  return (
    <div className="phoneShot">
      <div className="phoneTop" />
      <div className="phoneCard"><Smartphone size={18} /><strong>Approval waiting</strong><p>Claude Code wants to read .env.production</p><button>Approve</button></div>
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
