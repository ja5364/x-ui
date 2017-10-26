<template>
    <label :class="radioWarpClass">
        <span :class="radioClass">
            <span class="x-radio-inner"></span>
            <!-- input start -->
            <input
                type="radio"
                class="x-radio-input"
                :class="radioInputClass"
                :checked="checked"
                :disabled="disabled"
                :name="name"
                :value="group ? value : ''"
                @change="change"
            />
            <!-- input //end -->
        </span>

        <i class="icon-font"></i>

        <slot>{{ label }}</slot>

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
     * label
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
            },
            name: {
                type: String
            },
            selectedValue: {
                type: [String, Number, Boolean]
            },
            unselectedValue: {
                type: [String, Number, Boolean]
            }
        },
        data() {
            return {
                currentValue: this.label,
                checked: false,
                parent: this.$parent.$options.name === 'x-radio-group' ? this.$parent : null,
                group: false
            };
        },
        methods: {
            change(event) {
                if(this.disabled) { return false; } //禁用状态，终止变更
                const _checked = event.target.checked; //当前radio选中状态

                // 单选模式下，直接触发on-change，返回选中状态作为radio的值
                if(!this.parent){
                    this.checked = _checked; //设置选中状态
                    this.currentValue = this.checked; // 设置值
                    this.$emit('input', _checked);
                    this.$emit('on-change', _checked);
                    return;
                }

                //单选组模式，且label有值，通知单选组改值
                if(this.group && this.label !== undefined) {
                    this.parent.change({
                        value: this.label,
                        checked: _checked
                    });
                }

            },
            updateValue () {
                if(!this.group) {
                    this.currentValue = this.checked;
                }
//                this.currentValue = this.value === this.selectedValue;
            }
        },
        watch: {
            value() {
                this.updateValue();
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
                    {[`${prefixCls}-input-checked`]: this.checked},
                    {[`${prefixCls}-input-disabled`]: this.disabled}
                ];
            },
            radioWarpClass() {
                return [
                    [`${prefixCls}-warp`],
                    {
                    [`${prefixCls}-warp-disabled`]: this.disabled,
                    [`${prefixCls}-group-item`]: this.group
                }];
            }
        },
        mounted() {
            if (this.parent) {
                this.group = true;
            }
            !this.group ? this.updateValue() : this.parent.updateValue();

        }
    };
</script>
