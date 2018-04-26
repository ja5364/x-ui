<template>
    <div class="component-example">
        <x-switch
            :active="active"
            @handleSwitch="handleSwitch"
        ></x-switch>
    </div>
</template>

<script>
import xSwitch from '@/components/switch/switch';
export default {
    name: 'example-switch',
    components: {
        xSwitch
    },
    methods: {
        handleSwitch(value) {
          this.active = value;
        }
    },
    data() {
        return {
            active: false
        };
    }
}
</script>
