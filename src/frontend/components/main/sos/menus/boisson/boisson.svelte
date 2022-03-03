<script>
    export let produit;
    export let addInPanier;
    import {Button, Tooltip} from 'sveltestrap'
    import {Toasts, addToast} from 'as-toast'
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
            addToast(`Vous pouvez commander maximum ${produit.quantiteMax} ${produit.nom}`, "warn", 1500)
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
<div class="plat mx-3 mb-3 p-2 d-flex flex-column justify-content-between">
    <div class="haut d-flex justify-content-between align-items-center flex-wrap">
        <div class=" d-flex flex-column">
            <h2>{produit.nom}</h2>
            <h4 class="m-0">{produit.prix}€/unité</h4>    
        </div>
        <img src={`images/menu/${produit.photo}`} alt="${produit.photo}"/>
    </div>
    <p class="description_produit">{produit.description}</p>
    <div class="actions d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-1">
            <Button on:click={()=>changeQuantite(-1)} size="sm">
            <img src={'images/icons/minus.svg'} alt="minus" width="30" height="30"/>
            </Button>
            <h4 class="p-0 m-0">{quantiteSelect}</h4>
            <Button on:click={()=>changeQuantite(1)} size="sm">
                <img src={'images/icons/plus.svg'} alt="plus" width="30" height="30"/>
            </Button>
        </div>
        {#if produit.quantiteStockMax<=0}
            <p>Indisponible</p>
        {:else}
        <Button on:click={clickPanier} disabled={quantiteSelect==0} class="colored">
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
        width: 200px;
    }
    div.plat img {
        width:100%;
    }
@media screen and (max-width: 640px) {
    
  div.plat {
      width: 100%;
  }
  div.plat div.haut img {
      width: 30%;
  }
}
</style>