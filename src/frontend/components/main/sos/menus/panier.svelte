<script>
    //export let panier;
    export let panier;
    import { Button, Modal,ModalBody,
    ModalFooter,
    ModalHeader } from 'sveltestrap';
    let open = false;
    function commander(){
        open = true
    }
    const toggle = () => (open = !open);

</script>

<div id="panier" class="d-flex justify-content-start flex-column">
    <h1 class="text-center">Panier</h1>
    <hr/>
    <div>
        {#each panier as produit, i (produit.id)}
            <div id={i}>
                {i+1} {produit.nom} {produit.quantite}
            </div>
        {/each}
    </div>

    <Button class=" mt-auto ms-auto me-2 mb-2" on:click={commander}>Commander</Button>
</div>

<Modal isOpen={open} {toggle}>
    <ModalHeader {toggle}>Modal title</ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggle}>Do Something</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
  </Modal>
<style>

div#panier {
    border-style: solid;
    border-radius: 1em;
    width: 600px;
    height: 80%;
    margin-left: auto;
    margin-right: auto;
}
@media screen and (max-width: 640px) {
    div#panier {
        width:100%;
    }
}
</style>