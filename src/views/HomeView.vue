<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import LisPokemos from "@/components/ListPokemos.vue"
import CardPokemonSelected from "@/components/CardPokemonSelected.vue";


interface PokemonType {
    name: string;
    url: string;
}


let basicSvg = ref<string>("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/");
let pokemons = ref<PokemonType[]>();
let searchPokemonField = ref<string>("");
let pokemonSelelcted = reactive(ref());
let loading = ref<boolean>(false);

const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        .then(res => res.json())
        .then(res => {
            pokemons.value = res.results.map((pokemon: PokemonType) => ({
                name: pokemon.name,
                url: pokemon.url
            }));
            console.log(pokemons);
        })
        .catch(err => alert(err))
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
        .catch(err => alert(err))
        .finally(() => {
            loading.value = false;

        });

}

onMounted(fetchPokemons);
</script>

<template>
    <main>
        <div class="container text-body-secondary">
            <div class="row mt-4">
                <div class="col-sm-12 col-md-6">
                    <!-- <div class="card" style="width: 18rem;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRZZcqzU9bg7Q5ShVyVcPzarc55fJ2Cd7oQ&usqp=CAU" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div> -->
                    <CardPokemonSelected
                    :name ="pokemonSelelcted?.name"
                    :xp ="pokemonSelelcted?.base_experience"
                    :height ="pokemonSelelcted?.height"
                    :img="pokemonSelelcted?.sprites.other.dream_world.front_default"
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
        max-height: 48vh;
    }
}
</style>
