// Run: deno test --config satellite-image/deno.json satellite-image/center_test.ts
import { parseCenter } from "./center.ts";

function center(query: string): string | number {
  const r = parseCenter(new URLSearchParams(query));
  return r instanceof Response ? r.status : r;
}

function assertEq(actual: unknown, expected: unknown) {
  if (actual !== expected) throw new Error(`expected ${expected}, got ${actual}`);
}

Deno.test("accepts Google's long-tail doubles (2026-09-24 bug)", () => {
  assertEq(center("lat=44.987437199999995&lng=-93.385009"), "44.987437,-93.385009");
  // -96.7268115 is stored just below the halfway point, so it rounds down.
  assertEq(center("lat=40.869629499999995&lng=-96.7268115"), "40.869629,-96.726811");
});

Deno.test("accepts short coordinates", () => {
  assertEq(center("lat=45.0749176&lng=-93.2621619"), "45.074918,-93.262162");
  assertEq(center("lat=45&lng=-93"), "45.000000,-93.000000");
});

Deno.test("rejects non-decimal formats", () => {
  for (const [lat, lng] of [["", "-93"], [" 45", "-93"], ["0x2D", "-93"], ["4.5e1", "-93"],
    ["45.", "-93"], ["NaN", "-93"], ["Infinity", "-93"], ["45", "-93.1".padEnd(26, "1")]]) {
    assertEq(center(new URLSearchParams({ lat, lng }).toString()), 400);
  }
});

Deno.test("rejects coordinates outside the US box", () => {
  assertEq(center("lat=10&lng=-93"), 400);
  assertEq(center("lat=51.5&lng=-0.12"), 400);
  assertEq(center("lat=45&lng=-60"), 400);
});

Deno.test("requires exactly one form", () => {
  assertEq(center(""), 400);
  assertEq(center("lat=45&lng=-93&address=1%20Main%20St"), 400);
  assertEq(center("lat=45"), 400);
});

Deno.test("address form unchanged", () => {
  assertEq(center("address=%20762%20Wisconsin%20Ave%20N%2C%20Minneapolis%20"), "762 Wisconsin Ave N, Minneapolis");
  assertEq(center("address=a%7Cb"), 400);
  assertEq(center("address=ab"), 400);
});
