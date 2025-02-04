<script>
import Navbar from '@/components/Navbar.vue';
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    components: { Navbar },
    data() {
        return {
            jsonData: {},
            pendingTransactionsURL: 'http://localhost:5000/api/transactions/pending',
            // issuers: ['OK', 'Pick n Pay', 'Food Lovers', 'Choppies', 'Spar'],
        }
    },
    methods: {
        async accept() {
            console.log('Accepted')            
            const _processTransactionURL = 'http://localhost:5000/api/transactions/process'
            // console.log(this.jsonData)
            const _request = {
                uuid: this.jsonData[0]['transaction_uuid'],
                creditDebit: this.jsonData[0]['creditDebit'],
                oldBalance: this.jsonData[0]['balance'],
                amount: this.jsonData[0]['amount'],
                issuedBy: this.jsonData[0]['issuedBy']
            }
            // console.log(_request)

            await axios.put(_processTransactionURL, _request).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
            
        },

        async reject(){
            console.log('Rejected')
        }
    },
    mounted() {
        axios.get(this.pendingTransactionsURL)
            .then((response) => {
                this.jsonData = response.data
                console.log(this.jsonData)
            })
    }
}
</script>

<template>
    <div class="mb-10">
        <Navbar></Navbar>
    </div>
    <div>
        <h1 class="text-3xl font-bold mb-10">
            <center>Redeem</center>
        </h1>
    </div>
    <div>
        <table class="ml-auto mr-auto mb-10">
            <thead>
                <tr class="font-bold">
                    <td>ID</td>
                    <td>UUID</td>
                    <td>Account Number</td>
                    <td>Username</td>
                    <td>Description</td>
                    <td>Credit/Debit</td>
                    <td>Amount</td>
                    <td>Status</td>
                    <td>Balance</td>
                    <td>IssuedBy</td>
                    <td>CreatedAt</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in jsonData" :key="data">
                    <td>{{ data['id'] }}</td>
                    <td>{{ data['transaction_uuid'] }}</td>
                    <td>{{ data['accountNumber'] }}</td>
                    <td>{{ data['username'] }}</td>
                    <td>{{ data['description'] }}</td>
                    <td>{{ data['creditDebit'] }}</td>
                    <td>{{ data['amount'] }}</td>
                    <td>{{ data['status'] }}</td>
                    <td>{{ data['balance'] }}</td>
                    <td>{{ data['issuedBy'] }}</td>
                    <td>{{ data['createdAt'] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <section class="bg-white w-auto mx-60 my-30">         -->
    <div class="flex justify-center space-x-4">
        <!-- <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >Accept</button>
            <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full focus:outline-none focus:shadow-outline"
            >Decline</button> -->
        <button @click="accept" class="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full">Accept</button>
        <button @click="reject" class="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full">Decline</button>
    </div>
    <!-- </section> -->
</template>

<style>
th,
td {
    padding-inline: 10px;
}
</style>
