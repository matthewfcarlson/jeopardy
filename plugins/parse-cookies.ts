export default function (request:any) {
  const cookies = request.headers.cookie
  const list: {[key: string]: string} = {}

  if (cookies) {
    cookies.split('; ').forEach((cookie:string) => {
      const parts = cookie.split('=')
      const name = parts.shift()?.trim();
      if (name != undefined) list[name] =decodeURI(parts.join('='))
      
    })
  }

  return list
}