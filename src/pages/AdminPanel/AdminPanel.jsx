import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify'
import { db, storage } from '../../firebase'

const categories = [
	'Спорт',
	'Иммунитет',
	'Детокс и очищение организма',
	'Суставы',
	'ANTI-AGE',
	'Поддержка ЖКТ',
	'Микрофлора кишечника',
	'Защита почек',
	'Защита печени',
	'Защита сосудов',
	'Антигеморриальные средства',
	'Поддержка костной ткани',
	'Защита зрения',
	'Профилактика аллергии',
	'Профилактика диабета',
	'Антипаразитарная защита',
	'Поддержка мозга',
	'Успокоительные средства',
	'Красота и здоровье женщин',
	'Детям',
	'Мужчинам',
	'Мультивитамины',
	'Минералы',
	'Омега 3,6,9',
	'Адаптогены',
	'Беременным и кормящим',
	'Вегетарианцам',
	'Парфюм',
	'Уход за лицом',
	'Уход за волосами',
	'Уход за телом',
	'Прочее',
	'Акции',
]

export const AdminPanel = () => {
	const [productName, setProductName] = useState('')
	const [productCategory, setProductCategory] = useState('')
	const [productUnit, setProductUnit] = useState('gramm')
	const [productPrice, setProductPrice] = useState(0)
	const [productImg, setProductImg] = useState(null)
	const [productCount, setProductCount] = useState(0)
	const [err, setErr] = useState('')
	const fileInputRef = useRef(null)
	const navigate = useNavigate()

	const types = ['image/png', 'image/jpeg', 'image/jpg']

	const productImgHandler = e => {
		let selectedFile = e.target.files[0]
		if (selectedFile && types.includes(selectedFile.type)) {
			setProductImg(selectedFile)
			setErr('')
		} else {
			setProductImg(null)
			setErr('jpg or img or jpeg')
		}
	}

	const addProduct = e => {
		e.preventDefault()
		if (productImg) {
			const storageRef = ref(storage, `product-images/${productImg.name}`)
			const uploadTask = uploadBytesResumable(storageRef, productImg)
			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log(progress)
				},
				error => setErr(error.message),
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(url => {
						addDoc(collection(db, 'products'), {
							productName,
							productCategory,
							productUnit,
							productPrice: Number(productPrice),
							productCount,
							productImg: url,
						})
							.then(() => {
								toast.success('Продукт добавлен', {
									position: toast.POSITION.TOP_RIGHT,
									autoClose: 3000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									transition: Slide,
								})
							})
							.then(() => {
								setProductName('')
								setProductCategory('')
								setProductUnit('gramm')
								setProductPrice(0)
								setProductCount(0)
								setErr('')
								fileInputRef.current.value = ''
							})
							.catch(error => {
								toast.error(error.message, {
									position: toast.POSITION.TOP_RIGHT,
								})
								setErr(error.message)
							})
					})
				}
			)
		} else {
			const storageRef = ref(
				storage,
				productCategory !== 'Акции'
					? `product-images/perfume.png`
					: `product-images/_2.png`
			)
			getDownloadURL(storageRef, 'perfume').then(url => {
				addDoc(collection(db, 'products'), {
					productName,
					productCategory,
					productUnit,
					productPrice: Number(productPrice),
					productCount,
					productImg: url,
				})
					.then(() => {
						toast.success('Продукт добавлен', {
							position: toast.POSITION.TOP_RIGHT,
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							transition: Slide,
						})
					})
					.then(() => {
						setProductName('')
						setProductCategory('')
						setProductUnit('gramm')
						setProductPrice(0)
						setProductCount(0)
						setErr('')
						fileInputRef.current.value = ''
					})
					.catch(error => console.log(error.message))
			})
		}
	}

	return (
		<>
			{
				<div className='flex flex-col justify-between bg-white rounded shadow-lg p-4 sm:p-12 my-auto sm:mx-auto'>
					<ToastContainer />
					<h2 className='text-center text-sm sm:text-lg mb-2 font-bold'>
						Добавить товар
					</h2>
					<form
						autoComplete='off'
						className='flex flex-col text-sm sm:text-base'
						onSubmit={addProduct}
					>
						<label htmlFor='product-name'>Наименование товара</label>
						<input
							type='text'
							className='border-2 p-1'
							required
							onChange={e => setProductName(e.target.value)}
							value={productName}
						/>
						<br />
						<label htmlFor='product-name'>Категория товара</label>
						<select
							className='border-2 p-1'
							value={productCategory}
							required
							onChange={e => setProductCategory(e.target.value)}
						>
							<option value={''} disabled>
								---
							</option>
							{categories.map(category => (
								<option value={category} key={category}>
									{category}
								</option>
							))}
						</select>
						<br />
						<label htmlFor='product-name'>Единица измерения</label>
						<select
							onChange={e => {
								setProductUnit(e.target.value)
							}}
							value={productUnit}
							required
							className='border-2 p-1'
						>
							<option value='gramm'>грамм</option>
							<option value='kilogramm'>килограмм</option>
							<option value='shtuka'>штука</option>
							<option value='mlitr'>млитр</option>
							<option value='litr'>литр</option>
						</select>
						<br />
						<label htmlFor='product-price'>Вес / количество</label>
						<input
							type='number'
							className='border-2 p-1'
							required
							onChange={e => setProductCount(e.target.value)}
							value={productCount}
						/>
						<br />
						<label htmlFor='product-price'>
							Цена товара за единицу измерения
						</label>
						<input
							type='number'
							className='border-2 p-1'
							required
							onChange={e => setProductPrice(e.target.value)}
							value={productPrice}
						/>
						<br />
						<label htmlFor='product-img'>Изображение товара</label>
						<input
							ref={fileInputRef}
							type='file'
							className='border-2 p-1'
							id='file'
							onChange={productImgHandler}
						/>
						<br />
						<button
							type='submit'
							className='bg-violet-800 text-sm sm:text-base text-white font-bold py-2 px-4 border border-violet-800 rounded cursor-pointer'
						>
							Добавить
						</button>
					</form>
					<button
						onClick={() => navigate('/')}
						className='mt-4 sm:mt-6 text-sm sm:text-base bg-violet-800 text-white font-bold py-2 px-4 border border-violet-800 rounded cursor-pointer'
					>
						Назад в каталог
					</button>
				</div>
			}
		</>
	)
}
