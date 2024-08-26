import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
    public async login({request, response, auth}:HttpContextContract){
        let payload = await request.validate(AuthValidator)
        try {

            const token = await auth.use("api").attempt(payload.email, payload.password, {
                expiresIn:"24hours"
            })
            return token.toJSON()
        } catch (error) {

            return response.status(400)
            .send({
                error:{
                    message:"Person with provided credentials could not be found"
                }
            })
            
        }
    }

    public async logout({response, auth}:HttpContextContract){
        await auth.logout()
        return response.status(200)
    }
}
