<script lang="ts">
  import { Host } from '$lib/types/host'
  import christianImage from '$lib/assets/christian.jpg'
  import jeffImage from '$lib/assets/jeff.jpg'

  export let host: Host

  let hostImage: string
  let hostImageAltText: string
  let hostName: string

  $: hostImage = host === Host.Christian ? christianImage : jeffImage
  $: hostImageAltText =
    host === Host.Christian
      ? 'Profile image of Christian Spicer, one of the two hosts of DLC.'
      : 'Profile image of Jeff Cannata, one of the two hosts of DLC.'

  $: hostName =
    host === Host.Christian ? 'Christian "Spicetradamus" Spicer' : 'Jeff "Cannasticator" Cannata'
</script>

<div class="container">
  <h2>{hostName}</h2>
  <img src={hostImage} alt={hostImageAltText} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container img {
    width: 50%;
    border-radius: 50%;
  }

  h2 {
    text-align: center;
  }
</style>
