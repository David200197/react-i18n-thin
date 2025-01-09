export const isDefined = (val: unknown) =>
  val === 0 || val === "" || val === false || Boolean(val);
