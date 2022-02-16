<script>
    import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'sveltestrap'
    export let open;
    export let commandeEnCours;
    const toggle = () => {open = !open}
    function t(){
        commandeEnCours = commandeEnCours
    }
</script>


<Modal isOpen={open} backdrop="static" size="xl" centered>
    <ModalHeader>Commande effectué !</ModalHeader>
    <ModalBody>
        Voici votre code secret : {commandeEnCours.code}<br/>
        Veuillez scanner le QRCode suivant avec lydia.<br/>
        QRCODE<br/>
        Renseignez le code secret comme titre du virement.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggle}>Terminé</Button>
    </ModalFooter>
</Modal>
