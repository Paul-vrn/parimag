<script>
import { onMount } from 'svelte';
import { getListe } from '../../../api/getListe'
import Membre from './membre/membre.svelte'
let liste = [] // table qui contient le liste.json
onMount(async () => {
    const res = await getListe();
    liste = res;
	console.log(liste)
});

</script>

<main id="liste">
<!-- TODO : page de la liste -->
</main>


<style> 

main#liste {
	width: 100%;
	height: 100vh;
}
</style>
