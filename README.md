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

# start db
docker compose -f docker/docker-compose.dev.yml up -d

# start dev
pnpm dev
```

### Data Base

- [Prisma](https://www.prisma.io/docs/orm)
