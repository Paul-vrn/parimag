<script>
import { Table, Button, Tooltip } from 'sveltestrap';
let commandes = []
import { onMount } from 'svelte';
import {getCommandes} from '../../../api/commande'
import { Toasts, addToast } from 'as-toast';
import {timeParse} from '../../../services/timeParse'
	onMount(async () => {
        const res = await getCommandes();
		console.log(res)
        commandes = res.filter(co => co.etat !== "LV" && co.trajets !== '{}')
		commandes.forEach(co => {
				co.trajets = JSON.parse(co.trajets)
			});
		console.log(commandes)
    });
	async function reload() {
		const res = await getCommandes()
		commandes = res.filter(co => co.etat !== "LV"  && co.trajets !== '{}')
		commandes.forEach(co => {
				co.trajets = JSON.parse(co.trajets)
			});
		addToast("reload effectué", "info", 1000)
	}

	const etat = {
		"LV":"Livrée",
		"EAP":"En attente de payement",
		"CPC":"Commande prise en charge"
	}
	
</script>

<Toasts/>
<main id="suivi">
	<Table responsive>
		<thead>
			<tr>
				<th><Button class="colored" on:click={reload}>
					<img src={'images/icons/reload.svg'} alt="reload" width="20" height="20"/>
				</Button></th>
				<th>État</th>
				<th id="TempsTrajet">Temps de trajets estimé</th>
				<Tooltip target={`TempsTrajet`}>
					<p>Le temps de trajet est calculé entre le lieu que vous avez donné et le QG le plus proche. (en utilisant l'API de Google Maps)<br>
					Ce temps ne comptabilise pas le temps de cuisine qui dépend du nombre de commandes en cours.	
					</p>
				</Tooltip>
			</tr>
		</thead>
		<tbody>
			{#each commandes as commande}
				<tr>
					<th>{commande.id}</th>
					<th>{etat[commande.etat]}</th>
					<th>{timeParse(commande.trajets[commande.QGNom])}</th>
				</tr>
			{/each}
		</tbody>
	</Table>
</main>

<style>
	tbody th, thead th {
    vertical-align: middle;
    text-align: center;
}
	main#suivi {
		margin-top: 120px;
	}
	@media screen and (max-width: 800px) {
		:global(main#suivi table) {
			width: 100%;
		}
}
</style>