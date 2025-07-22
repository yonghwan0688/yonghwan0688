export type IRandomUser = {
  name: {title: string; first: string; last: string}
  email: string
  phone: string
  picture: {large: string}
}

const convertToRandomUser = (result: unknown): IRandomUser => {
  const {name, email, phone, picture} = result as IRandomUser
  return {
    name,
    email,
    phone,
    picture: picture
  }
}

export const fetchRandomUser = async (): Promise<IRandomUser> =>
  new Promise((resolve, reject) => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const {results} = data as {results: IRandomUser[]}
        resolve(convertToRandomUser(results[0]))
      })
      .catch(reject)
  })
