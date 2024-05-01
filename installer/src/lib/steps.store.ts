import {type Writable, writable, get} from "svelte/store";
import DashboardStep from "$lib/step/DashboardStep.svelte";
import LicenseConnectorStep from "$lib/step/LicenseConnectorStep.svelte";
import type {ComponentType} from "svelte";

export enum Directions {
    NEXT,
    PREV
}

export enum StepDirectionBehavior {
    NEXT, // Cant go back
    PREV, // Cant go next
    BOTH  // Can go back and next
}

export type StepProps = {
    alias: string,
    title: string,
    component: ComponentType
}

export type StepSettings = {
    directionBehavior?: StepDirectionBehavior | undefined | null // Defines the direction behavior of the step
    locked?: boolean | undefined | null // Defines if the step is locked and cant be deleted
}

export let currentStepIndex: Writable<number> = writable(0)
export let stepSettings: Writable<StepSettings> = writable({
    directionBehavior: StepDirectionBehavior.BOTH
})

export let steps: Writable<Array<StepProps>> = writable([
    {
        alias: 'dashboard',
        title: 'Dashboard',
        component: DashboardStep
    },
    {
        alias: 'license',
        title: 'Lizenzverwaltung',
        component: LicenseConnectorStep
    }
])

export const getCurrentStep = (): StepProps => {
    return get(steps)[get(currentStepIndex)]
}

export const getStepByIndex = (stepIndex: number) => {
    return get(steps)[stepIndex]
}

export const navigate = (stepAlias: string): void => {
    const stepIndex = get(steps).findIndex(step => step.alias === stepAlias)
    currentStepIndex.set(stepIndex)
}

export const next = (): void => {
    if(!validate(Directions.NEXT)) {
        console.log('cant go next')
        return
    }

    currentStepIndex.set(get(currentStepIndex) + 1)
}

export const prev = (): void => {
    if(!validate(Directions.PREV)) {
        console.log('cant go back')
        return
    }

    currentStepIndex.set(get(currentStepIndex) - 1)
}

export const add = (step: StepProps): void => {
    steps.update(steps => [...steps, step])
}

export const remove = (stepIndex: number): void => {
    steps.update(steps => steps.filter((step, index) => index !== stepIndex))
}

function validate(direction: Directions): boolean {

    const settings = get(stepSettings);

    switch (direction) {
        case Directions.PREV:
            if(get(currentStepIndex) === 0) {
                return false
            }

            if(settings?.directionBehavior === StepDirectionBehavior.NEXT) {
                return false
            }

            break

        case Directions.NEXT:
            if(get(currentStepIndex) === get(steps).length - 1) {
                return false
            }

            if(settings?.directionBehavior === StepDirectionBehavior.PREV) {
                return false
            }

            break
    }

    // Reset defaults
    stepSettings.set({
        directionBehavior: StepDirectionBehavior.BOTH,
        locked: false
    })

    return true
}
