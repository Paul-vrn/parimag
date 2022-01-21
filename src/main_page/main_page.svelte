<script>
	import { Row, Col, Button, TabContent, TabPane } from 'sveltestrap'
	import Pres from './presentation_page/presentation_page.svelte'
	import Sos from './sos_page/sos_page.svelte'
	import Liste from './liste_page/liste_page.svelte'
</script>

<main>
	<h1>Main Page</h1>
	<TabContent>
		<TabPane tabId="page_1" tab="Page1" active>
			<Pres/>
		</TabPane>

		<TabPane tabId="page_liste" tab="Liste">
			<Liste/>
		</TabPane>
		<TabPane tabId="page_sos" tab="SOS" disabled>
			<Sos/>
		</TabPane>
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