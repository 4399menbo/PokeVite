<template>

    <div 
    class="card CardPokemonSelected position-relative"
    :class="loading ? '' : 'animate__animated animate__fadeIn'">
        <img 
        class="position-absolute top-0 end-0 img-gif"
        :class="loading ? '' : 'animate__animated animate__flipInX'"
        :src="pokemon.id === 0 ? '' : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + pokemon.id + '.gif'">

        <img
        :src="pokemon.img"
        class="card-img-top pt-3 img" 
        :alt="pokemon.name">

        <div class="card-body">
            <h5 class="card-title text-center ">#{{ pokemon.id + " " + pokemon.name }}</h5>
            <div class="d-none d-md-block">
                <div class="row d-flex justify-content-center fw-bold base-height">
                    <div v-for="typeItems in (pokemon.types as Types[])" 
                    :class="typeItems.type.name" 
                    class="my-auto mx-2 py-1 col text-white text-center rounded">
                    {{ typeItems.type.name }}
                    </div>
                </div>
            </div>
            <div class="row base-height">
                <section class="col-5">
                    <img class="img-center img" src="../assets/weight.svg" alt="weight">
                    <div class="text-center">{{ (pokemon.weight * 0.1).toFixed(1) }}kg</div>
                </section>
                <section class="col-2">
                    <div class="h-50 vr d-block mx-auto"></div>
                </section>
                <section class="col-5">
                    <img class="img-center img" src="../assets/colum-height.svg" alt="height">
                    <div class="text-center">{{ (pokemon.height * 0.1).toFixed(1) }}m</div>
                </section>
            </div>
            <div class="d-none d-md-block">
                <div class="mt-4">
                    <hr>
                    <h5 v-show="pokemon.stats.length > 0">Base Stat:</h5>
                    <div v-for="statItems in (pokemon.stats as Stats[])"
                    class="progress mb-2"
                    style="height: 20px" role="progressbar" 
                    aria-label="Example with label" 
                    :aria-valuenow="(statItems.base_stat as number)" aria-valuemin="0" 
                    :aria-valuemax="pokemon.max">
                        <div 
                        class="progress-bar" 
                        :style="'width: ' + getCurrentPerson(statItems.base_stat as number, pokemon.max) + '%'"
                        :class="statItems.stat.name">
                            <div class="row px-1 text-black fw-bold fs-6">
                                <div class="col text-start">{{ statItems.stat.name }}</div>
                                <div class="col text-end">{{ statItems.base_stat }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type Types, type Type, type Stats, type Stat } from "@/util/pokemon";

const pokemon = defineProps({
    id: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: "???"
    },
    types: {
        type: Array,
        defalut: []
    },
    weight: {
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
    stats: {
        type: Array,
        default: []
    },
    max: {
        type: Number,
        default: 0
    },
    loading: {
        type: Boolean,
        defalut: false
    }
});


const getCurrentPerson = (val: number, max: number) => {
    let person = val / max * 100;
    if (person < 30) {
        person = 30;
    }
    return person;
}


</script>
<style scoped>
@import '../assets/base.css';

.CardPokemonSelected {
    height: 75vh;
    background: rgb(77, 63, 215);
    background: radial-gradient(circle, rgba(232, 206, 10, 0.89) 0%, rgba(255, 0, 0, 0.825) 100%);
}

.CardPokemonSelected .img {
    height: 30%;
}


.base-height {
    height: 50px;
}

.img-center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 99.58px;
}

.img-gif {
    width: 39px;
}


@media (max-width: 768px) {
    .CardPokemonSelected {
        height: 35vh;
        width: 250px;
        margin: 0 auto 10px auto;
    }

    .CardPokemonSelected .img {
        height: 50%;
    }

    .img-center {
        width: 22.58px;
    }
}
</style>