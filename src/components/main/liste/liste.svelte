<script>
import { onMount } from 'svelte';
import { getListe } from '../../../api/getListe'
import Membre from './membre/membre.svelte'
import { TabContent, TabPane } from 'sveltestrap';

let liste = []
onMount(async () => {
    const res = await getListe();
    liste = res;
	console.log(liste)
});

</script>
<main>
	<h1>liste de la Benzimag</h1>
	<TabContent>
		{#each liste as pole, index}
			<TabPane tabId={index} tab={pole.pole}>
				{#each pole.membres as membre, index}
					<Membre membre={membre}></Membre>
				{/each}
			</TabPane>
		{/each}
	</TabContent>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>