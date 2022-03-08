<script>
    export let membre
    import { Image } from 'sveltestrap'
</script>

<div class="membre flex-column d-flex w-100">
    <div>
        <Image alt="Photo de {membre.nom}" src={`images/liste/${membre.photo}.jpg`} class=""/>
    </div>
    <div class=" d-flex flex-column justify-content-center">
        <h1>{membre.nom}</h1>
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