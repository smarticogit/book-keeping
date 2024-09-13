import {
  CategoryRequest,
  CategoryResponse,
} from '@/domain/entities/types/category.types'

export interface CategoryRepository {
  create: (category: CategoryRequest) => Promise<CategoryResponse | null>
}
