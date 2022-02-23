<script>
    export let membre
    import { Image } from 'sveltestrap'
</script>

<div class="membre d-flex w-100 my-5">
    <Image alt="Photo de {membre.nom}" src={'images/user.png'} class=""/>
    <!-- TODO : Faire la mise en en place image, texte, description, etc... pour afficher UN membre -->
</div>

<style>

div.membre{
    width: 100%;
}

</style>