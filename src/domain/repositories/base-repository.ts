export interface BaseRepository<EntityRequest, EntityResponse> {
  create(entity: EntityRequest): Promise<EntityResponse>
  update(entity: EntityRequest): Promise<EntityResponse>
  delete(id: string): Promise<void>
  findById(id: string): Promise<EntityResponse | null>
  findAll(): Promise<EntityResponse[]>
  findAllPaginated(limit: number, offset: number): Promise<EntityResponse[]>
}
