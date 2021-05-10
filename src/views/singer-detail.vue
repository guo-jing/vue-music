<template>
    <div class="singer-detail"></div>
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
    ></music-list>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'

export default {
    name: 'singer-detail',
    components: { MusicList },
    props: {
        singer: Object
    },
    data() {
        return {
            songs: []
        }
    },
    computed: {
        pic() {
            return this.singer && this.singer.pic
        },
        title() {
            return this.singer && this.singer.name
        }
    },
    async created() {
        const result = await getSingerDetail(this.singer)
        this.songs = await processSongs(result.songs)
    }
}
</script>