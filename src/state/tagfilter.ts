import { create } from 'zustand'

interface TagFilterState {
  tags: string[]
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  toggleTag: (tag: string) => void
}

export const useTagFilterStore = create<TagFilterState>((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
  toggleTag: (tag) => set((state) => ({ tags: state.tags.includes(tag) ? state.tags.filter((t) => t !== tag) : [...state.tags, tag] })),
}))