import { create } from 'zustand'

interface TagFilterState {
  tags: string[]
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
}

export const useTagFilter = create<TagFilterState>((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
}))