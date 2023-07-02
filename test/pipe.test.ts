import { describe, it, expect } from "vitest";
import { pipe } from "../src/pipe";

describe("pipe", () => {
  it("should work well", () => {
    const result = pipe(3, (num) => num + 2);
    expect(result).equal(5)
  });
})