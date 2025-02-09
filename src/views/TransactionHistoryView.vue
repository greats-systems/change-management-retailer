<script>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import axios from 'axios';
import { reactive } from 'vue';

export default {
  components: { Navbar, Hero },
  data() {
    return {
      found: false,
      root: 'http://localhost:5000/api/transactions',
      jsonData: {},
      request: {},
      form: reactive({
        retailerName: null
      })
    }
  },
  methods: {
    async search() {
      const _request = {
        params: {
          issuedBy: this.form.retailerName
        }
      }
      this.request = _request
      const url = `${this.root}`
      console.log(`${url}\n${_request}`)
      await axios.get(url, _request).then((response) => {
        this.jsonData = response.data
        this.found = true
        console.log(this.jsonData)
      }).catch((error) => {
        console.log(error)
      })
    },

    clear() {
      this.form.retailerName = null
      this.found = false
    }
  },
  async mounted() {
    await axios.get(`${this.root}/OK`).then((response) => {
      this.jsonData = response.data
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <div class="mb-10">
    <Hero title="Transaction History"></Hero>
  </div>
  <section class="bg-white w-auto mx-60 my-30">
    <div class="mb-5 flex justify-center">
      <input class="py-2 px-6 border rounded" type="text" v-model="form.retailerName" id="name" name="name"
        placeholder="Retailer name" required>
    </div>
    <div class="flex justify-center space-x-4">
      <button @click="search"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">Search</button>
      <button @click="clear"
        class="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
        type="submit">Clear</button>
    </div>
  </section>
  <div v-if="found==true" class="mt-10">
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
          <td align="right">{{ data['amount'].toFixed(2) }}</td>
          <td>{{ data['status'] }}</td>
          <td align="right">{{ data['balance'].toFixed(2) }}</td>
          <td>{{ data['issuedBy'] }}</td>
          <td>{{ data['createdAt'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="mt-10">
    <center>No data</center>
  </div>
</template>
