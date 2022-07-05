import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import nav from '../scss/nav.module.scss'
import styles from './add.module.scss'

export default function AddProduct() {
  const [showHiddenForm, setShowHiddenForm] = useState()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    price: '',
    type: '',
    weight: '',
    size: '',
    height: '',
    width: '',
    length: '',
  })
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const handleHiddenForm = (event) => {
    const getFormType = event.target.value

    setShowHiddenForm(getFormType)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const headers = {
      'Content-Type': 'application/json',
    }

    axios
      .post('https://scandiweb-tj.herokuapp.com/create.php', formData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.status === 0) {
          setStatus(response.data.status)
          setMessage(response.data.message)
          setTimeout(() => {
            setStatus('')
            setMessage('')
          }, 5000)
        } else {
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleCancel = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <main className={nav.main}>
      <div className={nav.main__container}>
        <nav className={nav.nav}>
          <h2 className={nav.nav__title}>Product Add</h2>
          <div className={nav.nav__btn_container}>
            <button
              type="submit"
              form="product_form"
              className={`${nav.nav__btn} ${nav.nav__btn__add}`}
            >
              Save
            </button>
            <button
              type="button"
              form="product_form"
              onClick={handleCancel}
              className={`${nav.nav__btn} ${nav.nav__btn__cancel}`}
            >
              Cancel
            </button>
          </div>
        </nav>
        <hr />
        {message !== '' ? (
          <div className={styles.error__message}>{message}</div>
        ) : (
          ''
        )}
        <form id="product_form" onSubmit={handleSubmit} className={styles.form}>
          <label
            htmlFor="sku"
            className={`${styles.label} ${styles.label__sku}`}
          >
            sku
          </label>
          <input
            type="text"
            name="sku"
            id="sku"
            onChange={handleChange}
            value={formData.sku}
            autoFocus={true}
            className={styles.form__input}
          />
          <br />

          <label htmlFor="name" className={styles.label}>
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={formData.name}
            className={styles.form__input}
          />
          <br />

          <label htmlFor="price" className={styles.label}>
            price ($)
          </label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            value={formData.price}
            className={styles.form__input}
          />
          <br />

          <label htmlFor="type" className={styles.label}>
            type switcher
          </label>
          <select
            id="productType"
            name="type"
            value={formData.type}
            onChange={(e) => {
              handleHiddenForm(e)
              handleChange(e)
            }}
            className={`${styles.form__input} ${styles.form__select}`}
          >
            <option value="">Product Type</option>
            <option value="book">Book</option>
            <option value="dvd">DVD</option>
            <option value="furniture">Furniture</option>
          </select>
          <br />

          <div>
            {(() => {
              switch (showHiddenForm) {
                case 'book':
                  return (
                    <div>
                      <label htmlFor="weight" className={styles.label}>
                        weight (KG)
                      </label>
                      <input
                        type="text"
                        name="weight"
                        id="weight"
                        onChange={handleChange}
                        value={formData.weight}
                        className={styles.form__input}
                      />
                      <br />
                      <span>Please, provide weight</span>
                    </div>
                  )

                case 'dvd':
                  return (
                    <div>
                      <label htmlFor="size" className={styles.label}>
                        size (MB)
                      </label>
                      <input
                        type="text"
                        name="size"
                        id="size"
                        onChange={handleChange}
                        value={formData.size}
                        className={styles.form__input}
                      />
                      <br />
                      <span>Please, provide size</span>
                    </div>
                  )

                case 'furniture':
                  return (
                    <div>
                      <label htmlFor="height" className={styles.label}>
                        height (CM)
                      </label>
                      <input
                        type="text"
                        name="height"
                        id="height"
                        onChange={handleChange}
                        value={formData.height}
                        className={styles.form__input}
                      />
                      <br />

                      <label htmlFor="width" className={styles.label}>
                        width (CM)
                      </label>
                      <input
                        type="text"
                        name="width"
                        id="width"
                        onChange={handleChange}
                        value={formData.width}
                        className={styles.form__input}
                      />
                      <br />

                      <label htmlFor="length" className={styles.label}>
                        length (CM)
                      </label>
                      <input
                        type="text"
                        name="length"
                        id="length"
                        onChange={handleChange}
                        value={formData.length}
                        className={styles.form__input}
                      />
                      <br />
                      <span>Please, provide dimensions</span>
                    </div>
                  )
              }
            })()}
          </div>
        </form>
      </div>
    </main>
  )
}
