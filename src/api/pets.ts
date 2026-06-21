import { request } from '@/utils/request'
import type {
  CreatePetRequest,
  CreatePetTagRequest,
  DeletePetData,
  DeletePetTagData,
  Pet,
  PetTag,
  UpdatePetRequest,
} from '@/types/api'

export function fetchPets() {
  return request<Pet[]>({
    url: '/pets',
    method: 'GET',
  })
}

export function fetchPet(id: string) {
  return request<Pet>({
    url: `/pets/${id}`,
    method: 'GET',
  })
}

export function createPet(data: CreatePetRequest) {
  return request<Pet>({
    url: '/pets',
    method: 'POST',
    data,
  })
}

export function updatePet(id: string, data: UpdatePetRequest) {
  return request<Pet>({
    url: `/pets/${id}`,
    method: 'PATCH',
    data,
  })
}

export function deletePet(id: string) {
  return request<DeletePetData>({
    url: `/pets/${id}`,
    method: 'DELETE',
  })
}

export function fetchPetTags(petId: string) {
  return request<PetTag[]>({
    url: `/pets/${petId}/tags`,
    method: 'GET',
  })
}

export function createPetTag(petId: string, data: CreatePetTagRequest) {
  return request<PetTag>({
    url: `/pets/${petId}/tags`,
    method: 'POST',
    data,
  })
}

export function deletePetTag(petId: string, tagId: string) {
  return request<DeletePetTagData>({
    url: `/pets/${petId}/tags/${tagId}`,
    method: 'DELETE',
  })
}
