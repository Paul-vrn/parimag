<script>
    import { onMount } from 'svelte';
    import { getProduits } from '../../../../api/produit'
    import Produit from './plat/plat.svelte'
    import Service from './service/service.svelte'
    import Boisson from './boisson/boisson.svelte'
    import {TabContent, TabPane} from 'sveltestrap'
    let produits = []
    onMount(async () => {
        const res = await getProduits();
        produits = res;
        console.log(produits)
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

<div class="produits">
    <TabContent pills>
        <TabPane tabId="Plats" tab="Plats" active>
            <div class="d-flex flex-wrap justify-content-around">
                {#each produits.filter(prod => (prod.type==="Plat" && prod.plat_du_jour) || prod.type==="Accompagnement") as produit}
                    <Produit produit={produit} {addInPanier}/>
                {/each}

                <hr class="w-100"/>
                {#each produits.filter(prod => prod.type==="Dessert") as produit}
                    <Produit produit={produit} {addInPanier}/>
                {/each}
                <hr class="w-100"/>
                {#each produits.filter(prod => prod.type==="Boisson") as produit}
                    <Boisson produit={produit} {addInPanier}/>
                {/each}
            </div>
        </TabPane>
        <TabPane tabId="Service" tab="Services">
            <div class="d-flex flex-wrap justify-content-around">
                {#each produits.filter(prod => prod.type==="Service") as service}
                    <Service service={service} {addInPanier}/>
                {/each}
            </div>
        </TabPane>
        <TabPane tabId="Goodies" tab="Goodies">
            <div class="d-flex flex-wrap justify-content-around">
                <h3>Vous pouvez le commander n'importe quand !</h3>
                {#each produits.filter(prod => prod.type==="Goodies") as goodies}
                    <Produit produit={goodies} {addInPanier}/>
                {/each}
            </div>
        </TabPane>
      </TabContent>
</div>
<style>
:global(div.produits > div.tab-content){
    border-style: solid;
    border-radius: 1em;
    height: 100%;
    min-height: 80%;
}
:global(div.produits > div.tab-content ul.nav){
    align-items: center;
    border-bottom-style: solid;
    display: flex;
}
:global(div.produits > div.tab-content ul.nav li) {
    flex: 1 1 0px;
    width: 100%;
}
:global(div.produits > div.tab-content ul.nav li a.nav-link){
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    text-align: center;
    font-family: Paris2024Regular;
    text-decoration-color: #D7C378;
    color: #D7C378;

}
:global(div.produits > div.tab-content ul.nav li a.nav-link.active){
    background-color: #D7C378;
    color: white;
}
:global(div.tab-pane){
    padding-top: 1em;
    padding-bottom: 1em;
}
div.produits {
    width: calc(100% - 550px);
    margin-left: 0.5rem!important;
    margin-bottom: 1em;
}

@media (min-width: 800px) and (max-width: 1300px){
    div.produits {
        width: calc(100% - 450px);
        margin-left: 0;
    }
}
@media screen and (max-width: 800px) {
    :global(div.produits > div.tab-content){
        width: calc(100% - 2rem);
        margin-left: 1rem !important;
        margin-right: 1rem !important;
    }
    div.produits {
        width:100%;
        margin-left: 0 !important;

    }
}

</style>