<template>
  <div class="container">
    <v-text-field v-model="search" label="Pesquise um lugar pelo título" variant="outlined" hide-details single-line
      appendInnerIcon="mdi-magnify" @click:appendInner="searchProduct">
    </v-text-field>

    <div class="flip-book" id="demoBookExample">
      <div class="page page-cover page-cover-top" data-density="hard">
        <div class="page-content">
          <h2>{{ title }}</h2>
        </div>
      </div>
      <div class="page" v-for="(product, index) in filteredProducts">
        <div class="page-content">
          <h2 class="page-header">{{ product.descricao }}</h2>
          <!-- <h6 class="page-header" v-for="(detalhe, detIndex) in product.detalhamento" :key="detIndex">            
            {{  detalhe.imagens}} -->
          <!-- <div v-for="(img, imgId) in detalhe.imagens" :key="imgId">
              <div>{{ img.url}}</div>
            </div> -->
          <!-- </h6> -->
          <!-- {{ product.detalhamento}} -->
          <div>
            <v-carousel height="400" show-arrows="hover" cycle hide-delimiter-background>
              <v-carousel-item v-for="(img, imgId) in product.detalhamento" :key="imgId">
                <v-sheet height="100%">
                  <v-img :src="img.url" cover />
                </v-sheet>
              </v-carousel-item>
            </v-carousel>

            <v-select 
            density="compact" 
            label="Detalhamento" 
            min-width="300" 
            :items="product.detalhamento"
            :item-title="item => concatenateProduct(item)"
            
            >
            <!-- </v-select> -->
            


              <!-- <template v-slot:selection="{ item}">
                <span  @click="setImages" >{{ item.value.imagens }}</span>
              </template> -->


            </v-select>
          </div>
          <div class="page-footer">{{ index + 1 }}</div>
        </div>
      </div>
      <div v-if="showCover" class="page page-cover page-cover-bottom" data-density="hard">
        <div class="page-content">
          <h2>THE END</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Product from "@/classes/product";
import { PageFlip } from "page-flip";

const props = defineProps<{ title: string; products: Product[] }>();
const showCover = ref(true);
const pageFlip = ref<PageFlip>();
const search = ref("");

const filteredProducts = ref<Product[]>(props.products);
const filteredDetailing = [];

function setImages(){
  alert("oi")
}

function concatenateProduct(item) {
  let cor = item.desCor == "INDEFINIDA" ? "" : item.desCor;
  let variacao = item.desVariacao == "INDEFINIDA" ? "" : item.desVariacao;
  let acabamento = item.desAcabamento == "INDEFINIDO" ? "" : item.desAcabamento;
  let descricaoConcatenada = "";

  descricaoConcatenada = cor ? " - " + cor : "";
  descricaoConcatenada = descricaoConcatenada + (variacao ? " - " + variacao : "");
  descricaoConcatenada = descricaoConcatenada + (acabamento ? " - " + acabamento : "");

  return descricaoConcatenada ? descricaoConcatenada.slice(2) : "INDEFINIDO";

}

function searchProduct() {
  const productsFilter = props.products.filter((product: Product) =>
    product.descricao.toLowerCase().includes(search.value.toLowerCase())
  );

  console.log(productsFilter);

  filteredProducts.value = productsFilter;

  setTimeout(() => {
    updateBook();
  }, 1);
}

onMounted(() => {
  buildBook();
});

function updateBook() {
  showCover.value = false;
  console.log(document.querySelectorAll(".page"));
  const pages = document.querySelectorAll(".page") as NodeListOf<HTMLElement>;
  pageFlip.value?.updateFromHtml(pages);
}

function buildBook() {
  const bookElement = document.getElementById("demoBookExample");
  if (!bookElement) return;

  pageFlip.value = new PageFlip(bookElement, {
    width: 550, // base page width
    height: 700, // base page height

    // set threshold values:
    minWidth: 315,
    maxWidth: 1000,
    minHeight: 420,
    maxHeight: 1350,

    maxShadowOpacity: 0.5, // Half shadow intensity
    showCover: true,
    mobileScrollSupport: false, // disable content scrolling on mobile devices
    disableFlipByClick: true,

  });

  const pages = document.querySelectorAll(".page") as NodeListOf<HTMLElement>;
  console.log(pages);

  if (pages.length === 0) throw "Nenhuma página encontrada";
  pageFlip.value.loadFromHTML(pages);
}
</script>

<style>
.page {
  background-color: #fdfaf7;
}

#demoBookExample {
  margin: 15px auto;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5) !important;
  display: none;
  background-size: cover !important;
}

.page {
  padding: 20px;
  background-color: hsl(35, 55, 98);
  color: hsl(35, 33%, 36%);
  border: solid 1px hsl(35, 20, 70);
  overflow: hidden;
}

.page img {
  width: 500px;
}

.page .page-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}

.page .page-content .page-header {
  height: 30px;
  font-size: 100%;
  text-transform: uppercase;
  text-align: center;
}

.page .page-content .page-image img {
  height: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}

.page .page-content .page-text {
  height: 100%;
  flex-grow: 1;
  font-size: 80%;
  text-align: justify;
  margin-top: 10px;
  padding-top: 10px;
  box-sizing: border-box;
  border-top: solid 1px hsl(35, 55, 90);
}

.page .page-content .page-footer {
  height: 30px;
  border-top: solid 1px hsl(35, 55, 90);
  font-size: 80%;
  color: hsl(35, 20, 50);
}

.page.--left {
  border-right: 0;
  box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
}

.page.--right {
  border-left: 0;
  box-shadow: inset 7px 0 30px -7px rgba(0, 0, 0, 0.4);
}

.page.--right .page-content .page-footer {
  text-align: right;
}

.page.hard {
  background-color: hsl(35, 50, 90);
  border: solid 1px hsl(35, 20, 50);
}

.page.page-cover {
  background-color: hsl(35, 45, 80);
  color: hsl(35, 35, 35);
  border: solid 1px hsl(35, 20, 50);
}

.page.page-cover h2 {
  text-align: center;
  padding-top: 50%;
  font-size: 210%;
}

.page.page-cover.page-cover-top {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), -2px 0 5px 2px rgba(0, 0, 0, 0.4);
}

.page.page-cover.page-cover-bottom {
  box-shadow: inset 0px 0 30px 0px rgba(36, 10, 3, 0.5), 10px 0 8px 0px rgba(0, 0, 0, 0.4);
}
</style>
