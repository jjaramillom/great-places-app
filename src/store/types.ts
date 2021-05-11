export function withPayloadType<T>() {
  return (t: T): { payload: T } => ({ payload: t });
}
