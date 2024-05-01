<script lang="ts">
  import Header from "$lib/layout/Header.svelte";
  import Steps from "$lib/layout/Steps.svelte";
  import {isOpen, modalTheme, openModal, setLanguage} from "$lib/modal.store.ts";
  import {cn} from "$lib/utils.ts";
  import {onMount} from "svelte";
  import InfoWindow from "$lib/components/InfoWindow.svelte";

  export let language: string

  // Set language
  setLanguage(language)

  onMount(() => {
      // Detect color scheme and set theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          modalTheme.set('dark')
      }
  })
</script>

<div id="pi-modal" class={cn($isOpen ? 'is--open' : '', $modalTheme, 'font-sans')} data-lang={language}>
    <Header />
    <Steps />
    <InfoWindow/>
</div>
