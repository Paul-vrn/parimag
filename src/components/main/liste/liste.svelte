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

console.log("test")
</script>
<main id="liste">
	<h1 class="text-center">liste de la Benzimag</h1>
	<TabContent id="test" >
		{#each liste as pole, index}
			<TabPane tabId={index} tab={pole.pole} active={!index}>
				{#each pole.membres as membre, index}
					<Membre membre={membre}></Membre>
				{/each}
			</TabPane>
		{/each}
	</TabContent>

</main>
<style>
:global(#liste ul.nav) {
    display: flex;
    justify-content: center;
}
</style>
