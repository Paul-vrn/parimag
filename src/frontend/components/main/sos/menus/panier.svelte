<script>
    export let updatePanier;
    export let panier;
    import { Button, Table } from 'sveltestrap';
    function deleteProduit(id){
        panier = panier.filter(produit => produit.id != id)
        updatePanier(panier)
    }

    /*  -- JS des Modals -- */
    import ModalConfirm from './modal/modal_confirm.svelte'
    import ModalConfirmed from './modal/modal_confirmed.svelte'
    function commander(){openFirstModal = true}
    let openFirstModal = false;
    let openSecondModal = false;
    
    function nextModal(){
        openFirstModal = false;
        openSecondModal = true;
    }
</script>
<ModalConfirm open={openFirstModal} {nextModal}/>
<ModalConfirmed open={openSecondModal}/>
<div id="panier" class="d-flex justify-content-start flex-column me-2">
    <h1 class="text-center">Panier</h1>
    <hr/>
    <Table striped responsive centered>
        <thead>
            <tr class="">
                <th>#</th>
                <th>Nom</th>
                <th>quantite</th>
                <th>prix</th>
                <th>supprimer</th>
            </tr>
        </thead>
        <tbody>
            {#each panier as produit, i (produit.id)}
                <tr class=" align-items-center">
                    <th>{i+1}</th>
                    <th>{produit.nom}</th>
                    <th>{produit.quantite}</th>
                    <th>{(produit.prix*produit.quantite).toFixed(2)}</th>
                    <th>
                        <Button on:click={() => deleteProduit(produit.id)} color="danger">
                        <img src={'images/icons/poubelle.png'} alt="validate" width="20" height="20"/>
                    </Button>
                    </th>
                </tr>
            {/each}
        </tbody>
    </Table>
    <Button class=" mt-auto ms-auto me-2 mb-2" on:click={commander} disabled={panier.length ==0}>Commander</Button>
</div>


<style>
tr th {
    text-align: center;
}
div#panier {
    border-style: solid;
    border-radius: 1em;
    width: 500px;
    height: 80%;
    margin-left: auto;
    position: fixed;
    right:0;
}
@media screen and (max-width: 640px) {
    div#panier {
        width:100%;
    }
}
</style>