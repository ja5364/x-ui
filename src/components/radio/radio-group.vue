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
            currentValue: this.value
        };
    },
    methods: {
        change(data) {
            console.log(data.value,'data.value');
            this.currentValue = data.value;
            this.checked = data.checked;
            this.updateValue();
            this.$emit('input', data.value); //通知父组件改变v-model值
            this.$emit('on-change', data.value); //触发on-change事件
        },
        updateValue(){
            this.$children.forEach(item => {
                item.selected = item.label === this.currentValue;
                item.checked = item.label === this.currentValue;
                item.group = true;
            });
        }
    },
    watch: {
        value() {
            this.updateValue();
        }
    },
    mounted() {
        this.updateValue();
    }
};
</script>
