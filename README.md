# MarketMind 🧠 

MarketMind is an AI-powered SaaS Digital Marketing Operating System (OS). It acts as your autonomous virtual marketing employee, helping you build campaigns, analyze performance, score leads, optimize SEO, and sync data across all major ad networks.

---

## 🚀 Key Features

*   📊 **Analytics Dashboard**: Cross-platform attribution modelling, real-time ROI tracking, conversion charts, and KPI performance overviews.
*   💬 **AI Marketing Assistant**: Multi-agent chat interface to plan strategies, create landing page outlines, write copy, or troubleshoot ad sets using natural language.
*   👥 **Lead Generation & CRM**: Smart lead capture tools, behavioral intent scoring, automated custom email flows, and contact enrichment pipelines.
*   🔍 **SEO Auditing & Optimizer**: Content brief generator, organic traffic trend charts, search engine keyword rankings, and competitor backlink scans.
*   🎯 **Ad Campaign Manager**: AI-driven copywriter, multi-channel builder (Google, Meta, LinkedIn), and real-time automated budget optimization.
*   🔌 **Platform Integrations**: Unified connectivity with CRM pipelines, analytic suites, search engines, and advertising APIs.

---

## 🛠 Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router & Server Component architecture)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Database & ORM**: [Prisma](https://www.prisma.io/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
*   **Visualizations**: [Recharts](https://recharts.org/)

---

## 📦 Getting Started

### Prerequisites

*   **Node.js** (v18.x or later)
*   **npm** or **bun**

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/marketmind.git
    cd marketmind
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory and add the configuration keys:
    ```env
    NEXTAUTH_SECRET=your_auth_secret_key
    NEXTAUTH_URL=http://localhost:3000
    DATABASE_URL=your_prisma_database_connection_string
    OPENAI_API_KEY=your_openai_api_token
    ```

4.  **Database Migration**:
    Initialize database schema via Prisma:
    ```bash
    npx prisma db push
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📁 File Structure

```text
├── public/                 # Static assets (images, logos)
├── src/
│   ├── app/                # Next.js App Router (Layouts, pages, route handlers)
│   │   ├── (auth)/         # Login, registration paths
│   │   ├── api/            # API backend integrations
│   │   ├── features/       # Product tour / Interactive features showcase
│   │   └── page.tsx        # Dynamic dashboard app shell switchboard
│   ├── components/         # Reusable React components
│   │   ├── campaigns/      # Ad builder components
│   │   ├── chat/           # AI chatbot interface
│   │   ├── dashboard/      # Metrics and chart dashboards
│   │   ├── leads/          # Lead profiling CRM components
│   │   ├── seo/            # SEO keyword tables
│   │   └── ui/             # shadcn primitives (buttons, tables, forms)
│   ├── store/              # Zustand global client-side state
│   ├── types/              # TypeScript types & interface declarations
│   └── lib/                # Config keys and client configurations
├── prisma/                 # Database schema models
└── tailwind.config.ts      # Styles configuration
```

---

## ⚙️ Build and Production

To build a standalone production bundle of the SaaS application:

```bash
npm run build
npm start
```
