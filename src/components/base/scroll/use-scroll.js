import BScorll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScorll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
    const scroll = ref(null)

    onMounted(() => {
        const scrollVal = scroll.value = new BScorll(wrapperRef.value, {
            observeDOM: true,
            ...options
        })

        if (options.probeType > 0) {
            scrollVal.on('scroll', position => {
                emit('scroll', position)
            })
        }
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })
}