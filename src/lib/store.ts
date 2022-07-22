import { proxy } from 'sveltio'

export const state = proxy({ count: 0 })