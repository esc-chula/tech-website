# Contributing Guide to Tech Department Website

## Prerequisites

- Node.js v20.0.0 or later (lts/iron recommended)
- PNPM v8.0.0 or later

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/esc-chula/tech-website.git
   ```

2. Install the dependencies

   ```bash
   pnpm install
   ```

3. Generate Prisma client (In case `pnpm install` doesn't run it)

   ```bash
   pnpm generate
   ```

4. Run docker-compose to start the `database`, `hydra`, and `intania-auth` service

   ```bash
   docker compose up
   ```

5. Start the development server

   ```bash
   pnpm dev
   ```

6. Done! You are now good to go!

## gRPC Development

1. Make sure that you have install dependencies

2. Install [protoc](https://grpc.io/docs/protoc-installation/)

3. In case `./proto` directory is changed or updated, you need to regenerate the gRPC code by running the following command:

   ```bash
   # POSIX system
   .\scripts\compile-proto.sh

   # Windows
   .\scripts\compile-proto.bat
   ```

## Hydra Development

- Read the [Hydra Documentation](https://www.ory.sh/hydra/docs/)
- All scripts related to hydra are in `./scripts` directory

## Practices

- **Commit Message**: Use the following format for commit messages: `type: description`. For example, `feat: add button component`.
  Please check [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more information.

- **Branching**: Use the following format for branch names: `type/description`. For example, `feature/button`.

## Recommended Extensions for VSCode

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### WSL (for Windows users)

_Not required but recommended._
If you have some time or encounter some issues, I recommend setting up WSL for development.

Please check the [official documentation](https://docs.microsoft.com/en-us/windows/wsl/install) for more information.
