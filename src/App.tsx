import { useState } from 'react'
import './App.css'
import type {Category} from "./types.ts";
import {CategoryCreateForm} from "./components/CategoryCreateForm.tsx";
import {CategoryList} from "./components/CategoryList.tsx";

type Product = {
    name: string,
    price: number
}

function App() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [updatingCategory, setUpdatingCategory] = useState<Category | null>(null);
  const [updatingCategoryValue, setUpdatingCategoryValue] = useState('');

  const [nameValue, setNameValue] = useState('');
  const [priceValue, setPriceValue] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  function handleSubmit(e: React.SubmitEvent) {
      e.preventDefault();

      setProducts([...products, {"name": nameValue, "price": priceValue}]);
      setNameValue('');
      setPriceValue(0);
  }

  function handleUpdate(e: React.SubmitEvent){
      e.preventDefault();
      if(!updatingCategory) return;

      setCategories(categories.map(category =>
          category.id === updatingCategory.id
              ? {...updatingCategory, name: updatingCategoryValue}
              : category
      ));

      setUpdatingCategory(null);
      setUpdatingCategoryValue('');
  }
  return (
      <div className={"hero"}>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  required
                  minLength={2}
                  placeholder={"Input Name"}
              />
              <input
                  type="number"
                  value={priceValue}
                  onChange={(e) => setPriceValue(Number(e.target.value))}
                  required
                  min={1}
                  placeholder={"Input Price"}
              />
              <button>Save</button>
          </form>

          <CategoryCreateForm categories={categories} setCategories={(categories: Category[])=>setCategories(categories)}/>

          <div className="list">
          {products.length> 0 ?
            <table>
                  <tr>
                      <th>Name</th>
                      <th>Price</th>
                  </tr>
                  {products.map(product => (
                      <tr>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                      </tr>
                  ))
                  }
              </table>
              :
              <p>List is empty</p>
          }
          </div>

          <CategoryList categories={categories}
                        setUpdatingCategory={(category: Category) => {
                            setUpdatingCategory(category)
                            setUpdatingCategoryValue(category.name)
                        }
                        }/>

          {updatingCategory && (
              <form onSubmit={handleUpdate}>
                  <input type="text" value={updatingCategoryValue} onChange={e => setUpdatingCategoryValue(e.target.value)}/>
                  <button>Save</button>
              </form>
          )}


      </div>

  )
}

export default App
