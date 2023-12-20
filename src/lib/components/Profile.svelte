<script lang="ts">
  import { Host } from '$lib/types/host'
  import christianImage from '$lib/assets/christian.jpg'
  import jeffImage from '$lib/assets/jeff.jpg'
  import lanaImage from '$lib/assets/lana.jpg'

  export let host: keyof typeof Host

  let hostImage: string
  let hostImageAltText: string
  let hostName: string

  const hostAltTextMap = {
    [Host.Christian]: 'Profile image of Christian Spicer, one of the two hosts of DLC.',
    [Host.Jeff]: 'Profile image of Jeff Cannata, one of the two hosts of DLC.',
    [Host.Lana]: 'Profile image of Lana Bachynski, the third chair of DLC.'
  }

  const hostImageMap = {
    [Host.Christian]: christianImage,
    [Host.Jeff]: jeffImage,
    [Host.Lana]: lanaImage
  }

  const hostNameMap = {
    [Host.Christian]: 'Christian "Spicetradamus" Spicer',
    [Host.Jeff]: 'Jeff "Cannasticator" Cannata',
    [Host.Lana]: 'Lana "Lanavoyant" Bachynski'
  }

  $: hostImage = hostImageMap[host]
  $: hostImageAltText = hostAltTextMap[host]
  $: hostName = hostNameMap[host]
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
