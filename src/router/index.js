import Vue from 'vue';
import Router from 'vue-router';
import ComponentExample from '@/example/input';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'example-input',
            component: ComponentExample
        }
    ]
});
