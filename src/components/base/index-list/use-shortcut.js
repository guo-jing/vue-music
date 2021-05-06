import { ref, computed } from 'vue'

export default function useShortCut(props, groupRef) {
    const scrollRef = ref(null)

    const shortcutList = computed(() => {
        return props.data.map(group => {
            return group.title
        })
    })

    function onShortcutTouchStart(e) {
        const anchorIndex = parseInt(e.target.dataset.index)
        const targetEl = groupRef.value.children[anchorIndex]
        const scroll = scrollRef.value.scroll
        scroll.scrollToElement(targetEl)
    }

    return {
        shortcutList,
        scrollRef,
        onShortcutTouchStart
    }
}