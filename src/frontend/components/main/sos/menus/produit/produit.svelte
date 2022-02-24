<script>
    export let produit;
    export let addInPanier;
    import ModalInfo from '../modal/modal_produit_info.svelte'
    import {Button} from 'sveltestrap'
    import { Toasts, addToast } from 'as-toast';

    produit.quantite = 0;
    let quantiteSelect = 0;
    produit.quantiteMax = 0;
    produit.stocks.forEach(stock => produit.quantiteMax+=stock.quantite);

    let open = false;
    function changeQuantite(val){
        if (0>=quantiteSelect+val){
            addToast("Vous ne pouvez pas séléctionner une valeur négative", "warn", 1500)
        } else if (quantiteSelect+val>=produit.quantiteMax){
            addToast("Il n'y a pas assez de stock", "warn", 1500)
        } else if (quantiteSelect+val>=4){
            addToast("Vous pouvez commander maximum 3 plats", "warn", 1500)
        } else {
            quantiteSelect+= val
        }
    }

    function clickPanier(){
        if (quantiteSelect >0){
            produit.quantite = quantiteSelect
            addInPanier(produit)
            quantiteSelect=0
        }
    }
    function showInfo(){
        open = false;
        open = true;
    }
</script>
<Toasts/>
<ModalInfo produit={produit} open={open}/>
<div class="plat mx-3 mb-3 p-2 d-flex flex-column justify-content-between">
    <div class="d-flex justify-content-start align-items-center flex-wrap">
        <h2>{produit.nom}</h2>
        <div class="d-flex justify-content-between align-items-center flex-nowrap w-100">
            <h4 class="m-0">{produit.prix}€/unité</h4>
            {#if produit.vegan==="TRUE"}
                <img src={'images/icons/vegetalien.png'} alt="vegan" width="40" height="40"/>
            {/if}
            {#if produit.halal==="TRUE"}
            <img src={'images/icons/halal.png'} alt="info" width="40" height="40"/>        
            {/if}
            <img src={'images/icons/info.png'} alt="info" width="40" height="40" on:click={showInfo}/>        
        </div>
    </div>
    <p class="description_produit">{produit.description}</p>
    <div class="actions d-flex align-items-center justify-content-between">
        <div>
            <Button on:click={()=>changeQuantite(-1)} size="sm">
            <img src={'images/icons/minus.svg'} alt="minus" width="30" height="30"/>
            </Button>
            {quantiteSelect}
            <Button on:click={()=>changeQuantite(1)} size="sm">
                <img src={'images/icons/plus.svg'} alt="plus" width="30" height="30"/>
            </Button>
        </div>
        {#if produit.quantiteMax<=0}
            <p>Indisponible</p>
        {:else}
        <Button on:click={clickPanier} disabled={quantiteSelect==0} color="success">
            <img src={'images/icons/panier_in.png'} alt="validate" width="30" height="30"/>
        </Button>
        {/if}
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