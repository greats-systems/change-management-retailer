<script>
import Navbar from '@/components/Navbar.vue';
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import Hero from '@/components/Hero.vue';
// import { useToast } from 'vue-toastification'

export default {
    components: { Navbar, Hero },
    props: {
        title: {
            type: String,
            default: 'Checkout Form'
        }
    },
    data() {
        return {
            jsonData: {},
            request: {},
            creditDebit: null,
            pendingTransactionsURL: 'http://localhost:5000/api/transactions/pending',
            issuers: ['OK', 'Pick n Pay', 'Food Lovers', 'Choppies', 'Spar'],
            checkoutForm: reactive({
                amountPaid: null,
                subtotal: null,
                cashBack: null,
                issuedBy: 'OK',
                location: null
            })
        }
    },
    methods: {
        verify() {
            const change = parseFloat(this.checkoutForm.amountPaid) - parseFloat(this.checkoutForm.subtotal)
            var cashBack = parseFloat(Math.floor(change / 10) * 10).toFixed(2)
            var depositAmount = (change - Math.floor(change / 10) * 10).toFixed(2)
            if (change % 10 == 0) {
                if (Math.floor(depositAmount) % 5 == 0) {
                    cashBack = (Number(cashBack) + 5).toFixed(2)
                    depositAmount = parseFloat(depositAmount - 5).toFixed(2)
                }
            }
            else {
                cashBack = change.toFixed(2) - (change % 5).toFixed(2)
                depositAmount = (change % 5).toFixed(2)
            }

            const _request = {
                change: change.toFixed(2),
                cashBack: parseFloat(cashBack).toFixed(2),
                depositAmount: depositAmount,
                issuedBy: this.checkoutForm.issuedBy
            }
            this.request = _request
        },
        async submit() {
            // const toast = useToast()
            const change = parseFloat(this.checkoutForm.amountPaid) - parseFloat(this.checkoutForm.subtotal)
            var cashBack = parseFloat(Math.floor(change / 10) * 10).toFixed(2)
            var depositAmount = (change - Math.floor(change / 10) * 10).toFixed(2)
            const _processTransactionURL = 'http://localhost:5000/api/transactions/process'

            if (change % 10 == 0) {
                if (Math.floor(depositAmount) % 5 == 0) {
                    cashBack = (Number(cashBack) + 5).toFixed(2)
                    depositAmount = parseFloat(depositAmount - 5).toFixed(2)
                }
            }
            else {
                cashBack = change.toFixed(2) - (change % 5).toFixed(2)
                depositAmount = (change % 5).toFixed(2)
            }

            try {
                const _uuid = this.jsonData[0]['transaction_uuid']
                const _oldBalance = this.jsonData[0]['balance']
                const _creditDebit = this.jsonData[0]['creditDebit']

                const _request = {
                    uuid: _uuid,
                    creditDebit: _creditDebit,
                    oldBalance: _oldBalance,
                    amount: depositAmount,
                    cashBackAmount: cashBack,
                    issuedBy: `${this.checkoutForm.issuedBy} ${this.checkoutForm.location}`
                }

                await axios.put(_processTransactionURL, _request).then((response) => {
                    console.log(response.data)
                    // toast.success('Transaction processed successfully!')
                    location.reload()
                })
            }
            catch (e) {
                if (e.name == 'TypeError') {
                    // toast.warning('There are no pending transactions')
                    console.log('There are no pending transactions')
                } else {
                    // toast.error('Failed to process transaction')
                    console.log(`${e.name}\n${e.message}`)
                }
            }
        }
    },
    mounted() {
        this.request['change'] = 'Change'
        this.request['cashBack'] = 'Cashback'
        this.request['depositAmount'] = 'Deposit Amount'
        try {
            axios.get(this.pendingTransactionsURL, { timeout: 10000 })
                .then((response) => {
                    this.jsonData = response.data
                    console.log(this.jsonData)
                    if (response.data[0] != null) {
                        this.creditDebit = response.data[0]['creditDebit']
                    }
                })
        }
        catch (e) {
            console.log(e)
        }
    }


}
</script>

<template>
    <div class="mb-10">
        <Navbar></Navbar>
    </div>
    <div class="mb-10">
        <Hero title="Checkout"></Hero>
    </div>
    <div>
        <!-- <p>{{ jsonData[0].creditDebit }}</p> -->
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
            <tbody v-if="creditDebit == 'credit'">
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
    <section class="bg-white w-auto mx-60 my-30">
        <div class="container m-auto max-w-4xl">
            <div class="bg-white px-12 py-8 mb-8 shadow-md rounded-md border m-4 md:m-0">
                <div>
                    <h2 class="text-3l text-center font-semibold mb-6">{{ title }}</h2>
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <input type="number" v-model="checkoutForm.amountPaid" id="amountPaid" amountPaid="sale"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Amount paid" required>
                        <input type="number" step=".01" v-model="checkoutForm.subtotal" id="subtotal" name="subtotal"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Subtotal" required>
                    </div>
                    <div class="mb-4 grid grid-cols-2 gap-2">
                        <select v-model="checkoutForm.issuedBy" id="issuedBy" name="issuedBy"
                            class="border rounded w-full py-2 px-3">
                            <option v-for="i in issuers" :key="i">{{ i }}</option>
                        </select>
                        <input type="text" v-model="checkoutForm.location" id="location" name="location"
                            class="border rounded w-full py-2 px-3 mb-2" placeholder="Location" required>
                    </div>
                    <div class="mb-10 mt-10 grid grid-cols-2 gap-2">
                        <output>{{ request['change'] }}</output>
                        <output>{{ request['cashBack'] }}</output>
                        <output>{{ request['depositAmount'] }}</output>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button @click="verify"
                            class="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-4 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">Verify</button>
                        <button @click="submit"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
th,
td {
    padding-inline: 10px;
}
</style>
