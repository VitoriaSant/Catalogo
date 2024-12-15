<template>
  <Book title="My Book" :products="products" v-if="products.length > 0"/>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { auth } from '../services/auth';
import { getProdutos } from '../services/getProduct';
import Product from "@/classes/product";

const products = ref<Product[]>([]); 



onMounted(async () => {
  try {
    auth();
    const token = localStorage.getItem("auth_token");;
      if (!token) {
        console.log("Token não encontrado.");
      }else {
        const produtos = await getProdutos(token);
        products.value = produtos.itens; // Astualize a lista de produtos
        console.log(products.value);
      }
  } catch (error) {
    console.error(error.messageError);
    if (error.IdError === 'ERR_AUTH') {
      // Tratar erro de autenticação
    } else if (error.IdError === 'ERR_GET_PRODUCT') {
      // Tratar erro de obtenção de produtos
    }
    console.error(error);
  }
});
</script>
