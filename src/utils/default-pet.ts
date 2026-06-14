import { ref } from 'vue'
import { fetchPets } from '@/api/pets'
import type { Pet } from '@/types/api'
import { pickDefaultPet } from '@/utils/pet-mapper'
import { isLoggedIn } from '@/utils/storage'

export const defaultPetRef = ref<Pet | null>(null)

export async function refreshDefaultPet(): Promise<Pet | null> {
  if (!isLoggedIn()) {
    defaultPetRef.value = null
    return null
  }

  const pets = await fetchPets()
  defaultPetRef.value = pickDefaultPet(pets)
  return defaultPetRef.value
}

export function syncDefaultPetFromList(pets: Pet[]): Pet | null {
  defaultPetRef.value = pickDefaultPet(pets)
  return defaultPetRef.value
}
