<script>
	console.log("0 erreurs ici ou quoient (bon j'avoue y a des erreurs à cause de l'api google et l'embed youtube)")
import {
	Collapse,
    Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,
    Dropdown,DropdownToggle,DropdownMenu,DropdownItem, Image
	} from 'sveltestrap'
    import Liste from './liste/liste.svelte'
	import ListeMobile from './liste/liste_mobile.svelte'
    import Accueil from './accueil/accueil.svelte'
	import Commander from './sos/commander.svelte'
	import Commandes from './sos/suivi_commande.svelte'
	import { getBanderole } from '../../api/banderole'
    import { viewMain } from '../../stores'
	import {Toasts} from "as-toast"
	let isOpen = false;
	let banderoleHide = false;
	let mobileView = window.innerWidth<800;
	function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }
    function changeView(event){
        $viewMain = event.target.id
		handleUpdate(event)
		window.scrollTo(0,0); 

	}
	function dropdownOpen(event){
		if (!$viewMain.includes('drop'))
			$viewMain = $viewMain + ' ' + 'drop'
	}
	const mql = window.matchMedia('(max-width: 800px)');
	mql.addEventListener('change', (e) => {
		mobileView = e.matches;
	});
	
	function checkTimess(){
		checkTime()
	}
</script>

	
<Toasts/>
<header class=" m-0 p-0 fixed-top shadow-lg">
    <Navbar color="white" light expand="md">
		<NavbarBrand href="javascript:void(0)" id="accueil" on:click={changeView} class="m-1">
			<Image alt="Logo" src={'images/logo.png'} id="accueil" class="img-fluid" width="150"/>
		</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		  <Nav class="d-flex w-100 justify-content-end" navbar>
			<NavItem  class="mx-3 rounded-2">
				<NavLink id="accueil" on:click={changeView} class={($viewMain=='accueil'?'onHit':'')}>Accueil</NavLink>
			  </NavItem>
			  <NavItem class="mx-3 rounded-2">
				  <NavLink id="liste" on:click={changeView} class={($viewMain=='liste'?'onHit':'')}>Liste</NavLink>
			  </NavItem>
			  <NavItem class="mx-3 rounded-2">
				<NavLink id="commander" on:click={changeView} class={($viewMain=='commander'?'onHit':'')}>Commander</NavLink>
			  </NavItem>
			  <NavItem class="mx-3 rounded-2">
				<NavLink id="commandes" on:click={changeView} class={($viewMain=='commandes'?'onHit':'')}>Suivi de commande</NavLink>
			  </NavItem>
			  <!--
			  <Dropdown  nav inNavbar data-bs-toggle="dropdown"  class={"mx-3 rounded-top " + (['commander' ,'commandes'].includes($viewMain)?'onHit':'')} >
			  <DropdownToggle nav caret on:click={dropdownOpen}>SOS</DropdownToggle>
			  <DropdownMenu right>
				<DropdownItem id="commander" on:click={changeView}>Commander</DropdownItem>
				<DropdownItem divider />
				<DropdownItem id="commandes" on:click={changeView}>Suivi de commande</DropdownItem>
			  </DropdownMenu>
			</Dropdown>	-->		
			</Nav>
		</Collapse>
	  </Navbar>

{#await getBanderole(1)}
	  <div id="banderole"><p>Chargement</p></div>
{:then banderole} 
{#if banderole.message !== "" && !banderoleHide}
	<div class="w-100 ps-2" id="banderole">
		<p class="parimag_font">{banderole.message}</p>
		<img src={'images/icons/cross.svg'} alt="validate" on:click={() => banderoleHide=true} width="30" height="30"/>
	</div>
{/if}	
{/await} 
</header>
{#if $viewMain.includes('accueil')}
<Accueil/>
{:else if $viewMain.includes('liste')}
	{#if !mobileView}
	 	<Liste/>
	{:else}
		<ListeMobile/>
	{/if}
{:else if $viewMain.includes('commander')}
<Commander/>
{:else if $viewMain.includes('commandes')}
<Commandes/>
{:else if $viewMain.includes('partenariat')}
<Partenariat/>
{/if}

<style>
div#banderole {
	background-color: #D7C378;
	border-style: solid;
	border-width: 0.1em;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
div#banderole p {
	text-align: center;
	width: 100%;
	margin: 0;
}
div#banderole img {
	cursor: pointer;
}
:global(.navbar-toggler:active, .navbar-toggler:focus) {
	background-color: #D7C378 !important;
	color: #D7C378 !important;
}
:global(.onHit){
	background-color: #D7C378 !important;
	border-radius: 3px;
}
:global(header li a, header li div button){
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	font-family: Paris2024VariableRegular;
	font-size: 1.4em;
	text-align: center !important;
}
:global(header li:hover){
	animation: liKeyFrame 1s forwards;
}

  @keyframes liKeyFrame {
    from {
      background-color: white;
    }
    to {
      background-color: #D7C378;
    }
  }

  :global(div.dropdown-menu.show) {
    animation: liKeyFrame 0.1s forwards;
  }

  @media (max-width: 640px) {
    :global(header li) {
      text-align: center;
    }
  }
</style>
