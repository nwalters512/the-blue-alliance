// How many layouts are defined
// Valid layout IDs are in the range [0, NUM_LAYOUTS - 1]
export const NUM_LAYOUTS = 9

// The maximum number of views any layout can support.
// Currently 9 for the nona-view
export const MAX_SUPPORTED_VIEWS = 9

// Maps a layout ID to the number of views that layout supports
// The layout ID is the index into this array
export const NUM_VIEWS_FOR_LAYOUT = [1, 2, 3, 4, 4, 5, 6, 8, 9]

// Convenience wrapper around NUM_VIEWS_FOR_LAYOUT that has bounds checking and
// a sensible default.
export function getNumViewsForLayout(layoutId) {
  if (layoutId >= 0 && layoutId < NUM_VIEWS_FOR_LAYOUT.length) {
    return NUM_VIEWS_FOR_LAYOUT[layoutId]
  }
  console.log('Unknown layout id ' + layoutId + '. Defaulting to 1 view.')
  return 1
}