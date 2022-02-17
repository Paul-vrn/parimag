<script>
	import { onMount } from "svelte";
	import { jwt, user } from '../../stores'
	onMount(async () => {
	})
    import {Button, Input} from 'sveltestrap'
	import {postQgAuth} from '../../api/qg'
	let username = "";
    let password = "";
    async function connect() {
        const res = await postQgAuth({username:username, password:password})
		console.log(res)
		return
        if (res.message.includes("Error")){
            console.log("pas réussi à se co")
            //truc à faire pop
        }
        else {
            $jwt = res.access_token
            window.location.replace('/admin')
        }
    }
</script>

<main>
	<h1>Login</h1>
    <Input type="text" placeholder="nom du qg" bind:value={username}/>
    <Input type="text" placeholder="mot de passe" bind:value={password}/>
    <Button on:click={connect}>Valider</Button>
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
