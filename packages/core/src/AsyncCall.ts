import { defineComponent, reactive } from "vue-demi"
import { useAsync } from "./useAsync"

export default defineComponent({
  setup(_, { slots }) {
    const asyncCall = reactive(useAsync())

    return () => {
      return slots.default?.(asyncCall)
    }
  },
})
