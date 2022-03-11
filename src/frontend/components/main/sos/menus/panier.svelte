<script>
    export let updatePanier;
    export let resetCommande;
    export let commandeEnCours;
    import { Button, Table } from 'sveltestrap';
    function deleteElOfPanier(id){
        commandeEnCours.panier = commandeEnCours.panier.filter(elem => elem.id != id)
        updatePanier(commandeEnCours.panier)
    }

    /*  -- JS des Modals -- */
    import ModalConfirm from './modal/modal_confirm.svelte'
    import ModalConfirmed from './modal/modal_confirmed.svelte'
    import {checkPanier} from '../../../../services/checkPanier'
    import {checkTime} from '../../../../services/checkTime'
    import { addToast } from 'as-toast';
    async function commander(){
        panierCheck = checkPanier(commandeEnCours.panier)
        timeCheck = await checkTime()
        let onlyGoodies = true;
        commandeEnCours.panier.forEach(prod => {
            if (prod.type !== "Goodies"){
                onlyGoodies = false
            }            
        });
        if (onlyGoodies){
            openFirstModal = false
            openFirstModal = true
        } else {
            if (typeof panierCheck !== "boolean"){
                addToast(panierCheck, "warn", 4000)
            } else if (typeof timeCheck !== "boolean"){
                addToast(timeCheck, "warn", 4000)
            } else if (panierCheck && timeCheck){
                openFirstModal = false; // si ça reste "true", on refait passer à false puis re true pour que ça update bien le component ModalConfirm
                openFirstModal = true
            }
        }
        panierCheck = false;
        timeCheck = false;
    }
    let openFirstModal = false;
    let openSecondModal = false;
    let panierCheck = false;
    let timeCheck = false

    function nextModal(){
        openFirstModal = false;
        openSecondModal = true;
    }
    function endCommande(){
        resetCommande()
        openSecondModal = false;
    }
</script>
<ModalConfirm open={openFirstModal} {nextModal} commandeEnCours={commandeEnCours}/>
<ModalConfirmed open={openSecondModal} commandeEnCours={commandeEnCours} {endCommande}/>
<div id="panier" class="d-flex justify-content-start flex-column me-2">
    <h1 class="text-center">Panier</h1>
    <hr/>
    <div class="d-flex flex-column h-100 gap-5">
        <div>
            <h2>Plats :</h2>
            <Table responsive centered size="sm" class="w-100">
                <thead>
                    <tr class="">
                        <th>#</th>
                        <th>Nom</th>
                        <th>quantite</th>
                        <th class="text-nowrap">prix (PAF)</th>
                        <th class="w-25">supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {#each commandeEnCours.panier.filter(prod => prod.type!=="Service") as produit, i (produit.id)}
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
        </div>
        <div>
            <h2>Services :</h2>
            <Table responsive centered size="sm" class="w-100">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th class="w-25">Supprimer</th>
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
        </div>
    </div>
    <hr class="mt-auto"/>
    <Button class="ms-auto me-2 mb-2 colored" on:click={commander} disabled={commandeEnCours.panier.length ==0}>Commander</Button>
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
    height: calc(100% - 120px - 1em);
    position: fixed;
    right:0;
    margin-bottom: 1em;
    overflow: auto;
}
div#panier h2 {
    margin-left: 0.25em;
}
@media (min-width: 800px) and (max-width: 1300px){
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