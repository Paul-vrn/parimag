<script>
    import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Input} from 'sveltestrap'
    let attested = false
    export let open;
    export let nextModal;
    const toggle = () => (open = !open);
    import Svelecte from 'svelecte'
    //AIzaSyBVuuSdHqLFHATJRR29glB6hZHGENj7O8o
    let adresse = ''
    let googleIsLoaded = false
    let serviceGoogleSearch
    window.placeCallback = function () {
        console.log("c'est ready")
        googleIsLoaded = true
        const sessionToken  = new google.maps.places.AutocompleteSessionToken();
        serviceGoogleSearch = new google.maps.places.AutocompleteService();
    }
    async function searchGoogle(value){
        let res = await serviceGoogleSearch.getPlacePredictions({input:value})
        console.log(res)
        return res.predictions
    }
    function printAdresse(){
        console.log(adresse)
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
        <Input id="phone" type="tel" placeholder="numéro de téléphone" required/>
        <br/>
        <Input type="text" bind:value={adresse} palceholder="adresse"/>
        <br/>
        {#if googleIsLoaded}
        <Svelecte
            resetOnBlur
            fetchResetOnBlur
            minQuery={2}
            valueAsObject
            placeholder="adresse"
            fetchMode="auto"
            labelField="description"
            bind:value={adresse}
            fetch={searchGoogle}
        />            
        {/if}
        <br/>        
        <Button on:click={printAdresse}>oui</Button>
        <br/>
        <Input id="checkboxAttested" bind:checked={attested} type="checkbox" label="J'atteste de ...." />
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={nextModal} disabled={!attested}>Je commande</Button>
      <Button color="secondary" on:click={toggle}>Annuler</Button>
    </ModalFooter>
</Modal>
