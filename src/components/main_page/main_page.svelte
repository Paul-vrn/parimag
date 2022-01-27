<script>
	import { Row, Col, Button, TabContent, TabPane } from 'sveltestrap'
	import Pres from './presentation_page/presentation_page.svelte'
	import Sos from './sos_page/sos_page.svelte'
	import Liste from './liste_page/liste_page.svelte'

	import { tabSaved } from '../../stores'
</script>

<header>
	<h1>Main Page</h1>
</header>
<main>
	<TabContent on:tab={(e) => {$tabSaved = e.detail}}>
		<TabPane tabId="page_pres" tab="Pres" active={$tabSaved=="page_pres"}>
			<Pres/>
		</TabPane>

		<TabPane tabId="page_liste" tab="Liste" active={$tabSaved=="page_liste"}>
			<Liste/>
		</TabPane>
		<TabPane tabId="page_sos" tab="SOS" active={$tabSaved=="page_sos"} disabled> 
			<Sos/>
		</TabPane>
	</TabContent>
</main>

<style>
	main,header {
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
		main,header {
			max-width: none;
		}
	}
</style>