<script>
    import {next} from "$lib/steps.store.ts";
    import {Button} from "$lib/components/ui/button";
    import {ChevronRight} from "lucide-svelte";
</script>

<Button on:click={next}>
    Weiter
    <ChevronRight class="ml-1" size="17"/>
</Button>
