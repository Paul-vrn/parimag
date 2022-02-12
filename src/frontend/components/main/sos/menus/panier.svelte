<script>
    function generateUID(length){return window.btoa(Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2))).map((b) => String.fromCharCode(b)).join("")).replace(/[+/]/g, "").substring(0, length);}
    export let updatePanier;
    export let panier;
    import { Button, Modal,ModalBody, Table, Input,
    ModalFooter,
    ModalHeader } from 'sveltestrap';
    function deleteProduit(id){
        console.log(id)
        panier = panier.filter(produit => produit.id != id)
        console.log(panier)
        updatePanier(panier)
    }

    /*  -- JS des Modals -- */
    function commander(){openFirstModal = true}
    let openFirstModal = false;
    let openSecondModal = false;
    let attested = false;
    

    const toggleFirst = () => (openFirstModal = !openFirstModal);
    const toggleSecond = () => (openSecondModal = !openSecondModal);
    function closeModal(){
        attested = false
        openFirstModal = false
    }
    function nextModal(){
        openFirstModal = false;
        openSecondModal = true;
    }
    
</script>

<div id="panier" class="d-flex justify-content-start flex-column me-2">
    <h1 class="text-center">Panier</h1>
    <hr/>
    <Table striped responsive class="">
        <thead>
            <tr>
                <th>#</th>
                <th>Nom</th>
                <th>quantite</th>
                <th>prix</th>
                <th>del</th>
            </tr>
        </thead>
        <tbody>
            {#each panier as produit, i (produit.id)}
                <tr>
                    <th>{i+1}</th>
                    <th>{produit.nom}</th>
                    <th>{produit.quantite}</th>
                    <th>{(produit.prix*produit.quantite).toFixed(2)}</th>
                    <th><Button on:click={() => deleteProduit(produit.id)}>del</Button></th>
                </tr>
            {/each}
        </tbody>
    </Table>
    <Button class=" mt-auto ms-auto me-2 mb-2" on:click={commander} disabled={panier.length ==0}>Commander</Button>
</div>

<Modal isOpen={openFirstModal} toggle={toggleFirst} size="xl" centered>
    <ModalHeader toggle={toggleFirst}>Récapitulatif de la commande</ModalHeader>
    <ModalBody>

        <Input id="checkboxAttested" bind:checked={attested} type="checkbox" label="J'atteste de ...." />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={nextModal} disabled={!attested}>Je commande</Button>
      <Button color="secondary" on:click={toggleFirst}>Annuler</Button>
    </ModalFooter>
</Modal>

<Modal isOpen={openSecondModal} toggle={toggleSecond} size="xl" centered>
    <ModalHeader toggle={toggleSecond}>Commande effectué !</ModalHeader>
    <ModalBody>
        Voici votre code secret : {generateUID(5)}<br/>
        Veuillez scanner le QRCode suivant avec lydia.<br/>
        QRCODE<br/>
        Renseignez le code secret comme titre du virement.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggleSecond}>Terminé</Button>
    </ModalFooter>
</Modal>
<style>

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