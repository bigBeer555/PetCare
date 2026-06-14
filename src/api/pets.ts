import { request } from '@/utils/request'
import type { CreatePetRequest, DeletePetData, Pet, UpdatePetRequest } from '@/types/api'

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
