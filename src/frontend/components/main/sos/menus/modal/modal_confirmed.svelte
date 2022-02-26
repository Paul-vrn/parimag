<script>
    import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'sveltestrap'
    import { prixTotal } from '../../../../../services/prix_total'
    export let open;
    export let commandeEnCours;
    const toggle = () => {open = !open}
    function t(){
        commandeEnCours = commandeEnCours
    }
</script>


<Modal isOpen={open} backdrop="static" size="lg" centered>
    <ModalHeader>Commande effectué !</ModalHeader>
    <ModalBody>
        <p>Votre commande est passé à l'état <i>en attente de payement</i>.<br/>
        Le code identifiant de votre commande est : </p>
        <h5><b>{commandeEnCours.code}</b></h5> 
        <p>(ne le perdez pas !).<br/>
        Vous pouvez suivre l'évolution de l'état de votre commande dans ... en utilisant ce code comme référance.<br/>
        </p>
    {#if prixTotal(commandeEnCours.panier) === "0.00"}
    <p>
        Pas de payement pour votre commande, il ne vous reste plus qu'à attendre !
    </p>
    {:else}
    <p>
        Pour valider le payement de votre commande, envoyez au 0606060 le prix de votre commande ({prixTotal(commandeEnCours.panier)}€) en mettant comme titre du payement le code ci-dessus.<br/>
        Si vous ne pouvez pas faire de payement en ligne, contactez par téléphone le 0606060 pour valider que vous payerez en liquide sur place.
    </p>
    {/if}
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggle}>Terminé</Button>
    </ModalFooter>
</Modal>
