<script>
    import { onMount } from 'svelte';
    import {Table, Button, Input} from 'sveltestrap'
    import { getStocks, updateStock } from '../../../api/stock'
    import { getQGs } from '../../../api/qg'
    import { Toasts, addToast } from 'as-toast';
    import { getProduits, updateProduit } from '../../../api/produit'

    async function reload() {
        produits = await getProduits();
    }
    let qgs = []
    let rows = []
    let produits = []
    onMount(async ()=> {
        produits = await getProduits();
        qgs = await getQGs()
    })
    function submit(event){
        if (event.key === "Enter"){
            updateStock(event.target.id, {quantite:event.target.value})
            .then(res => {
                if (res.error !== undefined){
                    addToast(res.error.message, "warn", 2000)
                } else {
                    addToast("Stock bien mis à jour", "info", 2000)
                }
            })
        }
    }
    function submitMax(event){
        if (event.key === "Enter"){
            updateProduit(event.target.id, {quantiteMax:event.target.value})
            .then(res => {
                if (res.error !== undefined){
                    addToast(res.error.message, "warn", 2000)
                } else {
                    addToast("quantiteMax update", "info", 2000)
                }
            })
        }
    }

    function updatePlatDuJour(produit){
        updateProduit(produit.id, {plat_du_jour:!produit.plat_du_jour})
        .then(res => {
            produits.find(prod => prod.id===res.produit.id).plat_du_jour = res.produit.plat_du_jour
            if (res.produit.plat_du_jour){
                addToast("ce plat est maintenant un plat du jour", "info", 2000);
            } else {
                addToast("ce plat n'est plus un plat du jour", "info", 2000);
            }
        })
        .catch(err => {
            addToast(err, "warn", 2000); 
        })
    }
</script>

<Table bordered id="tableStock">
    <thead>
        <tr>
            <th>
                <Button on:click={reload} size="sm"><img src={'images/icons/reload.svg'} alt="reload" width="20" height="20"/></Button>
            </th>
            {#each qgs as qg}
                <th>{qg.nom}</th>
            {/each}
            <th>Plat du jour</th>
            <th>QuantiteMax</th>    
       </tr>
    </thead>
    <tbody>
        {#each produits.filter(prod => prod.type!=="Service") as produit, i}
            <tr>
                <th>{produit.nom}</th>
                {#each produit.stocks as stock}
                    <th><Input value={stock.quantite} id={stock.id} on:keydown={submit}/></th>
                {/each}
                {#if produit.type==="Plat"}
                <th>
                    <Button on:click={updatePlatDuJour(produit)}>update</Button>
                </th>
		{:else}
		<th></th>                    
                {/if}
		<th>
                    <Input value={produit.quantiteMax} id={produit.id} on:keydown={submitMax}/>
                </th>
            </tr>
        {/each}
    </tbody>
</Table>

<style>
    :global(table#tableStock){
        width: 80% !important;
        height: auto;
    }
    :global(table#tableStock input) {
        width:50px;
        text-align: end;
    }
</style>
