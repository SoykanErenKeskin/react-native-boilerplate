# Mobile Foundation

Production-oriented Expo + React Native + TypeScript starter for internal tools, service apps, and form-heavy flows. It includes Expo Router (auth vs. app groups), reusable screen primitives, React Hook Form + Zod, TanStack Query, a typed Axios layer, and Zustand for session state only.

## Requirements

- **Node.js** (LTS recommended)
- **npm**
- **iOS**: macOS with Xcode (for simulator or device builds)
- **Android**: Android Studio / SDK (for emulator or device)
- **Expo Go** or a development build for running on physical devices

## Setup

```bash
npm install
```

Copy environment template and set your API base URL (used by the shared Axios client):

```bash
cp .env.example .env
# Windows (cmd/PowerShell): copy .env.example .env
```

Edit `.env` and set:

- `EXPO_PUBLIC_API_URL` — your backend base URL (no trailing slash recommended). Expo inlines `EXPO_PUBLIC_*` at build time.

## Running the app and sign-in

1. Start the dev server: `npm start`, then open **Android**, **iOS**, or **web** from the CLI or Expo Dev Tools.
2. On first launch (or after sign-out), you land on **Sign in**.

**What to enter**

- **Email**: any syntactically valid address (e.g. `you@example.com`).
- **Password**: at least **8 characters** (enforced by Zod in the login form).

**Behavior**

- The app calls `POST {EXPO_PUBLIC_API_URL}/auth/login` with `{ email, password }` and expects a JSON body that includes a `token` string when your API is ready.
- **Development** (`__DEV__`): if that request fails (no server, wrong URL, etc.), sign-in **still succeeds** with a short-lived **preview token** so you can navigate to the home screen and inspect the foundation UI without a real backend.
- **Production builds**: sign-in only succeeds when your API returns a real token; otherwise the user sees an error from the API layer.

**Sign out**: on the home screen, use **Sign out** in the toolbar to clear the session (secure storage) and return to the login screen.

## Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm start`            | Start Expo dev server           |
| `npm run android`      | Open on Android                 |
| `npm run ios`          | Open on iOS (macOS)             |
| `npm run web`          | Open in web browser             |
| `npm run lint`         | Run ESLint                      |
| `npm run typecheck`    | Run TypeScript (`tsc --noEmit`) |
| `npm run format`       | Format with Prettier            |
| `npm run format:check` | Check formatting with Prettier  |

## Project structure

```
src/
  app/                    # Expo Router — routes only
    _layout.tsx
    index.tsx             # Auth redirect after hydrate
    (auth)/login.tsx
    (app)/home.tsx
  config/                 # app metadata, theme tokens
  providers/              # App-wide provider composition
  services/               # API client, interceptors, storage
  shared/                 # UI primitives, hooks, utils, constants
  features/
    auth/                 # Login, schema, service, store
    profile/              # Types, service, profile card
```

Path alias: `@/*` → `src/*` (see `tsconfig.json` and `babel.config.js`).

## Architecture

Dependency direction is one-way:

- `src/app` may import from `features`, `shared`, `providers`, `services`, `config`.
- `features` may import from `shared`, `services`, `config`.
- `shared` may import from `services`, `config`.
- `services` and `config` must **not** import from `features`.

## Notable patterns

- **Keyboard-safe forms**: `KeyboardScreen` → `ScrollableScreen` → form (see `src/app/(auth)/login.tsx`).
- **Example server state**: `src/shared/hooks/use-example-user.ts` (used on home for loading / success / error UI).
- **Session**: `src/features/auth/store/auth-store.ts` with `expo-secure-store`; token is attached to API requests via `setAuthTokenGetter` in `src/services/api/interceptors.ts`.

## Tooling

- **ESLint** (`eslint-config-expo`) + **Prettier**
- **Husky** + **lint-staged** — lint and format staged files on commit

## Troubleshooting

- **Bundling / stale cache**: `npx expo start -c`
- **Babel**: This project uses `babel-preset-expo` (listed in `devDependencies`) with `react-native-reanimated/plugin` last in `babel.config.js`.

## License

Open source under the [MIT License](LICENSE).
