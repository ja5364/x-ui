/*
* created by simon on 2017/12/17
*
*/
<template>
    <div class="x-input-warp" :class="warpClass">
        <!-- type是text start -->
        <template v-if="type === 'text' || type === 'password'">
            <!-- 前置内容 start -->
            <div v-if="prepend" class="x-input-prepend">
                <slot name="prepend"></slot>
            </div>
            <!-- 前置内容 //end -->

            <!-- 输入框主体内容 start -->
            <div class="x-input-inner-warp">
                <!-- 清除内容按钮 start -->
                <transition name="fade">
                    <i v-show="cleanable && value!==''"
                       class="x-input-icon icon-btn icon-font icon-close-fill-bold icon-font14"
                       @click="cleanInput()"></i>
                </transition>
                <!-- 清除内容按钮 //end -->

                <!-- 前置icon---slot方式传入 start -->
                <div v-if="prefix" class="x-input-prefix">
                    <slot name="prefix"></slot>
                </div>
                <!-- 前置icon //end -->

                <!-- 前置icon---通过props--prefixIcon属性传入 start -->
                <div v-if="prefixIcon && !cleanable && !prefix" class="x-input-prefix"><i class="icon-font"
                                                                                          :class="prefixIcon"></i></div>
                <!-- 前置icon---通过props--prefixIcon属性传入 //end -->

                <!-- input start -->
                <input
                    ref="input"
                    :class="inputClass"
                    :type="type"
                    :value="currentValue"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :minlength="minlength"
                    :maxlength="maxlength"
                    :autocomplete="autocomplete"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keyup.enter="handleEnter"
                    @keyup="handleKeyup"
                    @keydown="handleKeydown"
                    @keypress="handleKeypress"
                />
                <!-- input //end -->

                <!-- 后置icon---slot方式传入 start -->
                <div v-if="suffix && !cleanable" class="x-input-suffix" @click="handleClick">
                    <slot name="suffix"></slot>
                </div>
                <!-- 后置icon---slot方式传入 //end -->

                <!-- 后置icon---通过props--suffixIcon属性传入 start -->
                <div v-if="suffixIcon && !cleanable && !suffix" class="x-input-suffix" @click="handleClick"><i
                    class="icon-font" :class="suffixIcon"></i></div>
                <!-- 后置icon---通过props--suffixIcon属性传入 //end -->

            </div>
            <!-- 输入框主体内容 start -->

            <!-- 后置内容 start -->
            <div v-if="append" class="x-input-append">
                <slot name="append"></slot>
            </div>
            <!-- 后置内容 //end -->

        </template>
        <!-- type是text //end -->

        <!-- type是textarea start -->
        <template v-else-if="type === 'textarea'">
            <div class="x-input-inner-warp">
                <!-- 清除内容按钮 start -->
                <transition name="fade">
                    <i v-show="cleanable && value!==''"
                       class="x-input-icon icon-btn icon-font icon-close-fill-bold icon-font14"
                       @click="cleanInput()"></i>
                </transition>
                <!-- 清除内容按钮 //end -->
                <textarea
                    ref="textarea"
                    :class="textareaClass"
                    :type="type"
                    :value="currentValue"
                    :placeholder="placeholder"
                    :rows="rows"
                    :readonly="readonly"
                    :disabled="disabled"
                    :autocomplete="autocomplete"
                    @input="handleInput">
                </textarea>
            </div>
        </template>
        <!-- type是textarea //end -->

        <!-- type是number start -->
        <template v-else-if="type === 'number'">
            <div class="x-input-inner-warp">
                <a href="javascript:" class="x-input-reduce" @click="handleReduce"><i
                    class="icon-font icon-reduce icon-font18"></i></a>
                <!-- input start -->
                <input
                    ref="number"
                    :min="min"
                    :max="max"
                    :step="step"
                    :class="inputClass"
                    :type="type"
                    :value="currentValue"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :autocomplete="autocomplete"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @keyup.enter="handleEnter"
                    @keyup="handleKeyup"
                    @keydown="handleKeydown"
                    @keypress="handleKeypress"
                />
                <!-- input //end -->
                <a href="javascript:" class="x-input-increase" @click="handleIncrease"><i
                    class="icon-font icon-increase icon-font18"></i></a>
            </div>
        </template>
        <!-- type是number //end -->
    </div>
</template>

