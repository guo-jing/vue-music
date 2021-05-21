<template>
    <div class="player">
        <div
            class="normal-player"
            v-show="fullScreen"
        >
            <div class="background">
                <img :src="currentSong.pic" alt="">
            </div>
            <div class="top">
                <div class="back">
                    <i class="icon-back"></i>
                </div>
                <h1 class="title">{{ currentSong.name }}</h1>
                <h1 class="subtitle">{{ currentSong.singer }}</h1>
            </div>
        </div>
        <audio></audio>
    </div>
</template>