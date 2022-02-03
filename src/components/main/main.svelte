<script>
import {
	Collapse,
    Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,
    Dropdown,DropdownToggle,DropdownMenu,DropdownItem
	} from 'sveltestrap'
    import Sos from './sos/menus.svelte'
    import Liste from './liste/liste.svelte'
    import Accueil from './accueil/accueil.svelte'
	import About from './about/about.svelte'
	import Menus from './sos/menus.svelte'
	import Services from './sos/services.svelte'
	import Commandes from './sos/commandes.svelte'
    let isOpen = false;
    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }
    import { viewMain } from '../../stores'
    
    function changeView(element){
        $viewMain = element.target.id
    }
</script>


<header>
    <Navbar color="light" light expand="md">
		<NavbarBrand href="/">Logo</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		  <Nav class="ms-auto" navbar>
			<NavItem>
			  <NavLink id="accueil" on:click={changeView}>Accueil</NavLink>
			</NavItem>
			<NavItem>
                <NavLink id="liste" on:click={changeView}>Liste</NavLink>
			</NavItem>
			<Dropdown nav inNavbar>
			  <DropdownToggle nav caret>SOS</DropdownToggle>
			  <DropdownMenu end>
				<DropdownItem id="menus" on:click={changeView}>Menus</DropdownItem>
				<DropdownItem id="services" on:click={changeView}>Services</DropdownItem>
				<DropdownItem divider />
				<DropdownItem id="commandes" on:click={changeView}>Suivi de commande</DropdownItem>
			  </DropdownMenu>
			</Dropdown>
			<NavItem>
                <NavLink id="about" on:click={changeView}>À propos</NavLink>
			</NavItem>
		  </Nav>
		</Collapse>
	  </Navbar>
</header>

{#if $viewMain == 'accueil'}
<Accueil/>
{:else if $viewMain == 'liste'}
<Liste/>
{:else if $viewMain == 'sos'}
<Sos/>
{:else if $viewMain == 'about'}
<About/>
{:else if $viewMain == 'menus'}
<Menus/>
{:else if $viewMain == 'services'}
<Services/>
{:else if $viewMain == 'commandes'}
<Commandes/>
{/if}


<style>
	
</style>