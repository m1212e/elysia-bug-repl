import { treaty } from "@elysiajs/eden";
import Elysia, { t, type TSchema } from "elysia";

export const __nullable__ = <T extends TSchema>(schema: T) =>
  t.Union([t.Null(), schema]);

export const ConferenceWhere = t.Partial(
  t.Object({
    id: t.String(),
    start: t.Date(),
  })
);

const app = new Elysia().get(
  "/test",
  async ({ query }) => {
    console.log(query);
  },
  {
    query: t.Optional(ConferenceWhere),
  }
);

app.listen(3000);

const client = treaty<typeof app>("localhost:3000");

// this is somehow not allowed although query is optional
// client.test.get();

const r = await client.test.get({
  query: {
    id: "adwawdwad",
    // start: Date.now(),
    // start: new Date(),
    // start: "2022-01-01"
  },
});
console.log("error:", r.error?.value);
console.log("data:", r.data);
console.log("status:", r.status);

process.exit(0);
