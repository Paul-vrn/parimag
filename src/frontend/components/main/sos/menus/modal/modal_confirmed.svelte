<script>
    import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'sveltestrap'
    function generateUID(length){return window.btoa(Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2))).map((b) => String.fromCharCode(b)).join("")).replace(/[+/]/g, "").substring(0, length);}
    export let open;
    const toggle = () => {open = !open}
</script>


<Modal isOpen={open} backdrop="static" size="xl" centered>
    <ModalHeader>Commande effectué !</ModalHeader>
    <ModalBody>
        Voici votre code secret : {generateUID(5).toUpperCase()}<br/>
        Veuillez scanner le QRCode suivant avec lydia.<br/>
        QRCODE<br/>
        Renseignez le code secret comme titre du virement.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggle}>Terminé</Button>
    </ModalFooter>
</Modal>
