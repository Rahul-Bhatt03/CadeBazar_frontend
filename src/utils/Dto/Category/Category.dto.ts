export interface CategoryCreateDto {
  categoryName: string;
  isActive: boolean;
}

export interface CategoryUpdateDto {
  categoryName?: string;
  isActive?: boolean;
}
