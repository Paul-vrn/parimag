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
    DropdownItem,
    Image,
  } from "sveltestrap";
  import Sos from "./sos/menus.svelte";
  import Liste from "./liste/liste.svelte";
  import Accueil from "./accueil/accueil.svelte";
  import About from "./about/about.svelte";
  import Menus from "./sos/menus.svelte";
  import Services from "./sos/services.svelte";
  import Commandes from "./sos/commandes.svelte";
  let isOpen = false;
  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  import { viewMain } from "../../stores";

  function changeView(event) {
    $viewMain = event.target.id;
    handleUpdate(event);
  }
  function dropdownOpen(event) {
    if (!$viewMain.includes("drop")) $viewMain = $viewMain + " " + "drop";
  }
</script>

<header>
  <Navbar color="white" light expand="md" class="m-0 p-0 fixed-top shadow-lg">
    <NavbarBrand
      href="javascript:void(0)"
      id="accueil"
      on:click={changeView}
      class="m-1"
    >
      <Image
        alt="Logo"
        src={"images/logo.png"}
        id="accueil"
        class="img-fluid"
        width="150"
      />
    </NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="d-flex w-100 justify-content-end" navbar>
        <NavItem class="mx-3 rounded-2">
          <NavLink
            id="accueil"
            on:click={changeView}
            class={$viewMain == "accueil" ? "onHit" : ""}>Accueil</NavLink
          >
        </NavItem>
        <NavItem class="mx-3 rounded-2">
          <NavLink
            id="liste"
            on:click={changeView}
            class={$viewMain == "liste" ? "onHit" : ""}>Liste</NavLink
          >
        </NavItem>
        <Dropdown
          nav
          inNavbar
          data-bs-toggle="dropdown"
          class="mx-3 rounded-top"
        >
          <DropdownToggle nav caret on:click={dropdownOpen}>SOS</DropdownToggle>
          <DropdownMenu right>
            <DropdownItem id="menus" on:click={changeView}>Menus</DropdownItem>
            <DropdownItem id="services" on:click={changeView}
              >Services</DropdownItem
            >
            <DropdownItem divider />
            <DropdownItem id="commandes" on:click={changeView}
              >Suivi de commande</DropdownItem
            >
          </DropdownMenu>
        </Dropdown>
        <NavItem class="mx-3 rounded-2">
          <NavLink
            id="about"
            on:click={changeView}
            class={$viewMain == "about" ? "onHit" : ""}>À propos</NavLink
          >
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</header>
{#if $viewMain.includes("accueil")}
  <Accueil />
{:else if $viewMain.includes("liste")}
  <Liste />
{:else if $viewMain.includes("about")}
  <About />
{:else if $viewMain.includes("menus")}
  <Menus />
{:else if $viewMain.includes("services")}
  <Services />
{:else if $viewMain.includes("commandes")}
  <Commandes />
{/if}

<style>
  :global(.onHit) {
    background-color: #d7c378 !important;
    border-radius: 3px;
  }
  :global(header li a) {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  :global(header li:hover) {
    animation: liKeyFrame 1s forwards;
  }

  @keyframes liKeyFrame {
    from {
      background-color: white;
    }
    to {
      background-color: #d7c378;
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
