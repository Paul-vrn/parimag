<script>
    export let service;
    export let addInPanier;
    import ModalInfo from './modal_service_info.svelte'
    import {Button} from 'sveltestrap'
    import { addToast } from 'as-toast';

    service.quantite = 1;

    let open = false;

    function ajouter(){
        addInPanier(service)
        addToast(`${service.nom} a été ajouté au panier`, "info", 1500)

    }
    function showInfo(){
        open = false;
        open = true;
    }
</script>
<ModalInfo produit={service} open={open}/>
<div class="plat mx-3 mb-3 p-2 d-flex flex-column justify-content-between">
    <h2>{service.nom}</h2>
    <p class="description_produit">{service.description}</p>
    <img src={`images/menu/${service.photo}`} alt={service.photo}/>
    <hr class="w-100 p-0 mx-0 mb-2 mt-auto"/>
    <div class="actions d-flex align-items-center justify-content-between">
        <Button on:click={ajouter}  class="ms-auto colored">
            <img src={'images/icons/panier_in.png'} alt="validate" width="30" height="30"/>
        </Button>
    </div>  
</div>

<style>
    .description_produit {
        overflow: hidden;
        max-height: 35%;
        text-overflow: ellipsis
    }
    div.plat {
        border-style: solid;
        border-radius: 1em;
        width: 30%;
        min-width: 300px;
    }
   

@media screen and (max-width: 640px) {
  div.plat {
      width: 100%;
  }
}
</style>