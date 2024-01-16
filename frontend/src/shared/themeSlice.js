import { createSlice } from '@reduxjs/toolkit'
import { darkTheme, lightTheme } from './themes'

const initialState = {
  value: darkTheme,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeToDark: (state) => {
      state.value = darkTheme
    },
    changeToLight: (state) => {
      state.value = lightTheme
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeToDark, changeToLight } = themeSlice.actions

export default themeSlice.reducer