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
	polecurrent= liste[0]
});
polecurrent.membres
	let test = "test1"

	pole_selected = 0


</script>

<main id="liste">
	<h1 class="text-center">liste de la Benzimag {test}</h1>

</main>
<style>
:global(#liste ul.nav) {
    display: flex;
    justify-content: center;
}

</style>
