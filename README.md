# IT Service Model Selector

Good Spending’s English-language decision tool for IT service delivery, asset ownership and benefit sharing.

**Live tool:** https://ukrsedo.github.io/it-service-model-selector/

## Decisions

- Service model: staff augmentation, IT outsourcing, managed services or As-a-Service.
- Ownership: separate ownership or a conditional customer/supplier unified-ownership candidate.
- Benefit sharing: gainsharing, revenue sharing, both, or establishing a measurement basis.
- Joint control: consider a JV only when shared asset control and ongoing investment decisions are needed, after comparing contractual governance.

Both parties investing does not automatically require a JV. Supplier reuse alone does not mandate customer ownership. Unknown inputs remain unknown.

## Running and publishing

The application is buildless HTML, CSS and JavaScript in `docs/`. Serve that directory with any static server. GitHub Pages publishes `main` → `/docs`. There are no runtime credentials, APIs, analytics or dependencies. Input stays in the page; users can download their results as JSON.

## Validation

With Node.js installed:

```sh
node check.cjs
node check-prt.cjs
node check-ownership.cjs
node check-benefits.cjs
```

`check-ownership.cjs` also runs the UI harness, including recalculation, resetting, escaping and export checks.

## Limits and theory

This prototype applies transparent screening rules. It does not calculate an economic optimum, investment responses, prices or sharing percentages. Service-model labels and benefit-sharing rules are practical commercial guidance; ownership reasoning draws on the Grossman–Hart–Moore property-rights approach.

- Hart and Moore (1990), *Property Rights and the Nature of the Firm*: https://dash.harvard.edu/entities/publication/73120378-84b8-6bd4-e053-0100007fdf3b
- Segal and Whinston, *Property Rights*: https://web.stanford.edu/~isegal/prights.pdf
