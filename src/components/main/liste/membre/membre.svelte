<script>
    export let membre
    import { Image } from 'sveltestrap'
</script>

<div class="d-flex w-100 my-5">
    <div class="w-50 d-flex justify-content-center">
        <!-- <img src="images/{membre.photo}.png" alt="Photo de {membre.nom}"/> -->
        <Image alt="Photo de {membre.nom}" src={'images/user.png'} class="mw-100 mh-100 w-50 mr-2"/>
    </div>
    <div class="w-50 d-flex flex-column justify-content-center text">
        <h1>{membre.nom}</h1>
        <h2>{membre.surnom}</h2>
        <h2>{membre.description}</h2>
    </div>
    
    <!-- TODO : Faire la mise en en place image, texte, description, etc...-->
</div>

<style>
</style>