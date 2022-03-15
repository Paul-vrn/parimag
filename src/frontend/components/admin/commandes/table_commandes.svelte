<script>
    import { getContext, onMount } from "svelte";
    import {Table, Button, Input, Tooltip} from 'sveltestrap'
    import CopyToClipboard from "svelte-copy-to-clipboard";
    import {updateLivreur, getLivreurs} from '../../../api/livreur'
    import {updateCommande, deleteCommande} from '../../../api/commande'
    import {timeParse} from '../../../services/timeParse'
    import {addToast } from 'as-toast';
    import { getStocks, updateStock } from "../../../api/stock";
    import {getDate} from '../../../services/getDate'
    export let commandes;
    export let livreurs;
    export let qgs;
    export let updateCommandes;
    let qgDelegued = "";
    let livreursSelected = []
    let yesterday = new Date(new Date().getTime() - 6*3600*1000)
    commandes.forEach(commande => {
        if (commande.livreurId!==undefined){
            livreursSelected[commande.id] = livreurs.find(liv => liv.id===commande.livreurId)
        }
    })
    let totalLivreurs = {}
	console.log(livreursSelected)
    livreursSelected.forEach(liv => {
	if (liv===undefined){return}
	if (totalLivreurs[liv.nom]!== undefined){
		totalLivreurs[liv.nom] = totalLivreurs[liv.nom]+1	
	} else {
		totalLivreurs[liv.nom] = 0
	}
})
    console.log(totalLivreurs)
    let qgsDeleged = []
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
        let livreur = livreursSelected[commande.id]
        if (commande.livreurId===null){
            updateLivreur(livreur.id, {disponible:false})
            .then(res => {
                if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
                livreurs.forEach(liv => {
                    if (liv.id===livreur.id)
                        liv.disponible = false;
                })
                livreurs = [...livreurs]
            })
        } else {
            let pris_ailleurs = false;
            commandes.forEach(co => {
                if (co.livreurId===commande.livreurId && co.id!==commande.id)
                    pris_ailleurs=true;
            })
            if (!pris_ailleurs){
                updateLivreur(commande.livreurId, {disponible:true}) // rend le mec dispo si il est sur aucune autre commande après avoir été enlevé de celle-ci
                .then(res => {
                    if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
                livreurs.forEach(liv => {
                    if (liv.id===commande.livreurId)
                        liv.disponible = true;
                })
                livreurs = [...livreurs]
            })
            }
            await updateLivreur(livreur.id, {disponible:false})
            .then(res => {
                if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
                livreurs.forEach(liv => {
                    if (liv.id===livreur.id)
                        liv.disponible = false;
                })
                livreurs = [...livreurs]
                console.log(livreurs)
                addToast("Livreur mis à jour", "info", 2000)
            })
        }
        updateCommande(commande.id, {livreurId:livreur.id})
            .then(res => {
                if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
                commande = res.commande
                commandes.forEach(co => {
                if (co.id===commande.id)
                    co.livreurId=livreur.id;
                })
                commandes = [...commandes]
            })
        console.log(livreursSelected)
    }
    async function validate(commande){
        updateCommande(commande.id, {etat:'CPC'})
        .then(res => {
            if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
            commande = res.commande
            commandes.forEach(co => {
                if (co.id===commande.id){
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
        let livreur = livreursSelected[commande.id]
        let pris_ailleurs = false;
        commandes.forEach(co => {
                if (co.livreurId===livreur.id && co.id!==commande.id)
                    pris_ailleurs=true;
            })
        if (!pris_ailleurs){
            updateLivreur(commande.livreurId, {disponible:true}) // rend le mec dispo si il est sur aucune autre commande après avoir été enlevé de celle-ci
            .then(res => {
                if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
                livreurs.forEach(liv => {
                    if (liv.id===commande.livreurId)
                        liv.disponible = true;
                })
                livreurs = [...livreurs]
            })
        }
        updateCommande(commande.id, {etat:'LV'})
        .then(res => {
            if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
            commande = res.commande
            commandes.forEach(co => {
                if (co.id===commande.id){
                    co.etat = 'LV';
                }
            })
            commandes = [...commandes]
            addToast("Commande livrée", "info", 2000)
        })
    }
    function getText(commande){
        let texte = `Commande ${commande.id}\nPersonne : ${commande.personne}\nAdresse : ${commande.adresse}\nTél : ${commande.tel}\nContenu de la commande :\n`
        commande.detail_commandes.forEach(detail => {
            texte += `- ${detail.produit.nom} x${detail.quantite}\n`
        })
        if (commande.commentaire!==undefined && commande.commentaire!==""){
            texte += `commentaire : ${commande.commentaire}`
        }
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
                let stocks = await getStocks()
                await commande.detail_commandes.forEach(detail => {
                    let stock = stocks.find(sto => sto.produitId===detail.produitId && sto.QGNom===commande.QGNom)
                    updateStock(stock.id, {quantite:stock.quantite+detail.quantite})
                })

                let res = await deleteCommande(commande.id)
                if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
            }
        })
        addToast('Suppression des commandes effectuées', 'info', 2000)
        commandes = commandes.filter(co => !co.supp)
    }

    function changeQg(commande){
        console.log(qgDelegued)
        updateCommande(commande.id, {QGNom:qgDelegued.split(':')[0].trim()})
            .then(res => {
                if (res.error!==undefined){addToast(res.error.message, "warn", 2000);return}
                addToast("Modification effectué", "info", 2000)
                updateCommandes()
            })

    }
</script>

<Table bordered class="w-100" size="sm">
    <thead>
        <tr>
            <th>#</th>
            <th>etat</th>
            <th>personne</th>
            <th>adresse</th>
            <th>tel</th>
            <th>detail</th>
            <th>Valider le payement</th>
            <th>Assigner un livreur</th>
            <th>Valider la livraison</th>
            <th>Déléguer</th>
            <th>Msg Discord</th>
            <th id={`but-del`}>
                <Button id={`but-del`} color="danger" on:click={deleteCommandes} size="sm">Del</Button>
                <Tooltip  target={`but-del`} class="position-absolute" placement="top">Attention ! Action irréversible</Tooltip>
            </th>
        </tr>
    </thead>
    <tbody>
	{#each commandes as commande, i (commande.id)}
<!--        {#each commandes.filter(co => new Date(co.createdAt) > yesterday) as commande,i (commande.id)}-->
            <tr>
                <th>{commande.id}</th>
                <th>
                    {etat[commande.etat]}
                </th>
                <th>{commande.personne}</th>
                <th>{commande.adresse.split(',')[0]}</th>
                <th>{commande.tel}</th>
                <th>
                    <img id={`info-${commande.id}`} src={'images/icons/info.png'} alt="validate" width="20" height="20"/>
                    <Tooltip  target={`info-${commande.id}`} placement="bottom">
                        <h5 class="m-0 p-0">Panier :</h5>
                        {#each commande.detail_commandes as detail}
                            <p class="m-0 p-0">{detail.produit.nom} : {detail.produit.prix}€ x{detail.quantite}</p>
                        {/each}
                        <hr/>
                        <h5>Commentaire :</h5>
                        <p>{commande.commentaire}</p>
                        <hr/>
                        {#if commande.couverts}
                            à délivrer avec des couverts.<br>
                        {/if}
			<p>{getDate(new Date(commande.createdAt))}</p>			
                    </Tooltip>
                </th>
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
                        <Button on:click={assigneLivreur(commande)} color="primary" disabled={['','-'].includes(livreursSelected[commande.id])} size="sm">
                            <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                        </Button>                        
                        <Input id="livreurSelect" type="select" bind:value={livreursSelected[commande.id]}>
                        {#each livreurs.filter(liv => liv.disponible) as livreur}
                            <option value={livreur} disabled={livreur.id===commande.livreurId}>{livreur.nom}</option>
                        {/each}
                        <hr/>
                        {#each livreurs.filter(liv => !liv.disponible) as livreur}
                            <option value={livreur} disabled={livreur.id===commande.livreurId}>{livreur.nom}</option>
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
                    {qgs.find(qg => qg.nom===commande.QGNom).nom}
                    <div class="d-flex gap-1 align-items-center">
                        <Input type="select" name="select" id="QGs select" bind:value={qgDelegued}>
                            {#each qgs as qg}
                                <option disabled={commande.QGNom===qg.nom}>{qg.nom} : {timeParse(commande.trajets[qg.nom])}</option>
                            {/each}
                        </Input>
                        <Button on:click={changeQg(commande)} color="secondary" size="sm" >
                            <img src={'images/icons/check.svg'} alt="validate" width="20" height="20"/>
                        </Button>
                    </div>
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
