<script>
import {
	Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
	} from 'sveltestrap'
    import Sos from './sos/sos.svelte'
    import Liste from './liste/liste.svelte'
    import Accueil from './accueil/accueil.svelte'
    let isOpen = false;
    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }
    import { viewMain } from '../../stores'
</script>


<header>
    <Navbar color="light" light expand="md">
		<NavbarBrand href="/">Logo</NavbarBrand>
		<NavbarToggler on:click={() => (isOpen = !isOpen)} />
		<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		  <Nav class="ms-auto" navbar>
			<NavItem>
			  <NavLink on:click={() => {$viewMain = 'accueil'}}>Accueil</NavLink>
			</NavItem>
			<NavItem>
                <NavLink on:click={() => {$viewMain = 'liste'}}>Liste</NavLink>
			</NavItem>
			<NavItem>
                <NavLink on:click={() => {$viewMain = 'about'}}>À propos du site</NavLink>
			</NavItem>
			<Dropdown nav inNavbar>
			  <DropdownToggle nav caret>SOS</DropdownToggle>
			  <DropdownMenu end>
				<DropdownItem>Menus</DropdownItem>
				<DropdownItem>Services</DropdownItem>
				<DropdownItem divider />
				<DropdownItem>Suivi de commande</DropdownItem>
			  </DropdownMenu>
			</Dropdown>
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
{/if}
