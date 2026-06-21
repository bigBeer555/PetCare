import type { PetTag as ApiPetTag } from '@/types/api'

/** 个性标签配色池（色相尽量拉开，同一宠物内按序分配、互不重复） */
export const PET_TAG_STYLE_CLASSES = [
  'tag-primary',
  'tag-secondary',
  'tag-tertiary',
  'tag-lavender',
  'tag-rose',
  'tag-lemon',
  'tag-coral',
  'tag-indigo',
  'tag-lime',
  'tag-plum',
  'tag-brown',
  'tag-neutral',
] as const

export type PetTagStyleClass = (typeof PET_TAG_STYLE_CLASSES)[number]

export type PetTagInlineStyle = {
  background: string
  color: string
  borderColor: string
}

/** 内联样式（小程序动态 class 不会打包对应 wxss，必须用 style） */
export const PET_TAG_STYLES: Record<PetTagStyleClass, PetTagInlineStyle> = {
  'tag-primary': {
    background: 'rgba(147, 244, 224, 0.55)',
    color: '#005d51',
    borderColor: '#93f4e0',
  },
  'tag-secondary': {
    background: 'rgba(186, 218, 255, 0.7)',
    color: '#0a4a8a',
    borderColor: '#9ecaff',
  },
  'tag-tertiary': {
    background: 'rgba(255, 210, 170, 0.65)',
    color: '#8a4510',
    borderColor: '#ffc896',
  },
  'tag-lavender': {
    background: 'rgba(220, 205, 255, 0.72)',
    color: '#4a2d8a',
    borderColor: '#c9b0ff',
  },
  'tag-rose': {
    background: 'rgba(255, 200, 220, 0.68)',
    color: '#8a1048',
    borderColor: '#f5a0c0',
  },
  'tag-lemon': {
    background: 'rgba(255, 238, 160, 0.78)',
    color: '#6a5010',
    borderColor: '#f0d870',
  },
  'tag-coral': {
    background: 'rgba(255, 190, 170, 0.68)',
    color: '#9a2818',
    borderColor: '#f5a090',
  },
  'tag-indigo': {
    background: 'rgba(195, 205, 255, 0.72)',
    color: '#1a2878',
    borderColor: '#a8b4ff',
  },
  'tag-lime': {
    background: 'rgba(220, 255, 170, 0.72)',
    color: '#3a5810',
    borderColor: '#c8f080',
  },
  'tag-plum': {
    background: 'rgba(240, 190, 230, 0.68)',
    color: '#6a1868',
    borderColor: '#e0a0d8',
  },
  'tag-brown': {
    background: 'rgba(230, 210, 185, 0.72)',
    color: '#5a3a18',
    borderColor: '#d0b898',
  },
  'tag-neutral': {
    background: 'rgba(220, 225, 228, 0.78)',
    color: '#3a4548',
    borderColor: '#b8c0c4',
  },
}

export type TagColorInput = {
  id: string
  createdAt?: string
}

function compareTagsForColor(
  a: TagColorInput,
  b: TagColorInput,
  orderMap: Map<string, number>,
): number {
  const aCreated = a.createdAt ? new Date(a.createdAt).getTime() : null
  const bCreated = b.createdAt ? new Date(b.createdAt).getTime() : null

  if (aCreated !== null && bCreated !== null) return aCreated - bCreated
  if (aCreated !== null) return -1
  if (bCreated !== null) return 1

  return (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0)
}

/** 为同一组标签分配互不相同的配色（按创建顺序） */
export function buildTagStyleClassMap(
  tags: TagColorInput[],
): Record<string, PetTagStyleClass> {
  const orderMap = new Map(tags.map((tag, index) => [tag.id, index]))
  const sorted = [...tags].sort((a, b) => compareTagsForColor(a, b, orderMap))
  const result: Record<string, PetTagStyleClass> = {}

  sorted.forEach((tag, index) => {
    const styleClass = PET_TAG_STYLE_CLASSES[index]
    if (styleClass) {
      result[tag.id] = styleClass
    }
  })

  return result
}

export function buildTagStyleMap(
  tags: TagColorInput[],
): Record<string, PetTagInlineStyle> {
  const classMap = buildTagStyleClassMap(tags)
  const result: Record<string, PetTagInlineStyle> = {}

  for (const [id, className] of Object.entries(classMap)) {
    result[id] = getPetTagStyle(className)
  }

  return result
}

export function getPetTagStyle(
  className?: PetTagStyleClass,
): PetTagInlineStyle {
  if (className && PET_TAG_STYLES[className]) {
    return PET_TAG_STYLES[className]
  }
  return PET_TAG_STYLES['tag-primary']
}

export function getTagStyleClassForTag(
  tagId: string,
  tags: TagColorInput[],
): PetTagStyleClass {
  return buildTagStyleClassMap(tags)[tagId] ?? PET_TAG_STYLE_CLASSES[0]
}

export function getTagStyleClassByIndex(index: number): PetTagStyleClass {
  return PET_TAG_STYLE_CLASSES[Math.min(index, PET_TAG_STYLE_CLASSES.length - 1)]
}

export function mapApiTagsToDisplayTags(tags: ApiPetTag[] = []) {
  const classMap = buildTagStyleClassMap(
    tags.map((tag) => ({ id: String(tag.id), createdAt: tag.createdAt })),
  )

  return tags.map((tag) => {
    const className = classMap[String(tag.id)] ?? PET_TAG_STYLE_CLASSES[0]
    return {
      id: String(tag.id),
      label: tag.label,
      className,
      style: getPetTagStyle(className),
    }
  })
}

export function canAddMoreTags(currentCount: number): boolean {
  return currentCount < PET_TAG_STYLE_CLASSES.length
}

export const MAX_PET_TAG_COUNT = PET_TAG_STYLE_CLASSES.length
