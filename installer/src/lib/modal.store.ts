import {type Writable, writable} from "svelte/store";

export let isFullscreen: Writable<boolean> = writable(false)
export let isOpen: Writable<boolean   > = writable(false)
export let isInfoWindowOpen: Writable<boolean> = writable(false)
export let infoWindowTitle: Writable<string> = writable('')
export let infoWindowContent: Writable<string> = writable('')

export let modalTitle: Writable<string> = writable('Produktverwaltung')
export let modalTheme: Writable<string> =  writable('light')

export let language: Writable<string> = writable('de')

export const openInfoWindow = (): void => {
    isInfoWindowOpen.set(true)
}

export const closeInfoWindow = (): void => {
    infoWindowTitle.set('')
    infoWindowContent.set('')

    isInfoWindowOpen.set(false)
}

export const setInfoWindowContent = (title: string, content: string, open: boolean = false): void => {
    infoWindowTitle.set(title)
    infoWindowContent.set(content)

    if(open) {
        openInfoWindow()
    }
}

export const openModal = (): void => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '17px'

    isOpen.set(true)
}

export const closeModal = (): void => {
    document.body.style.overflow = 'auto'
    document.body.style.paddingRight = 'inherit'

    isOpen.set(false)
}

export const setTitle = (title: string): void => {
    modalTitle.set(title)
}

export const setTheme = (theme: string | undefined): void => {
    if(theme === undefined) {
        return
    }

    modalTheme.set(theme)
}

export const setFullscreen = (fullscreen: boolean | string): void => {

    if(typeof fullscreen === 'string') {
        return
    }

    console.log('Vollbild', fullscreen)

    isFullscreen.set(fullscreen)
}

export const setLanguage = (lang: string): void => {
    language.set(lang)
}
