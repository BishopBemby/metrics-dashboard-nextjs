This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Folder Structure:
metrics-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Providers (QueryClientProvider) go here
│   │   ├── page.tsx            ← Dashboard home
│   │   └── providers.tsx       ← 'use client' wrapper for React Query
│   ├── components/
│   │   ├── ChartWidget/
│   │   │   ├── ChartWidget.tsx
│   │   │   ├── ChartWidget.test.tsx   ← RTL tests (US-3 AC)
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   └── PieChart.tsx
│   │   └── MetricCard/
│   │       ├── MetricCard.tsx
│   │       └── MetricCard.test.tsx
│   ├── hooks/
│   │   ├── useMetricsFeed.ts          ← React Query useQuery wrapper
│   │   └── useMetricsFeed.test.ts     ← hook tests with renderHook
│   ├── lib/
│   │   └── mockMetricsFeed.ts
│   ├── types/
│   │   └── metrics.ts                 ← US-1 interfaces and types
├── e2e/
│   └── dashboard.spec.ts              ← Playwright E2E test
├── jest.config.ts
├── jest.setup.ts
├── playwright.config.ts
└── package.json
