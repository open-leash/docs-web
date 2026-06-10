import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  Cloud,
  Code2,
  Database,
  Download,
  Github,
  KeyRound,
  Laptop,
  LockKeyhole,
  MonitorDown,
  Network,
  ServerCog,
  ShieldCheck,
  Smartphone,
  TerminalSquare,
  UsersRound
} from "lucide-react";

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:9300";
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/open-leash";
const signInHref = `${dashboardUrl.replace(/\/+$/, "")}/auth/cloud/start`;

export const dynamic = "force-dynamic";

const nav = [
  { href: "#start", label: "Start Here" },
  { href: "#choose", label: "Choose A Path" },
  { href: "#local", label: "Local Mode" },
  { href: "#cloud", label: "OpenLeash Cloud" },
  { href: "#teams", label: "Teams" },
  { href: "#private", label: "Private Cloud" },
  { href: "#features", label: "Features" },
  { href: "#reference", label: "Reference" }
];

const flows = [
  {
    id: "local",
    label: "Solo Dev",
    title: "Local mode",
    copy: "Install the desktop client, add your LLM key if you want model-assisted checks, and keep every decision on your computer.",
    icon: Laptop,
    href: "#local",
    bullets: ["No account", "No dashboard", "Works without cloud"]
  },
  {
    id: "solo-cloud",
    label: "Solo Dev",
    title: "OpenLeash Cloud",
    copy: "Sign up from web, desktop, or mobile. Account creation finishes where you started, then you install the desktop client.",
    icon: Cloud,
    href: "#cloud",
    bullets: ["No dashboard", "Cloud sync", "Local API first"]
  },
  {
    id: "org-cloud",
    label: "Org Admin",
    title: "Team cloud",
    copy: "Use a work identity, create or join the company workspace, then finish identity, policy, users, and deployment in the dashboard.",
    icon: Building2,
    href: "#teams",
    bullets: ["Dashboard onboarding", "Identity sync", "Managed policy"]
  },
  {
    id: "private-cloud",
    label: "Org Admin",
    title: "Private Cloud",
    copy: "Run the open-source stack in your own AWS, GCP, Azure, or on-prem environment with your own identity provider.",
    icon: LockKeyhole,
    href: "#private",
    bullets: ["Customer hosted", "Open source core", "Same dashboard UX"]
  }
];

const features = [
  ["Approval gates", "Hold risky commands, file access, pushes, deploys, and secret-touching actions until a human approves."],
  ["Prompt protection", "Detect secrets, personal data, keys, tokens, and sensitive staged content before it leaves the machine."],
  ["Policy management", "Start with defaults, then add team-specific rules for production, infrastructure, data, and branch safety."],
  ["Identity and users", "Connect Google Workspace, Okta, Microsoft Entra ID, Ping, or LDAP-style sync for team rollouts."],
  ["Audit trail", "See who asked an agent to do what, what OpenLeash decided, and how the user or admin responded."],
  ["Usage visibility", "Connect provider keys and see requests, token usage, and spend by provider, user, or team."]
];

