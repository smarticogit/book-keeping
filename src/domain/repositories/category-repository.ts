import { Category } from '@/domain/entities/category'
import { BaseRepository } from './base-repository'
import { CategoryRequest } from '../entities/types/category.types'

export type CategoryRepository = BaseRepository<Category, CategoryRequest>
