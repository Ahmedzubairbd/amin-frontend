# Amin Diagnostics Frontend

## Node.js

This project requires **Node.js v22.11.0**. It is recommended to use [nvm](https://github.com/nvm-sh/nvm) for managing Node versions:

```bash
nvm install 22
nvm use 22
```

## Installation

Install dependencies before running the development server:

```bash
yarn install    # or npm install
```

Start the dev server with:

```bash
yarn dev        # or npm run dev
```

## Environment Variables

Configuration is done via `.env` files. Create a `.env.local` file in the project root containing the following variables:

```env
NEXT_PUBLIC_HOST_API=<backend-api-url>
NEXT_PUBLIC_ASSETS_API=<assets-url>
NEXT_PUBLIC_MAPBOX_API=<mapbox-token>
```

`.env.local` values override those from `.env` and other environment files.

## Package Dependancy
- updated all packages
- fix all legacy-peer-options.
- fix eslint , postcss , next.config.js & tsconfig.json

