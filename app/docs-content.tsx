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
      { href: "/getting-started", label: "Pick Your Path" },
      { href: "/getting-started/individual", label: "I'm an Individual" },
      { href: "/getting-started/organization", label: "I'm an Organization" },
      { href: "/getting-started/local-mode", label: "Local Mode" },
      { href: "/getting-started/openleash-cloud", label: "OpenLeash Cloud" },
      { href: "/getting-started/private-cloud", label: "Private Cloud" }
    ]
  },
  {
    title: "Clients",
    items: [
      { href: "/clients/desktop-client", label: "Desktop Client" },
      { href: "/clients/mobile-client", label: "Mobile Client" },
      { href: "/clients/dashboard", label: "Dashboard for CISOs" }
    ]
  },
  {
    title: "Protections",
    items: [
      { href: "/features/action-protection", label: "Action Protection" },
      { href: "/features/secret-protection", label: "Secret Protection" },
      { href: "/features/policies", label: "Policies" },
      { href: "/features/prompt-compression", label: "Prompt Compression" }
    ]
  },
  {
    title: "Admin & Deploy",
    items: [
      { href: "/features/identity", label: "Identity & Users" },
      { href: "/features/audit-log", label: "Audit Log" },
      { href: "/features/usage", label: "Provider Usage" },
      { href: "/deployment/openleash-cloud", label: "Cloud Rollout" },
      { href: "/deployment/private-cloud", label: "Private Cloud Rollout" },
      { href: "/deployment/self-hosted", label: "Self-Hosted Ops" }
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
    label: "Individual",
    title: "Local Mode",
    copy: "I want protection on my own machine, no account, no dashboard.",
    bullets: ["Works offline", "Desktop client only", "Optional local model key"]
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
    copy: "Start with the desktop client. Pick Local Mode for no cloud, or OpenLeash Cloud for a personal hosted account.",
    bullets: ["No company setup", "No CISO dashboard", "Local or personal cloud"]
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
        title="AI agents move fast. OpenLeash adds judgment."
        description="OpenLeash sits beside your agents and watches the moments that matter: secrets, shell commands, file access, deploys, and other risky actions. You start simple, then add cloud, teams, identity, and audit only when you need them 🙂"
        primary={{ href: "/getting-started", label: "Choose your setup" }}
      />

      <section className="section">
        <SectionTitle title="The Plain Version" text="Your agent asks to do something. OpenLeash checks the risk. Safe work continues; sensitive work gets blocked, masked, or sent for approval." />
        <div className="featureGrid">
          <Mini icon={<ShieldCheck />} title="Protect actions" text="Hold destructive commands, production deploys, force pushes, and sensitive file reads." />
          <Mini icon={<KeyRound />} title="Protect secrets" text="Catch keys, tokens, .env files, kubeconfigs, and other sensitive context before they leak." />
          <Mini icon={<ScrollText />} title="Remember what happened" text="Keep a readable trail of the agent, user, action, decision, and reason." />
        </div>
      </section>

      <section className="section">
        <SectionTitle title="Start From Who You Are" text="No maze. Pick the card that sounds like you." />
        <SetupGrid />
      </section>

      <section className="section split">
        <div>
          <SectionTitle title="One Idea To Remember" text="Hooks call the desktop client first. That keeps Local mode local, and lets cloud modes keep working through the same client." />
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
    title: "First, tell us who you are.",
    description: "The docs get easier when the path starts with you. Individuals get a short setup. Organizations get identity, policy, audit, and rollout guidance.",
    body: (
      <>
        <section className="section first">
          <JourneyStrip steps={["Pick audience", "Pick mode", "Install client", "Configure protections"]} active={0} />
          <AudienceGrid />
        </section>
        <section className="section">
          <SectionTitle title="Already Know The Mode?" text="OpenLeash has three modes: Local Mode, OpenLeash Cloud, and Private Cloud." />
          <SetupGrid />
        </section>
        <section className="section">
          <SectionTitle title="Quick Decision" text="Read this like a normal person in a hurry." />
          <DecisionTable rows={[
            ["Just me, no cloud", "Local Mode", "Install the desktop client. No account. No dashboard."],
            ["Just me, with sync", "OpenLeash Cloud", "Create a personal account where you started. Still no dashboard."],
            ["My company", "OpenLeash Cloud", "Use work identity, then configure users and policy in the dashboard."],
            ["My company hosts it", "Private Cloud", "Run the public core in your own environment."]
          ]} />
        </section>
        <section className="section">
          <SectionTitle title="Next Step" text="Choose the full journey that matches you." />
          <NextStepCards cards={[
            ["I'm an individual", "/getting-started/individual", "Install desktop, choose Local Mode or personal cloud, and protect your own agents."],
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
    description: "Start with the desktop client. Choose Local Mode if you want everything on your machine, or OpenLeash Cloud if you want a personal hosted account.",
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Install desktop", "Choose mode", "Install hooks", "Done"]} active={0} />
            <SectionTitle title="Your Simple Path" text="You are not setting policy for a company. You are protecting your own agents." />
            <StepList steps={[
              "Install the desktop client.",
              "Choose Individual.",
              "Pick Local Mode or OpenLeash Cloud.",
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
          <SectionTitle title="Pick Your Individual Mode" text="Both paths start in the desktop client. Pick the one that fits how you want OpenLeash to run." />
          <NextStepCards cards={[
            ["Local Mode", "/getting-started/local-mode", "No account, no hosted API, no dashboard. Everything starts and stays on your computer."],
            ["OpenLeash Cloud", "/getting-started/openleash-cloud", "Personal hosted account and sync, while still keeping solo users out of the dashboard."]
          ]} />
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
    eyebrow: "Local Mode",
    title: "One computer. No cloud required.",
    description: "Local Mode is for an individual who wants protection with no account, no hosted API, no dashboard, and no internet dependency.",
    body: (
      <>
        <section className="section first split">
          <div>
            <JourneyStrip steps={["Install desktop", "Choose Local Mode", "Add optional key", "Install hooks", "Protected"]} active={1} />
            <SectionTitle title="What Happens" text="The desktop client starts a local API and installs hooks. Agent events stay on your machine first." />
            <StepList steps={[
              "Install the desktop client.",
              "Choose Individual.",
              "Choose Local Mode.",
              "Optionally add your own model key.",
              "Install agent hooks.",
              "Keep coding."
            ]} />
          </div>
          <DesktopScreenshot />
        </section>
        <section className="section">
          <SectionTitle title="Model Keys" text="A model key is optional. Add one for richer checks; skip it for deterministic local rules." />
          <CodeBlock>{`Desktop settings:
Provider: OpenAI / Claude / Gemini / DeepSeek compatible
API key: stored by the desktop client

Hooks call:
http://127.0.0.1:9317/v1/hooks/:agent/:event`}</CodeBlock>
        </section>
        <section className="section">
          <SectionTitle title="What You Do Not Need" text="This is the lightest path." />
          <Checklist items={["No OpenLeash account", "No dashboard", "No Postgres", "No Docker", "No Cloud Run", "No identity provider"]} />
        </section>
        <section className="section">
          <SectionTitle title="Finish Line" text="You are done when the desktop client is running, hooks are installed, and the local API is listening." />
          <NextStepCards cards={[
            ["Understand the desktop client", "/clients/desktop-client", "See what the tray app owns and how hooks reach it."],
            ["Troubleshooting", "/reference/troubleshooting", "Use this if hooks are not firing or the local API is not reachable."]
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
            ["Desktop client", "/clients/desktop-client", "Install hooks and understand the local-first runtime."],
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
            <Mini title="Clients" text="Desktop still receives hooks locally first, then forwards to the customer API." />
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
  "clients/desktop-client": featurePage("Desktop Client", "The installed app that agents talk to first. It owns the tray, local API, hook installer, and local settings.", <DesktopScreenshot />, [
    ["Local API", "Hooks call 127.0.0.1:9317 first, even in managed deployments."],
    ["Hook installer", "Installs integrations for supported local agents."],
    ["Settings", "Stores Local Mode settings and optional model keys."],
    ["Forwarding", "Cloud and Private Cloud modes forward to the configured API when reachable."]
  ], "Client", "clients/desktop-client"),
  "clients/mobile-client": featurePage("Mobile Client", "The approval companion for people who need to decide away from the desk.", <MobileScreenshot />, [
    ["Approvals", "Review held actions from your phone."],
    ["Activity", "See the recent decisions that need your attention."],
    ["Private Cloud", "Point mobile at the customer API URL and sign in with company identity."]
  ], "Client", "clients/mobile-client"),
  "clients/dashboard": featurePage("Dashboard for CISOs", "The admin surface for organizations. Individuals do not need it.", <DashboardScreenshot />, [
    ["Identity", "Connect users, groups, roles, and devices."],
    ["Policy", "Set the rules employees inherit."],
    ["Audit", "Answer who did what, when, and why."],
    ["Rollout", "Issue deployment tokens and track protected endpoints."]
  ], "Client", "clients/dashboard"),
  "features/action-protection": featurePage("Action Protection", "Approvals pause the moments where an agent needs human judgment before continuing.", <ApprovalScreenshot />, [
    ["Held actions", "Pause commands, file access, deploys, secret exposure, and branch operations."],
    ["Local first", "Individuals can decide locally. Teams can route decisions through policy."],
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
  "features/prompt-compression": featurePage("Prompt Compression", "Shrink large prompts while keeping task intent and important context.", <CompressionScreenshot />, [
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
3. Install hooks and start protection.

Organization:
1. Admin signs in with work identity.
2. Dashboard opens setup.
3. Configure identity, roles, policies, approvals, and deployment tokens.
4. Deploy desktop clients.
5. Employees sign in and inherit dashboard-managed configuration.`, ["No customer infrastructure is required for the hosted path.", "Do not expose implementation service names or internal hostnames in customer-facing rollout instructions.", "Admins configure the organization from the dashboard; employees install or receive the desktop and mobile clients."]),
  "deployment/private-cloud": deploymentPage("Private Cloud", "Customer-hosted rollout for organizations.", `Admin bootstrap:
1. Open the customer-hosted dashboard.
2. Enter the organization name.
3. Save the API URL used by desktop and mobile.
4. Connect identity.
5. Configure policies, approvals, audit, usage, and updates.
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
4. Configure policies and provider keys.
5. Issue deployment tokens.
6. Roll out clients.

Client bootstrap:
desktop: Organization -> Private Cloud -> your managed API URL -> sign in -> install hooks
mobile:  Custom API URL -> sign in -> register device -> approve held actions`, ["Self-hosted is the operator-run form of Private Cloud, not a separate product mode.", "Document services, secrets, ingress, migration jobs, and backups.", "Keep Local Mode free of Postgres and dashboard requirements."]),
  "reference/architecture": referencePage("Architecture", "The shortest useful map.", `Local Mode:
agent hook -> desktop local API -> local evaluation

Cloud and Private Cloud:
agent hook -> desktop local API -> client-api -> policy/evaluation
dashboard-web -> dashboard-api -> Postgres

Private Cloud:
same public core, customer-hosted services`),
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
  "reference/migrations": referencePage("Migrations", "Migrations matter in managed modes; Local Mode must stay Postgres-free.", `Test matrix:
1. Fresh local install
2. Old local install -> migrate -> current
3. Private Cloud Postgres old schema -> current
4. Public Cloud Postgres migration
5. Self-hosted manual upgrade

Rule:
Never require Postgres for Local mode.`),
  "reference/troubleshooting": referencePage("Troubleshooting", "Start with the symptom, then the mode.", `Desktop hook not firing:
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

pages["getting-started/personal-cloud"] = pages["getting-started/openleash-cloud"];
pages["getting-started/team-cloud"] = pages["getting-started/openleash-cloud"];
pages["features/desktop-client"] = pages["clients/desktop-client"];
pages["features/mobile"] = pages["clients/mobile-client"];
pages["features/approvals"] = pages["features/action-protection"];

export function RenderDocPage({ page, activePath }: { page: DocPage; activePath: string }) {
  return (
    <DocsLayout activePath={`/${activePath}`}>
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
      <div className="field"><span>Hooks</span><strong>Claude Code, Codex, OpenClaw</strong></div>
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
      <div className="node"><Cloud size={18} /> Cloud or Private managed API</div>
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
  return <CardShot icon={<WandSparkles />} title="Prompt transform" rows={["Compression enabled", "DLP checks enabled", "Model: BYOK provider"]} />;
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
