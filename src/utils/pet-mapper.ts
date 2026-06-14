import type { CreatePetRequest, Pet } from '@/types/api'

const DEFAULT_PET_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDp5eWXHUzzsQLNTckgxaXjRDQAU6-uJnPLfx8uJ0lnbxvOxJhMeQYXE-FaS0GK159ZtXCm3gMIOdl4IlvluGZdmRKd5tOQl8YW-XiJupP-bQct4Hk2HxffTKsWzqCZyO6AlEZEfARYqf4cpW5CeMGNiw6O19edyJKZo7PCtyBIFB0WbSlzjqTbIoJJ2cMuObuXhGIYzOpjbYRu9ptOdTxr1zSPn2CCBzvLa3LB4FBX-KAoGV-WIohmCnfGqPSdPiqTZsTds4o0nng'

export type PetTypeId = 'dog' | 'cat' | 'other'
export type GenderId = 'male' | 'female'

const SPECIES_TO_TYPE: Record<string, PetTypeId> = {
  狗: 'dog',
  狗狗: 'dog',
  猫: 'cat',
  猫咪: 'cat',
  其他: 'other',
}

const TYPE_TO_SPECIES: Record<PetTypeId, string> = {
  dog: '狗',
  cat: '猫',
  other: '其他',
}

const GENDER_TO_API: Record<GenderId, string> = {
  male: '公',
  female: '母',
}

const API_TO_GENDER: Record<string, GenderId> = {
  公: 'male',
  母: 'female',
  male: 'male',
  female: 'female',
}

export function mapPetTypeToSpecies(typeId: PetTypeId): string {
  return TYPE_TO_SPECIES[typeId]
}

export function mapSpeciesToPetType(species: string): PetTypeId {
  return SPECIES_TO_TYPE[species] || 'other'
}

export function mapGenderToApi(gender: GenderId): string {
  return GENDER_TO_API[gender]
}

export function mapApiToGender(gender: string | null): GenderId {
  if (!gender) return 'male'
  return API_TO_GENDER[gender] || 'male'
}

export function formatBirthdayForApi(date: string): string | undefined {
  return date || undefined
}

export function formatBirthdayForPicker(birthday: string | null): string {
  if (!birthday) return ''
  return birthday.slice(0, 10)
}

export function calcPetAgeLabel(birthday: string | null): string {
  if (!birthday) return '年龄未知'
  const birth = new Date(birthday)
  if (Number.isNaN(birth.getTime())) return '年龄未知'

  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1
  }
  if (age < 1) return '不足 1 岁'
  return `${age} 岁`
}

export function getPetAvatarUrl(pet: Pet): string {
  return pet.avatarUrl || DEFAULT_PET_AVATAR
}

export function getSpeciesBadgeIcon(species: string): string {
  const type = mapSpeciesToPetType(species)
  if (type === 'cat') return '/static/svg/cat.svg'
  if (type === 'dog') return '/static/svg/dog.svg'
  return '/static/svg/animal-other.svg'
}

export function getSpeciesBreedClass(species: string): string {
  const type = mapSpeciesToPetType(species)
  if (type === 'cat') return 'tag-breed-pink'
  return 'tag-breed-blue'
}

export function getProfileBorderClass(species: string): string {
  const type = mapSpeciesToPetType(species)
  if (type === 'cat') return 'border-tertiary'
  return 'border-primary'
}

export function getProfileTagClass(index: number): string {
  return index % 2 === 0 ? 'tag-secondary' : 'tag-tertiary'
}

export function buildPetNotes(tagLabels: string[]): string | undefined {
  if (!tagLabels.length) return undefined
  return tagLabels.join('、')
}

export function parseNotesToTagLabels(notes: string | null): string[] {
  if (!notes) return []
  return notes
    .split(/[、,，]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function buildCreatePetPayload(input: {
  name: string
  petType: PetTypeId
  breed: string
  gender: GenderId
  birthday: string
  weight: string
  avatarUrl?: string
  tagLabels: string[]
  isDefault?: boolean
}): CreatePetRequest {
  const payload: CreatePetRequest = {
    name: input.name.trim(),
    species: mapPetTypeToSpecies(input.petType),
  }

  if (input.breed.trim()) payload.breed = input.breed.trim()
  payload.gender = mapGenderToApi(input.gender)

  const birthday = formatBirthdayForApi(input.birthday)
  if (birthday) payload.birthday = birthday

  const weightNum = Number(input.weight)
  if (input.weight && !Number.isNaN(weightNum)) payload.weight = weightNum

  if (input.avatarUrl) payload.avatarUrl = input.avatarUrl

  const notes = buildPetNotes(input.tagLabels)
  if (notes) payload.notes = notes

  if (input.isDefault !== undefined) payload.isDefault = input.isDefault

  return payload
}

export function pickDefaultPet(pets: Pet[]): Pet | null {
  if (!pets.length) return null
  return pets.find((pet) => pet.isDefault === true) ?? pets[0]
}

const HOME_TAG_CLASSES = [
  'tag-primary',
  'tag-error',
  'tag-secondary',
  'tag-muted',
] as const

export function getHomeTagClass(index: number): string {
  return HOME_TAG_CLASSES[index % HOME_TAG_CLASSES.length]
}

export function formatHomePetDesc(pet: Pet): string {
  const breed = pet.breed || pet.species
  const age = calcPetAgeLabel(pet.birthday)
  const weight = pet.weight != null ? `${pet.weight}kg` : ''
  return [breed, age, weight].filter(Boolean).join(' · ')
}

export function mapPetToHomeDisplay(pet: Pet) {
  const tagLabels = parseNotesToTagLabels(pet.notes)
  const type = mapSpeciesToPetType(pet.species)

  return {
    id: pet.id,
    name: pet.name,
    avatar: getPetAvatarUrl(pet),
    desc: formatHomePetDesc(pet),
    badgeIcon: getSpeciesBadgeIcon(pet.species),
    badgeLabel: tagLabels[0] || (type === 'cat' ? '猫咪' : type === 'dog' ? '狗狗' : '宠物'),
    tags: tagLabels.map((label, index) => ({
      label,
      className: getHomeTagClass(index),
    })),
    gender: mapApiToGender(pet.gender),
  }
}

export function formatProfilePetDesc(pet: Pet): string {
  const breed = pet.breed || pet.species
  return `${breed} · ${calcPetAgeLabel(pet.birthday)}`
}

export function mapPetToListItem(pet: Pet) {
  return {
    id: pet.id,
    name: pet.name,
    breed: pet.breed || pet.species,
    age: calcPetAgeLabel(pet.birthday),
    avatar: getPetAvatarUrl(pet),
    badgeIcon: getSpeciesBadgeIcon(pet.species),
    breedClass: getSpeciesBreedClass(pet.species),
    isDefault: pet.isDefault,
  }
}

export function mapPetToProfileCard(pet: Pet, index: number) {
  const tagLabels = parseNotesToTagLabels(pet.notes)
  return {
    id: pet.id,
    name: pet.name,
    desc: formatProfilePetDesc(pet),
    tag: tagLabels[0] || '暂无标签',
    avatar: getPetAvatarUrl(pet),
    borderClass: getProfileBorderClass(pet.species),
    tagClass: getProfileTagClass(index),
  }
}
