import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGenres } from '@/features/movies/hooks/useMovies'
import type { MovieSortOption } from '@/types/movie'

const ALL_VALUE = 'all'

const sortOptions: { value: MovieSortOption; label: string }[] = [
  { value: 'popularity.desc', label: 'Mais populares' },
  { value: 'vote_average.desc', label: 'Melhores avaliados' },
  { value: 'primary_release_date.desc', label: 'Mais recentes' },
  { value: 'title.asc', label: 'Título (A–Z)' },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear - 1949 }, (_, index) => currentYear - index)

export interface MovieFiltersState {
  genreId: number | null
  sortBy: MovieSortOption
  year: number | null
}

interface MovieFiltersProps {
  filters: MovieFiltersState
  onChange: (filters: MovieFiltersState) => void
}

export function MovieFilters({ filters, onChange }: MovieFiltersProps) {
  const { data: genres } = useGenres()

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Select
        value={filters.genreId ? String(filters.genreId) : ALL_VALUE}
        onValueChange={(value) =>
          onChange({ ...filters, genreId: value === ALL_VALUE ? null : Number(value) })
        }
      >
        <SelectTrigger className="h-11 w-full sm:w-44">
          <SelectValue placeholder="Gênero" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>Todos os gêneros</SelectItem>
          {genres?.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sortBy}
        onValueChange={(value) => onChange({ ...filters, sortBy: value as MovieSortOption })}
      >
        <SelectTrigger className="h-11 w-full sm:w-48">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.year ? String(filters.year) : ALL_VALUE}
        onValueChange={(value) =>
          onChange({ ...filters, year: value === ALL_VALUE ? null : Number(value) })
        }
      >
        <SelectTrigger className="h-11 w-full sm:w-32">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_VALUE}>Qualquer ano</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