export default function DocsHome() {
  return (
    <main>
      <aside className="side">
        <a className="brand" href="#">
          <img className="mark" src="/openleash-icon.png" alt="" />
          <span>
            <strong>OpenLeash</strong>
            <em>Docs</em>
          </span>
        </a>
        <nav aria-label="Documentation sections">
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="sidePanel">
          <p>Need the code?</p>
          <a href={githubUrl}><Github size={15} /> Open source repos</a>
        </div>
      </aside>

      <section className="content">
        <header className="top">
          <a href={githubUrl}>GitHub</a>
          <a className="button" href={signInHref}>Open Cloud <ArrowRight size={15} /></a>
        </header>

        <section id="start" className="hero">
          <div className="eyebrow"><BookOpen size={15} /> docs.openleash.com</div>
          <h1>Install OpenLeash without guessing which path is yours.</h1>
          <p>
            OpenLeash can run fully local for one developer, managed in OpenLeash Cloud, or privately inside a company cloud. These docs start with the human flow, then give the commands when it is time to type.
          </p>
          <div className="heroActions">
            <a className="primary" href="#choose">Choose your setup <ArrowRight size={16} /></a>
            <a className="secondary" href="#features"><ShieldCheck size={16} /> See features</a>
          </div>
        </section>

        <section id="choose" className="section">
          <SectionTitle number="01" title="Choose A Path" text="Start with who you are and where OpenLeash should run. The same desktop client can work with local mode, OpenLeash Cloud, and Private Cloud." />
          <div className="flowGrid">
            {flows.map((flow) => {
              const Icon = flow.icon;
              return (
                <a className="flowCard" href={flow.href} key={flow.id}>
                  <span className="tag">{flow.label}</span>
                  <Icon size={22} />
                  <h3>{flow.title}</h3>
                  <p>{flow.copy}</p>
                  <ul>
                    {flow.bullets.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
                  </ul>
                </a>
              );
            })}
          </div>
        </section>

        <section id="local" className="section split">
          <div>
            <SectionTitle number="02" title="Solo Dev: Fully Local" text="Use this when you want OpenLeash on one computer with no account, no hosted API, and no dashboard." />
            <StepList steps={[
              "Download and install OpenLeash Desktop.",
              "Choose Individual, then Local mode.",
              "Add your own LLM key, or use deterministic local fallback.",
              "Install hooks for Claude Code, Cursor, Codex, Gemini CLI, or supported local agents.",
              "Keep working. Hooks call the desktop API at 127.0.0.1:9317 first."
            ]} />
            <CodeBlock>{`# Local desktop API used by installed hooks
http://127.0.0.1:9317/v1/hooks/:agent/:event

# Optional local model key, entered in the desktop app
OpenAI / Claude / Gemini / DeepSeek compatible key`}</CodeBlock>
          </div>
          <ScreenshotLocal />
        </section>

        <section id="cloud" className="section split alt">
          <ScreenshotCloudSolo />
          <div>
            <SectionTitle number="03" title="Solo Dev: OpenLeash Cloud" text="Use this when you want hosted account sync or cloud agent coverage, but you are still a personal user." />
            <Notice title="Important flow rule" text="Solo developers never go to the dashboard. Sign-up completes in the web, desktop, or mobile surface where it started." />
            <StepList steps={[
              "Start from the website, desktop app, or mobile app.",
              "Sign up with Google, GitHub, or email when enabled.",
              "After sign-up, install the desktop client.",
              "The desktop local API still receives hooks first, then forwards to OpenLeash Cloud when configured and reachable."
            ]} />
          </div>
        </section>

        <section id="teams" className="section">
          <SectionTitle number="04" title="Org Admin: OpenLeash Cloud" text="Use this when you are setting up OpenLeash for a company and want OpenLeash to operate the hosted backend." />
          <div className="wideShot">
            <ScreenshotDashboard />
            <div className="wideCopy">
              <h3>What happens after sign-up</h3>
              <StepList steps={[
                "Sign in with a work Google Workspace or Microsoft 365 / Entra ID account.",
                "OpenLeash derives or finds the company workspace from the verified domain.",
                "Continue onboarding in the dashboard.",
                "Connect identity, sync users, configure policies, then distribute the desktop client.",
                "Employees sign in through the organization identity provider. They do not run admin onboarding."
              ]} />
            </div>
          </div>
        </section>

        <section id="private" className="section split">
          <div>
            <SectionTitle number="05" title="Org Admin: Private Cloud" text="Use this when the customer runs OpenLeash in their own cloud, VPC, or on-prem environment." />
            <p className="lead">
              Private Cloud mirrors the hosted dashboard flow, but the customer owns the database, APIs, identity configuration, network, and update process.
            </p>
            <div className="deployGrid">
              <Mini title="client-api" text="Desktop, mobile, hooks, evaluations, enrollment, and updates." />
              <Mini title="dashboard-api" text="Admin API for identity, users, policies, audit, deployment, and usage." />
              <Mini title="dashboard-web" text="Admin and CISO dashboard." />
              <Mini title="Postgres" text="Customer-managed database and migrations." />
            </div>
            <CodeBlock>{`# Private Cloud development mode
npm run dev:mode:self-hosted

# Production shape
desktop-client -> customer client-api
dashboard-web  -> customer dashboard-api
dashboard-api  -> customer Postgres`}</CodeBlock>
          </div>
          <ScreenshotPrivate />
        </section>

        <section id="features" className="section">
          <SectionTitle number="06" title="Features" text="OpenLeash is built around the moments where an AI agent can change files, touch secrets, run commands, deploy infrastructure, or leak context." />
          <div className="featureGrid">
            {features.map(([title, text]) => <Mini key={title} title={title} text={text} />)}
          </div>
        </section>

        <section id="reference" className="section">
          <SectionTitle number="07" title="Technical Reference" text="A few anchors for operators and developers. Keep these stable when wiring clients, hooks, and deployment scripts." />
          <div className="referenceGrid">
            <Reference icon={<TerminalSquare />} title="Hook Direction" code={`Desktop local API first:
http://127.0.0.1:9317/v1/hooks/:agent/:event`} />
            <Reference icon={<ServerCog />} title="Public Cloud Services" code={`api.openleash.com              -> cloud-client-api
api.dashboard.openleash.com    -> cloud-dashboard-api
dashboard.openleash.com        -> cloud-dashboard-web`} />
            <Reference icon={<Database />} title="Database Safety" code={`Run migrations before releasing.
Test old install -> migrate -> current app.
Never require Postgres for Local mode.`} />
            <Reference icon={<Network />} title="Development Modes" code={`npm run dev:mode:standalone
npm run dev:mode:self-hosted
npm run dev:mode:cloud`} />
          </div>
        </section>
      </section>
    </main>
  );
}

function SectionTitle({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="sectionHead">
      <span>{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="steps">
      {steps.map((step) => <li key={step}>{step}</li>)}
    </ol>
  );
}

function CodeBlock({ children }: { children: string }) {
  return <pre className="codeBlock">{children}</pre>;
}

function Notice({ title, text }: { title: string; text: string }) {
  return <div className="notice"><strong>{title}</strong><p>{text}</p></div>;
}

function Mini({ title, text }: { title: string; text: string }) {
  return <article className="mini"><h3>{title}</h3><p>{text}</p></article>;
}

function Reference({ icon, title, code }: { icon: React.ReactNode; title: string; code: string }) {
  return <article className="reference"><span>{icon}</span><h3>{title}</h3><pre>{code}</pre></article>;
}

function ScreenshotLocal() {
  return (
    <div className="screenshot localShot" aria-label="OpenLeash Desktop Local mode screenshot">
      <div className="windowBar"><span /><span /><span /></div>
      <div className="shotTitle"><Laptop size={18} /> OpenLeash Desktop</div>
      <div className="modeRow"><button>Individual</button><button className="active">Local mode</button></div>
      <div className="field"><span>LLM provider</span><strong>Your key, stored locally</strong></div>
      <div className="field"><span>Hooks</span><strong>Claude Code, Cursor, Codex</strong></div>
      <div className="status good"><Check size={15} /> Local API listening on 127.0.0.1:9317</div>
    </div>
  );
}

function ScreenshotCloudSolo() {
  return (
    <div className="screenshot accountShot" aria-label="OpenLeash personal cloud sign-up screenshot">
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

function ScreenshotDashboard() {
  return (
    <div className="screenshot dashboardShot" aria-label="OpenLeash organization dashboard screenshot">
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

function ScreenshotPrivate() {
  return (
    <div className="screenshot privateShot" aria-label="Private Cloud deployment diagram screenshot">
      <div className="node"><MonitorDown size={18} /> desktop-client</div>
      <div className="arrowLine" />
      <div className="node"><Code2 size={18} /> client-api</div>
      <div className="node"><UsersRound size={18} /> dashboard-web</div>
      <div className="node"><ServerCog size={18} /> dashboard-api</div>
      <div className="node"><Database size={18} /> customer Postgres</div>
      <div className="node"><KeyRound size={18} /> customer IdP</div>
    </div>
  );
}
