import BScorll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScorll.use(ObserveDOM)

export default function useScroll(wrapperRef, options) {
    const scroll = ref(null)

    onMounted(() => {
        scroll.value = new BScorll(wrapperRef.value, {
            observeDOM: true,
            ...options
        })
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })
}