<template>
    <div 
    class="card CardPokemonSelected"
    :class="loading ? '' : 'animate__animated animate__flipInY'">

        <img 
        :src="pokemon.img"
        height="250"
        class="card-img-top pt-3" 
        :alt="pokemon.name">

        <div class="card-body">
            <h5 class="card-title text-center">{{ pokemon.name }}</h5>
            <hr>
            <div class="row">
                <section class="col">
                    <strong>XP:</strong>
                    <span>{{ pokemon.xp }}</span>
                </section>
                <section class="col">
                    <strong>Height:</strong>
                    <span>{{ pokemon.height }}</span>
                </section>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">


const pokemon = defineProps({
    name: {
        type: String,
        default: "???"
    },
    xp: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: new URL("../assets/egg_pokemon.svg", import.meta.url).href
    },
    loading: {
        type: Boolean,
        defalut: true
    }

});

</script>
<style scoped>
.CardPokemonSelected {
    height: 75vh;
    background: rgb(77, 63, 215);
    background: radial-gradient(circle, rgba(232, 206, 10, 0.89) 0%, rgba(255, 0, 0, 0.825) 100%);
}
</style>