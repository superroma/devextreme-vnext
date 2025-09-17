// Minimal toggle helper replicating legacy behavior used in selection & row detail
// toggle(list, items, state?) -> returns new array with items added/removed
export function toggle<T>(prev: T[], items: T[], state?: boolean) {
  const set = new Set(prev)
  const result = [...prev]
  items.forEach((item) => {
    const has = set.has(item)
    let shouldAdd: boolean
    if (state === undefined) {
      shouldAdd = !has
    } else {
      shouldAdd = state
    }
    if (shouldAdd && !has) {
      set.add(item)
      result.push(item)
    } else if (!shouldAdd && has) {
      const idx = result.indexOf(item as any)
      if (idx > -1) result.splice(idx, 1)
      set.delete(item)
    }
  })
  return result
}

export default toggle
