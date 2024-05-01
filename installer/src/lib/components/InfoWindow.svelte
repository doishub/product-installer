<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet";
    import {closeInfoWindow, infoWindowContent, infoWindowTitle, isInfoWindowOpen} from "$lib/modal.store.ts";
</script>

<Sheet.Root open={$isInfoWindowOpen} preventScroll={false} portal={document.getElementById('#pi-modal')} onOpenChange={() => closeInfoWindow()}>
    <Sheet.Content class="w-2/3" side="right">
        <Sheet.Header>
            <Sheet.Title>{$infoWindowTitle}</Sheet.Title>
            <Sheet.Description>
                {$infoWindowContent}
            </Sheet.Description>
        </Sheet.Header>
    </Sheet.Content>
</Sheet.Root>
