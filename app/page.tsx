import { ArrowRight, BookOpen, CheckCircle2, Code2, Github, KeyRound, LockKeyhole, MonitorDown, ShieldCheck, TerminalSquare } from "lucide-react";

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:9300";
const signInHref = `${dashboardUrl.replace(/\/+$/, "")}/auth/cloud/start`;
const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/openleash/openleash";

export const dynamic = "force-dynamic";

const nav = [
  { href: "#quickstart", label: "Quickstart" },
  { href: "#concepts", label: "Concepts" },
  { href: "#policies", label: "Policies" },
  { href: "#deploy", label: "Deploy" }
];

export default function DocsHome() {
  return (
    <main>
      <aside className="side">
        <a className="brand" href="#">
          <img className="mark" src="/openleash-icon.png" alt="" />
          <strong>OpenLeash</strong>
          <em>Docs</em>
        </a>
        <nav>
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="sideCta" href={githubUrl}><Github size={16} /> GitHub</a>
      </aside>

      <section className="content">
        <header className="top">
          <div />
          <div className="topLinks">
            <a href={githubUrl}>GitHub</a>
            <a className="button" href={signInHref}>Sign in <ArrowRight size={15} /></a>
          </div>
        </header>

        <section className="hero">
          <div className="eyebrow"><BookOpen size={16} /> docs.openleash.com</div>
          <h1>Build with the open-source control plane for AI agents.</h1>
          <p>Install OpenLeash, connect local coding assistants, write guardrails, and ship a dashboard your security team can trust.</p>
          <div className="actions">
            <a className="primary" href="#quickstart">Start quickstart <ArrowRight size={16} /></a>
            <a className="secondary" href={githubUrl}><Github size={16} /> View source</a>
          </div>
        </section>

        <section id="quickstart" className="section">
          <div className="sectionHead">
            <span>01</span>
            <div>
              <h2>Quickstart</h2>
              <p>Run the client, point it at your OpenLeash API, and install hooks for supported agents.</p>
            </div>
          </div>
          <div className="codeBlock">
            <pre>{`npm run desktop-cli -- configure --token <token> --api-url http://127.0.0.1:9317
npm run desktop-cli -- install-hooks --all
npm run desktop-client`}</pre>
          </div>
          <div className="cards">
            <Card icon={<TerminalSquare />} title="Hook based" text="OpenLeash observes agent lifecycle events directly. No proxy or certificate gymnastics." />
            <Card icon={<ShieldCheck />} title="Policy first" text="Every action can be allowed, blocked, masked, or held for human approval." />
            <Card icon={<Github />} title="Open source" text="Run the core locally, inspect the code, and contribute rules or connectors." />
          </div>
        </section>

        <section id="concepts" className="section">
          <div className="sectionHead">
            <span>02</span>
            <div>
              <h2>Core concepts</h2>
              <p>The product is small on purpose: agents emit events, OpenLeash evaluates context, and users approve the moments that need judgment.</p>
            </div>
          </div>
          <div className="conceptGrid">
            <Concept title="Agent runtime" text="Claude Code, Cursor, Codex, Gemini CLI, or a custom runner installed on a developer machine." />
            <Concept title="Conversation event" text="Prompt, tool call, file read, shell command, edit, or model response captured by a local hook." />
            <Concept title="Evaluation" text="The policy decision produced from the event plus recent session context." />
            <Concept title="Approval" text="A held action that needs the user or admin to choose before the agent continues." />
          </div>
        </section>

        <section id="policies" className="section">
          <div className="sectionHead">
            <span>03</span>
            <div>
              <h2>Policies</h2>
              <p>Start with default protections, then add rules for your codebase, environments, and data boundaries.</p>
            </div>
          </div>
          <div className="policyExample">
            <pre>{`name: production-destructive-actions
action: hold
match:
  shell:
    - "kubectl delete * production"
    - "terraform destroy *"
    - "git push --force origin main"
notify:
  - mobile
  - dashboard`}</pre>
          </div>
        </section>

        <section id="deploy" className="section">
          <div className="sectionHead">
            <span>04</span>
            <div>
              <h2>Deployment</h2>
              <p>Use the same docs for personal workspaces, cloud tenants, and private enterprise installs.</p>
            </div>
          </div>
          <div className="cards">
            <Card icon={<KeyRound />} title="Personal" text="Google sign-in creates a personal dashboard and a token for your machine." />
            <Card icon={<MonitorDown />} title="Team cloud" text="Company domains route to tenant dashboards with identity, users, and deployment." />
            <Card icon={<LockKeyhole />} title="Private" text="Run API, dashboard, database, and identity loader in your own GCP or VPC." />
          </div>
        </section>
      </section>
    </main>
  );
}

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="card"><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>;
}

function Concept({ title, text }: { title: string; text: string }) {
  return <article><CheckCircle2 size={18} /><div><h3>{title}</h3><p>{text}</p></div></article>;
}
