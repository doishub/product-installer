<script>
    import {Button} from "$lib/components/ui/button";
    import {closeModal} from "$lib/modal.store.ts";
</script>

<Button variant="outline" on:click={closeModal}>
    Schließen
</Button>
