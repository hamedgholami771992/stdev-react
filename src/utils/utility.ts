


export class CustomError extends Error {
  public status: 500 | 400 | 401 | 404 | 422 | number | undefined
  constructor(message: string, status: 500 | 400 | 401 | 404 | 422 | number | undefined) {
    super(message)
    this.status = status
  }
}





//it changes the hour/minute/second of a time in ISOString format
export const changeHourOfISODate = (date: Date, hour: number, minute: number, second: number) => {
  //2022-07-28T19:29:59Z
  
  // const date_str = date.toLocaleDateString()    //  8/2/2022
  // const splitted_date_str = date_str.split('/')
  // const month_str = +splitted_date_str[0] < 10 ? `0${splitted_date_str[0]}` : splitted_date_str[0]
  // const year_str = date.getFullYear()
  // const day_str = +splitted_date_str[1] < 10 ? `0${+splitted_date_str[1]}` : +splitted_date_str[1]


  // if(hour >= 24){
  //   throw new Error('hour cant be more than 24')
  // }
  // if(minute >= 60){
  //   throw new Error('minute cant be more than 60')
  // }
  // if(second >= 60){
  //   throw new Error('second cant be more than 60')
  // }

  const hourStr = hour < 10 ? `0${hour}` : `${hour}`
  const minStr = minute < 10 ? `0${minute}` : `${minute}`
  const secStr = second < 10 ? `0${second}` : `${second}`
  // return `${year_str}-${month_str}-${day_str}T${hourStr}:${minStr}:${secStr}Z`



  // console.log(date.toISOString().split('.')[0].split('T')[0]+'T'+hourStr+':'+minStr+':'+secStr+'Z')
  return date.toISOString().split('.')[0].split('T')[0]+'T'+hourStr+':'+minStr+':'+secStr+'Z'
}


//based on the backend instructions we have to seperate '+98', '98', '0098'
export const phone_number_modifier_based_on_backend_instruction = (search_str: string):string => {
  let returned_str = search_str
  if(search_str.substring(0,3) === '+98'){
    returned_str = search_str.replace('+98','')
  }
  else if(search_str.substring(0,2) === '98'){
    returned_str = search_str.replace('98','')
  }
  else if(search_str.substring(0,4) === '0098'){
    returned_str = search_str.replace('0098','')
  }
  return returned_str
}




export const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
  return x;
}







export const getsTheQueryParamFromThePathWithDefaultValue = (props, defaultVal = null) => {
  let searchQuery = defaultVal
  if (props && props.location && props.location.search) {
    searchQuery = props.location.search.split('?')[1]
  }
  return searchQuery
}


//extracts errors for an input field from errors obj in res came back from server
export const extractServerInputErrFromErrorsObj = (errors, fieldName, defaultValue) => {
  //fieldName => string
  const value = errors.filter((c, i) => c.field === fieldName)[0] ? errors.filter((c, i) => c.field === fieldName)[0] : defaultValue
  return value.msg
}


//find error for an input field from an errors array came back from server the set the validity for that input
export const setInvalidityOfInputFieldFromServerErrs = (errors, fieldName) => {
  //fieldName => string
  if (errors.filter((c, i) => c.field === fieldName)[0]) {
    return false
  }
  return true
}




export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}



export const getNNumberOfElementOfArr = (arr, n) => {
  let str = []
  new Array(n).fill('').forEach((c, i) => {
    str.push(arr[Math.floor(getRandomArbitrary(0, arr.length - 1))])
  })

  return str.join('')
}


export const logMaker = (componentName, label, value) => {
  console.log(`in Component ===> ${componentName}/  ${label} ====> ${value}`)
}






//it shffle array elements 
export const shuffleArrElements = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}


export const getCoords = (window, elem) => { // crossbrowser version
  const box = elem.getBoundingClientRect();

  const body = window.document.body;
  const docEl = window.document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}




export const getUniqueStr = (id = '') => {
  const returnedVal = `${id}`

  return returnedVal
}



//Here is the code for converting "image source" (url) to "Base64".***
export const convertUrlToDataURL = async (url) => {
  // let url = 'https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg'
  const res = await fetch(url)
  const blob = await res.blob()
  const returnedPromise = new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })

  return await returnedPromise
}

//Here is code for converting "Base64" to javascript "File Object".***
export const convertDataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}




export const convertImageUrlToFileObj = async (url, id, prefixIdStr: string) => {
  try {
      const dataUrl = await convertUrlToDataURL(url); // URL of the image
      const splittedImgUrl = url.split('/')
      const fileName = splittedImgUrl[splittedImgUrl.length - 1]
      const fileData = convertDataURLtoFile(dataUrl, fileName );
      fileData["src"] = dataUrl
      fileData["id"] = `${prefixIdStr}__${id}`
      return fileData
  }
  catch(err){
    throw err
  }
}




//it gets an element and a selector and gets the first parentElement which is matched with that selector
//const parentElement = findAncestor(e.target,'tr')
export const findAncestor = (el, sel) => {
  while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel)));
  return el;
}




















export type RouterLocationT = {
  pathname: string
  hash: string
  key: string
  search: string
  state: object
}

export const historyPropertiesExistanceCheck = (location: any, property: string, defaultValue: any) => {
  //property => string
  if (location.state && location.state.hasOwnProperty(`${property}`)) {
    const value = location.state[`${property}`]
    return value
  }
  return defaultValue
}
