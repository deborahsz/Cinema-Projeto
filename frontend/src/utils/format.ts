/** Converte a duração em minutos para o formato "2h 15min". */
export function formatRuntime(minutes: number | null | undefined): string | null {
  if (!minutes || minutes <= 0) return null

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) return `${mins}min`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}min`
}

/** Extrai o ano de uma data no formato "YYYY-MM-DD". */
export function formatYear(date: string | null | undefined): string | null {
  if (!date) return null
  const year = new Date(date).getFullYear()
  return Number.isNaN(year) ? null : String(year)
}

/** Formata uma data ISO para o formato brasileiro (ex: "12 de mar. de 2024"). */
export function formatDate(date: string | null | undefined): string | null {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return null

  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/** Formata um valor em dólares (ex: 1000000 -> "US$ 1.000.000"). */
export function formatCurrency(value: number | null | undefined): string | null {
  if (!value || value <= 0) return null
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}
