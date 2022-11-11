const arg = process.argv;

export function getCommandLineArg(key: "csvFileName"): string | undefined {
  switch (key) {
    case "csvFileName":
      return arg[2];
  }
}
