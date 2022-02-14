<script>
    import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'sveltestrap'
    export let open;
    export let produit;
    const toggle = () => {open = !open}
</script>


<Modal isOpen={open} toggle={toggle} size="xl" centered>
    <ModalHeader>{produit.nom}</ModalHeader>
    <ModalBody>
        Plus d'info sur votre produit.<br/>
        {produit.description}
        <h3>Ingredients :</h3>
        {produit.ingredients}
    </ModalBody>
    <ModalFooter>
        Pour plus d'informations contactez le ....
    </ModalFooter>
</Modal>
