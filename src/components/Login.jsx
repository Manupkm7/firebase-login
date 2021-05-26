import React, { useCallback, useState } from 'react'
import {auth, db} from '../firebase/firebase'
import {withRouter} from 'react-router-dom'


const Login = (props) =>{
   const [email, setEmail] = useState('')
   const [pass, setPass] = useState('')
   const [error, setError] = useState(null)
   const [esRegistro, setEsRegistro] = useState(true)


const processData = e =>{
    e.preventDefault()

    if(!email.trim()){
        setError('Ingrese Email')
        return
    }
    if(!pass.trim()){
        setError('Ingrese Contraseña')
        return
    }
    if(pass.length < 6){
        setError('La contraseña debe ser mayor a 6 caracteres')
        return
    }
setError(null)

if(esRegistro){
    registrar()
}else{
login()

}
}
const login = useCallback(async()=>{
try {
   const res = await auth.signInWithEmailAndPassword(email, pass)
    console.log(res);
   setEmail('')
   setPass('')
   setError(null)
   props.history.push('/admin')
} catch (error) {
    if(error.code === 'auth/invalid-email'){
        setError('Email no valido')
}
if(error.code === 'auth/user-not-found'){
    setError('Email no registrado')
}
if(error.code === 'auth/wrong-password'){
    setError('Contraseña incorrecta')
}
}

},[email, pass, props.history])

const registrar = useCallback(async()=>{
try {
    const res = await auth.createUserWithEmailAndPassword(email, pass)
    await db.collection('usuarios').doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid
    })
    setEmail('')
    setPass('')
    setError(null)
} catch (error) {
    if(error.code === 'auth/invalid-email'){
        setError('Email no valido')
    }
    if(error.code === 'auth/email-already-in-use'){
        setError('Este email ya esta registrado')
    }
}


}, [email, pass])


return (
    <div className="mt-5">
        <h3 className="text-center">{esRegistro ? 'Registro de usuarios' : 'Login de acceso'}</h3>
        <hr />
        <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <form onSubmit={processData} className='d-grid gap-2'>
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                        )}
                    <input type="email" className="form-control mb-2" onChange={e=>setEmail(e.target.value)} value={email} placeholder='Ingrese un Email' />
                    <input type="password" className="form-control mb-2" onChange={e=>setPass(e.target.value)} value={pass} placeholder='Ingrese una Contraseña' />
                    <button className="btn btn-dark btn-lg" type='submit'>{esRegistro ? 'Registrarse' : 'Acceder'}</button>
                    <button className="btn btn-info btn-sm mt-2" type='button' onClick={()=>setEsRegistro(!esRegistro)}>{esRegistro ? '¿Ya estas Registrado?': '¿No tienes cuenta?'}</button>
                    {!esRegistro ?( 
                    <button className="btn btn-danger btn-sm mt-2" type='button' onClick={()=>props.history.push('/reset')}>Recuperar Contraseña</button>
                     ): null}
                </form>
            </div>
        </div>
    </div>
)
}

export default withRouter(Login)