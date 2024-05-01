<script>
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import * as Card from "$lib/components/ui/card";
    import * as Avatar from "$lib/components/ui/avatar";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import * as Sheet from "$lib/components/ui/sheet";
    import {Badge} from "$lib/components/ui/badge";
    import {EllipsisVertical} from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";
    import {Separator} from "$lib/components/ui/separator";
    import {setInfoWindowContent} from "$lib/modal.store.ts";

    export let props;
</script>

<div class="p-3 mb-1 -ml-3 -mr-3 rounded-lg md:hover:bg-muted transition-colors relative">
    <div class="flex justify-between w-full flex-wrap flex-row md:items-center">
        <div class="w-[45px] h-[45px] order-1 md:w-[4rem] md:h-[4rem]">
            <Avatar.Root class="w-full h-full rounded-sm aspect-[1/1] border">
                <Avatar.Image src="{ props.image }" alt="{ props.title }"/>
                <Avatar.Fallback class="rounded-sm">
                    <Avatar.Image src="/bundles/productinstaller/images/logo.svg" alt="PI"/>
                </Avatar.Fallback>
            </Avatar.Root>
        </div>
        <div class="flex-1 order-3 md:order-2 mt-4 md:mt-0 md:pl-4">
            <p class="text-sm font-medium leading-none pb-2">{ props.title }</p>
            <p class="text-sm text-muted-foreground line-clamp-1">{ props.description }</p>
        </div>
        <div class="flex flex-col items-start justify-center w-[calc(100%-45px-1rem)] order-2 md:pl-4 md:text-center md:order-3 md:w-auto">
            <Badge variant="registered" class="mb-1">Registriert</Badge>
            <p class="text-xs text-muted-foreground">Version 1.1.0</p>
        </div>
        <div class="absolute top-4 right-4 order-last md:flex md:flex-col md:pl-4 md:justify-center md:relative md:top-0 md:right-0">
            <DropdownMenu.Root preventScroll={false}>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button builders={[builder]} variant="ghost" size="icon" class="text-gray-400">
                        <EllipsisVertical size="17"/>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content side="bottom" align="end" class="w-44">
                    <DropdownMenu.Group>
                        <DropdownMenu.Item>
                            Produkt einrichten
                        </DropdownMenu.Item>
                        <DropdownMenu.Item on:click={() => setInfoWindowContent('Hallo', 'Content', true)}>
                            Produktinformation
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>Löschen</DropdownMenu.Item>
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </div>
</div>
<Separator class="md:hidden"/>