<script>
    /**
     * @props
     * -name         -type           -value                                  -default
     * value         string|number                                            ''
     * type          string          text / password / textarea / number     text
     * placeholder   string                                                  ''
     * size          string          s / m / l                               m
     * icon          string
     * maxlength     number
     * minlength     number
     * max           number
     * min           number                                                 infinity
     * disabled      boolean         true / false                            false
     * ...
     *
     * */
    const prefixCls = 'x-input';
    import Utils from '../../utils/index';

    export default {
        name: 'x-input',
        props: {
            value: {
                type: [String, Number],
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
            prefixIcon: {
                type: String
            },
            suffixIcon: {
                type: String
            },
            size: {
                type: String,
                default: 'm'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            cleanable: {
                type: Boolean,
                default: false
            },
            rows: {
                type: Number,
                default: 2
            },
            minlength: {
                type: Number,
                default: 0
            },
            maxlength: {
                type: Number
            },
            autocomplete: {
                type: String,
                default: 'off'
            },
            min: {
                type: Number,
                default: -Infinity //负无穷大
            },
            max: {
                type: Number,
                default: Infinity //正无穷大
            },
            step: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                currentValue: this.value,
                prepend: false,
                append: false,
                prefix: false,
                suffix: false,
                timer: null
            };
        },
        methods: {
            handleInput(event) {
                this.$emit('input', event.target.value);
                this.setCurrentValue(event.target.value);
            },
            handleEnter(event) {
                this.$emit('on-enter', event);
            },
            handleClick(event) {
                this.$emit('on-click', event);
            },
            handleFocus() {
                this.$emit('on-focus', event);
            },
            handleBlur() {
                this.$emit('on-blur', event);
            },
            handleKeyup(event) {
                // keyup 设置400ms的延迟
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.$emit('on-keyup', event);
                }, 400);
            },
            handleKeydown(event) {
                this.$emit('on-keydown', event);
            },
            handleKeypress(event) {
                this.$emit('on-keypress', event);
            },
            handleIncrease() { // 增加
                let _total = Utils.math.addition(this.value, this.step);
                if (_total > this.max) {
                    return
                }
                this.$emit('input', _total);
                this.setCurrentValue(_total);
            },
            handleReduce() { // 减少
                let _total = Utils.math.subtract(this.value, this.step);
                if (_total < this.min) {
                    return
                }
                this.$emit('input', _total);
                this.setCurrentValue(_total);
            },
            cleanInput() {
                this.$emit('input', '');
            },
            setCurrentValue(val) {
                if (val === this.currentValue) return;
                this.currentValue = val;
            },
            focus() {
                if (this.type === 'textarea') {
                    this.$refs.textarea.focus();
                } else {
                    this.$refs.input.focus();
                }
            },
            blur() {
                if (this.type === 'textarea') {
                    this.$refs.textarea.blur();
                } else {
                    this.$refs.input.blur();
                }
            }
        },
        watch: {
            value(val) {
                this.setCurrentValue(val);
            }
        },
        computed: {
            inputClass() {
                return [
                    [`${prefixCls}`],
                    [`${prefixCls}-default`],
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-readonly`]: this.readonly,
                        [`${prefixCls}-with-prefix`]: this.prefix || this.prefixIcon,
                        [`${prefixCls}-with-suffix`]: this.suffix || this.suffixIcon,
                        [`${prefixCls}-with-number`]: this.type === 'number'
                    }
                ];
            },
            textareaClass() {
                return [
                    [`${prefixCls}`],
                    [`${prefixCls}-default`],
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-readonly`]: this.readonly,
                    }
                ];
            },
            warpClass() {
                return [
                    `${prefixCls}-warp-${this.size}`,
                    {
                        [`${prefixCls}-warp-textarea`]: this.type === 'textarea',
                        [`${prefixCls}-warp-group`]: this.prepend || this.append,
                        [`${prefixCls}-warp-group-prepend`]: this.prepend,
                        [`${prefixCls}-warp-group-append`]: this.append
                    }
                ];
            }
        },
        mounted() {
            if (this.type !== 'textarea') {
                this.prepend = this.$slots.prepend !== undefined;
                this.append = this.$slots.append !== undefined;
                this.prefix = this.$slots.prefix !== undefined;
                this.suffix = this.$slots.suffix !== undefined;
            } else {
                this.prepend = false;
                this.append = false;
                this.prefix = false;
                this.suffix = false;
            }
        }
    };
</script>
