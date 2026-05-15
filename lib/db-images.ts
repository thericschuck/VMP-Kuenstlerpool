const BUCKET = 'vmp-images'

export function storageUrl(path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`
}

// Assigns grid col/row spans to gallery images in a repeating editorial pattern
const SPAN_PATTERN = [
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
]

export function assignGridSpan(index: number) {
  return SPAN_PATTERN[index % SPAN_PATTERN.length]
}
