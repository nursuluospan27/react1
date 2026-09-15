import {useState} from 'react'
import './App.css'
import type {Category, Product} from "./types.ts";
import {CategoryContent} from "./components/CategoryContent.tsx";
import {ProductContent} from "./components/ProductContent.tsx";

function App() {

  const [isCategoryChosen, SetIsCategoryChosen] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  return (
      <div className={"hero"}>
          <div className={'app-top'}>
              <ul>
                  <li><a onClick={()=> SetIsCategoryChosen(true)}>Категории</a></li>
                  <li><a onClick={() => SetIsCategoryChosen(false)}>Товары</a></li>
              </ul>
          </div>
          {isCategoryChosen
          ? <CategoryContent categories={categories} setCategories={setCategories}/>
          : <ProductContent products={products} setProducts={setProducts} categories={categories}/>
          }
          </div>
  )
}

export default App
