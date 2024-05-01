<script lang="ts">
    import {onMount} from "svelte";
    import {type StepProps, stepSettings, next} from "$lib/steps.store.ts";
    import {setTitle} from "$lib/modal.store.ts";
    import {Button} from "$lib/components/ui/button";
    import Step from "$lib/layout/Step.svelte";
    import Footer from "$lib/layout/Footer.svelte";
    import CloseButton from "$lib/layout/CloseButton.svelte";
    import ProductCard from "$lib/components/ProductCard.svelte";
    import {post} from "$lib/api.ts";
    import Loader from "$lib/layout/Loader.svelte";

    export let props: StepProps

    onMount(() => {
        setTitle(props.title)
    })

    stepSettings.set({
        locked: true
    })

    // Get dashboard data
    let promise = post('license_connector/products')
</script>

{#await promise}
    <Loader/>
{:then response}
    <Step>
        {#each response.data as connector }
            <div class="text-sm font-medium leading-none mb-2 mt-3 first:mt-0">
                {connector.connector.title}
            </div>

            {#each connector.products as product }
                <ProductCard props={product}/>
            {/each}
        {/each}
    </Step>

    <Footer>
        <CloseButton />
        <Button on:click={next}>
            Produkt registrieren
        </Button>
    </Footer>
{/await}
