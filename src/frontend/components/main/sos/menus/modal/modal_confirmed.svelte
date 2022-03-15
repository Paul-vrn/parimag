<script>
    import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Alert} from 'sveltestrap'
    import { prixTotal } from '../../../../../services/prix_total'
    export let open;
    export let commandeEnCours;
    export let endCommande;
</script>


<Modal isOpen={open} backdrop="static" size="lg" centered>
    <ModalHeader>Votre numéro de commande : {commandeEnCours.id} (à ne pas perdre !)</ModalHeader>
    <ModalBody>
    <p>
        Vous pouvez suivre l'évolution de votre commande dans : SOS > suivi de commandes.
    </p>
    {#if prixTotal(commandeEnCours.panier) === "0.00"}
    <p>
        Pas de payement pour votre commande, il ne vous reste plus qu'à attendre !
    </p>
    {:else}
        <Alert color="danger" class="mt-2 mb-0">
            <h4>Attention !</h4>
            Pour valider votre commande, vous devez :<br>
            Payer {prixTotal(commandeEnCours.panier)} PAF<br>
            Mettre en description votre <b>numéro de commande</b> OU commander avec le même <b>prénom NOM</b> que celui renseigner dans le formulaire précédent<br><br>
            Si vous ne le faites pas, nous ne garantirons pas la livraison et le remboursement de votre commande !
        </Alert> 
    <div class="w-100 d-flex justify-content-center">
        <Button class="w-75 mx-auto" id="but_lydia" target="_blank" href="https://lydia-app.com/form/payment/phoneform?vendor_token=6212183a37389062855264">
            Payer avec Lydia
        </Button>
    </div>
    {/if}
    </ModalBody>
    <ModalFooter>
      <Button class="colored" on:click={endCommande}>Terminer</Button>
    </ModalFooter>
</Modal>

<style>
:global(#but_lydia) {
    background-color: #217CC2 !important;
    color: white !important;
}
</style>
