<script>
    import { onMount } from 'svelte';
    import { getProduits } from '../../../../api/produit'
    import Produit from './produit/produit.svelte'
    let produits = []
    onMount(async () => {
        const res = await getProduits();
        produits = res;
    });

    export let updatePanier;
    export let commandeEnCours;
    function addInPanier(newProduit){
        let existe = false
        commandeEnCours.panier.forEach(produit => {
            if (produit.id == newProduit.id){
                produit.quantite = newProduit.quantite;
                existe = true
            }
        });
        if (!existe){
            commandeEnCours.panier.push(newProduit)
        }
        existe = false
        updatePanier(commandeEnCours.panier)
    }
</script>

<div class="produits d-flex flex-column">
    <div class="d-flex flex-wrap justify-content-around">
        {#each produits as produit}
            {#if produit.plat_du_jour}
                <Produit produit={produit} {addInPanier}/>
            {/if}
        {/each}
        {#each produits as produit}
            {#if produit.plat_du_jour}
                <Produit produit={produit} {addInPanier}/>
            {/if}
        {/each}
    </div>
    <hr class="w-75 mx-auto"/>
    <div class="d-flex flex-wrap justify-content-around">
        {#each produits as produit}
        {#if !produit.plat_du_jour}
            <Produit produit={produit} {addInPanier}/>
        {/if}
    {/each}
    </div>
</div>

<style>
    div.produits {
        width: calc(100% - 550px)
    }
@media screen and (max-width: 640px) {
    div.produits {
        width:100%;
    }
}

</style>