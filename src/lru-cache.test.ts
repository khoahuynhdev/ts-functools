import { describe, it, expect } from "vitest";

// The two tests marked with concurrent will be run in parallel
describe("trying vitest", () => {
  it("works", () => {
    const input = Math.sqrt(4);
    expect(input).toBe(2); // jest API
  });
});
