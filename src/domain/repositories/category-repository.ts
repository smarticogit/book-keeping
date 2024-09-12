import { Category } from '@/domain/entities/category'

export interface CategoryRepository {
  create(category: Category): Promise<void>
}
