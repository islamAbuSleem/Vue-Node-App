<template>
<div class="duty">
    <form action="" method="POST">
        <h2 class="text-center">إذن ماموريه</h2>
        <v-row>
            <v-col cols="3" class="ml-auto">
                <v-select :items="means" label="الوسيله" reverse></v-select>

            </v-col>
            <v-col cols="3" class="ml-auto">
                <v-text-field :rules="rules" label="كود الموظف" justify-right reverse></v-text-field>

            </v-col>
            <v-col cols="6" class="ml-auto">
                <v-text-field :rules="rules" label="اسم مقدم الطلب" justify-right reverse></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" class="ml-auto">
                <v-text-field :rules="rules" label="الجهه" justify-right reverse></v-text-field>

            </v-col>
            <v-col cols="3" class="ml-auto">
                <v-menu v-model="menu2" :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field label="تاريخ تقديم الطلب" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>
                    <v-date-picker no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="5">
                <v-select :items="deprt" label="السيد رئيس قطاع/ مدير اداره" class="m-auto" reverse>
                </v-select>
            </v-col>
        </v-row>
        <h3 class="text-right">برجاء اعتماد قيامي بمهمه لمده</h3>
        <v-row>
            <v-col cols="3" class="ml-auto">
                <v-menu v-model="menu2" :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field label="تاريخ العوده" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>

                    <v-date-picker no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="3" class="ml-auto">
                <v-menu v-model="menu2" :close-on-content-click="true" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field label="تبدا بتاريخ" persistent-hint prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reverse></v-text-field>
                    </template>
                    <v-date-picker no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="3">
                <v-text-field :rules="rules" label=" لمده" hint="بالايام" justify-right readonly reverse></v-text-field>
            </v-col>
        </v-row>

        <v-row class="justify-center">
            <v-col cols="12" md="6">
                <v-textarea outlined name="input-7-4" label="سبب القيام بالمهمه" value=""></v-textarea>
            </v-col>
        </v-row>
    </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            means: ["قطار", "عربه الشركه", "تاكسي", "طائره"]
        }
    }
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
