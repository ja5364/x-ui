<template>
    <div class="x-input-warp" :class="warpClass">
        <!-- type是text start -->
        <template v-if="type === 'text' || type === 'password'">
            <!-- 前置内容 start -->
            <div v-if="prepend" class="x-input-prepend"><slot name="prepend"></slot></div>
            <!-- 前置内容 //end -->

            <!-- 输入框主体内容 start -->
            <div class="x-input-inner-warp">
                <!-- 清除内容按钮 start -->
                <transition name="fade">
                    <i v-show="cleanable && value!==''" class="x-input-icon icon-btn icon-font icon-close-fill-bold icon-font14" @click="cleanInput()"></i>
                </transition>
                <!-- 清除内容按钮 //end -->

                <!-- 前置icon---slot方式传入 start -->
                <div v-if="prefix" class="x-input-prefix"><slot name="prefix"></slot></div>
                <!-- 前置icon //end -->

                <!-- 前置icon---通过props--prefixIcon属性传入 start -->
                <div v-if="prefixIcon && !cleanable && !prefix" class="x-input-prefix"><i class="icon-font" :class="prefixIcon"></i></div>
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
                <div v-if="suffix && !cleanable" class="x-input-suffix" @click="handleClick"><slot name="suffix"></slot></div>
                <!-- 后置icon---slot方式传入 //end -->

                <!-- 后置icon---通过props--suffixIcon属性传入 start -->
                <div v-if="suffixIcon && !cleanable && !suffix" class="x-input-suffix" @click="handleClick"><i class="icon-font" :class="suffixIcon"></i></div>
                <!-- 后置icon---通过props--suffixIcon属性传入 //end -->

            </div>
            <!-- 输入框主体内容 start -->

            <!-- 后置内容 start -->
            <div v-if="append" class="x-input-append"><slot name="append"></slot></div>
            <!-- 后置内容 //end -->

        </template>
        <!-- type是text //end -->

        <!-- type是textarea start -->
        <template v-if="type === 'textarea'">
            <div class="x-input-inner-warp">
                <!-- 清除内容按钮 start -->
                <transition name="fade">
                    <i v-show="cleanable && value!==''" class="x-input-icon icon-btn icon-font icon-close-fill-bold icon-font14" @click="cleanInput()"></i>
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
        <template v-if="type === 'number'">
            <div class="x-input-inner-warp">
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
 * max-length    number
 * min-length    number                                                  0
 * disable       boolean         true / false                            false
 * ...
 *
 * */
