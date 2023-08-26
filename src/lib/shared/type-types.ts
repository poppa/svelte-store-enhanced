/* eslint-disable @typescript-eslint/no-explicit-any */

export type Maybe<T> = T | undefined
export type MaybeNull<T> = T | null
export type MaybeNullOrUndefined<T> = T | null | undefined
export type MaybeFalsy<T> = T | null | undefined | 0 | false
export type AnyFunction = (...args: any[]) => any
export type VoidFunction = () => void
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type PlainObject<T = any> = { [key: string | symbol | number]: T }

export type Nullable<T> = T | null
export type ClassType<T> = new (...args: any[]) => T
export type Callable = () => any

export type DeepPartial<T> = T extends AnyFunction
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T
