<script>
    export let produit;
    export let addInPanier;
    import ModalInfo from './modal_plat_info.svelte'
    import {Button, Tooltip} from 'sveltestrap'
    import { Toasts, addToast } from 'as-toast';

    produit.quantite = 0;
    let quantiteSelect = 0;
    produit.quantiteStockMax = 0;
    produit.stocks.forEach(stock => produit.quantiteStockMax+=stock.quantite);

    let open = false;
    function changeQuantite(val){
        if (0>=quantiteSelect+val){
            addToast("Vous ne pouvez pas séléctionner une valeur négative", "warn", 1500)
        } else if (quantiteSelect+val>=produit.quantiteStockMax){
            addToast("Il n'y a pas assez de stock", "warn", 1500)
        } else if (quantiteSelect>=produit.quantiteMax){
            addToast(`Vous pouvez commander maximum ${produit.quantiteMax} plats`, "warn", 1500)
        } else {
            quantiteSelect+= val
        }
    }

    function clickPanier(){
        if (quantiteSelect >0){
            produit.quantite = quantiteSelect
            addInPanier(produit)
            addToast(`${produit.quantite} ${produit.nom} ont été ajouté au panier`, "info", 1500)

            quantiteSelect=0
        }
    }
    function showInfo(){
        open = false;
        open = true;
    }
</script>
<ModalInfo produit={produit} open={open}/>
<div class="plat mx-3 mb-3 p-2 d-flex flex-column justify-content-between">
    <div class="d-flex justify-content-start align-items-center flex-wrap">
        <h2>{produit.nom}</h2>
        <div class="d-flex justify-content-between align-items-center flex-nowrap w-100">
            <h4 class="m-0">{produit.prix}€/unité</h4>
            {#if produit.vege}
                <img id={`vege${produit.id}`} src={'images/icons/vegetarien.png'} alt="vege" width="40" height="40"/>
                <Tooltip  target={`vege${produit.id}`} placement="bottom">Plat 100% végétarien !</Tooltip>
            {/if}
            {#if produit.halal}
            <img id={`halal${produit.id}`} src={'images/icons/halal.png'} alt="info" width="40" height="40"/>        
            <Tooltip  target={`halal${produit.id}`} placement="bottom">Plat sans viande ou viande halal</Tooltip>
            {/if}
            <img id={`info${produit.id}`} src={'images/icons/info.png'} alt="info" width="40" height="40" on:click={showInfo} style="cursor:pointer;"/>   
            <Tooltip  target={`info${produit.id}`} placement="bottom">Plus d'infos sur le produit en cliquant ici</Tooltip>
        </div>
    </div>
    <img src={`images/menu/${produit.photo}`} alt={produit.photo}/>
    <hr class="w-100 p-0 mx-0 mb-2 mt-auto"/>
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
        {#if produit.quantiteStockMax<=0}
            <p>Indisponible</p>
        {:else}
        <Button on:click={clickPanier} disabled={quantiteSelect==0} color="success">
            <img src={'images/icons/panier_in.png'} alt="validate" width="30" height="30"/>
        </Button>
        {/if}
    </div>  
</div>

<style>

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