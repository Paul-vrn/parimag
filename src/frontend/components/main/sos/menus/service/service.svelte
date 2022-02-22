<script>
    export let service;
    export let addInPanier;
    import ModalInfo from '../modal/modal_service_info.svelte'
    import {Button} from 'sveltestrap'
    import { Toasts, addToast } from 'as-toast';

    service.quantite = 0;
    let quantiteSelect = 0;
    service.quantiteMax = 0;

    let open = false;
    function changeQuantite(val){
        if (0<=quantiteSelect+val && Math.min(service.quantiteMax, quantiteSelect+val<=5)) {
            //valeur arbitraire (peut être à changer   )
            quantiteSelect+= val
        } else {
            console.log("y a plus de stocks ou inf à 0")
            //TODO : y a plus de stocks
            addToast("Il n'y a pas assez de stock", "warn", 2000)
        }
    }

    function ajouter(){
        addInPanier(service)
    }
    function showInfo(){
        open = false;
        open = true;
    }
</script>
<Toasts/>
<ModalInfo produit={service} open={open}/>
<div class="plat mx-3 mb-3 p-2 d-flex flex-column justify-content-between">
    <div class="d-flex justify-content-start align-items-center flex-wrap">
        <h2>{service.nom}</h2>
        <div class="d-flex justify-content-between align-items-center flex-nowrap w-100">
            <img src={'images/icons/info.png'} alt="info" width="40" height="40" on:click={showInfo}/>        
        </div>
    </div>
    <p class="description_produit">{service.description}</p>
    <div class="actions d-flex align-items-center justify-content-between">
        <Button on:click={ajouter} color="success">
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