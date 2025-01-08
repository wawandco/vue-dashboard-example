<script>
import AppFooter from './AppFooter.vue';
import AppTopbar from './AppTopbar.vue';

export default {
    components: {
        AppFooter,
        AppTopbar
    }
};
</script>

<template>
    <div class="layout-wrapper">
        <app-topbar></app-topbar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
