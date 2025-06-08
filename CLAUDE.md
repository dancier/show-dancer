# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run start` - Start development server with SSL at https://localhost:4200 (required for backend communication)
- `npm run start:http` - Start development server without SSL at http://localhost:4200 (used for E2E testing)
- `npm run build` - Build the project for production
- `npm run watch` - Build in watch mode for development

### Testing & Quality

- `npm test` - Run unit tests with Jest
- `npm run lint -- --fix` - Run ESLint on TypeScript and HTML files with autofix on
- `npx playwright test` - Run Playwright E2E tests
- `npx playwright test --reporter=line` - Run Playwright E2E tests with line reporter
- `npx playwright test --ui` - Run Playwright tests in interactive UI mode
- `npx playwright test --debug` - Run Playwright tests in debug mode
- Always use the playwright line reporter for E2E tests
- Individual test files can be run with Jest by specifying the file path
- Run the linter after making modifications to TypeScript or HTML files

#### Test Naming Conventions

- Test descriptions use present tense without "should" (e.g., "handles page load gracefully" not "should handle page load gracefully")

#### E2E Testing Architecture

- Tests located in `/tests` directory following Playwright best practices
- Page Object Model pattern used for maintainable test code
- Base page classes provide common functionality across page objects
- Tests run against HTTP development server (no SSL needed for mocked tests)
- Chromium-only testing for development efficiency
- Mock data centralized in `/tests/fixtures` for consistent test scenarios

### Code Quality

- ESLint and Prettier run automatically on commit via Husky pre-commit hooks
- All code is automatically formatted and linted before commits

## Architecture

### Frontend Framework

Angular 19 application using standalone components with OnPush change detection by default. The app uses:

- Angular Material for UI components
- Tailwind CSS for styling
- RxJS for reactive programming
- Jest for unit testing
- different solutions for state management (the developer isn't sure which one is fitting / the best for the project), including StateAdapt and @ngrx/component-store

### Module Structure

Feature-based architecture with clear separation:

- `src/app/home/` - Landing pages, authentication, static content
- `src/app/profile/` - User profile management and setup workflows
- `src/app/chat/` - Real-time messaging functionality
- `src/app/recommendation/` - User matching and recommendations
- `src/app/registration/` - Account creation and verification flows
- `src/app/shared/` - Reusable components, services, and utilities

### Component Architecture

Each feature module follows the pattern:

- `feature/` - Smart components that handle business logic
- `ui/` - Dumb/presentation components
- `data-access/` - Services for HTTP calls and state management
- `util/` - Helper functions, guards, pipes, and types

### Development Patterns

- All components use OnPush change detection for performance
- Inputs/Outputs use the Angular ìnput()/output() method instead of the @Input()/@Output() decorator
- Components use signals where useful and possible, e.g. to provide changing data to the template instead of using a the AsyncPipe
- Forms are typed using NonNullableFormBuilder
- Environment variables accessed via EnvironmentService (not direct imports)
- Standalone components are the default (configured in angular.json)
- SSL development server required for backend API communication

### Backend Integration

- Development connects to https://test-dancer.dancier.net backend
- Uses proxy configuration for API calls
- Authentication handled via cookies with credentials
- Event logging service for user analytics
