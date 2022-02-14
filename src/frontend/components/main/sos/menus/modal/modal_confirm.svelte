<script>
    function generateUID(length){return window.btoa(Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2))).map((b) => String.fromCharCode(b)).join("")).replace(/[+/]/g, "").substring(0, length);}
    import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'sveltestrap'
    let attested = false
    export let open;
    export let nextModal;
    export let commandeEnCours;
    const toggle = () => (open = !open);
    import Svelecte from 'svelecte'
    //AIzaSyBVuuSdHqLFHATJRR29glB6hZHGENj7O8o

    /* -- input search place --*/
    let serviceGoogleSearch, serviceGoogleDistance
    window.placeCallback = function () {
        const sessionToken  = new google.maps.places.AutocompleteSessionToken();
        serviceGoogleSearch = new google.maps.places.AutocompleteService();
        serviceGoogleDistance = new google.maps.DistanceMatrixService();
    }
    async function searchGoogle(value){
        let res = await serviceGoogleSearch.getPlacePredictions({input:value})
        console.log(res)
        return res.predictions
    }
    /* --  -- */
    import {commande} from '../../../../../services/commande'
    function commander(){
        
        commande(commandeEnCours, serviceGoogleDistance)
        .then(res => {
            commandeEnCours.code = generateUID(5).toUpperCase()
            nextModal()
        })
        .catch(err => {
            console.log(err)
            toggle()
        })
    }
</script>

<svelte:head>
	<script defer async
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVuuSdHqLFHATJRR29glB6hZHGENj7O8o&libraries=places&callback=placeCallback">
	</script>
</svelte:head>

<Modal isOpen={open} toggle={toggle} size="xl" centered>
    <ModalHeader toggle={toggle}>Récapitulatif de la commande</ModalHeader>
    <ModalBody>
        <Input id="phone" type="tel" bind:value={commandeEnCours.tel} placeholder="numéro de téléphone" required/>
        <br/>
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
        <br/>        
        <Input id="checkboxAttested" bind:checked={attested} type="checkbox" label="J'atteste de ...." />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={commander} disabled={!attested}>Je commande</Button>
      <Button color="secondary" on:click={toggle}>Annuler</Button>
    </ModalFooter>
</Modal>
