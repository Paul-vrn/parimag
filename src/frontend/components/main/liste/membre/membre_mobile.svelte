<script>
    export let membre
    import { Image } from 'sveltestrap'
</script>

<div class="membre flex-column d-flex w-100">
    <div>
        <Image alt="Photo de {membre.nom}" src={`images/liste/${membre.photo}.jpg`} class=""/>
    </div>
    <div class=" d-flex flex-column justify-content-center">
        <h1>{membre.nom} - {membre.surnom}</h1>
        <h1>{membre.role}</h1>    
    </div>
    <hr/>
</div>


<style>

div.membre{
    width: 100%;
    padding-top: 1rem;
    background-color: #D7C378;
}
hr {
    margin: 0;
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