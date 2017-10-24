<template>
    <div class="x-radio-group-warp">
        <slot></slot>
    </div>
</template>

<script>
    /**
     * @props
     * -name         -type           -value                                  -default
     * value         string|number                                            ''
     * placeholder   string                                                  ''
     * size          string          s / m / l                               m
     * disabled      boolean         true / false                            false
     * ...
     *
     * */
    const prefixCls = 'x-radio-group';

    export default {
        name: 'x-radio-group',
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                currentValue: this.value,
                checked: false
            };
        },
        methods: {
            handleInput(event) {
                this.$emit('input', event.target.value);
                this.setCurrentValue(event.target.value);
            },
            setCurrentValue(val) {
                if (val === this.currentValue) return;
                this.currentValue = val;
            },
            change(event) {
                if(this.disabled) {
                    return false;
                }
                this.checked = event.target.checked;
                this.$emit('input', event.target.checked);
                this.setCurrentValue(event.target.checked);
            }
        },
        watch: {
            value(val) {
                this.setCurrentValue(val);
            }
        },
        mounted() {

        }
    };
</script>
