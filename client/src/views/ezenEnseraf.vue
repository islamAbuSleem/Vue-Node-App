<template>
<div class="duty" dir="rtl">
    <form action="" method="POST">
        <h2 class="text-center">إذن</h2>
        <v-row>
            
            <v-col cols="12" sm="3" class="ml-auto">
                <v-text-field v-model="userInfo.userId" readonly label="كود الموظف" justify-right reverse></v-text-field>

            </v-col>
            <v-col cols="12" sm="6" class="ml-auto">
                <v-text-field v-model="ezen.userName" label="اسم مقدم الطلب" :hint="userInfo.userName" justify-right reverse></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
                        <v-text-field v-model="userInfo.dept" label="الاداره" readonly reverse></v-text-field>
                
            </v-col>
        </v-row>
        <h3 class="text-right">ارجو من سيادتكم التكرم بالموافقه علي اذن</h3>

        <v-row>
 

                <v-col cols="12" sm="3" class="ml-auto">
                <v-menu :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="ezen.date" label=" بتاريخ" persistent-hint prepend-icon="mdi-calendar" v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>
                    <v-date-picker v-model="ezen.date" no-title ></v-date-picker>
                </v-menu>
            </v-col>
                        <v-col cols="12" sm="3">
                <v-text-field label="وذلك يوم" v-model="ezen.day" readonly justify-right reverse></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
                <v-text-field label="لمده" hint="بالساعات" justify-right reverse></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
                <v-select v-model="ezen.time" :items="items" label="التوقيت" class="m-auto" reverse>
                </v-select>
            </v-col>
        </v-row>
                        <v-btn depressed @click="postEzen(ezen)" class="m-auto " color="primary text-center">
                    send
                </v-btn>
    </form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            items: ["صباحا","مساء"],
            ezen:{
                dept:'',
                userName: "",
                userId:'',
                date:'',
                time:'',
                day:'',
                type:'ezen enseraf'
            },
             days: {
            0: "الاحد",
            1: "الاثنين",
            2: "الثلاثاء",
            3: "الاربعاء",
            4: "الخميس",
            5: "الجمعه",
            6: "السبت",
        },
        }
    },
    computed: {
        ...mapGetters(["userInfo"]),
    },beforeUpdate() {
        let x = new Date(this.ezen.date);
        x.getDay();
        this.ezen.day = this.days[x.getDay()];


        this.ezen.dept = this.userInfo.dept;
        this.ezen.userId = this.userInfo.userId;
    },
    methods: {
        ...mapActions(["postEzen"])
    },

}
</script>

<style lang="scss" scoped>
.duty {
    margin: 3% auto;
    border: 1px solid #ccc;
    background-color: #fafafa;
    border-radius: 5px;
    padding: 5%;
}
</style>
