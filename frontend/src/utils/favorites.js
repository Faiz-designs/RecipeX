const STORAGE_KEY = 'nutrivision_favorites'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function isFavorite(name) {
  return getFavorites().includes(name)
}

export function toggleFavorite(name) {
  const favorites = getFavorites()
  const idx = favorites.indexOf(name)
  if (idx === -1) {
    favorites.push(name)
  } else {
    favorites.splice(idx, 1)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  return idx === -1
}

export function clearFavorites() {
  localStorage.removeItem(STORAGE_KEY)
}
