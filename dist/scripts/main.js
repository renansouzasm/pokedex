"use strict";
const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonWrapp = document.querySelector(".pokemonWrapp");
const typesElement = document.querySelector(".pokemonTypes p:last-child");
const abilitiesElement = document.querySelector(".pokemonAbilities p:last-child");
const arrowNext = document.getElementById("arrowNext");
const arrowPrev = document.getElementById("arrowPrev");
let currentId = 1;
function formatId(id) {
    if (id >= 1000)
        return id.toString();
    if (id >= 100)
        return "0" + id;
    if (id >= 10)
        return "00" + id;
    return "000" + id;
}
async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        const data = await response.json();
        pokemonName.textContent = data.name;
        pokemonId.textContent = formatId(data.id);
        pokemonImage.src = data.sprites.other["official-artwork"].front_default;
        const types = data.types.map((type) => type.type.name).join(", ");
        typesElement.textContent = types;
        const abilities = data.abilities
            .map((ability) => ability.ability.name)
            .join(", ");
        abilitiesElement.textContent = abilities;
        const firstType = data.types[0]?.type.name || "normal";
        pokemonWrapp.className = `pokemonWrapp ${firstType}`;
    }
    catch (error) {
        pokemonName.textContent = "Not Found";
        pokemonId.textContent = formatId(id);
        pokemonWrapp.className = "pokemonWrapp normal";
    }
}
arrowNext.addEventListener("click", () => {
    currentId += 1;
    fetchPokemon(currentId);
});
arrowPrev.addEventListener("click", () => {
    if (currentId > 1) {
        currentId -= 1;
        fetchPokemon(currentId);
    }
});
fetchPokemon(currentId);
