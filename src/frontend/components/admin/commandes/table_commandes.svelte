<script>
	import { getContext, onMount } from "svelte";
    import {Table, Button, Input} from 'sveltestrap'
    import CopyToClipboard from "svelte-copy-to-clipboard";
    export let commandes;
    export let livreurs;
    let livreursSelected = []
    function validate(){
        console.log(livreursSelected)
    }
    function livred(){

    }
    function getText(commande){
        let texte = `\`\`\`Commande "${commande.code}"\nAdresse : ${commande.adresse}\nTél : ${commande.tel}\nContenu de la commande :\n`
        commande.detail_commandes.forEach(detail => {
            texte += ` - ${detail.produit.nom} x${detail.quantite}\n`
        })
        texte += "\`\`\`"
        return texte
    }
    function getPrix(commande){
        let prix = 0;
        commande.detail_commandes.forEach(detail => {
            prix += detail.produit.prix*detail.quantite
        });
        return prix
    }
    </script>

<Table bordered class="w-100">
    <thead>
        <tr>
            <th>#</th>
            <th>etat</th>
            <th>adresse</th>
            <th>tel</th>
            <th>Valider le payement et select un livreur</th>
            <th>Valider la livraison</th>
            <th>Msg Discord</th>
        </tr>
    </thead>
    <tbody>
        {#each commandes as commande,i}
            <tr>
                <th>{commande.code}</th>
                <th>
                    {commande.etat}
                </th>
                <th>{commande.adresse}</th>
                <th>{commande.tel}</th>
                <th class="d-flex gap-1">
                <Button on:click={validate(commande)} color="primary" disabled={['','-'].includes(livreursSelected[commande.code])}>
                    <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                </Button>
                {getPrix(commande)}€
                <Input type="select" bind:value={livreursSelected[commande.code]}>
                    <option>-</option>
                    {#each livreurs.filter(liv => liv.disponible) as livreur}
                        <option>{livreur.nom}</option>
                    {/each}
                    <hr/>
                    {#each livreurs.filter(liv => !liv.disponible) as livreur}
                        <option>{livreur.nom}</option>
                    {/each}
                </Input>
                </th>
                <th>
                    <Button on:click={livred(commande)} color="secondary">
                        <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                    </Button>
                </th>
                <th>
                    <CopyToClipboard text={getText(commande)} let:copy>
                        <Button on:click={copy} color="primary">Copy</Button>
                    </CopyToClipboard>

                </th>
            </tr>
        {/each}
    </tbody>
</Table>
<style>

</style>
