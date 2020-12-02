<template>
<nav>
    <v-navigation-drawer v-model="drawer" app right color="" class="blue-grey lighten-4">
        <v-list dense>
            <v-list-item link class="justify-center" disabled>
                <div class="text-center">
                    <!-- <v-avatar size="150">
              <img src="" alt="" class="my-img" />
            </v-avatar> -->

                    <p class="text-center white--text mb-0 mt-3 headline avatar-title">تنكولوجيا معلومات النقل</p>
                    <p class="text-center white--text subheading avatar-title"></p>
                </div>
            </v-list-item>
            <v-row justify="center">
                <v-expansion-panels accordion>
                    <v-expansion-panel class="blue-grey lighten-3" >
                        <v-expansion-panel-header class="expansion__header grey--text text--darken-2 font-weight-bold">اجازات</v-expansion-panel-header>
                        <v-expansion-panel-content class="text-right blue-grey lighten-4 ">
                            <router-link :to="{name:'user',params:{name:userInfo.name}}" class="internal__links blue-grey--text text--darken-1 font-weight-bold">الرصيد</router-link>
                            <router-link :to="{name:'needVac'}" class="internal__links blue-grey--text text--darken-1 font-weight-bold">طلب اجازه</router-link>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel class="blue-grey lighten-3" >
                        <v-expansion-panel-header class="expansion__header grey--text text--darken-2 font-weight-bold">اذن</v-expansion-panel-header>
                        <v-expansion-panel-content class="text-right blue-grey lighten-4 ">
                            <router-link :to="{name:'ezen'}" class="internal__links blue-grey--text text--darken-1 font-weight-bold">اذن انصراف</router-link>
                            <router-link :to="{name:'duty'}" class="internal__links blue-grey--text text--darken-1 font-weight-bold">اذن ماموريه</router-link>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>

        </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped flat>
        <a class="internal__links blue-grey--text text--darken-1 font-weight-bold ml-3" @click="logout">Logout</a>
        <v-toolbar-title class="grey--text toolbar__title m-auto">
            <span class="font-weight-light text-capitalize">Workflow</span>
            <span class="text-capitalize">System</span>
        </v-toolbar-title>


        <v-btn icon>
            <v-icon></v-icon>
        </v-btn>

        <v-btn icon class="mr-5">
            <v-icon></v-icon>
        </v-btn>
                        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-auto"/>

    </v-app-bar>
</nav>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
export default {
    data: () => ({
        drawer: true,
       
    }),computed: {
        ...mapGetters(["userInfo"])
    },
    methods: {
        ...mapActions(["logout"]),
       
    },
     
};

// this.$vuetify.theme.dark = true
</script>

<style lang="scss" scoped>
.my-img {
    border: 2px solid #fff;
}

.avatar-title {
    color: #d4dbf5 !important;
    text-shadow: 0 0 12px rgb(42, 5, 58);
}

nav {
    .toolbar__title {
        margin: auto;
    }

    .expansion__header {
        width: 68%;
        margin-left: 34%;
        font-size: 20px;
    }

    .internal__links {
        display: block;
        text-align: center;
        text-decoration: none;
        margin: 15px 0;
    }
}
</style>
