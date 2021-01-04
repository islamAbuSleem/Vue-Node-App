<template>
<div class="duty" dir="rtl">
    <form action="" method="POST">
        <h2 class="text-center">إذن ماموريه</h2>
        <v-row>

            <v-col cols="12" sm="3" class="ml-auto">
                <v-text-field label="كود الموظف" v-model="userInfo.userId" readonly justify-right reverse></v-text-field>

            </v-col>
            <v-col cols="12" sm="6" class="ml-auto">
                <v-text-field label="اسم مقدم الطلب" v-model="ezenMa2moria.userName" :hint="userInfo.name" justify-right reverse></v-text-field>
            </v-col>
                        <v-col cols="12" sm="3" class="ml-auto">
                <v-select :items="means" v-model="ezenMa2moria.means" label="الوسيله" reverse></v-select>

            </v-col>
        </v-row>
        <v-row>
                        <v-col cols="12" sm="5">
                        <v-text-field v-model="userInfo.dept" label="الاداره" readonly reverse></v-text-field>
            </v-col>
                        <v-col cols="12" sm="3" class="ml-auto">
                <v-menu :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field label="تاريخ تقديم الطلب" v-model="ezenMa2moria.date" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>
                    <v-date-picker no-title  v-model="ezenMa2moria.date" ></v-date-picker>
                </v-menu>
            </v-col>

            <v-col cols="12" sm="4" class="ml-auto">
                <v-text-field label="الجهه" justify-right reverse></v-text-field>

            </v-col>

        </v-row>
        <h3 class="text-right">برجاء اعتماد قيامي بمهمه لمده</h3>
        <v-row>
                    <v-col cols="12" sm="4" class="ml-auto">
                <v-menu :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="ezenMa2moria.startDate" label="تبدا بتاريخ" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>
                    <v-date-picker  v-model="ezenMa2moria.startDate" no-title></v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="4" class="ml-auto">
                <v-menu :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="ezenMa2moria.endDate" label="تاريخ العوده" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>

                    <v-date-picker no-title v-model="ezenMa2moria.endDate"></v-date-picker>
                </v-menu>
            </v-col>

               <v-col cols="12" sm="4">
                <v-text-field label=" لمده"  v-model="ezenMa2moria.period" hint="بالايام" justify-right readonly reverse></v-text-field>
            </v-col>
         
        </v-row>

        <v-row class="justify-center">
            <v-col cols="12" md="6">
                <v-textarea outlined v-model="ezenMa2moria.desc" name="input-7-4" label="سبب القيام بالمهمه" value=""></v-textarea>
            </v-col>
        </v-row>
                      <v-btn depressed @click="postEzen(ezenMa2moria)" class="m-auto " color="primary text-center">
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
            means: ["قطار", "عربه الشركه", "تاكسي", "طائره"],
            items: ["صباحا","مساء"],
            ezenMa2moria:{
                type:'ezen m2moria',
                dept:'',
                userName:'',
                userId:'',
                date:'',
                means:'',
                startDate:'',
                endDate:'',
                period:'',
                desc:'',
                time:"NA",
                day:"NA"
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
        const date1 = new Date(this.ezenMa2moria.startDate);
        const date2 = new Date(this.ezenMa2moria.endDate);
        if (date2 < date1) {
            this.ezenMa2moria.period = "inValid";
        } else {
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (isNaN(diffTime)) {
                this.ezenMa2moria.period = "";
            } else {
                this.ezenMa2moria.period = diffDays + 1;
            }
        }

        this.ezenMa2moria.dept = this.userInfo.dept;
        this.ezenMa2moria.userId = this.userInfo.userId;
                console.log(JSON.stringify(this.ezenMa2moria))

    },methods: {
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
