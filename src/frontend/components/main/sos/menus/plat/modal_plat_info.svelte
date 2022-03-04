<script>
    import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'sveltestrap'
    export let open;
    export let produit;
    const toggle = () => {open = !open}
</script>


<Modal isOpen={open} toggle={toggle} size="xl" centered>
    <ModalHeader toggle={toggle}>{produit.nom}</ModalHeader>
    <ModalBody>
        {#if produit.description !== null}
            <h3>Plus d'info sur votre produit.</h3>
            {produit.description}
        {/if}
        {#if produit.ingredients !== null}
            <h3>Ingredients :</h3>
            <ul>
            {#each produit.ingredients.split(',') as ingredient}
                <li>{ingredient}</li>
            {/each}            
            </ul>
        {/if}
    </ModalBody>
    <ModalFooter>
        Pour plus d'informations contactez nous sur notre compte <a href="https://www.facebook.com/profile.php?id=100078652846582" target="_blank">facebook</a> !
    </ModalFooter>
</Modal>
