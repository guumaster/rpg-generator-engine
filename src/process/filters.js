'use strict'

const nameLowerRE = /(\s*(del|el|al|la|de|un|una|unas|unos|uno|the|of|from)\s+)/gi

const MALE_PATTERNS = [
  //Si el adjetivo termina en “-o” formamos el femenino cambiando la “o” por “a”.
  [/(.)(o)$/i, (_,b) => `${b}a`],

  //Si el adjetivo termina en “-o” formamos el femenino cambiando la “o” por “a”.
  [/(.)(et|ot)(e|o)$/i, (_,b,c) => `${b}${c}a`],

  // Si el adjetivo termina en “-án, -ón, -or”, formamos el femenino añadiendo “a”
  [/(.)(an|on|ón|án|ór|or)$/i, (_,b,c) => `${b}${c}a`]
]
const FEMALE_PATTERNS = [
  [/(.)(an|on|ón|án|ór|or)(a)$/i, (_,b,c) => `${b}${c}`],
  [/(.)(et|ot)(a)$/i, (_,b,c) => `${b}${c}o`],
  [/(.)(a)$/i, (_,b) => `${b}o`]
]

// CASING
export const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
export const toUpperCase = str => str.split(/\n/).map(str => str.toUpperCase()).join('\n')
export const toLowerCase = str => str.toLowerCase()
export const ucFirst = str => str.replace(/^(\s+)?(.)(.*)/, (t, a, b, c) => `${a||''}${(b||'').toUpperCase()}${(c||'').toLowerCase()}` )
export const toName = str => toTitleCase(str)
  .replace(nameLowerRE, (_, m) =>  m.toLowerCase())
  .replace(/((?=\S*)[a-z]|^[a-z])/i, (_,a,b) => `${(a||'').toUpperCase()}`)

// ADJETIVOS
export const isMale = str => !!(MALE_PATTERNS.find(test => !!str.match(test[0])))
export const isFemale = str => !isMale(str)
export const isGeneric = str =>!isMale(str) && (str.match(/[a-z][b-df-hj-np-tv-z]$/i) || str.match(/e$/i) )

export const addArticle = (str, maleGeneric=true)=> `${(isMale(str) || (isGeneric(str) && maleGeneric)) ? 'el' : 'la'} ${str}`
export const addArticleMale = str => addArticle(str, true)
export const addArticleFemale = str => addArticle(str, false)

export const addUndef = (str, maleGeneric=true)=> `${(isMale(str) || (isGeneric(str) && maleGeneric)) ? 'un' : 'una'} ${str}`
export const addUndefMale = str => addUndef(str, true)
export const addUndefFemale = str => addUndef(str, false)

export const toFemale = str => {
  if (isFemale(str)) return str
  let patt = MALE_PATTERNS.find(test => str.match(test[0]) ? test[1] : false)
  return patt ? str.replace(patt[0], patt[1]) : str
}

export const toMale = str => {
  if (isMale(str) && !isGeneric(str)) return str
  let patt = FEMALE_PATTERNS.find(test => str.match(test[0]) ? test[1] : false)
  return patt ? str.replace(patt[0], patt[1]) : str
}

export const FILTERS = {

  name: toName,
  frase: ucFirst,
  title: toTitleCase,
  upper: toUpperCase,
  lower: toLowerCase,
  male: toMale,
  female: toFemale,

  '+ar.gen': addArticle,
  '+ar.genm': addArticleMale,
  '+ar.genf': addArticleFemale,
  '+ar.ind': addUndef,
  '+ar.indm': addUndefMale,
  '+ar.indf': addUndefFemale,

  ucfirst: ucFirst,
  nombre: toName,
  titulo: toTitleCase,
  may: toUpperCase,
  min: toLowerCase,
  masc: toMale,
  fem: toFemale
}
