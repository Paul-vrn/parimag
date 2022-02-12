<script>
    export let produit;
    export let addInPanier;
    import {Button} from 'sveltestrap'
    produit.quantite = 0;
    let quantiteSelect = 0;
    function changeQuantite(val){
        if (0<=quantiteSelect+val && quantiteSelect+val<=10) {
            //valeur arbitraire (peut être à changer   )
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
</script>

<div class="plat mx-3 mb-3 p-2 d-flex flex-column justify-content-between">
    <div class="d-flex justify-content-center align-items-center flex-wrap">
        <h1>{produit.nom}</h1>
        <div class="d-flex justify-content-around align-items-center flex-nowrap w-75">
            <h3 class="mx-2 my-auto">{produit.prix}€/unité</h3>
            {#if produit.vegan}
                <img class="mx-2" src={'images/icons/vegetalien.png'} alt="vegan" width="50" height="50"/>
            {/if}
            <img class="mx-2" src={'images/icons/info.png'} alt="info" width="50" height="50"/>        
        </div>
    </div>
    <p class="description_produit">{produit.description}</p>
    <div class="actions d-flex align-items-center justify-content-between">
        <div>
            <Button on:click={()=>changeQuantite(-1)}>
                <img src={'images/icons/minus.png'} alt="validate" width="30" height="30"/>
            </Button>
            {quantiteSelect}
            <Button on:click={()=>changeQuantite(1)}>
                <img src={'images/icons/plus.png'} alt="validate" width="30" height="30"/>
            </Button>    
        </div>
        <Button on:click={clickPanier} disabled={quantiteSelect==0}>
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