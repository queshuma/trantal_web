import { jwtDecode } from 'jwt-decode'

let token = () => {
  const cook = {}
  document.cookie.split(';').forEach((cookie) => {
    const parts = cookie.split('=')
    const name = parts[0].trim()
    const value = parts[1] ? decodeURIComponent(parts[1].trim()) : ''
    cook[name] = value
  })
  
  let keyContent =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqW5UXtooVHgmBN1kWWcPigGkUPG5Ue/+ulNhyAemFMYv4OMPZIqtSPkhxXrrP+VtiIUuOwlZLNywM8oTLFkxNQpd8f5P+rmoQaWl07sVUe9rKWbh6gbF50tEoYtGU8TV7qSvFlnG375YzMGaHpEng68WCmdFHso6Y3yy8HORyzDONH8Kl58U+Jp8AlEry+Jqk26E85mmCi13T1Lu4uZn3M6OyqTy5v6rQzL2dJlvYlC+TnsCa0hRDHc5W0E71qZ7yT3P16QS5wDtvYmuS1jT8hzNpfWzjHQ2HQMMEULkwX5FBpecJHLUuwibhl4BZj8G7azBmNlFEewnyqum8Zmh/wIDAQAB'
  if ('token' in cook) { 
      const decodedToken = jwtDecode(cook.token)
    return decodedToken
  } 
  return null;
}

export default token
