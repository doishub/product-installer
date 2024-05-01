<script lang="ts">
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import {isFullscreen, modalTheme, modalTitle, setFullscreen, setTheme} from "$lib/modal.store.js";
import {Button} from "$lib/components/ui/button";
import {Bolt} from "lucide-svelte";
</script>

<div class="flex pb-2">
    <div class="flex-1 font-bold text-xl" >
        <span>{$modalTitle}</span>
    </div>
    <div class="settings">
        <DropdownMenu.Root preventScroll={false}>
            <DropdownMenu.Trigger asChild let:builder>
                <Button builders={[builder]} variant="ghost" size="icon" class="text-gray-400">
                    <Bolt size="18" />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side="bottom" align="end" sideOffset={5} class="w-44">
                <DropdownMenu.Label>Einstellungen</DropdownMenu.Label>
                <DropdownMenu.Group>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Darstellung</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent side="right" align="start" class="w-44">
                            <DropdownMenu.Label>Ansicht</DropdownMenu.Label>
                            <DropdownMenu.CheckboxItem bind:checked={$isFullscreen} onCheckedChange={(v) => setFullscreen(v)}>
                                Vollbild-Modus
                            </DropdownMenu.CheckboxItem>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Label>Theme</DropdownMenu.Label>
                            <DropdownMenu.RadioGroup bind:value={$modalTheme} onValueChange={(v) => setTheme(v)}>
                                <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
                                <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
                            </DropdownMenu.RadioGroup>
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                </DropdownMenu.Group>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
</div>
