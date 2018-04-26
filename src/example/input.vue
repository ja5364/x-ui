<template>
    <div class="component-example">
        <router-view></router-view>
        <div class="row">
            <div class="col-3">
                <x-input
                    v-model="xInputSmall.value"
                    :placeholder="xInputSmall.placeholder"
                    :type="xInputSmall.type"
                    :size="xInputSmall.size"
                ></x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInput.value"
                    :placeholder="xInput.placeholder"
                    :type="xInput.type"
                ></x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputLarge.value"
                    :placeholder="xInputLarge.placeholder"
                    :type="xInputLarge.type"
                    :size="xInputLarge.size"
                ></x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInput.value"
                    :placeholder="'禁用的文本框'"
                    :type="xInput.type"
                    disabled
                ></x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputPrefix.value"
                    :placeholder="xInputPrefix.placeholder"
                    :type="xInputPrefix.type"
                    :prefixIcon="'icon-reload'"
                >
                    <span slot="prefix" class="icon-font icon-reload"></span>
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputSuffix.value"
                    :placeholder="xInputSuffix.placeholder"
                    :type="xInputSuffix.type"
                    :suffixIcon="'icon-reserve'"
                >
                    <span slot="suffix" class="icon-font icon-reserve"></span>
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputPrepend.value"
                    :placeholder="xInputPrepend.placeholder"
                    :type="xInputPrepend.type"
                    :size="xInputPrepend.size"
                >
                    <span slot="prepend">￥</span>
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputAppend.value"
                    :placeholder="xInputAppend.placeholder"
                    :type="xInputAppend.type"
                    :size="xInputAppend.size"
                >
                    <span slot="append">.00</span>
                </x-input>
            </div>
            <div class="col-6">
                <x-input
                    v-model="xInputPrefixSuffixPrependAppend.value"
                    :placeholder="xInputPrefixSuffixPrependAppend.placeholder"
                    :type="xInputPrefixSuffixPrependAppend.type"
                    :size="xInputPrefixSuffixPrependAppend.size"
                    :prefixIcon="'icon-reload'"
                    :suffixIcon="'icon-reserve'"
                >
                    <span slot="prepend">￥</span>
                    <span slot="append">.00</span>
                    <span slot="prefix" class="icon-font icon-reload"></span>
                    <span slot="suffix" class="icon-font icon-reserve"></span>
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInput.value"
                    clea
                >
                    <span slot="prepend">￥</span>
                    <span slot="append">.00</span>
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputReadonly.value"
                    readonly
                >
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputNumber.value"
                    :type="xInputNumber.type"
                >
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    ref="sInput"
                    v-model="xInputCleanable.value"
                    :placeholder="xInputCleanable.placeholder"
                    :type="xInputCleanable.placeholder.type"
                    :minlength="xInputCleanable.minlength"
                    :maxlength="xInputCleanable.maxlength"
                    :size="'l'"
                    @on-enter="onEnter"
                    @on-click="onClick"
                    @on-focus="onFocus"
                    @on-blur="onBlur"
                    @on-keyup="onKeyup"
                    @on-keydown="onKeydown"
                    @on-keypress="onKeypress"
                    cleanable
                >
                    <span slot="suffix" class="icon-font icon-reserve"></span>
                </x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputTextareaReadonly.value"
                    :placeholder="xInputTextareaReadonly.placeholder"
                    :type="xInputTextareaReadonly.type"
                    readonly
                ></x-input>
            </div>
            <div class="col-3">
                <x-input
                    v-model="xInputTextarea.value"
                    :placeholder="xInputTextarea.placeholder"
                    :type="xInputTextarea.type"
                    cleanable
                ></x-input>
            </div>
        </div>
    </div>
</template>

<script>
import xInput from '@/components/input/input';
export default {
    name: 'example-input',
    components: {
        xInput
    },
    methods: {
        onEnter() {
            console.log('onEnter!');
        },
        onClick() {
            console.log('onClick!');
        },
        onFocus() {
            console.log('onFocus!');
        },
        onBlur() {
            console.log('onBlur!');
        },
        onKeyup(event) {
            console.log(event);
            console.log('onKeyup');
        },
        onKeydown(event) {
            console.log(event);
            console.log('onKeydown');
        },
        onKeypress(event) {
            console.log(event);
            console.log('onKeypress');
        }
    },
    data() {
        return {
            xInputSmall: {
                value: '',
                placeholder: 'size-small',
                type: 'text',
                size: 's'
            },
            xInput: {
                value: '',
                placeholder: 'size-default',
                type: 'text'
            },
            xInputLarge: {
                value: '',
                placeholder: 'size-large',
                type: 'text',
                icon: 'icon-clock',
                size: 'l'
            },

            xInputPrefix: {
                value: '',
                placeholder: 'prefix',
                type: 'text'
            },

            xInputSuffix: {
                value: '',
                placeholder: 'suffix',
                type: 'text'
            },

            xInputPrepend: {
                value: '',
                placeholder: 'prepend',
                type: 'text'
            },

            xInputAppend: {
                value: '',
                placeholder: 'append',
                type: 'text'
            },

            xInputPrefixSuffixPrependAppend: {
                value: '',
                placeholder: 'prefix-suffix-prepend-append',
                type: 'text',
                size: 'l'
            },

            xInputCleanable: {
                value: '',
                placeholder: 'cleanable',
                type: 'text',
                minlength: 2,
                maxlength: 20,
                size: 's'
            },

            xInputReadonly: {
                value: '这里是只读内容',
                type: 'text'
            },

            xInputNumber: {
                value: 0,
                type: 'number'
            },

            xInputTextareaReadonly: {
                value: '',
                placeholder: '这里是只读内容',
                type: 'textarea'
            },

            xInputTextarea: {
                value: '',
                placeholder: '这里输入内容',
                type: 'textarea'
            }
        };
    }
}
</script>

<style>
.row {
        width: 100%;
    }
.col-3 {
    float:left;
    width: 12.5%;
    min-height:60px;
    padding: 5px;
}
.col-6 {
    float:left;
    width: 25%;
    min-height:60px;
    padding: 5px;
}
</style>
