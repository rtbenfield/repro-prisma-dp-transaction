# Prerequisites

- PostgreSQL database
- Prisma Data Platform project
- Node 19 (or any version with `fetch`)

# Setup

1. Create `.env` with `DATA_PROXY_URL` and `DATABASE_URL`
2. Run `npm install`
3. Run `npx prisma migrate`

# Run

🧪 `npm test`

Notice that the edge runtime fails with the wrong timeout error, but **only** if the last operation is commit or rollback.