const prefixCls = 'x-input';
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
        handleInput (event) {
            this.$emit('input', event.target.value);
            this.setCurrentValue(event.target.value);
        },
        handleEnter (event) {
            this.$emit('on-enter', event);
        },
        handleClick (event) {
            this.$emit('on-click', event);
        },
        handleFocus () {
            this.$emit('on-focus', event);
        },
        handleBlur () {
            this.$emit('on-blur', event);
        },
        handleKeyup (event) {
            // keyup 设置400ms的延迟
            if(this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.$emit('on-keyup', event);
            }, 400);
        },
        handleKeydown (event) {
            this.$emit('on-keydown', event);
        },
        handleKeypress (event) {
            this.$emit('on-keypress', event);
        },
        cleanInput(){
            this.$emit('input', '');
        },
        setCurrentValue(val){
            if (val === this.currentValue) return;
            this.currentValue = val;
        },
        focus() {
            if(this.type === 'textarea'){
                this.$refs.textarea.focus();
            }else{
                this.$refs.input.focus();
            }
        },
        blur() {
            if(this.type === 'textarea'){
                this.$refs.textarea.blur();
            }else{
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
                    [`${prefixCls}-with-suffix`]: this.suffix || this.suffixIcon
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

<style lang="less">
@white: #fff;
@fontColor: #777;
@index: #333;

@default: #dddee1;
@primary: #337ab7;
@info: #269abc;
@success: #398439;
@warning: #d58512;
@danger: #ac2925;
@disabled: #efefef;
@readonly: #efefef;
@borderRadius: 4px;

.x-input-warp {
    display: inline-block;
    width:100%;
    position: relative;
    vertical-align: middle;

    .x-input-prepend, .x-input-append{
        padding: 0 5px;
        background: #efefef;
        border: 1px solid @default;
        box-sizing: border-box;
    }

    /*  */
    .x-input-prepend{
        border-right: none;
        border-top-left-radius: @borderRadius;
        border-bottom-left-radius: @borderRadius;
    }
    .x-input-append {
        border-left: none;
        border-top-right-radius: @borderRadius;
        border-bottom-right-radius: @borderRadius;
    }
    .x-input-inner-warp {
        position: relative;

        /* 输入框前置图标 */
        .x-input-prefix {
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            color: @fontColor;
        }
        /* 输入框后置图标 */
        .x-input-suffix {
            position: absolute;
            right: 0;
            top: 0;
            text-align: center;
            color: @fontColor;
        }

        /* 输入框样式 */
        .x-input {
            max-width: 100%;
            width:100%;
            vertical-align: bottom;
            border: 1px solid transparent;
            border-radius: 4px;
            background: transparent;
            color: @index;
            box-sizing: border-box;
            transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;

            &:focus {
                color: @index;
                border-color: rgba(45,140,240,.5);
                box-shadow: 0 0 0 2px rgba(45,140,240,.2);
            }
            &:hover {
                color: @index;
                border-color: rgba(45,140,240,.5);
            }

            &-s {
                height: 26px;
                padding: 2px 4px;
            }
            &-m {
                height: 30px;
                padding: 5px 8px;
            }
            &-l {
                height: 34px;
                padding: 8px 12px;
            }

            &-default {
                border-color: @default;
            }
            &-primary {
                border-color: @primary;
                color: @primary;
            }
            &-info {
                border-color: @info;
                color: @info;
            }
            &-success {
                border-color: @success;
                color: @success;
            }
            &-warning {
                border-color: @warning;
                color: @warning;
            }
            &-danger {
                border-color: @danger;
                color: @danger;
            }
            &-disabled {
                border-color: @disabled;
                color: @disabled;
                cursor: not-allowed;
            }
            &-readonly {
                border-color: @readonly;
                color: @fontColor;
                cursor: text;

                &:hover,&:focus{
                    border-color: @readonly;
                    color: @fontColor;
                    box-shadow: none;
                }
            }
        }

        textarea.x-input{
            width: 100%;
            max-width: 100%;
            height: auto;
        }

        .x-input-icon {
            position: absolute;
            right: 0;
            top: 0;
            text-align: center;
            color: @fontColor;
            &.icon-btn {
                cursor: pointer;
            }
            &.icon-btn:hover{
                color: @danger;
            }
        }
    }

    /* 输入框size，对应的icon */
    &&-s {
        .x-input-with-prefix {
            padding-left: 26px;
        }
        .x-input-with-suffix, .x-input-icon + .x-input {
            padding-right: 26px;
        }
        .x-input-icon, .x-input-prefix, .x-input-suffix {
            width: 26px;
            height: 26px;
            line-height: 26px;
        }
    }
    &&-m {
        .x-input-with-prefix {
            padding-left: 30px;
        }
        .x-input-with-suffix, .x-input-icon + .x-input {
            padding-right: 30px;
        }
        .x-input-icon, .x-input-prefix, .x-input-suffix {
            width: 30px;
            height: 30px;
            line-height: 30px;
        }
    }
    &&-l {
        .x-input-with-prefix {
            padding-left: 34px;
        }
        .x-input-with-suffix, .x-input-icon + .x-input{
            padding-right: 34px;
        }
        .x-input-icon, .x-input-prefix, .x-input-suffix {
            width: 34px;
            height: 34px;
            line-height: 34px;
        }
    }

    &&-group{
        display: table;
    }

    &&-group-prepend{
        .x-input{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
    &&-group-append{
        .x-input{
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
    &&-group .x-input-prepend,
    &&-group .x-input-append,
    &&-group .x-input-inner-warp {
        display: table-cell;
        vertical-align: middle;
    }

    &&-textarea{
        .x-input-icon {
            right: 0;
        }
        .x-input-icon + .x-input{
            padding-right: 18px !important;
        }
    }
}

</style>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0
    }
</style>
