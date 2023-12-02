<script lang="ts">
  import { Host } from '$lib/types/host'
  import christianImage from '$lib/assets/christian.jpg'
  import jeffImage from '$lib/assets/jeff.jpg'

  export let host: Host

  const hostImage = host === Host.Christian ? christianImage : jeffImage
  const hostImageAltText =
    host === Host.Christian
      ? 'Profile image of Christian Spicer, one of the two hosts of DLC.'
      : 'Profile image of Jeff Cannata, one of the two hosts of DLC.'
</script>

<div class="container">
  <img src={hostImage} alt={hostImageAltText} />
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
  }
</style>
