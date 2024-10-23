# Tech Department Website

## Getting Started

### Local Development

1. Clone this repo

   `git clone https://github.com/esc-chula/tech-website.git`

2. Create `.env` file by remove .example from `.env.exmaple` file

3. Run

```bash
# install the dependencies
pnpm install

# generate prisma client
pnpm generate

# prepare husky
pnpm prepare

# start db and hydra
docker compose up postgres hydra hydra-migrate hydra-db

# start dev
pnpm dev
```

### Data Base

- [Prisma](https://www.prisma.io/docs/orm)
