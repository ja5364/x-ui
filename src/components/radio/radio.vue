<template>
    <label :class="radioWarpClass">
        <span :class="radioClass">
            <span class="x-radio-inner"></span>
            <input
                ref="radio"
                type="radio"
                class="x-radio-input"
                :class="radioInputClass"
                :checked="currentValue"
                :placeholder="placeholder"
                :disabled="disabled"
                @change="change"
            />
        </span>
        <!-- input start -->

        <i class="icon-font"></i>

        <slot>{{ label }}</slot>

        <!-- input //end -->
    </label>
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
    const prefixCls = 'x-radio';

    export default {
        name: 'x-radio',
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            label: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'm'
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
        computed: {
            radioClass() {
                return [
                    [`${prefixCls}`],
                    {
                        [`${prefixCls}-checked`]: this.checked,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-readonly`]: this.readonly
                    }
                ];
            },
            radioInputClass() {
                return [
                    {[`${prefixCls}-input-disabled`]: this.disabled}
                ];
            },
            radioWarpClass() {
                return [
                    [`${prefixCls}-warp`],
                    {
                    [`${prefixCls}-warp-disabled`]: this.disabled,
                    [`${prefixCls}-group-item`]: true
                }];
            }
        },
        mounted() {

        }
    };
</script>
