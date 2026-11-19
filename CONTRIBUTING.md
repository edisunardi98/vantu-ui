# Contributing to Vantu UI

Thanks for helping! A few things to know first.

## Report a bug

[Open a bug report](https://github.com/edisunardi98/vantu-ui/issues/new?template=bug_report.yml) with:

- the item (e.g. Date Picker) and what you expected
- your setup: React version, framework (Next.js, Vite, …), browser
- a minimal snippet or a screenshot if you can

## Request a component

[Suggest an item](https://github.com/edisunardi98/vantu-ui/issues/new?template=component_request.yml). Links to a reference (an app, a Dribbble shot, a video) help a lot.

## Pull requests

1. Fork the repo and create a branch from `main`.
2. `npm install`, then `npm run dev` to work on the docs site at http://localhost:3000.
3. Follow [Adding a component](./README.md#adding-a-component): the component file, its examples and its registry entry.
4. Run `npm run typecheck` and `npm run build` before opening the PR.

Keep each component in one file, use the tokens from `src/styles/theme.css` instead of raw values, and build interactive parts on React Aria so keyboard and screen-reader support come for free.

## Questions

Ask in [Discussions](https://github.com/edisunardi98/vantu-ui/discussions).
