<script lang="ts">
    import {type StepProps, StepDirectionBehavior, stepSettings} from "$lib/steps.store.ts"
    import {onMount} from "svelte"
    import {setTitle} from "$lib/modal.store.ts"
    import Footer from "$lib/layout/Footer.svelte"
    import Step from "$lib/layout/Step.svelte";
    import PrevButton from "$lib/layout/PrevButton.svelte";
    import NextButton from "$lib/layout/NextButton.svelte";
    import {post} from "$lib/api.ts";

    export let props: StepProps

    onMount(() => {
        setTitle(props.title)
    })

    stepSettings.set({
        locked: true,
        directionBehavior: StepDirectionBehavior.BOTH
    })

    let promise = post('license_connector/config')
</script>

<Step>
    LICENSE!!
    {JSON.stringify(props) }
</Step>

<Footer>
    <PrevButton/>
    <NextButton/>
</Footer>
