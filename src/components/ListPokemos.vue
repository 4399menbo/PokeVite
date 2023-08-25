<template>
    <div class="col-4">
        <div class="card mb-3 p-2 cardListPokemon">
            <h5 class="text-center">{{ props.pokemoName }}</h5>
            <img 
                :src="basicSvg" 
                class="card-img-top" 
                alt="..."
                height="80"
            >
        </div>
    </div>
</template>
<script setup lang="ts">

const props = defineProps({
    pokemoName: {
        type: String,
        default: "default"
    },
    basicSvg: {
        type: String,
        default: ""
    }
});

</script>
<style scoped>
.cardListPokemon {
    background: rgb(16, 6, 180);
    background: linear-gradient(90deg, rgba(16, 6, 180, 0.2) 0%, rgba(0, 212, 255, 0.2) 100%);
    cursor: pointer;
}

.cardListPokemon:hover {
    background: rgb(16, 6, 180);
    background: linear-gradient(90deg, rgba(16, 6, 180, 0.5) 0%, rgba(0, 212, 255, 0.5) 100%);
    cursor: pointer;
}

.cardListPokemon img:hover {
    padding: 0.1rem;
}
</style>