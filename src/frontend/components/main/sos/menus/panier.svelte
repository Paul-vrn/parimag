<script>
    export let updatePanier;
    export let commandeEnCours;
    import { Button, Table } from 'sveltestrap';
    function deleteElOfPanier(id){
        commandeEnCours.panier = commandeEnCours.panier.filter(elem => elem.id != id)
        updatePanier(commandeEnCours.panier)
    }

    /*  -- JS des Modals -- */
    import ModalConfirm from './modal/modal_confirm.svelte'
    import ModalConfirmed from './modal/modal_confirmed.svelte'
    function commander(){
        console.log(commandeEnCours)
        openFirstModal = false; // si ça reste "true", on refait passer à false puis re true pour que ça update bien le component ModalConfirm
        openFirstModal = true
    }
    let openFirstModal = false;
    let openSecondModal = false;
    
    function nextModal(){
        openFirstModal = false;
        openSecondModal = true;
    }
</script>
<ModalConfirm open={openFirstModal} {nextModal} commandeEnCours={commandeEnCours}/>
<ModalConfirmed open={openSecondModal} commandeEnCours={commandeEnCours}/>
<div id="panier" class="d-flex justify-content-start flex-column me-2">
    <h1 class="text-center">Panier</h1>
    <hr/>
    <h2>Plats :</h2>
    <Table responsive centered size="sm" class="w-100">
        <thead>
            <tr class="">
                <th>#</th>
                <th>Nom</th>
                <th>quantite</th>
                <th class="text-nowrap">prix (€)</th>
                <th>supprimer</th>
            </tr>
        </thead>
        <tbody>
            {#each commandeEnCours.panier.filter(prod => prod.type==="Repas") as produit, i (produit.id)}
                <tr class=" align-items-center">
                    <th>{i+1}</th>
                    <th>{produit.nom}</th>
                    <th>{produit.quantite}</th>
                    <th>{(produit.prix*produit.quantite).toFixed(2)}</th>
                    <th>
                        <Button on:click={() => deleteElOfPanier(produit.id)} color="danger">
                        <img src={'images/icons/poubelle.png'} alt="validate" width="20" height="20"/>
                    </Button>
                    </th>
                </tr>
            {/each}
        </tbody>
    </Table>
    <h2>Services :</h2>
    <Table responsive centered size="sm" class="w-100">
        <thead>
            <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Supprimer</th>
            </tr>
        </thead>
        <tbody>
            {#each commandeEnCours.panier.filter(prod => prod.type==="Service") as service, i (service.id)}
                <tr class="align-items-center">
                    <th>{i+1}</th>
                    <th>{service.nom}</th>
                    <th>
                        <Button on:click={() => deleteElOfPanier(service.id)} color="danger">
                            <img src={'images/icons/poubelle.png'} alt="validate" width="20" height="20"/>
                        </Button>    
                    </th>
                </tr>
            {/each}
        </tbody>
    </Table>
    <hr class="mt-auto"/>
    <Button class="ms-auto me-2 mb-2" color="primary" on:click={commander} disabled={commandeEnCours.panier.length ==0}>Commander</Button>
</div>


<style>
tr th {
    text-align: center;
    vertical-align:middle;
}
div#panier {
    border-style: solid;
    border-radius: 1em;
    width: 500px;
    height: 80%;
    position: fixed;
    right:0;
}
@media (min-width: 800px) and (max-width: 1015px){
    div#panier {
        width: 400px;
    }
}

@media screen and (max-width: 800px) {
    div#panier {
        width: calc(100% - 2rem);
        margin: 1rem !important;
        position:relative;
    }
}
</style>