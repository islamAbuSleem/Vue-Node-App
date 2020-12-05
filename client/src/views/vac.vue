<template>
<div class="vac">

    <form>
        <div class="title"></div>
        <div class="user-data pt-5">
            <v-alert dense text width="200" class="mt-5" type="success" v-if="dayOff.success"> Sent successully </v-alert>
            <v-alert dense text width="300" class="mt-5 d-block m-auto" type="error" v-if="dayOff.failed"> Failed, Please Check Your entry </v-alert>
            <h2 class="text-center">طلب اجازه</h2>
            <v-container class="text-center">

                <v-row>
                    <v-col class="d-flex ml-5" cols="3" sm="3">
                        <v-select :items="items" label="اجازه" v-model="dayOff.offType" reverse>
                        </v-select>
                    </v-col>
                    <v-col class="d-flex ml-auto mr-5" cols="3" sm="3">
                        <v-text-field v-model="userInfo.userId" label="رقم الموظف" readonly reverse></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3" class="ml-auto">
                        <v-menu :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="dayOff.endDate" label="تنتهي بتاريخ" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                            </template>
                            <v-date-picker v-model="dayOff.endDate" no-title></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="3" class="ml-auto">
                        <v-menu :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="dayOff.startDate" label="تبدا بتاريخ" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                            </template>
                            <v-date-picker v-model="dayOff.startDate" no-title></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="6" class="ml-auto">
                        <v-text-field label="اسم مقدم الطلب" v-model="dayOff.userName" :hint="userInfo.name" justify-right reverse></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="3">
                        <v-text-field label="اجازه لمده" v-model="dayOff.period" hint="بالايام" justify-right readonly reverse></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field v-model="userInfo.dept" label="السيد رئيس قطاع/مدير اداره" readonly reverse></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="5" class="ml-auto">
                        <v-text-field label="العوده من الاجازه ومباشره العمل من يوم" v-model="dayOff.returnDay" justify-right readonly reverse></v-text-field>
                    </v-col>
                    <v-col cols="3" class="ml-auto">
                        <v-menu :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="dayOff.returnDate" label="تاريخ العوده" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                            </template>

                            <v-date-picker v-model="dayOff.returnDate" no-title></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="4" class="ml-auto">
                        <v-text-field label="سيقوم بالعمل خلال اجازتي" v-model="dayOff.doWorkName" justify-right reverse></v-text-field>
                    </v-col>
                </v-row>

                <v-btn depressed @click="send(dayOff);upateCount(dayOff)" class="m-auto" color="primary text-center" :disabled="validated">
                    send
                </v-btn>

            </v-container>

        </div>

    </form>

</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import {
    mapActions
} from "vuex";
export default {
    data: () => ({
        valid:true,
        dayOff: {
            userId: "",
            offType: "",
            userName: "",
            startDate: "",
            endDate: "",
            dept: "",
            period: "",
            returnDay: "",
            returnDate: "",
            doWorkName: "",
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
    }),
    beforeUpdate() {
        const date1 = new Date(this.dayOff.startDate);
        const date2 = new Date(this.dayOff.endDate);
        if (date2 < date1) {
            this.dayOff.period = "inValid";
        } else {
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (isNaN(diffTime)) {
                this.dayOff.period = "";
            } else {
                this.dayOff.period = diffDays + 1;
            }
        }
        let x = new Date(this.dayOff.returnDate);
        x.getDay();
        this.dayOff.returnDay = this.days[x.getDay()];
        
        
    },
    created() {
        this.dayOff.userId = this.userInfo.userId;
        this.dayOff.dept = this.userInfo.dept;
    },
    computed: {
        ...mapGetters(["userInfo", "datOff", "response","items"]),
        validated:function(){
            let dayOffValues = Object.values(this.dayOff);
            let boolDayOffValues = dayOffValues.map(function(x){
                return !!x;
            })
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.valid = boolDayOffValues.includes(false);
            console.log(boolDayOffValues.includes(false))
            return this.valid;
        }
    },
    methods: {
        ...mapActions(["send","upateCount"]),
    //     updateDayOffCount(){
    //         if(this.dayOff.offType == this.items[0] ){
    //             // eslint-disable-next-line no-unused-vars
    //              this.userInfo.normal = +this.userInfo.normal - +this.dayOff.period;
    //         }else if(this.dayOff.offType == this.items[1] ){
    //             // eslint-disable-next-line no-unused-vars
    //             this.userInfo.urgent= +this.userInfo.urgent  - +this.dayOff.period;
    //                              console.log(this.userInfo.urgent)
    //         }
    //         console.log(this.userInfo)
    //         // eslint-disable-next-line no-undef
    //         authService.updateDayOffCount(this.userInfo.userId,this.userInfo).then(res => console.log(res))
    //     }
    },

};
</script>

<style lang="scss" scoped>
.vac {
    .user-data {
        border: 1px solid #ccc;
        background-color: #fafafa;
        border-radius: 5px;
        margin: 5%;

        .v-text-field__slot input {
            text-align: right;
        }
    }
}
</style>
