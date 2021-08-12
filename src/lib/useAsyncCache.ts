import { computed, inject, provide, Ref, ref, UnwrapRef, watch } from "vue"
import { ExecPromiseFunction, ResponsePromiseCallback } from "./types"
import { useAsync } from "./useAsync"

const defaultKey = "asyncCache"

export function useAsyncCacheProvider<T>(key?: string) {
  const asyncValue = useAsync<T>(undefined)
  const { data } = asyncValue
  const execCache = async (resolve: ResponsePromiseCallback) => {
    if (!data.value) asyncValue.exec(resolve)
  }

  provide(key || defaultKey, { ...asyncValue, execCache })

  return {
    ...asyncValue,
  }
}

export function useAsyncCacheConsumer<T extends any>(
  initialValue: T,
  key?: string
) {
  const data = ref<T>(initialValue)
  const {
    loading,
    idl,
    error,
    execCache: execCacheProvider,
    data: dataProvider,
    exec,
    execOnce,
  } = inject(key || defaultKey) as any
  const execCache = (resolve: ResponsePromiseCallback) =>
    execCacheProvider(resolve)
  const cacheConsumerData = computed(() => dataProvider.value) as Ref<T>

  watch(
    cacheConsumerData,
    (value) => {
      if (value && !idl.value) {
        data.value = value as UnwrapRef<T>
      }
    },
    { immediate: true }
  )

  return {
    data: data as Ref<T>,
    loading: loading as Ref<boolean>,
    error: error as Ref<any>,
    exec: exec as ExecPromiseFunction,
    execOnce: execOnce as ExecPromiseFunction,
    execCache: execCache as ExecPromiseFunction,
  }
}
