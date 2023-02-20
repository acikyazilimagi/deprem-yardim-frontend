declare module "dirty-json" {
  export const parse: <TInput = any, TOutput = any>(_input: TInput) => TOutput;
}
