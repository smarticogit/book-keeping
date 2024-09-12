export type SubCategory2 = {
  id: string
  name: string
}

export type SubCategory1 = {
  id: string
  name: string
  subCategory?: SubCategory2[]
}

export type Category = {
  id: string
  name: string
  subCategory?: SubCategory1[]
}

export type CategoryProps = Omit<Category, 'id'>
