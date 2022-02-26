<script>
    function generateUID(length){return window.btoa(Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2))).map((b) => String.fromCharCode(b)).join("")).replace(/[+/]/g, "").substring(0, length);}
    import {Table,Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Alert} from 'sveltestrap';
    import { prixTotal } from '../../../../../services/prix_total';
    import {commande} from '../../../../../services/commande'
    import { addToast } from 'as-toast';
    import Svelecte from 'svelecte';
    let attested = false
    export let open;
    export let nextModal;
    export let commandeEnCours;
    const toggle = () => (open = !open);
    /* -- Input search place --*/
    let serviceGoogleSearch, serviceGoogleDistance
    window.placeCallback = function () {
        serviceGoogleSearch = new google.maps.places.AutocompleteService();
        serviceGoogleDistance = new google.maps.DistanceMatrixService();
        
    }
    async function searchGoogle(value){
        let res = await serviceGoogleSearch.getPlacePredictions({input:value})
        return res.predictions
    }
    /* --  -- */
    function commander(){
        commandeEnCours.code = generateUID(5).toUpperCase()
        commande(commandeEnCours, serviceGoogleDistance)
        .then(() => {
            nextModal()
        })
        .catch(err => {
            console.log(err)
            addToast(err, "warn", 1500)
            toggle()
        })
    }
</script>


<svelte:head>
	<script id="gg" defer async
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVuuSdHqLFHATJRR29glB6hZHGENj7O8o&libraries=places&callback=placeCallback">
	</script>
</svelte:head>

<Modal isOpen={open} toggle={toggle} centered size="lg">
    <ModalHeader toggle={toggle}>Récapitulatif de la commande</ModalHeader>
    <ModalBody>
        <Table bordered class="w-100">
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantite</th>
                    <th>Prix/unité</th>
                </tr>
            </thead>
            <tbody>
                {#each commandeEnCours.panier as prod}
                    {#if prod.type!=="Service"}
                    <tr>
                        <th>{prod.nom}</th>
                        <th>{prod.quantite}</th>
                        <th>{prod.prix}€</th>
                    </tr>
                    {:else}
                    <tr>
                        <th>{prod.nom}</th>
                        <th></th>
                        <th>gratuit</th>
                    </tr>                        
                    {/if}    
                {/each}
            </tbody>
        </Table>
        <h3>Prix total : {prixTotal(commandeEnCours.panier)}€</h3>
        <Input id="phone" type="tel" bind:value={commandeEnCours.tel} placeholder="numéro de téléphone" required/>
        <br/>
        <div class="d-flex gap-2 align-items-center">
            <h5 class="m-0">Adresse : </h5>
            <Svelecte
                resetOnBlur
                fetchResetOnBlur
                minQuery={6}
                valueAsObject
                placeholder="Adresse"
                fetchMode="auto"
                labelField="description"
                bind:value={commandeEnCours.adresse}
                fetch={searchGoogle}
            />  
        </div>
        <Alert color="danger" class="mt-2 mb-0">
            <h4>Attention !</h4>
            Si aucune proposition ne s'affiche, c'est que l'API de googlemaps est bloqué par une extension.<br/>
            Pensez à désactiver Adblock, Ublock, Brave Shields up avant de passer commande.
        </Alert>              
        <br/> 
        <Input type="textarea" name="text" id="exampleText" bind:value={commandeEnCours.commentaire} rows="4"
        placeholder={`Ajouter un commentaire à votre commande ici.
Précisez ici la garniture que vous souhaitez dans vos crêpes (par défaut au sucre).`}/>
        <br/>
        <Input class=" justify-content-start" id="checkboxAttested" bind:checked={attested} type="checkbox" label="Je valide pouvoir payer la commande suivante à l'aide de Lydia" />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={commander} disabled={!attested}>Je commande</Button>
      <Button color="secondary" on:click={toggle}>Annuler</Button>
    </ModalFooter>
</Modal>

<style>
:global(.form-check-input){
    margin-right: 1em;
}
@media screen and (max-width: 575px) {
:global(.modal-dialog) {
        margin: 0 !important;
    }
}
</style>