<template>
    <div class="x-switch">
        <div class="x-switch-btn" :class="{active: active, disabled: disabled}" @click="switchStatus"><span v-if="active">开</span><span v-else>关</span></div>
    </div>
</template>

<script>
    /**
     * @props
     * -name         -type           -value                                  -default
     * value         string|number                                            ''
     * size          string          s / m / l                               m
     * disabled      boolean         true / false                            false
     * ...
     *
     * */
    const prefixCls = 'x-switch';

    export default {
        name: 'x-radio-group',
        props: {
            active: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            switchStatus() {
                !this.disabled && this.$emit('handleSwitch', !this.active);
            }
        },
        watch: {
        },
        mounted() {
        }
    };
</script>
