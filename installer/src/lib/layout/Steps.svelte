<script lang="ts">
    import {currentStepIndex, getStepByIndex} from "$lib/steps.store.ts";

    $: step = getStepByIndex($currentStepIndex)
</script>

<svelte:component this={step.component} props={step} on:close />
