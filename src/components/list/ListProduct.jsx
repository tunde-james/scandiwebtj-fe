import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import nav from '../scss/nav.module.scss'
import styles from './list.module.scss'

export default function ListProducts() {
  const [products, setProducts] = useState([])
  const [checkedItems, setCheckedItems] = useState([])

  useEffect(() => {
    getProducts()
  }, [checkedItems])

  const getProducts = () => {
    axios
      .get('https://scandiweb-tj.herokuapp.com/read.php', {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        // console.log(response)
        setProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onChangeHandler = (event) => {
    const { checked, name } = event.target

    if (checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, name])
    } else if (!checked) {
      const filter = checkedItems.filter((item) => item !== name)
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== name)
      )
      return filter
    }
  }

  const handleDelete = () => {
    axios
      .delete('https://scandiweb-tj.herokuapp.com/delete.php', {
        data: { id: checkedItems },
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
      .then((response) => {
        getProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main className={nav.main}>
      <div className={nav.main__container}>
        <nav className={nav.nav}>
          <h1 className={nav.nav__title}>Product List</h1>
          <div className={nav.nav__btn_container}>
            <Link
              to="add-product"
              className={`${nav.nav__btn} ${nav.nav__btn__add}`}
            >
              ADD
            </Link>
            <button
              type="button"
              form="delete-product"
              onClick={handleDelete}
              className={`${nav.nav__btn} ${nav.nav__btn__delete}`}
            >
              MASS DELETE
            </button>
          </div>
        </nav>

        <hr />

        <div className={styles.product}>
          {products.map((product) => (
            <div key={product.id} className={styles.product__list}>
              <form id="delete-product" action="">
                <input
                  type="checkbox"
                  name={product.id}
                  onChange={onChangeHandler}
                  className="delete-checkbox"
                />
              </form>
              <div className={styles.product__details}>
                <p>{product.sku}</p>
                <p>{product.name}</p>
                <p>{product.price}$</p>
                <div>
                  {(() => {
                    switch (product.type) {
                      case 'book':
                        return <p>Weight: {product.weight}KG</p>
                      case 'dvd':
                        return <p>Size: {product.size}MB</p>
                      case 'furniture':
                        return (
                          <p>
                            {`Dimension: ${product.height}x${product.width}x${product.length}`}
                          </p>
                        )
                      default:
                        null
                    }
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
