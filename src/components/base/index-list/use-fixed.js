import { ref, watch, computed, nextTick } from 'vue'

export default function useFixed(props) {
    const TITLE_HEIGHT = 30
    const groupRef = ref(null)
    const listHeights = ref([])
    const scrollY = ref(0)
    const currentIndex = ref(0)
    const distance = ref(0)

    const fixedTitle = computed(() => {
        if (scrollY.value < 0) return ''
        const currentGroup = props.data[currentIndex.value]
        return currentGroup ? currentGroup.title : ''
    })

    const fixedStyle = computed(() => {
        const distanceValue = distance.value
        const diff = (distanceValue > 0 && distanceValue < TITLE_HEIGHT)
            ? distanceValue - TITLE_HEIGHT
            : 0
        return {
            transform: `translateY(${diff}px)`
        }
    })

    watch(() => props.data, async () => {
        await nextTick()
        calculate()
    })

    watch(scrollY, newY => {
        const listHeightVal = listHeights.value
        for (let i = 0; i < listHeightVal.length - 1; i++) {
            const heightTop = listHeightVal[i]
            const heightBottom = listHeightVal[i + 1]
            if (newY >= heightTop && newY <= heightBottom) {
                currentIndex.value = i
                distance.value = heightBottom - newY
            }
        }
    })

    function calculate() {
        const list = groupRef.value.children
        const listHeightVal = listHeights.value
        let height = 0

        listHeightVal.length = 0
        listHeightVal.push(height)

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightVal.push(height)
        }
    }

    function onScroll(position) {
        scrollY.value = -position.y
    }

    return {
        groupRef,
        onScroll,
        fixedTitle,
        fixedStyle
    }
}