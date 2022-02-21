<script>
	import { getContext, onMount } from "svelte";
    import {Table, Button, Input, Tooltip} from 'sveltestrap'
    import CopyToClipboard from "svelte-copy-to-clipboard";
    import {updateLivreur, getLivreurs} from '../../../api/livreur'
    import {updateCommande, deleteCommande} from '../../../api/commande'
    import { Toasts, addToast } from 'as-toast';

    export let commandes;
    export let livreurs;
    let livreursSelected = []
    const etat = {
		"LV":"Livrée",
		"EAP":"En attente de payement",
		"CPC":"Commande prise en charge"
	}
    /**
     * ✅ ça marche
     * @param commande
     */
    async function assigneLivreur(commande){
        let livreur = livreursSelected[commande.code]
        if (commande.livreurId===null){
            updateLivreur(livreur.id, {disponible:false})
            .then(res => {
                livreurs.forEach(liv => {
                    if (liv.id===livreur.id)
                        liv.disponible = false;
                })
                livreurs = [...livreurs]
            })
        } else {
            let pris_ailleurs = false;
            commandes.forEach(co => {
                if (co.livreurId===commande.livreurId && co.code!==commande.code)
                    pris_ailleurs=true;
            })
            if (!pris_ailleurs){
                updateLivreur(commande.livreurId, {disponible:true}) // rend le mec dispo si il est sur aucune autre commande après avoir été enlevé de celle-ci
                .then(res => {
                livreurs.forEach(liv => {
                    if (liv.id===commande.livreurId)
                        liv.disponible = true;
                })
                livreurs = [...livreurs]
            })
            }
            await updateLivreur(livreur.id, {disponible:false})
            .then(res => {
                livreurs.forEach(liv => {
                    if (liv.id===livreur.id)
                        liv.disponible = false;
                })
                livreurs = [...livreurs]
                addToast("Livreur mis à jour", "info", 2000)
            })
        }
        updateCommande(commande.code, {livreurId:livreur.id})
            .then(res => {
                commande = res.commande
                commandes.forEach(co => {
                if (co.code===commande.code)
                    co.livreurId=livreur.id;
                })
                commandes = [...commandes]
            })
    }
    async function validate(commande){
        updateCommande(commande.code, {etat:'CPC'})
        .then(res => {
            commande = res.commande
            commandes.forEach(co => {
                if (co.code===commande.code){
                    co.etat = 'CPC';
                }
            })
            commandes = [...commandes]
            addToast("Payement validé", "info", 2000)
        })
    }
    function livred(commande){
        if (commande.etat === "EAP"){
            addToast(`La commande doit passer par l'état "en cours de livraison"`, "warn", 4000)
            return
        }
        let livreur = livreursSelected[commande.code]
        let pris_ailleurs = false;
        commandes.forEach(co => {
                if (co.livreurId===livreur.id && co.code!==commande.code)
                    pris_ailleurs=true;
            })
        if (!pris_ailleurs){
            updateLivreur(commande.livreurId, {disponible:true}) // rend le mec dispo si il est sur aucune autre commande après avoir été enlevé de celle-ci
            .then(res => {
            livreurs.forEach(liv => {
                if (liv.id===commande.livreurId)
                    liv.disponible = true;
            })
            livreurs = [...livreurs]
            })
        }
        updateCommande(commande.code, {etat:'LV'})
        .then(res => {
            commande = res.commande
            commandes.forEach(co => {
                if (co.code===commande.code){
                    co.etat = 'LV';
                }
            })
            commandes = [...commandes]
            addToast("Commande livrée", "info", 2000)
        })
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
    async function deleteCommandes(){
        commandes.forEach(async commande => {
            if (commande.supp){
                await deleteCommande(commande.code)
            }
        })
        addToast('Suppression des commandes effectuées', 'info', 2000)
        commandes = commandes.filter(co => !co.supp)
    }
</script>

<Toasts/>
<Table bordered class="w-100" size="sm">
    <thead>
        <tr>
            <th>#</th>
            <th>etat</th>
            <th>adresse</th>
            <th>tel</th>
            <th>Valider le payement</th>
            <th>Assigner un livreur</th>
            <th>Valider la livraison</th>
            <th>Msg Discord</th>
            <th>
                <Button id="but-del" color="danger" on:click={deleteCommandes} size="sm">Del</Button>
                <Tooltip  target={"but-del"} placement="bottom">Attention ! Action irréversible</Tooltip>
            </th>
        </tr>
    </thead>
    <tbody>
        {#each commandes as commande,i (commande.code)}
            <tr>
                <th>{commande.code}</th>
                <th>
                    {etat[commande.etat]}
                </th>
                <th>{commande.adresse}</th>
                <th>{commande.tel}</th>
                <th>
                    <div class="d-flex gap-1 align-items-center justify-content-around">
                        <Button on:click={validate(commande)} color="primary" size="sm">
                            <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                        </Button>
                        {getPrix(commande)}€
                    </div>
                </th>
                <th>
                    <div class="d-flex gap-1 align-items-center">
                        <Button on:click={assigneLivreur(commande)} color="primary" disabled={['','-'].includes(livreursSelected[commande.code])} size="sm">
                            <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                        </Button>                        
                        <Input id="livreurSelect" type="select" bind:value={livreursSelected[commande.code]}>
                            <option>-</option>
                        {#each livreurs.filter(liv => liv.disponible) as livreur}
                            <option value={livreur} selected={livreur.id===commande.livreurId}>{livreur.nom}</option>
                        {/each}
                        <hr/>
                        {#each livreurs.filter(liv => !liv.disponible) as livreur}
                            <option value={livreur} selected={livreur.id===commande.livreurId}>{livreur.nom}</option>
                        {/each}
                        </Input>
                    </div>
                </th>
                <th>
                    <Button on:click={livred(commande)} color="secondary" size="sm">
                        <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                    </Button>
                </th>
                <th>
                    <CopyToClipboard text={getText(commande)} let:copy>
                        <Button on:click={copy} color="primary" size="sm">Copy</Button>
                    </CopyToClipboard>
                </th>
                <th>
                    <Input bind:checked={commande.supp} type="checkbox"/>
                </th>
            </tr>
        {/each}
    </tbody>
</Table>
<style>
tbody th, thead th {
    vertical-align: middle;
    text-align: center;
}
:global(div.form-check) {
    display: flex;
    justify-content: center;
}
:global(#livreurSelect) {
    width: 8em;
}
</style>
