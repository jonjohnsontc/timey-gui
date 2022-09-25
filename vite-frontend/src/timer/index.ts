// Moved Options and calculateStartTime from the timey deno repo
interface Options {
  m?: string;
  s?: string;
  h?: string;
  d?: string;
  ms?: string;
}

class Timer {
  running: boolean;
  length: string;
  name: string;
  timeRemaining: number;
  id?: NodeJS.Timer | number;
  constructor(length: string, name: string) {
    this.running = false;
    this.length = length;
    this.name = name;
    this.id = undefined;
    this.timeRemaining = convertToSecs(length);
  }

  async tick() {
    if (!this.id) {
      this.running = true;
      this.id = setInterval(() => {
        this.timeRemaining--;
        if (this.timeRemaining <= 0 && this.id) {
          clearInterval(this.id);
          this.id = undefined;
          this.running = false;
        }
      }, 1000);
    }
  }

  async restart() {
    this.timeRemaining = convertToSecs(this.length);
    await this.tick();
  }

  stop() {
    clearInterval(this.id);
  }

  get time() {
    return;
  }
}

function calculateStartTime(options: Options): number {
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

function convertToSecs(time: string) {
  if (!time.includes(":")) {
    throw Error(": expected in time value");
  }
  const segments = time.split(":");
  if (segments.length > 2) {
    throw Error("too many segments found");
  }
  return Number(segments[0]) * 60 + Number(segments[1]);
}

function secsToTime(secs: number) {
  let hr = Math.floor(secs / 3600).toString();
  let min = Math.floor((secs % 3600) / 60).toString();
  let sec = Math.floor((secs % 3600) % 60).toString();

  hr = parseInt(hr) < 10 ? "0" + hr : hr;
  min = parseInt(min) < 10 ? "0" + min : min;
  sec = parseInt(sec) < 10 ? "0" + sec : sec;

  // TODO: add back in hr
  return `${min}:${sec}`;
}

function getTime(num: Number) {
  if (num < 10) {
    return "0" + num.toString();
  } else {
    return num.toString();
  }
}

export { convertToSecs, getTime, secsToTime, Timer };
