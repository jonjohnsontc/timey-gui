// Moved this interface and function over from the timey repo.
export interface Options {
  m?: string;
  s?: string;
  h?: string;
  d?: string;
  ms?: string;
}

export function calculateStartTime(options: Options): number {
  let time = 0;
  if (options.s) {
    time += parseInt(options.s);
  }
  if (options.m) {
    time += parseInt(options.m) * 60;
  }
  if (options.h) {
    time += parseInt(options.h) * 60 * 60;
  }
  if (options.d) {
    time += parseInt(options.d) * 60 * 60 * 24;
  }
  if (options.ms) {
    time += parseInt(options.ms) / 1000;
  }
  return time;
}
