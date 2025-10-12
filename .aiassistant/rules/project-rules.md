---
apply: always
---

# Project Guidelines

Before making large amounts of changes, ask clarifying questions. For example, propose an approach and confirm with the
user if it is the correct approach before proceeding.

## Project Description

This project is an Angular web application that provides a calculation interface for use with a crafting and economic
simulation game called Eco.

## Version Info

- Angular: 20.x
- TypeScript: 5.8.x
- Tailwind CSS: 3.x
- Angular Material: 20.x

## Code Style

### TypeScript Conventions

- Use TypeScript strict mode (enabled in tsconfig.json)
- Use explicit return types on public functions and methods
- Prefer `readonly` for properties that don't change
- Use type inference where obvious, explicit types for public APIs
- Avoid `any` type; use `unknown` when type is truly unknown
- Enable and respect all strict compiler flags

### Angular-Specific Conventions

- Use standalone components (Angular 19+)
- Prefer signals for reactive state management
- Use Angular signals for any elements that may change based on user input
- Use `inject()` function over constructor injection where appropriate
- Implement `OnPush` change detection strategy by default for performance
- Use Angular Material components consistently
- Follow the component/service/model folder structure

### Component Structure

- Keep components focused and single-purpose
- Extract reusable logic into services
- Use reactive forms over template-driven forms
- Store component state in signals
- Keep templates simple; move complex logic to component class
- Use Tailwind 3 classes wherever possible over scss files

### RxJS Best Practices

- Unsubscribe from observables to prevent memory leaks
- Prefer async pipe in templates for automatic subscription management
- Use RxJS operators for complex data transformations
- Use `takeUntilDestroyed()` or `DestroyRef` for automatic cleanup

### Testing

- Write unit tests for all services
- Test component logic with Jasmine/Karma
- Aim for meaningful test coverage, not just high percentages
- Mock external dependencies in tests
- Test files should be co-located with source files (*.spec.ts)

### File Naming Conventions

- Components: `*.component.ts`
- Services: `*.service.ts`
- Models: `*.ts` (in model directory)
- Specs: `*.spec.ts`
- Use kebab-case for file names (e.g., `my-component.component.ts`)

### Accessibility

- Use semantic HTML elements
- Provide ARIA labels where needed
- Ensure keyboard navigation works
- Leverage Angular Material's built-in accessibility features

## Commands

### Development

- Build: `npm run build`
- Start dev server: `npm run start`
- Test: `npm run test`
- Watch mode (auto-rebuild): `npm run watch`

### Angular CLI Code Generation

- Generate component: `ng generate component <name>` or `ng g c <name>`
- Generate service: `ng generate service <name>` or `ng g s <name>`
- Generate service in specific folder: `ng g s <folder>/<name>`
- Generate component in specific folder: `ng g c <folder>/<name>`

Note: All generated components are standalone by default in Angular 19+
