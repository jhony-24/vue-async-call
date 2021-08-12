import { reactive, Ref, toRefs, watch } from "vue"
import {
  AsyncReactiveConfiguration,
  AsyncReactiveValue,
  DefaultParams,
  ResponsePromiseCallback,
} from "./types"

export function useAsync<T extends any>(
  defaultParams: Partial<DefaultParams<T>> = {
    loading: true,
    error: "",
    data: undefined,
  },
  configuration: AsyncReactiveConfiguration<T>
) {
  const state = reactive<AsyncReactiveValue<T>>({
    ...(defaultParams as AsyncReactiveValue<T>),
    idl: true,
  })

  async function sendData(responseCallback: ResponsePromiseCallback) {
    try {
      configuration.onLoading?.()
      const response = await (typeof responseCallback === "function"
        ? responseCallback()
        : responseCallback)
      state.data = response
      configuration.onSuccess?.(response)
      state.error = ""
    } catch (error) {
      state.error = error?.response
      configuration.onError?.(error)
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

  watch(
    () => state.idl,
    (idl) => {
      if (idl) {
        configuration.onIdl?.()
      }
    },
    { immediate: true }
  )

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
