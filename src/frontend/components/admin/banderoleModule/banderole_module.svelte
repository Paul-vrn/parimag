<script>
    import { onMount } from 'svelte';
    import {Table, Button, Input} from 'sveltestrap'
    import {addToast } from 'as-toast';
    import {getBanderole, updateBanderole} from '../../../api/banderole'


    let banderole = "";
    onMount(async () => {
        banderole = await getBanderole(1)
    })
    function submit(event){
        if (event.key === "Enter"){
            updateBanderole(1, {message:event.target.value})
            .then(res => {
                if (res.error !== undefined){
                    addToast(res.error.message, "warn", 2000)
                } else {
                    addToast("Banderole bien mis à jour", "info", 2000)
                }
            })
        }
    }
</script>
<div id="banderole" class="border p-2">
    Banderole:    <Input value={banderole.message} on:keydown={submit}/>
</div>

<style>
div#banderole {
    width: 100%;
    display: flex;
    gap: 1em;
    align-items: center ;
}
</style>