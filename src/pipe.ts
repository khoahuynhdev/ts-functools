export const pipe = <T>(defaultValue: T, ...args: any[]) => {
  return args.reduce((value, func) => func(value), defaultValue)
};