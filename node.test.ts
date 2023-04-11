// @vitest-environment node

import "dotenv/config";

import { PrismaClient } from "@prisma/client/edge";
import { expect, test } from "vitest";

const prisma = new PrismaClient({
  log: ["error", "info", "query", "warn"],
});

test("sanity check", async () => {
  const count = await prisma.someData.count();
  expect(count).toBeTypeOf("number");
});

test("good transaction", async () => {
  const count = await prisma.$transaction(async (tx) => {
    return tx.someData.count();
  });
  expect(count).toBeTypeOf("number");
});

test("timeout with query", async () => {
  expect(
    prisma.$transaction(
      async (tx) => {
        await new Promise((resolve) => setTimeout(resolve, 1_100));
        await tx.someData.count();
      },
      { timeout: 1_000 }
    )
  ).rejects.toThrowError(/Transaction API error: Transaction already closed/);
});

test("timeout with commit", async () => {
  expect(
    prisma.$transaction(
      async (tx) => {
        await new Promise((resolve) => setTimeout(resolve, 1_100));
      },
      { timeout: 1_000 }
    )
  ).rejects.toThrowError(/Transaction API error: Transaction already closed/);
});

// test("working", async () => {
//   await prisma.$transaction(
//     async (tx) => {
//       console.log(await tx.someData.count());
//       await new Promise((resolve) => setTimeout(resolve, 1_000));
//       // console.log(await tx.someData.count());
//     },
//     {
//       timeout: 1_000,
//     }
//   );
//   await expect(async () => {}).rejects.toThrow("P000");
// });
