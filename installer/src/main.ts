import "./app.pcss";
import App from "./App.svelte";

// @ts-ignore
import {openModal} from "$lib/modal.store.ts";

// #pi-app need to exist in Contao Backend
const app = new App({
    target: document.getElementById("pi-app")!,
    props: {
        language: 'de'
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('product-installer')?.addEventListener('click', (e) => {
        e.preventDefault()
        openModal()
    })
})

export default app;
