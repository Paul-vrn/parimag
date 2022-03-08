<script>
    export let membre
    export let sens
    import { Image } from 'sveltestrap'
</script>

{#if sens}
<div class="membre d-flex w-100">
    <div class=" w-50">
        <Image alt="Photo de {membre.nom}" src={`images/liste/${membre.photo}.jpg`} class=""/>
    </div>
    <div class="w-50 d-flex flex-column justify-content-center">
        <h1>{membre.nom}</h1>
        <h1>{membre.role}</h1>    
    </div>
</div>

{:else}
<div class="membre d-flex w-100">
    <!-- TODO : Faire la mise en en place image, texte, description, etc... pour afficher UN membre -->
    <div class="w-50 d-flex flex-column justify-content-center">
        <h1>{membre.nom}</h1>
        <h1>{membre.role}</h1>    
    </div>
    <div class="w-50">
        <Image alt="Photo de {membre.nom}" src={`images/liste/${membre.photo}.jpg`} class=""/>
    </div>
</div>

{/if}

<style>

div.membre{
    width: 100%;

}
:global(.membre img) {
    width: 250px;
    border-style: solid;
    box-shadow: inset 0px 0px 150px 75px rgba(0, 0, 0, 0.5);
    filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.5));
    border-radius: 1em;
}
div.membre div {
    flex-shrink: 0;
    flex-grow: 1;
    text-align: center;
    vertical-align: middle;
}
</style>