import type { CourseChapter } from './types'
import { part1 } from './part1'
import { part2 } from './part2'
import { part3 } from './part3'
import { part4 } from './part4'

export type { CourseChapter, CourseSection } from './types'

export const course: CourseChapter[] = [...part1, ...part2, ...part3, ...part4].sort((a, b) => a.number - b.number)

export const chapterById = Object.fromEntries(course.map((c) => [c.id, c])) as Record<string, CourseChapter>
