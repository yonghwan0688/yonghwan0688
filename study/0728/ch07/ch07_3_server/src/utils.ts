import { mkdir } from "fs";

export const makeDir = (dirname: string) => {
  mkdir(dirname, { recursive: true }, (err) => {
    if (err) {
      console.error("mkdir error:", err);
    }
  });
};
