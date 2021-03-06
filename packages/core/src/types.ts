import { Ref } from "vue-demi"

export interface AsyncReactiveValue<Value> {
  loading: boolean
  error: any
  data: Value | undefined
  idl: boolean
}

export interface AsyncReactiveConfiguration<Value,ErrorValue> {
  onSuccess?(response?: Value): void
  onError?(error: ErrorValue): void
  onLoading?(): void
  onIdl?(): void
}

export type DefaultParams<T> = Omit<AsyncReactiveValue<T>, "idl">
export type ResponsePromiseCallback = Promise<any> | (() => Promise<any>)

export interface ReturnUseAsync<T> extends AsyncReactiveValue<T> {
  exec(promise: ResponsePromiseCallback): Promise<void>
  execOnce(promise: ResponsePromiseCallback): Promise<void>
}

export type ExecPromiseFunction = (promise: ResponsePromiseCallback) => void

export interface AsyncCacheProvider<Data, Error extends any = null> {
  loading: Ref<boolean>
  data: Ref<Data>
  idl: Ref<boolean>
  error: Ref<Error>
  exec: ExecPromiseFunction
  execOnce: ExecPromiseFunction
  execCache: ExecPromiseFunction
}
