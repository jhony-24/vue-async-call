import { reactive, Ref, toRefs } from "vue"
import {
  AsyncReactiveValue,
  DefaultParams,
  ResponsePromiseCallback,
} from "./types"

export function useAsync<T extends any>(
  defaultParams: Partial<DefaultParams<T>> = {
    loading: true,
    error: "",
    data: undefined,
  }
) {
  const state = reactive<AsyncReactiveValue<T>>({
    ...(defaultParams as AsyncReactiveValue<T>),
    idl: true,
  })

  async function sendData(responseCallback: ResponsePromiseCallback) {
    try {
      const response = await (typeof responseCallback === "function"
        ? responseCallback()
        : responseCallback)
      state.data = response
      state.error = ""
    } catch (error) {
      state.error = error?.response
    } finally {
      state.loading = false
    }
  }

  function exec(responseCallback: ResponsePromiseCallback) {
    idl.value = false
    state.loading = true
    return sendData(responseCallback)
  }

  function execOnce(responseCallback: ResponsePromiseCallback) {
    idl.value = false
    return sendData(responseCallback)
  }

  const { data, error, loading, idl } = toRefs(state)
  return {
    data: data as Ref<T>,
    error,
    idl,
    loading,
    exec,
    execOnce,
  }
}
