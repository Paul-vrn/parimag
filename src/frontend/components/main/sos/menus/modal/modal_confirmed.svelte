<script>
    import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'sveltestrap'
    import { prixTotal } from '../../../../../services/prix_total'
    export let open;
    export let commandeEnCours;
    export let resetCommande;

    const endCommande = () => {
        open = !open
        resetCommande()
    }

</script>


<Modal isOpen={open} backdrop="static" size="lg" centered>
    <ModalHeader>Commande effectué !</ModalHeader>
    <ModalBody>
        <div class="d-flex">
            <p>Votre commande est passé à l'état <i>en attente de payement</i>.<br/>
                Le code identifiant de votre commande est : </p>
                <h5><b>{commandeEnCours.code}</b></h5> 
                <p>(ne le perdez pas !).<br/>        
        </div>
        <p>
        Vous pouvez suivre l'évolution de l'état de votre commande dans "suivi des commandes".<br/>
        </p>
    {#if prixTotal(commandeEnCours.panier) === "0.00"}
    <p>
        Pas de payement pour votre commande, il ne vous reste plus qu'à attendre !
    </p>
    {:else}
    <p>
        Pour valider le payement de votre commande, c'est <a target="_blank" href="https://lydia-app.com/form/payment/phoneform?vendor_token=6212183a37389062855264">ici</a> 
        que ça se passe ! Mettez en description le code donné ci-dessus et comme montant le prix de la commande ({prixTotal(commandeEnCours.panier)}€) 
        <br>
        Si vous ne pouvez pas faire de payement en ligne, contactez par téléphone le 0606060 pour valider que vous payerez en liquide sur place.
    </p>
    {/if}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={endCommande}>Terminer</Button>
    </ModalFooter>
</Modal>
