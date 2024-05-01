<script>
    import {prev} from "$lib/steps.store.ts";
    import {Button} from "$lib/components/ui/button";
    import {ChevronLeft} from "lucide-svelte";
</script>

<Button variant="outline" on:click={prev}>
    <ChevronLeft class="mr-1" size="17"/>
    Zurück
</Button>
