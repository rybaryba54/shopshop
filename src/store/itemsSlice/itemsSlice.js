import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

export const fetchItems = createAsyncThunk('items/fetchItems', async q => {
	try {
		const response = await getDocs(q)
		const result = response.docs.map(doc => ({ ...doc.data(), id: doc.ref.id }))
		return result
	} catch (error) {
		console.log(error)
	}
})

export const fetchOneItem = createAsyncThunk('items/fetchOneItem', async id => {
	try {
		const docRef = doc(db, 'products', id)
		const response = await getDoc(docRef)
		const result = response.data()
		return result
	} catch (error) {
		console.log(error)
	}
})

export const deleteItem = createAsyncThunk('items/deleteItem', async id => {
	try {
		const dataToDelete = doc(db, 'products', id)
		await deleteDoc(dataToDelete)
		return id
	} catch (error) {
		console.log(error)
	}
})

const initialState = {
	items: [],
	loading: 'idle',
	deleteStatus: 'idle',
	loadingOneItemStatus: 'idle',
	oneItem: null,
}

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchItems.fulfilled, (state, action) => {
			const result = action.payload
			state.items = result
			state.loading = 'succeeded'
		})
		builder.addCase(fetchItems.rejected, state => {
			state.loading = 'failed'
		})
		builder.addCase(fetchItems.pending, state => {
			state.loading = 'pending'
		})

		builder.addCase(deleteItem.fulfilled, (state, action) => {
			state.deleteStatus = 'succeeded'
			state.items = state.items.filter(item => item.id !== action.payload)
		})
		builder.addCase(deleteItem.rejected, state => {
			state.deleteStatus = 'failed'
		})
		builder.addCase(deleteItem.pending, state => {
			state.deleteStatus = 'pending'
		})

		builder.addCase(fetchOneItem.fulfilled, (state, action) => {
			state.loadingOneItemStatus = 'succeeded'
			state.oneItem = action.payload
		})
		builder.addCase(fetchOneItem.rejected, state => {
			state.loadingOneItemStatus = 'failed'
		})
		builder.addCase(fetchOneItem.pending, state => {
			state.loadingOneItemStatus = 'pending'
		})
	},
})

export default itemsSlice.reducer
