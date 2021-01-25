import { AliasesJson, TagsJson, IconsJson, AuthorsJson } from './interfaces'
import authorsJson from './json/authors.min.json'
import iconAliasesJson from './json/icon-aliases.min.json'
import iconTagsJson from './json/icon-tags.min.json'
import iconsJson from './json/icons.min.json'

export const authors = authorsJson as AuthorsJson
export const aliases = iconAliasesJson as AliasesJson
export const tags = iconTagsJson as TagsJson
export const icons = iconsJson as IconsJson
