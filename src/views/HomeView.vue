<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import LisPokemos from "@/components/ListPokemos.vue"
import CardPokemonSelected from "@/components/CardPokemonSelected.vue";
import { type PokemonType, type Stats } from "@/util/pokemon";


let basicSvg = ref<string>("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/");
var pokemons = reactive(ref<PokemonType[]>([]));
let searchPokemonField = ref<string>("");
let pokemonSelelcted = reactive(ref());
let loading = ref<boolean>(false);
let maxStat = ref<number>(0);
let fetchIng = ref<boolean>(false);

var pokemonsTmp: PokemonType[] = [];


const fetchPokemons = () => {
    fetchIng.value = true;
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=" + (pokemons.value.length) + "")
        .then(res => res.json())
        .then(res => {
            pokemonsTmp = res.results.map((pokemon: PokemonType) => ({
                name: pokemon.name,
                url: pokemon.url
            }));

            pokemons.value = pokemons.value.concat(pokemonsTmp);
            //console.log(pokemons.value);
        })
        .catch(err => alert(err))
        .finally(() => {
            fetchIng.value = false;
        })
};

const pokemonsFiltered = computed(() => {
    if (pokemons.value && searchPokemonField.value) {
        return pokemons.value.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchPokemonField.value.toLowerCase())
        );
    }
    return pokemons.value;
});

const selectPokemon = async (pokemon: PokemonType) => {
    loading.value = true;

    await fetch(pokemon.url)
        .then(res => res.json())
        .then(res => pokemonSelelcted.value = res)
        .then(() => maxStat.value = getMaxVal(pokemonSelelcted?.value.stats))
        .catch(err => alert(err))
        .finally(() => {
            loading.value = false;
        });

}

const getMaxVal = (stats: Stats[]) => {
    let maxVal = 0;

    for (let index = 0; index < stats.length; index++) {
        if (stats[index].base_stat as number > maxVal) {
            maxVal = stats[index].base_stat as number;
        }
    }

    return maxVal;
};

onMounted(fetchPokemons);
</script>

<template>
    <main>
        <div class="container text-body-secondary">
            <div class="row mt-4">
                <div class="col-sm-12 col-md-6">
                    <CardPokemonSelected
                    :id = "pokemonSelelcted?.id"
                    :name ="pokemonSelelcted?.name"
                    :types="pokemonSelelcted?.types"
                    :weight ="pokemonSelelcted?.weight"
                    :height ="pokemonSelelcted?.height"
                    :img="pokemonSelelcted?.sprites.other.dream_world.front_default"
                    :stats="pokemonSelelcted?.stats"
                    :max="maxStat"
                    :loading="loading"
                    ></CardPokemonSelected>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="card card-list">
                        <div class="card-body row">
                            <div class="mb-3">
                                <label hidden for="searchPokemonField" class="form-label">Pesquisar</label>
                                <input 
                                    v-model="searchPokemonField" 
                                    type="text" 
                                    class="form-control" 
                                    id="searchPokemonField" 
                                    placeholder="Pesquisar...">
                            </div>
                            <LisPokemos
                                v-for="pokemon in pokemonsFiltered"
                                :key="pokemon.name"
                                :pokemoName="pokemon.name"
                                :basicSvg="basicSvg + pokemon.url.split('/')[6] + '.svg'"
                                @click="selectPokemon(pokemon)"
                            />

                            <button 
                            v-if="pokemonsFiltered.length === pokemons.length && !fetchIng" 
                            class="btn btn-primary" @click="fetchPokemons()">LOADING</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped>
.card-list {
    max-height: 75vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

@media (max-width: 768px) {
    .card-list {
        max-height: 42vh;
    }
}
</style>
