import {A,H,R,bcrypt} from '../../../common'

const signup = async (_, {email, password}, {driver}) => {
  /* Setup */
  const ses = driver.session()
  const _1 = 
  `MATCH (u:User) WHERE u.email = $email RETURN u`

  /* Check if user exists */
  const {records: recs} = await ses.run (_1, {email})      
  H.assert (R.isEmpty (recs)) (`a user with email ${email} already exists`)

  /* Hash password */
  const hashedPassword = await bcrypt.hash(password, 12)
  const _2 = 
  `CREATE (u:User {email: $email})
  -[:AUTHENTICATED_WITH]->
  (l:LOCAL_ACCOUNT {hashedPassword: $hashedPassword, email: $email})
  RETURN u`

  /* Save user to db! */
  await ses.run (_2, {email, hashedPassword})

  /* Grant jwt */
  return await A.createToken({user: {email}}, process.env.JWT_SECRET)
}

export default signup