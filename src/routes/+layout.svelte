<script lang="ts">
  import type { PredictionData } from './types'
  import logo from '$lib/assets/cover_small.jpg'

  export let data: PredictionData

  const years = Object.keys(data.data)
  years.sort((a, b) => parseFloat(b) - parseFloat(a))

  function toggleOffNavMenu() {
    const checkbox = document.querySelector('#nav-menu-toggle') as HTMLInputElement
    checkbox.checked = false
  }
</script>

<nav>
  <div class="container">
    <a href="/"
      ><img
        src={logo}
        alt="Logo for DLC, a video game podcast. Click here to go to the home page"
      /></a
    >
    <input id="nav-menu-toggle" type="checkbox" />
    <label for="nav-menu-toggle" class="nav-menu-button-container">
      <div class="nav-menu-button" role="button" aria-label="Toggle navigation menu"></div>
    </label>
    <ul class="nav-menu">
      <li><a href="/leaderboard" onclick={toggleOffNavMenu}>Leaderboard</a></li>
      {#each years as year}
        <li><a href="/{year}" onclick={toggleOffNavMenu}>{year}</a></li>
      {/each}
    </ul>
  </div>
</nav>

<div class="container">
  <slot />

  <div class="footer">
    <p>
      DLC Reckoning is a fan-made, non-official site created by
      <a href="https://agmprojects.com">Aaron McLeod</a>. Not affiliated with the DLC Podcast. To
      learn more and support the podcast, check them out
      <a href="https://www.dlcpod.com/">here</a>
    </p>
  </div>
</div>

<style>
  :global(body) {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 1.2rem;
    margin: 0;
    color: #333;
  }

  :global(:root) {
    --accent-color: #ff841c;
    --cool-ranch: #004b95;
  }

  :global(h1) {
    text-align: center;
  }

  .container {
    width: 100%;
    max-width: 1000px;
    margin: auto;
  }

  nav {
    background: #040517;
    padding: 10px 0;
  }

  nav .container {
    display: flex;
  }

  /* nav styling taken from here: https://codepen.io/alvarotrigo/pen/MWEJEWG */
  .nav-menu {
    display: flex;
    list-style: none;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }

  .nav-menu li {
    margin: 0 0.5rem;
    overflow: hidden;
  }

  nav img {
    max-height: 1.8rem;
    margin-right: 1rem;
  }

  nav a {
    color: var(--accent-color);
    font-size: 1.2rem;
  }

  .nav-menu-button-container {
    display: none;
    width: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #nav-menu-toggle {
    display: none;
  }

  .nav-menu-button,
  .nav-menu-button::before,
  .nav-menu-button::after {
    cursor: pointer;
    border: 0;
    display: block;
    background-color: white;
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
  }

  .nav-menu-button::before {
    content: '';
    margin-top: -12px;
  }

  .nav-menu-button::after {
    content: '';
    margin-top: 12px;
  }

  /* these next three hide the middle bar and rotate the top & bottom to create an X */
  #nav-menu-toggle:checked + .nav-menu-button-container .nav-menu-button::before {
    margin-top: 0;
    transform: rotate(405deg);
  }

  #nav-menu-toggle:checked + .nav-menu-button-container .nav-menu-button {
    background: rgba(255, 255, 255, 0);
  }

  #nav-menu-toggle:checked + .nav-menu-button-container .nav-menu-button::after {
    margin-top: 0;
    transform: rotate(-405deg);
  }

  .footer p {
    text-align: center;
  }

  @media screen and (max-width: 1000px) {
    .container {
      width: 95%;
    }
  }

  @media screen and (max-width: 710px) {
    .nav-menu-button-container {
      display: flex;
    }

    .nav-menu {
      position: absolute;
      top: 0;
      margin-top: 50px;
      left: 0;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    #nav-menu-toggle ~ .nav-menu li {
      height: 0;
      margin: 0;
      padding: 0;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    #nav-menu-toggle:checked ~ .nav-menu li {
      height: 2rem;
      padding: 0.5rem;
      transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }

    .nav-menu li {
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0.5em 0;
      width: 100%;
      background-color: #040517;
    }
  }
</style>
