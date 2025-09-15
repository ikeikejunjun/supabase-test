# Supabase Test - Vue 3 TODO Application

This is a Vue 3 + TypeScript + Vite application with Supabase backend that implements a TODO list with user authentication. The application includes login functionality and CRUD operations for TODOs.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Setup
- Node.js version 20.19.0+ or 22.12.0+ is required (verified: v20.19.5 works)
- npm 10.8.2+ (verified working)

### Bootstrap, Build, and Test Commands
- `npm install` -- installs dependencies in ~19 seconds (clean install). NEVER CANCEL.
- `npm run type-check` -- runs TypeScript type checking in ~5 seconds. NEVER CANCEL.
- `npm run build` -- builds for production in ~5 seconds. NEVER CANCEL. Set timeout to 15+ minutes for safety.
- `npm run build-only` -- builds without type checking in ~3 seconds. NEVER CANCEL.
- `npm run dev` -- starts development server in ~1 second. Runs on http://localhost:5173. NEVER CANCEL.
- `npm run preview` -- serves built application in ~1 second. Runs on http://localhost:4173. NEVER CANCEL.

### Build and Development Process
1. Always run `npm install` first after cloning
2. For development: `npm run dev` (starts immediately, serves on port 5173)
3. For production builds: `npm run build` (includes type checking and build)
4. For testing builds: `npm run preview` (serves built files on port 4173)

**TIMING EXPECTATIONS:**
- npm install: ~19 seconds (clean), ~8 seconds (incremental) - NEVER CANCEL
- Type checking: ~5 seconds - NEVER CANCEL  
- Production build: ~5 seconds - NEVER CANCEL
- Dev server startup: ~1 second - NEVER CANCEL
- All commands are very fast, but set timeouts to 15+ minutes to be safe

## Environment Configuration

**CRITICAL**: The application requires Supabase environment variables to function:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Create a `.env.local` file in the project root:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Without these variables, the application will show "supabaseUrl is required" errors in the console.

## Validation and Testing

### Manual Validation Requirements
Always manually validate application functionality after making changes:

1. **Start the development server**: `npm run dev`
2. **Test basic navigation**: Visit http://localhost:5173 and verify:
   - Home page loads with Vue welcome content
   - Navigation works (Home, Login, About links)
   - No console errors (except Supabase connection errors if env vars not set)

3. **Test key application flows**:
   - Login page (`/login`) - should show email/password form with Japanese text "ログイン"
   - TODO page (`/todos`) - should show "あなたのTODO一覧" and add TODO form
   - About page (`/about`) loads correctly

4. **With proper Supabase configuration**:
   - Test user registration/login flow
   - Test adding new TODOs
   - Test marking TODOs as complete
   - Verify TODOs persist and load correctly

### Build Validation
- Always run `npm run build` after making changes
- Verify no TypeScript errors during type checking
- Check build output in `dist/` directory
- Test with `npm run preview` to ensure built application works

## Project Structure and Key Files

### Key Application Files
- `src/main.ts` - Application entry point
- `src/App.vue` - Root component with navigation and Supabase session check
- `src/router/index.ts` - Vue Router configuration with routes for /, /login, /about, /todos
- `src/lib/supabase.ts` - Supabase client configuration (requires env vars)

### Views (src/views/)
- `HomeView.vue` - Welcome page with Vue documentation links
- `LoginView.vue` - Login form with email/password authentication
- `TodoView.vue` - TODO list management (CRUD operations)
- `AboutView.vue` - About page

### State Management
- `src/stores/counter.ts` - Pinia store example (counter)
- Authentication state managed through Supabase client

### Configuration Files
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration with Vue plugin and path aliases
- `tsconfig.json` - TypeScript project references
- `tsconfig.app.json` - Application TypeScript config
- `tsconfig.node.json` - Node.js TypeScript config

## Dependencies and Technology Stack

### Core Dependencies
- Vue 3.5.18 (Composition API)
- TypeScript 5.8.0
- Vite 7.0.6 (build tool)
- Vue Router 4.5.1 (routing)
- Pinia 3.0.3 (state management)
- @supabase/supabase-js 2.53.0 (backend)

### Development Dependencies
- vue-tsc 3.0.4 (TypeScript checking)
- @vitejs/plugin-vue 6.0.1 (Vue plugin for Vite)
- npm-run-all2 8.0.4 (parallel script execution)
- vite-plugin-vue-devtools 8.0.0 (Vue DevTools)

## Common Tasks and Navigation

### Repository Root Structure
```
.
├── README.md
├── package.json
├── package-lock.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── env.d.ts
├── .vscode/
│   └── extensions.json (recommends Vue.volar)
├── public/
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── assets/
│   ├── components/
│   ├── lib/
│   │   └── supabase.ts
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   └── counter.ts
│   └── views/
│       ├── HomeView.vue
│       ├── LoginView.vue
│       ├── TodoView.vue
│       └── AboutView.vue
└── dist/ (after build)
```

### Making Changes
- **Vue components**: Edit files in `src/views/` and `src/components/`
- **Routing**: Modify `src/router/index.ts` to add/change routes
- **Supabase config**: Update `src/lib/supabase.ts` for backend changes
- **Styling**: CSS is scoped within component `<style>` blocks
- **State management**: Use Pinia stores in `src/stores/`

### Debugging and Development
- Vue DevTools available at http://localhost:5173/__devtools__/ during development
- Hot reload works automatically with `npm run dev`
- TypeScript errors shown in terminal and browser console
- Supabase errors logged to browser console

## Limitations and Notes

### Known Issues
- Clean npm install shows no vulnerabilities (previous audit issues resolved)
- Application requires valid Supabase credentials to test authentication and TODO functionality
- No linting or formatting scripts configured (ESLint/Prettier not set up)
- No unit tests configured (testing framework not included)

### Security and Environment
- Environment variables must be prefixed with `VITE_` to be accessible in browser
- Supabase anonymous key is safe to expose in frontend (intended for client-side use)
- Always use row-level security (RLS) in Supabase for data protection

### Recommended Development Workflow
1. Start with `npm install` after any changes to package.json
2. Use `npm run dev` for development with hot reload
3. Run `npm run type-check` to verify TypeScript compliance
4. Run `npm run build` before committing to ensure production build works
5. Test functionality manually in browser after significant changes

## IDE Setup
- VSCode recommended with Vue.volar extension
- Disable Vetur if installed (conflicts with Volar)
- TypeScript support enabled for .vue files through vue-tsc