<template>
    <div>
        <x-radio-group>
            <x-radio
                label="apple"
            ></x-radio>

            <x-radio
                label="apple"
            ></x-radio>

            <x-radio
                label="apple"
                :disabled="true"
            ></x-radio>
        </x-radio-group>
    </div>
</template>
<script>
import xRadio from '@/components/radio/radio';
import xRadioGroup from '@/components/radio/radio-group';
export default {
    name: 'example-radio',
    components: {
        xRadio,
        xRadioGroup
    },
    data() {
        return {};
    }
}

</script>
