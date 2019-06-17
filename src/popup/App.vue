<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
        <router-view @authenticated="setAuthenticated"/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false
            }
        },
        mounted() {
            this.getAuthenticated()
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }else{
                this.$router.replace({ name: "secure" });
            }
            //else we need to send router to secure area
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            getAuthenticated(){
                this.authenticated = this.background.hasAccountsCached();
            },
            logout() {
                this.background.logout();
                this.authenticated = false;
            }
        }
    }
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 360px;
        height: 720px;
        margin: auto;
        margin-right: auto;
    }
    @media screen and (min-width: 720px) {
        #app {
        width: 720px;
        height: 900px;
        margin: auto;
        margin-right: auto;
        }
    }
</style>