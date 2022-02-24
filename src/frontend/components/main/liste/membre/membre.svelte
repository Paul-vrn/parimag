<script>
    export let membre
    export let sens
    import { Image } from 'sveltestrap'
</script>

{#if sens}
<div class="membre d-flex w-100 m-3">
    <div>
        <Image alt="Photo de {membre.nom}" src={'images/user.png'} class=""/>
    </div>
    <div class=" d-flex flex-column justify-content-center">
        <h1>{membre.nom}</h1>
        <h1>{membre.surnom}</h1>
        <h1>{membre.role}</h1>    
    </div>
</div>

{:else}
<div class="membre d-flex w-100">
    <!-- TODO : Faire la mise en en place image, texte, description, etc... pour afficher UN membre -->
    <div class=" d-flex flex-column justify-content-center">
        <h1>{membre.nom}</h1>
        <h1>{membre.surnom}</h1>
        <h1>{membre.role}</h1>    
    </div>
    <div>
        <Image alt="Photo de {membre.nom}" src={'images/user.png'} class=""/>
    </div>
</div>

{/if}

<style>

div.membre{
    width: 100%;
}
:global(.membre img) {
    width: 250px;
}
div.membre div {
    flex-shrink: 0;
    flex-grow: 1;
    text-align: center;
    vertical-align: middle;
}
</style>